import { redirect } from "@remix-run/react";
import { destroySession, getSession } from "../utiils/sessions.server";
import { routesPath } from "../utiils/routesPath";

export async function action({ request }) {
	const session = await getSession(request.headers.get("Cookie"));
	return redirect(routesPath.login, {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}

export async function loader() {
	return redirect(routesPath.login);
}

export default function Logout() {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">Logging out...</h1>
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
			</div>
		</div>
	)
}