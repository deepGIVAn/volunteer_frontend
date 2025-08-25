import { json, redirect } from "@remix-run/node";
import { getSession, commitSession } from "../utiils/sessions.server";
import { getCurrentNZDate } from "../utiils/dateUtils";
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

		// Store login timestamp for session management
		session.set("loginTime", getCurrentNZDate());

		// Return redirect with proper cookie headers
		return redirect(RoutesPath.admin, {
			headers: {
				"Set-Cookie": await commitSession(session),
				// Add cache control to prevent caching of auth responses
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"Pragma": "no-cache",
				"Expires": "0"
			},
		});

	} catch (error) {
		console.error("Callback error:", error);
		return json(
			{ success: false, message: "Authentication callback failed" },
			{ 
				status: 500,
				headers: {
					"Cache-Control": "no-cache, no-store, must-revalidate"
				}
			}
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
