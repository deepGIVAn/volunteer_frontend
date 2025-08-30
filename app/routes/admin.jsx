import { redirect, useLoaderData } from "@remix-run/react";
import AdminLayout from "../pages/admin/AdminLayout";
import { getSession, destroySession } from "../utiils/sessions.server";
import { RoutesPath } from "../utiils/Path";

export async function loader({ request }) {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session.has("user")) {
		return redirect(RoutesPath.login);
	}
	
	let user = session.get("user");
	
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/admin/info/`, {
			method: 'GET',
			headers: {
					'Authorization': user?.token ? `Bearer ${user.token}` : ''
			},
		});
		let data = await response.json();
		if (!data?.success) {
			return redirect(RoutesPath.login, {
				headers: {
					"Set-Cookie": await destroySession(session),
				},
			});
		}
	} catch (error) {
		console.log("Error in admin loader:", error);
	}
	
	return Response.json({ user: user });
}

export default function Admin() {
	const { user } = useLoaderData();

	return <AdminLayout user={user} />;
}
