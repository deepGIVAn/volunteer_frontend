import { json, redirect } from "@remix-run/node";
import { getSession, commitSession } from "../utiils/sessions.server";
import { RoutesPath } from "../utiils/Path";

export async function action({ request }) {
	if (request.method !== "POST") {
		throw new Response("Method not allowed", { status: 405 });
	}

	try {
		// Get the data sent from the login page
		const loginData = await request.json();
		console.log("Received callback data:", loginData);

		// Get the current session
		const session = await getSession(request.headers.get("Cookie"));

		// Store the user data in session
		session.set("user", loginData);

		// If there's a token, store it as well
		if (loginData.token) {
			session.set("token", loginData.token);
		}

		// Return success response with session cookie
		return redirect(RoutesPath.admin, {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
		// return json(
		// 	{ 
		// 		success: true, 
		// 		message: "Session created successfully",
		// 	},
		// 	{
		// 		headers: {
		// 			"Set-Cookie": await commitSession(session),
		// 		},
		// 	}
		// );

	} catch (error) {
		console.error("Callback error:", error);
		return json(
			{ success: false, message: "Authentication callback failed" },
			{ status: 500 }
		);
	}
}

export async function loader({ request }) {
	// Handle GET requests - check if user is already authenticated
	const session = await getSession(request.headers.get("Cookie"));

	if (session.has("user")) {
		return redirect(RoutesPath.admin);
	}

	// If no session, redirect to login
	return redirect(RoutesPath.login);
}

export default function AuthCallback() {
	return (
		<div>
			Loading...
		</div>
	)
}
