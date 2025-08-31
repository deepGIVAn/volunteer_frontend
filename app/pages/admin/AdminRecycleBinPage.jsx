
import { useState } from "react";
import { IconUser, IconBuilding, IconBriefcase, IconRestore, IconAlertTriangle } from '@tabler/icons-react';

export default function AdminRecycleBinPage() {
	// Sample data for demonstration (replace with API data later)
	const [deletedVolunteers, setDeletedVolunteers] = useState([
		{ id: 1, first_name: 'Sarah', last_name: 'Johnson', email: 'sarah.j@email.com', isdeleted: true },
		{ id: 2, first_name: 'John', last_name: 'Smith', email: 'john.s@email.com', isdeleted: true }
	]);
	const [deletedOrganisations, setDeletedOrganisations] = useState([
		{ id: 1, organisation_name: 'Helping Hands', contact_email: 'contact@helpinghands.org', isdeleted: true },
		{ id: 2, organisation_name: 'Care NZ', contact_email: 'info@care-nz.org', isdeleted: true }
	]);
	const [deletedRoles, setDeletedRoles] = useState([
		{ id: 1, title: 'Event Coordinator', description: 'Coordinates events', isdeleted: true },
		{ id: 2, title: 'Fundraiser', description: 'Manages fundraising', isdeleted: true }
	]);
	const [loading] = useState(false); // No loading for static data
	const [restoring, setRestoring] = useState({});

	// useEffect(() => {
	//   setLoading(true);
	//   Promise.all([
	//     fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-volunteers/`, { headers: { Authorization: "" } })
	//       .then(res => res.json())
	//       .then(data => data.filter(v => v.isdeleted)),
	//     fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-organisations/`, { headers: { Authorization: "" } })
	//       .then(res => res.json())
	//       .then(data => data.filter(o => o.isdeleted)),
	//     fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-roles/`, { headers: { Authorization: "" } })
	//       .then(res => res.json())
	//       .then(data => data.filter(r => r.isdeleted)),
	//   ]).then(([vols, orgs, roles]) => {
	//     setDeletedVolunteers(vols);
	//     setDeletedOrganisations(orgs);
	//     setDeletedRoles(roles);
	//   }).finally(() => setLoading(false));
	// }, []);

	const handleRestore = async (type, id) => {
		setRestoring(r => ({ ...r, [`${type}-${id}`]: true }));
		let url = '';
		if (type === 'volunteer') url = `${import.meta.env.VITE_API_URL}/admin/restore-volunteer/${id}/`;
		if (type === 'organisation') url = `${import.meta.env.VITE_API_URL}/admin/restore-organisation/${id}/`;
		if (type === 'role') url = `${import.meta.env.VITE_API_URL}/admin/restore-role/${id}/`;
		try {
			await fetch(url, { method: 'POST', headers: { Authorization: "" } });
			// Remove from UI
			if (type === 'volunteer') setDeletedVolunteers(vs => vs.filter(v => v.id !== id));
			if (type === 'organisation') setDeletedOrganisations(os => os.filter(o => o.id !== id));
			if (type === 'role') setDeletedRoles(rs => rs.filter(r => r.id !== id));
		} catch (e) {
			alert('Failed to restore.');
		} finally {
			setRestoring(r => ({ ...r, [`${type}-${id}`]: false }));
		}
	};

		return (
			<div className="mb-10 text-sm md:text-base">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Recycle Bin</h1>
					<p className="text-gray-600 mt-1 text-base">Restore deleted Volunteers, Organisations, and Roles</p>
				</div>
			</div>
			{loading ? (
				<div className="flex items-center justify-center py-16">
					<div className="text-center">
						<div className="relative w-16 h-16 mx-auto mb-4">
							<div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
							<div className="absolute inset-0 border-4 border-[#C7102F] rounded-full animate-spin border-t-transparent"></div>
						</div>
						<p className="text-gray-600 font-medium">Loading deleted items...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Volunteers */}
					<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-3">
						<div className="flex items-center gap-2 mb-2">
							<span className="bg-green-100 p-2 rounded-lg"><IconUser size={24} className="text-green-600" /></span>
							<span className="text-lg font-semibold text-gray-800">Volunteers</span>
						</div>
						{deletedVolunteers.length === 0 ? (
													<div className="text-gray-400 text-lg flex flex-col items-center py-8">
														<IconAlertTriangle size={32} className="mb-2" />
														No deleted volunteers
													</div>
						) : (
							<ul className="divide-y divide-gray-100">
								{deletedVolunteers.map(v => (
									<li key={v.id} className="flex items-center justify-between py-2 group">
										<div>
											<span className="font-medium text-sm text-gray-800 group-hover:text-green-700 transition-colors">{v.first_name} {v.last_name}</span>
											<span className="ml-2 text-xs text-gray-400">{v.email}</span>
										</div>
										<button
											className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium shadow-sm disabled:opacity-50"
											onClick={() => handleRestore('volunteer', v.id)}
											disabled={!!restoring[`volunteer-${v.id}`]}
										>
											<IconRestore size={14} className="mr-1" />
											{restoring[`volunteer-${v.id}`] ? 'Restoring...' : 'Restore'}
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
					{/* Organisations */}
					<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-3">
						<div className="flex items-center gap-2 mb-2">
							<span className="bg-blue-100 p-2 rounded-lg"><IconBuilding size={24} className="text-blue-600" /></span>
							<span className="text-lg font-semibold text-gray-800">Organisations</span>
						</div>
						{deletedOrganisations.length === 0 ? (
													<div className="text-gray-400 text-lg flex flex-col items-center py-8">
														<IconAlertTriangle size={32} className="mb-2" />
														No deleted organisations
													</div>
						) : (
							<ul className="divide-y divide-gray-100">
								{deletedOrganisations.map(o => (
									<li key={o.id} className="flex items-center justify-between py-2 group">
										<div>
											<span className="font-medium text-sm text-gray-800 group-hover:text-blue-700 transition-colors">{o.organisation_name}</span>
											<span className="ml-2 text-xs text-gray-400">{o.contact_email}</span>
										</div>
										<button
											className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm disabled:opacity-50"
											onClick={() => handleRestore('organisation', o.id)}
											disabled={!!restoring[`organisation-${o.id}`]}
										>
											<IconRestore size={14} className="mr-1" />
											{restoring[`organisation-${o.id}`] ? 'Restoring...' : 'Restore'}
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
					{/* Roles */}
					<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-3">
						<div className="flex items-center gap-2 mb-2">
							<span className="bg-gray-100 p-2 rounded-lg"><IconBriefcase size={24} className="text-gray-700" /></span>
							<span className="text-lg font-semibold text-gray-800">Roles</span>
						</div>
						{deletedRoles.length === 0 ? (
													<div className="text-gray-400 text-lg flex flex-col items-center py-8">
														<IconAlertTriangle size={32} className="mb-2" />
														No deleted roles
													</div>
						) : (
							<ul className="divide-y divide-gray-100">
								{deletedRoles.map(r => (
									<li key={r.id} className="flex items-center justify-between py-2 group">
										<div>
											<span className="font-medium text-sm text-gray-800 group-hover:text-gray-700 transition-colors">{r.title}</span>
											<span className="ml-2 text-xs text-gray-400">{r.description || ''}</span>
										</div>
										<button
											className="inline-flex items-center px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium shadow-sm disabled:opacity-50"
											onClick={() => handleRestore('role', r.id)}
											disabled={!!restoring[`role-${r.id}`]}
										>
											<IconRestore size={16} className="mr-1" />
											{restoring[`role-${r.id}`] ? 'Restoring...' : 'Restore'}
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
