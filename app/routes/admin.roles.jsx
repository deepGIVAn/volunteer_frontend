import { useLoaderData } from "@remix-run/react";
import AdminRolesPage from "../pages/admin/AdminRolesPage";
import { getSession } from "../utiils/sessions.server";

export async function loader({request}) {
	let organisations = [];
	const session = await getSession(request.headers.get("Cookie"));
	let user = session.get("user");

	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-organisations/`, {
				method: 'GET',
				headers: {
						'Authorization': user?.token ? `Bearer ${   user.token}` : ''
				},
		});
		organisations = await response.json();
	} catch (error) {
		console.log(error);
	}

	return Response.json({ organisations });
}

export default function AdminRoles() {
	const data = useLoaderData();

	return <AdminRolesPage {...data} />
}
