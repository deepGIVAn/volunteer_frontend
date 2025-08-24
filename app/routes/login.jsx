import { redirect } from "@remix-run/react";
import LoginPage from "../pages/auth/LoginPage";
import { getSession } from "../utiils/sessions.server";
import { RoutesPath } from "../utiils/Path";

export async function loader({ request }) {
	const session = await getSession(request.headers.get("Cookie"));
	
	if (session && session.has("user")) {
		return redirect(RoutesPath.admin);
	}
	
	return null;
}

export default function Login() {
	return <LoginPage />
}
