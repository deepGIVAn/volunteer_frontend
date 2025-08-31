import { useLoaderData } from "@remix-run/react";
import AddRolePage from "../pages/admin/AddRolePage";
import { getSession } from "../utiils/sessions.server";

export async function loader({request}) {
	let organisations = [];
	let regions = [];
	let days = [];
	let time = [];
	let activities_driving_list = [];
	let activities_administration_list = [];
	let activities_mantinance_list = [];
	let activities_home_cares_list = [];
	let activities_technology_list = [];
	let activities_event_list = [];
	let activities_hospitality_list = [];
	let activities_support_list = [];
	let activities_financial_list = [];
	let activities_other_list = [];
	let activities_sport_list = [];
	let activities_group_list = [];

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
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/regions/`);
		regions = await response.json();
	} catch (error) {
		console.log(error);
	}

	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/days/`);
		days = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/time/`);
		time = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_driving_list/`);
		activities_driving_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_administration_list/`);
		activities_administration_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_mantinance_list/`);
		activities_mantinance_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_home_cares_list/`);
		activities_home_cares_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_technology_list/`);
		activities_technology_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_event_list/`);
		activities_event_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_hospitality_list/`);
		activities_hospitality_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_support_list/`);
		activities_support_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_financial_list/`);
		activities_financial_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_other_list/`);
		activities_other_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_sport_list/`);
		activities_sport_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_group_list/`);
		activities_group_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_driving_list/`);
		activities_driving_list = await response.json();
	} catch (error) {
		console.log(error);
	}

	return Response.json({ organisations, regions, days, time, activities_driving_list, activities_administration_list, activities_mantinance_list, activities_home_cares_list, activities_technology_list, activities_event_list, activities_hospitality_list, activities_support_list, activities_financial_list, activities_other_list, activities_sport_list, activities_group_list });
}

export default function AdminAddRole() {
	const data = useLoaderData();

	return <AddRolePage {...data} />
}
