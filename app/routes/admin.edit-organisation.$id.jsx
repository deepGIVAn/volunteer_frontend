import { redirect, useLoaderData } from "@remix-run/react";
import EditOrganisationPage from "../pages/admin/EditOrganisationPage";
import { getSession } from "../utiils/sessions.server";
import { RoutesPath } from "../utiils/Path";

export async function loader({ request, params }) {
	const { id } = params;
	const session = await getSession(request.headers.get("Cookie"));
	let user = session.get("user");
	let organisation = null;
	let regions = [];
	let types = [];
	
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-organisation/${id}`, {
				method: 'GET',
				headers: {
						'Authorization': user?.token ? `Bearer ${   user.token}` : ''
				},
		});
		organisation = await response.json();
	} catch (error) {
		console.log("Error fetching organisation:", error);
		return redirect(RoutesPath.adminOrganisations);
	}

	if (!organisation) {
		throw new Response("Organisation not found", { status: 404 });
	}
	
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/regions/`);
		regions = await response.json();
	} catch (error) {
		console.log(error);
	}
	
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/services/`);
		types = await response.json();
	} catch (error) {
		console.log(error);
	}
	
	return Response.json({ organisation, regions, types });
}

export default function AdminEditOrganisation() {
	const { organisation, regions, types } = useLoaderData();
	return <EditOrganisationPage organisation={organisation} regions={regions} types={types} />
}
