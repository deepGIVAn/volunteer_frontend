import { useLoaderData } from "@remix-run/react";
import AddVolunteerPage from "../pages/admin/AddVolunteerPage";

export async function loader() {
	let type_of_work_list = [];
	let regions = [];
	let refer_from_list = [];
	let days_list = [];
	let time_list = [];
	let labour_list = [];
	let transport_list = [];
	let ethnic_origin_list = [];
	let activities_list = [];
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

	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/type_of_work_list/`);
		type_of_work_list = await response.json();
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
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/refer_from_list/`);
		refer_from_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/days/`);
		days_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/time/`);
		time_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/labour_list/`);
		labour_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/transport_list/`);
		transport_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/ethnic_origin_list/`);
		ethnic_origin_list = await response.json();
	} catch (error) {
		console.log(error);
	}
	try {
		let response = await fetch(`${import.meta.env.VITE_API_URL}/get-preset/activities_list/`);
		activities_list = await response.json();
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

	return Response.json({
		type_of_work_list, 
		regions, 
		refer_from_list, 
		days_list, 
		time_list, 
		labour_list, 
		transport_list, 
		ethnic_origin_list, 
		activities_list, 
		activities_driving_list, 
		activities_administration_list, 
		activities_mantinance_list, 
		activities_home_cares_list, 
		activities_technology_list, 
		activities_event_list, 
		activities_hospitality_list, 
		activities_support_list, 
		activities_financial_list, 
		activities_other_list, 
		activities_sport_list, 
		activities_group_list
	});
}

export default function AdminAddVolunteer() {
	const data = useLoaderData();
	console.log(data);
	return <AddVolunteerPage {...data} />;
}
