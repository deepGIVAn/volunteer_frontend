import { redirect } from "@remix-run/react";
import LoginPage from "../pages/auth/LoginPage";
import { getSession } from "../utiils/sessions.server";
import { routesPath } from "../utiils/Routespath";

export async function loader({ request }) {
	const session = await getSession(request.headers.get("Cookie"));
	
	if (session && session.has("user")) {
		return redirect(routesPath.admin);
	}
	
	return null;
}

export default function Login() {
	return <LoginPage />
}
