import { useLoaderData } from "@remix-run/react";
import AddOrganisationPage from "../pages/admin/AddOrganisationPage";

export async function loader() {
	let regions = [];
	let types = [];
	
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
	
	return Response.json({ regions, types });
}

export default function AdminOrganisations() {
	const data = useLoaderData();

	return <AddOrganisationPage regions={data.regions} types={data.types} />
}