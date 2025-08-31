
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import {
	IconBuilding,
	IconUser,
	IconBriefcase,
	IconChevronRight,
	IconArrowRight,
	IconCheck,
	IconAlertTriangle,
	IconFileText
} from '@tabler/icons-react';

function AdminDataOverview() {
	const [orgStats, setOrgStats] = useState({ total: 0, active: 0, inactive: 0, awaiting: 0, draft: 0 });
	const [volStats, setVolStats] = useState({ total: 0, active: 0, deactivated: 0, review: 0 });
	const [roleStats, setRoleStats] = useState({ total: 0, active: 0, deactivated: 0, onhold: 0 });

	useEffect(() => {
		// Fetch organisations
		fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-organisations/`, { headers: { Authorization: "" } })
			.then(res => res.json())
			.then(data => {
				setOrgStats({
					total: data.length,
					active: data.filter(o => o.status === 1).length,
					inactive: data.filter(o => o.status === 2).length,
					awaiting: data.filter(o => o.status === 3).length,
					draft: data.filter(o => o.status === 4).length,
				});
			});

		// Fetch volunteers
		fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-volunteers/`, { headers: { Authorization: "" } })
			.then(res => res.json())
			.then(data => {
				setVolStats({
					total: data.length,
					active: data.filter(v => v.status === 1).length,
					deactivated: data.filter(v => v.status === 2).length,
					review: data.filter(v => v.status === 3).length,
				});
			});

		// Fetch roles (replace with your actual endpoint)
		fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-roles/`, { headers: { Authorization: "" } })
			.then(res => res.json())
			.then(data => {
				setRoleStats({ total: data.length });
			});
	}, []);

		return (
			<div className="mb-10">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Admin Dashboard Overview</h1>
						<p className="text-gray-600 mt-1">Quick stats and actionable insights for your admin area</p>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{/* Organisations Card */}
					<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow">
						<div className="flex items-center gap-3 mb-2">
							<span className="bg-blue-100 p-2 rounded-lg">
								<IconBuilding size={28} className="text-blue-600" />
							</span>
							<span className="text-lg font-semibold text-gray-800">Organisations</span>
						</div>
						<div className="flex flex-wrap gap-3 text-sm">
							<span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
								Total: {orgStats.total}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded font-medium">
								<IconCheck size={16} className="mr-1" /> Active: {orgStats.active}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 rounded font-medium">
								<IconAlertTriangle size={16} className="mr-1" /> Inactive: {orgStats.inactive}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 rounded font-medium">
								Awaiting Approval: {orgStats.awaiting}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-700 rounded font-medium">
								Draft: {orgStats.draft}
							</span>
						</div>
						<Link to="/admin/organisations" className="mt-3 inline-flex items-center text-blue-600 hover:underline text-sm font-medium group">
							View Organisations <IconArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
					{/* Volunteers Card */}
					<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow">
						<div className="flex items-center gap-3 mb-2">
							<span className="bg-green-100 p-2 rounded-lg">
								<IconUser size={28} className="text-green-600" />
							</span>
							<span className="text-lg font-semibold text-gray-800">Volunteers</span>
						</div>
						<div className="flex flex-wrap gap-3 text-sm">
							<span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded font-medium">
								Total: {volStats.total}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
								<IconCheck size={16} className="mr-1" /> Active: {volStats.active}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 rounded font-medium">
								<IconAlertTriangle size={16} className="mr-1" /> Deactivated: {volStats.deactivated}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 rounded font-medium">
								Review: {volStats.review}
							</span>
						</div>
						<Link to="/admin/volunteers" className="mt-3 inline-flex items-center text-green-700 hover:underline text-sm font-medium group">
							View Volunteers <IconArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
					{/* Roles Card */}
					<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow">
						<div className="flex items-center gap-3 mb-2">
							<span className="bg-gray-100 p-2 rounded-lg">
								<IconBriefcase size={28} className="text-gray-700" />
							</span>
							<span className="text-lg font-semibold text-gray-800">Roles</span>
						</div>
						<div className="flex flex-wrap gap-3 text-sm">
							<span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-700 rounded font-medium">
								Total: {roleStats.total}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
								<IconCheck size={16} className="mr-1" /> Active: {volStats.active}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 rounded font-medium">
								<IconAlertTriangle size={16} className="mr-1" /> Deactivated: {volStats.deactivated}
							</span>
							<span className="inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 rounded font-medium">
								On Hold: {volStats.review}
							</span>
						</div>
						<Link to="/admin/roles" className="mt-3 inline-flex items-center text-gray-700 hover:underline text-sm font-medium group">
							View Roles <IconArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
				</div>
				{/* Insights Section */}
				<div className="bg-white rounded-xl shadow border border-gray-100 p-6">
					<h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
						<IconFileText size={20} className="text-[#C7102F]" /> Insights & Suggestions
					</h3>
					<ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
						<li>Monitor <b>organisations awaiting approval</b> to ensure timely onboarding and engagement.</li>
						<li>Track <b>deactivated volunteers</b> to identify trends or issues in engagement and retention.</li>
						<li>Review the <b>ratio of active to inactive</b> entities for better resource planning and outreach.</li>
						<li>Use the quick links above to manage and analyze your data efficiently.</li>
					</ul>
				</div>
			</div>
		);
}

export default function AdminIndexPage() {
	return (
		<div>
			<AdminDataOverview />
		</div>
	);
}
