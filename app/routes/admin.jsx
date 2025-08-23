import { redirect, useLoaderData } from "@remix-run/react";
import AdminLayout from "../pages/admin/AdminLayout";
import { getSession } from "../utiils/sessions.server";
import { routesPath } from "../utiils/Routespath";

export async function loader({ request }) {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session.has("user")) {
		return redirect(routesPath.login);
	}

	let user = session.get("user");

	return Response.json({ user: user });
}

export default function Admin() {
	const { user } = useLoaderData();

	return <AdminLayout user={user} />;
}
