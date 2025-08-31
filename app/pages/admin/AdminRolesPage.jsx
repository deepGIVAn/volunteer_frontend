import { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from '@remix-run/react';
import { 
	IconPlus, 
	IconEye, 
	IconEdit, 
	IconSearch,
	IconFilter,
	IconBriefcase,
	IconMail,
	IconPhone,
	IconChevronDown,
	IconCalendar,
	IconDownload,
	IconMapPin,
	IconBuilding,
	IconUsers,
	IconClock,
	IconFileText
} from '@tabler/icons-react';
import Popup from '../../components/base/Popup';
import RoleView from '../../components/base/RoleView';
import { formatDateForFilename } from '../../utiils/dateUtils';
import clsx from 'clsx';

export default function AdminRolesPage({ organisations }) {
	const { user } = useRouteLoaderData("routes/admin");
	const [roles, setRoles] = useState([]);
	const [filteredRoles, setFilteredRoles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [organisationFilter, setOrganisationFilter] = useState('');
	const [selectedRole, setSelectedRole] = useState(null);
	const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
	const [exportLoading, setExportLoading] = useState(false);

	// Mock data - replace with actual API call
	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-roles/`, {
					method: 'GET',
					headers: {
						'Authorization': user?.token ? `Bearer ${user.token}` : ''
					},
				});
				const mockData = await response.json();
				// const mockData = [
				// 	{
				// 		id: '1',
				// 		title: 'Community Support Volunteer',
				// 		organisation: {
				// 			id: '1',
				// 			name: 'Palmerston North Community Centre',
				// 			branch: 'Main Branch'
				// 		},
				// 		contact: 'Sarah Johnson - Volunteer Coordinator',
				// 		branch: 'Main Branch',
				// 		status: 1,
				// 		vols_req: '2-3 volunteers',
				// 		reports: 'Weekly reports to coordinator',
				// 		email: 'volunteers@pncc.org.nz',
				// 		date_added: '2024-01-15T10:30:00Z',
				// 		description: 'Assist with community events and support services for local residents.',
				// 		results: 'Improved community engagement and support service delivery.',
				// 		leagues_hours: '10-15 hours per week',
				// 		skills: 'Communication, Event planning, Basic computer skills',
				// 		personality: 'Friendly, patient, good listener, team player',
				// 		criminal: true,
				// 		transport: true,
				// 		wheelchair: false,
				// 		toilet: true,
				// 		stairs: false,
				// 		home: false,
				// 		oneoff: false,
				// 		leagues_days: 'Monday to Friday, some weekends',
				// 		start_date: '2024-02-01T09:00:00Z',
				// 		end_date: '2024-12-31T17:00:00Z',
				// 		training: 'Initial orientation, ongoing support workshops',
				// 		reimbursement: 'Travel expenses',
				// 		reimbursement_other: 'Parking costs covered',
				// 		supervision: 'Direct supervision by coordinator',
				// 		other: 'Uniform provided, flexible schedule',
				// 		paid_job: false,
				// 		notes: 'Great opportunity for community involvement',
				// 		filter_color: 1,
				// 		youth: false,
				// 		english: true,
				// 		disability: true,
				// 		mental: false,
				// 		region_of_placement_list: [1, 2],
				// 		days_list: [1, 2, 3, 4, 5],
				// 		time_list: [1, 2],
				// 		activities_driving_list: [],
				// 		activities_administration_list: [1, 2],
				// 		activities_mantinance_list: [],
				// 		activities_home_cares_list: [],
				// 		activities_technology_list: [1],
				// 		activities_event_list: [1, 2],
				// 		activities_hospitality_list: [1],
				// 		activities_support_list: [1, 2, 3],
				// 		activities_financial_list: [],
				// 		activities_other_list: [],
				// 		activities_sport_list: [],
				// 		activities_group_list: [1],
				// 		attachments: null,
				// 		created_at: '2024-01-15T10:30:00Z',
				// 		updated_at: '2024-01-20T14:45:00Z',
				// 		isdeleted: false
				// 	},
				// 	{
				// 		id: '2',
				// 		title: 'Youth Mentor',
				// 		organisation: {
				// 			id: '2',
				// 			name: 'Youth Development Trust',
				// 			branch: 'Manawatū Branch'
				// 		},
				// 		contact: 'Michael Brown - Program Manager',
				// 		branch: 'Manawatū Branch',
				// 		status: 1,
				// 		vols_req: '1 volunteer',
				// 		reports: 'Monthly progress reports',
				// 		email: 'mentoring@ydt.org.nz',
				// 		date_added: '2024-02-01T09:15:00Z',
				// 		description: 'Provide mentoring and guidance to young people aged 16-25.',
				// 		results: 'Improved youth outcomes and life skills development.',
				// 		leagues_hours: '6-8 hours per week',
				// 		skills: 'Mentoring experience, Youth development, Communication',
				// 		personality: 'Supportive, encouraging, reliable, empathetic',
				// 		criminal: true,
				// 		transport: true,
				// 		wheelchair: true,
				// 		toilet: true,
				// 		stairs: true,
				// 		home: false,
				// 		oneoff: false,
				// 		leagues_days: 'Flexible, including evenings',
				// 		start_date: '2024-03-01T10:00:00Z',
				// 		end_date: '2024-11-30T16:00:00Z',
				// 		training: 'Youth mentoring certification required',
				// 		reimbursement: 'Travel and training costs',
				// 		reimbursement_other: 'Professional development opportunities',
				// 		supervision: 'Weekly check-ins with program manager',
				// 		other: 'Background check required, ongoing support provided',
				// 		paid_job: false,
				// 		notes: 'Looking for experienced mentor with youth background',
				// 		filter_color: 2,
				// 		youth: true,
				// 		english: true,
				// 		disability: false,
				// 		mental: true,
				// 		region_of_placement_list: [2, 3],
				// 		days_list: [1, 2, 3, 4, 5, 6],
				// 		time_list: [2, 3],
				// 		activities_driving_list: [],
				// 		activities_administration_list: [],
				// 		activities_mantinance_list: [],
				// 		activities_home_cares_list: [],
				// 		activities_technology_list: [],
				// 		activities_event_list: [],
				// 		activities_hospitality_list: [],
				// 		activities_support_list: [1, 2, 3, 4],
				// 		activities_financial_list: [],
				// 		activities_other_list: [1],
				// 		activities_sport_list: [1],
				// 		activities_group_list: [1, 2],
				// 		attachments: null,
				// 		created_at: '2024-02-01T09:15:00Z',
				// 		updated_at: '2024-02-10T11:20:00Z',
				// 		isdeleted: false
				// 	},
				// 	{
				// 		id: '3',
				// 		title: 'Administrative Assistant',
				// 		organisation: {
				// 			id: '3',
				// 			name: 'Horowhenua Health Services',
				// 			branch: 'Levin Office'
				// 		},
				// 		contact: 'Emma Wilson - Office Manager',
				// 		branch: 'Levin Office',
				// 		status: 2,
				// 		vols_req: '2 volunteers',
				// 		reports: 'Bi-weekly activity reports',
				// 		email: 'admin@hhs.org.nz',
				// 		date_added: '2024-01-05T16:00:00Z',
				// 		description: 'Support office operations with filing, data entry, and reception duties.',
				// 		results: 'Improved office efficiency and patient service quality.',
				// 		leagues_hours: '20+ hours per week',
				// 		skills: 'Computer skills, Filing, Customer service, Phone etiquette',
				// 		personality: 'Organized, detail-oriented, professional, discrete',
				// 		criminal: true,
				// 		transport: false,
				// 		wheelchair: true,
				// 		toilet: true,
				// 		stairs: false,
				// 		home: false,
				// 		oneoff: false,
				// 		leagues_days: 'Monday to Friday, office hours',
				// 		start_date: '2024-02-15T08:30:00Z',
				// 		end_date: '2024-12-15T17:00:00Z',
				// 		training: 'Office procedures training, confidentiality briefing',
				// 		reimbursement: 'None',
				// 		reimbursement_other: 'Lunch vouchers provided',
				// 		supervision: 'Direct supervision by office manager',
				// 		other: 'Must maintain confidentiality, professional appearance required',
				// 		paid_job: false,
				// 		notes: 'Perfect for someone looking to gain office experience',
				// 		filter_color: 3,
				// 		youth: false,
				// 		english: true,
				// 		disability: true,
				// 		mental: false,
				// 		region_of_placement_list: [3],
				// 		days_list: [1, 2, 3, 4, 5],
				// 		time_list: [1, 2],
				// 		activities_driving_list: [],
				// 		activities_administration_list: [1, 2, 3, 4],
				// 		activities_mantinance_list: [],
				// 		activities_home_cares_list: [],
				// 		activities_technology_list: [1, 2],
				// 		activities_event_list: [],
				// 		activities_hospitality_list: [1],
				// 		activities_support_list: [1],
				// 		activities_financial_list: [],
				// 		activities_other_list: [],
				// 		activities_sport_list: [],
				// 		activities_group_list: [],
				// 		attachments: 'role_description.pdf',
				// 		created_at: '2024-01-05T16:00:00Z',
				// 		updated_at: '2024-01-05T16:00:00Z',
				// 		isdeleted: false
				// 	}
				// ];
				
				setRoles(mockData);
				setFilteredRoles(mockData);
			} catch (error) {
				console.error('Error fetching roles:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRoles();
	}, []);

	// Filter roles based on search term, status, and organisation
	useEffect(() => {
		let filtered = roles;

		if (searchTerm) {
			filtered = filtered.filter(role =>
				role.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				role.organisation?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				role.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				role.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				role.email?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (statusFilter) {
			filtered = filtered.filter(role => role.status === parseInt(statusFilter));
		}

		if (organisationFilter) {
			filtered = filtered.filter(role => role.organisation?.id === organisationFilter);
		}

		setFilteredRoles(filtered);
	}, [searchTerm, statusFilter, organisationFilter, roles]);

	const getStatusColor = (status) => {
		switch (status) {
			case 1: return 'bg-green-100 text-green-800';
			case 2: return 'bg-red-100 text-red-800';
			case 3: return 'bg-yellow-100 text-yellow-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case 1: return 'Active';
			case 2: return 'DeActivated';
			case 3: return 'On-Hold';
			default: return 'Unknown';
		}
	};

	const getFilterColorBadge = (color) => {
		const colors = {
			0: 'bg-gray-100 text-gray-800',
			1: 'bg-green-100 text-green-800',
			2: 'bg-orange-100 text-orange-800',
			3: 'bg-red-100 text-red-800'
		};
		return colors[color] || colors[0];
	};

	const handleViewRole = (role) => {
		setSelectedRole(role);
		setIsViewPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsViewPopupOpen(false);
		setSelectedRole(null);
	};

	const handleExportToExcel = async () => {
		setExportLoading(true);
		try {
			const csvContent = [
				// CSV Header
				[
					'Title', 'Organisation', 'Branch', 'Contact', 'Email', 'Status', 'Volunteers Required',
					'Hours', 'Skills', 'Description', 'Start Date', 'End Date', 'Training',
					'Criminal Check', 'Transport Required', 'Wheelchair Access', 'Youth Role',
					'English Required', 'Disability Support', 'Mental Health Support', 'Filter Color'
				].join(','),
				// CSV Data
				...filteredRoles.map(role => [
					`"${role.title || ''}"`,
					`"${role.organisation?.title || ''}"`,
					`"${role.branch || ''}"`,
					`"${role.contact || ''}"`,
					`"${role.email || ''}"`,
					`"${getStatusText(role.status)}"`,
					`"${role.vols_req || ''}"`,
					`"${role.leagues_hours || ''}"`,
					`"${role.skills || ''}"`,
					`"${role.description || ''}"`,
					role.start_date ? new Date(role.start_date).toLocaleDateString() : '',
					role.end_date ? new Date(role.end_date).toLocaleDateString() : '',
					`"${role.training || ''}"`,
					role.criminal ? 'Required' : 'Not Required',
					role.transport ? 'Required' : 'Not Required',
					role.wheelchair ? 'Required' : 'Not Required',
					role.youth ? 'Yes' : 'No',
					role.english ? 'Required' : 'Not Required',
					role.disability ? 'Supported' : 'Not Supported',
					role.mental ? 'Supported' : 'Not Supported',
					role.filter_color
				].join(','))
			].join('\n');

			// Create and download file
			const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute('download', `roles_export_${formatDateForFilename()}.csv`);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Error exporting data:', error);
			alert('Error exporting data. Please try again.');
		} finally {
			setExportLoading(false);
		}
	};

	// Get unique organisations for filter
	// const organisations = [...new Map(roles.map(role => [role.organisation?.id, role.organisation])).values()];

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
					<p className="text-gray-600 mt-1">Manage volunteer roles and opportunities</p>
				</div>
				<Link
					to="/admin/add-role"
					className="inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
				>
					<IconPlus size={20} className="mr-2" />
					Add Role
				</Link>
			</div>

			{/* Loading State */}
			{isLoading ? (
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<div className="relative w-16 h-16 mx-auto mb-4">
							<div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
							<div className="absolute inset-0 border-4 border-[#C7102F] rounded-full animate-spin border-t-transparent"></div>
						</div>
						<p className="text-gray-600 font-medium">Loading roles...</p>
						<p className="text-sm text-gray-500 mt-1">Please wait while we fetch your data</p>
					</div>
				</div>
			) : (
				<>
					{/* Statistics */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
						<div className="bg-white p-4 rounded-lg border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600">Total Roles</p>
									<p className="text-2xl font-bold text-gray-900">{roles.length}</p>
								</div>
								<IconBriefcase className="text-blue-500" size={24} />
							</div>
						</div>
						<div className="bg-white p-4 rounded-lg border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600">Active</p>
									<p className="text-2xl font-bold text-green-600">
										{roles.filter(role => role.status === 1).length}
									</p>
								</div>
								<IconFilter className="text-green-500" size={24} />
							</div>
						</div>
						<div className="bg-white p-4 rounded-lg border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600">DeActivated</p>
									<p className="text-2xl font-bold text-red-600">
										{roles.filter(role => role.status === 2).length}
									</p>
								</div>
								<IconCalendar className="text-red-500" size={24} />
							</div>
						</div>
						<div className="bg-white p-4 rounded-lg border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600">On-Hold</p>
									<p className="text-2xl font-bold text-yellow-600">
										{roles.filter(role => role.status === 3).length}
									</p>
								</div>
								<IconMapPin className="text-yellow-500" size={24} />
							</div>
						</div>
					</div>

					{/* Filters */}
					<div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
						<div className="flex flex-col lg:flex-row gap-4">
							{/* Search */}
							<div className="flex-1">
								<div className="relative">
									<IconSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										placeholder="Search roles, organisations, or descriptions..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent"
									/>
								</div>
							</div>

							{/* Status Filter */}
							<div className="lg:w-48">
								<div className="relative">
									<IconFilter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<select
										value={statusFilter}
										onChange={(e) => setStatusFilter(e.target.value)}
										className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none"
									>
										<option value="">All Status</option>
										<option value="1">Active</option>
										<option value="2">DeActivated</option>
										<option value="3">On-Hold</option>
									</select>
									<IconChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
								</div>
							</div>

							{/* Organisation Filter */}
							<div className="lg:w-64">
								<div className="relative">
									<IconBuilding size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<select
										value={organisationFilter}
										onChange={(e) => setOrganisationFilter(e.target.value)}
										className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none"
									>
										<option value="">All Organisations</option>
										{organisations.map((org) => (
											<option key={org.id} value={org.id}>
												{org?.title}
											</option>
										))}
									</select>
									<IconChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
								</div>
							</div>

							{/* Export Button */}
							<div className="lg:w-auto">
								<button
									onClick={handleExportToExcel}
									disabled={exportLoading || filteredRoles.length === 0}
									className="w-full lg:w-auto inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
								>
									{exportLoading ? (
										<>
											<svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
											</svg>
											Exporting...
										</>
									) : (
										<>
											<IconDownload size={18} className="mr-2" />
											Export Excel
										</>
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Roles Table */}
					<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b border-gray-200">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{filteredRoles.length > 0 ? (
										filteredRoles.map((role) => (
											<tr key={role.id} className="hover:bg-gray-50 transition-colors">
												<td className="px-6 py-4">
													<div className="flex items-start space-x-3">
														<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
															<IconBriefcase size={18} className="text-blue-600" />
														</div>
														<div className="flex-1 min-w-0">
															<div className="text-sm font-medium text-gray-900 truncate">
																{role.title}
															</div>
															<div className="text-sm text-gray-500 truncate">
																Volunteer Req: {role.vols_req}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-start space-x-2">
														<IconBuilding size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
														<div>
															<div className="text-sm text-gray-900">{role.organisation?.title || 'N/A'}</div>
															{role.branch && (
																<div className="text-sm text-gray-500">{role.branch}</div>
															)}
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-start space-x-2">
														<IconMail size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
														<div>
															<div className="text-sm text-gray-900">{role.email || 'N/A'}</div>
															{role.contact && (
																<div className="text-sm text-gray-500 truncate max-w-xs">{role.contact}</div>
															)}
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="space-y-1">
														<div className="text-sm text-gray-900">{role.leagues_hours || 'N/A'}</div>
														<div className="flex flex-wrap gap-1">
															{role.criminal && (
																<span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">
																	Criminal Check
																</span>
															)}
															{role.transport && (
																<span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
																	Transport
																</span>
															)}
															{role.english && (
																<span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
																	English
																</span>
															)}
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div>
														{role.start_date && (
															<div className="text-sm text-gray-900">
																Start: {new Date(role.start_date).toLocaleDateString()}
															</div>
														)}
														{role.end_date && (
															<div className="text-sm text-gray-500">
																End: {new Date(role.end_date).toLocaleDateString()}
															</div>
														)}
														{role.oneoff && (
															<span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">
																One-off
															</span>
														)}
													</div>
												</td>
												<td className="px-6 py-4">
													<span className={clsx(
														"inline-flex px-2 py-1 text-xs font-semibold rounded-full",
														getStatusColor(role.status)
													)}>
														{getStatusText(role.status)}
													</span>
												</td>
												<td className="px-6 py-4 text-sm text-gray-500">
													<div className="flex items-center space-x-2">
														<button
															onClick={() => handleViewRole(role)}
															className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
															title="View role details"
														>
															<IconEye size={16} />
															View
														</button>
														<Link
															to={`/admin/edit-role/${role.id}`}
															className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
															title="Edit role"
														>
															<IconEdit size={16} />
															Edit
														</Link>
													</div>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="7" className="px-6 py-12 text-center text-gray-500">
												<div className="flex flex-col items-center">
													<IconBriefcase size={48} className="text-gray-300 mb-4" />
													<p className="text-lg font-medium">No roles found</p>
													<p className="text-sm">
														{searchTerm || statusFilter || organisationFilter
															? "Try adjusting your filters to see more results."
															: "Get started by adding your first role."
														}
													</p>
													{!searchTerm && !statusFilter && !organisationFilter && (
														<Link
															to="/admin/add-role"
															className="mt-4 inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors"
														>
															<IconPlus size={20} className="mr-2" />
															Add Role
														</Link>
													)}
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>

					{/* View Role Popup */}
					<Popup
						isOpen={isViewPopupOpen}
						onClose={handleClosePopup}
						title="Role Details"
						maxWidth="max-w-7xl"
					>
						<RoleView role={selectedRole} />
					</Popup>
				</>
			)}
		</div>
	);
}
