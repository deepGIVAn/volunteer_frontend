import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useRouteLoaderData } from '@remix-run/react';
import {
	IconArrowLeft,
	IconBriefcase,
	IconBuilding,
	IconMapPin,
	IconMail,
	IconClock,
	IconFileText,
	IconDeviceFloppy,
	IconUser,
	IconShield,
	IconCar,
	IconAccessible,
	IconStairs,
	IconHome,
	IconUsers,
	IconMedicalCross,
	IconHeart,
	IconStar,
	IconSchool,
	IconCalendar,
	IconTrash,
	IconMessage
} from '@tabler/icons-react';
import {
	FormField,
	CheckboxField,
	FileField,
	DateField,
	MultiSelectField,
	SelectField
} from '../../components/base/FormComponents';
import { formatDateTime } from '../../utiils/dateUtils';

export default function EditRolePage({
	organisations,
	regions,
	days,
	time,
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
	activities_group_list,
	role
}) {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useRouteLoaderData("routes/admin");

	// Helper: format date for input fields
	const formatDateForInput = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toISOString().split('T')[0];
	};

	// Helper: convert string arrays to number arrays
	const convertToNumbers = (arr) => {
		if (!arr || !Array.isArray(arr)) return [];
		return arr.map(item => typeof item === 'string' ? parseInt(item, 10) : item);
	};

	// Helper: ensure status is a number
	const convertStatusToNumber = (status) => {
		if (status === null || status === undefined) return 2; // Default: DeActivated
		return typeof status === 'string' ? parseInt(status, 10) : status;
	};

	const [formData, setFormData] = useState({
		title: role?.title || '',
		organisation: role?.organisation?.id || '',
		contact: role?.contact || '',
		branch: role?.branch || '',
		status: convertStatusToNumber(role?.status),
		vols_req: role?.vols_req || '',
		reports: role?.reports || '',
		email: role?.email || '',
		date_added: formatDateForInput(role?.date_added),
		description: role?.description || '',
		results: role?.results || '',
		leagues_hours: role?.leagues_hours || '',
		skills: role?.skills || '',
		personality: role?.personality || '',
		criminal: role?.criminal || false,
		transport: role?.transport || false,
		wheelchair: role?.wheelchair || false,
		toilet: role?.toilet || false,
		stairs: role?.stairs || false,
		home: role?.home || false,
		oneoff: role?.oneoff || false,
		leagues_days: role?.leagues_days || '',
		start_date: formatDateForInput(role?.start_date),
		end_date: formatDateForInput(role?.end_date),
		training: role?.training || '',
		reimbursement: role?.reimbursement || '',
		reimbursement_other: role?.reimbursement_other || '',
		supervision: role?.supervision || '',
		other: role?.other || '',
		paid_job: role?.paid_job || false,
		notes: role?.notes || '',
		filter_color: role?.filter_color !== undefined ? role.filter_color : 0,
		youth: role?.youth || false,
		english: role?.english || false,
		disability: role?.disability || false,
		mental: role?.mental || false,
		region_of_placement_list: convertToNumbers(role?.region_of_placement_list || []),
		days_list: convertToNumbers(role?.days_list || []),
		time_list: convertToNumbers(role?.time_list || []),
		activities_driving_list: convertToNumbers(role?.activities_driving_list || []),
		activities_administration_list: convertToNumbers(role?.activities_administration_list || []),
		activities_mantinance_list: convertToNumbers(role?.activities_mantinance_list || []),
		activities_home_cares_list: convertToNumbers(role?.activities_home_cares_list || []),
		activities_technology_list: convertToNumbers(role?.activities_technology_list || []),
		activities_event_list: convertToNumbers(role?.activities_event_list || []),
		activities_hospitality_list: convertToNumbers(role?.activities_hospitality_list || []),
		activities_support_list: convertToNumbers(role?.activities_support_list || []),
		activities_financial_list: convertToNumbers(role?.activities_financial_list || []),
		activities_other_list: convertToNumbers(role?.activities_other_list || []),
		activities_sport_list: convertToNumbers(role?.activities_sport_list || []),
		activities_group_list: convertToNumbers(role?.activities_group_list || []),
		attachments: null,
		comments: role?.comments || [],
		comment: ''
	});

	// Update form data when role prop changes
	useEffect(() => {
		if (role) {
			setFormData({
				title: role?.title || '',
				organisation: role?.organisation?.id || '',
				contact: role?.contact || '',
				branch: role?.branch || '',
				status: convertStatusToNumber(role?.status),
				vols_req: role?.vols_req || '',
				reports: role?.reports || '',
				email: role?.email || '',
				date_added: formatDateForInput(role?.date_added),
				description: role?.description || '',
				results: role?.results || '',
				leagues_hours: role?.leagues_hours || '',
				skills: role?.skills || '',
				personality: role?.personality || '',
				criminal: role?.criminal || false,
				transport: role?.transport || false,
				wheelchair: role?.wheelchair || false,
				toilet: role?.toilet || false,
				stairs: role?.stairs || false,
				home: role?.home || false,
				oneoff: role?.oneoff || false,
				leagues_days: role?.leagues_days || '',
				start_date: formatDateForInput(role?.start_date),
				end_date: formatDateForInput(role?.end_date),
				training: role?.training || '',
				reimbursement: role?.reimbursement || '',
				reimbursement_other: role?.reimbursement_other || '',
				supervision: role?.supervision || '',
				other: role?.other || '',
				paid_job: role?.paid_job || false,
				notes: role?.notes || '',
				filter_color: role?.filter_color !== undefined ? role.filter_color : 0,
				youth: role?.youth || false,
				english: role?.english || false,
				disability: role?.disability || false,
				mental: role?.mental || false,
				region_of_placement_list: convertToNumbers(role?.region_of_placement_list || []),
				days_list: convertToNumbers(role?.days_list || []),
				time_list: convertToNumbers(role?.time_list || []),
				activities_driving_list: convertToNumbers(role?.activities_driving_list || []),
				activities_administration_list: convertToNumbers(role?.activities_administration_list || []),
				activities_mantinance_list: convertToNumbers(role?.activities_mantinance_list || []),
				activities_home_cares_list: convertToNumbers(role?.activities_home_cares_list || []),
				activities_technology_list: convertToNumbers(role?.activities_technology_list || []),
				activities_event_list: convertToNumbers(role?.activities_event_list || []),
				activities_hospitality_list: convertToNumbers(role?.activities_hospitality_list || []),
				activities_support_list: convertToNumbers(role?.activities_support_list || []),
				activities_financial_list: convertToNumbers(role?.activities_financial_list || []),
				activities_other_list: convertToNumbers(role?.activities_other_list || []),
				activities_sport_list: convertToNumbers(role?.activities_sport_list || []),
				activities_group_list: convertToNumbers(role?.activities_group_list || []),
				attachments: null,
				comments: role?.comments || [],
				comment: ''
			});
			setCurrentAttachmentUrl(role?.attachments || null);
		}
	}, [role]);

	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentAttachmentUrl, setCurrentAttachmentUrl] = useState(role?.attachments || null);

	// Use options from props
	const organisationOptions = (organisations || []).map(org => {
		if (org.value && org.label) return org;
		if (org.id && org.title) return { value: org.id, label: org.title };
		if (org.id && org.name) return { value: org.id, label: org.name };
		return { value: org.id || org.value, label: org.title || org.name || org.label || String(org) };
	});

	const regionOptions = regions || [];
	const daysOptions = days || [];
	const timeOptions = time || [];

	const statusOptions = [
		{ value: 1, label: 'Active' },
		{ value: 2, label: 'DeActivated' },
		{ value: 3, label: 'On-Hold' }
	];

	const filterColorOptions = [
		{ value: 0, label: 'NiL' },
		{ value: 1, label: 'Green' },
		{ value: 2, label: 'Orange' },
		{ value: 3, label: 'Red' }
	];

	useEffect(() => {
		// Set loading to false since role data comes from props
		setIsLoading(false);
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData(prev => ({
			...prev,
			attachments: file
		}));
	};

	const handleMultiSelectChange = (name, selectedIds) => {
		setFormData(prev => ({
			...prev,
			[name]: selectedIds
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const form = new FormData();
		
		// List of all array fields in the form
		const arrayFields = [
			'region_of_placement_list',
			'days_list',
			'time_list',
			'activities_driving_list',
			'activities_administration_list',
			'activities_mantinance_list',
			'activities_home_cares_list',
			'activities_technology_list',
			'activities_event_list',
			'activities_hospitality_list',
			'activities_support_list',
			'activities_financial_list',
			'activities_other_list',
			'activities_sport_list',
			'activities_group_list'
		];

		for (const key in formData) {
			if (formData[key] instanceof File && formData[key]) {
				form.append(key, formData[key]);
			} else if (Array.isArray(formData[key])) {
				// Handle arrays with proper backend format
				if (arrayFields.includes(key)) {
					formData[key].forEach(val => form.append(`${key}[]`, val));
				} else {
					formData[key].forEach(val => form.append(key, val));
				}
			} else if (formData[key] !== null && formData[key] !== undefined) {
				form.append(key, formData[key]);
			}
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/update-role/${id}/`, {
				method: 'POST',
				headers: {
					'Authorization': user?.token ? `Bearer ${user.token}` : ''
				},
				body: form
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			console.log('Role updated:', data);
			
			alert('Role updated successfully!');
			navigate('/admin/roles');
		} catch (error) {
			console.error('Error updating role:', error);
			alert('Error updating role. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/delete-role/${id}/`, {
				method: 'DELETE',
				headers: {
					'Authorization': user?.token ? `Bearer ${user.token}` : ''
				},
			});

			const data = await response.json();
			console.log(data);
			alert('Role deleted successfully!');
			navigate('/admin/roles');
		} catch (error) {
			console.error('Error deleting role:', error);
			alert('Error deleting role. Please try again.');
		} finally {
			setIsDeleting(false);
			setShowDeleteModal(false);
		}
	};

	if (isLoading) {
		return (
			<div className="mx-auto p-6">
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C7102F]"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-4">
						<Link
							to="/admin/roles"
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<IconArrowLeft size={20} className="text-gray-600" />
						</Link>
						<h1 className="text-2xl font-bold text-gray-900">
							Edit Role
						</h1>
					</div>
					<button
						onClick={() => setShowDeleteModal(true)}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
					>
						<IconTrash size={18} />
						<span>Delete</span>
					</button>
				</div>
				<p className="text-gray-600">Update role information and requirements.</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Basic Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconBriefcase size={20} className="mr-2 text-[#C7102F]" />
						Basic Information
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							label="Role Title"
							name="title"
							icon={IconBriefcase}
							required
							placeholder="e.g., Community Support Volunteer"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<SelectField
							label="Organisation"
							name="organisation"
							options={organisationOptions}
							required
							formData={formData}
							handleInputChange={handleInputChange}
							icon={IconBuilding}
						/>
						
						<FormField
							label="Branch"
							name="branch"
							icon={IconMapPin}
							placeholder="e.g., Main Branch"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Contact"
							name="contact"
							icon={IconUser}
							placeholder="e.g., Sarah Johnson - Volunteer Coordinator"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Email"
							name="email"
							type="email"
							icon={IconMail}
							placeholder="volunteers@organisation.org.nz"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Volunteers Required"
							name="vols_req"
							icon={IconUsers}
							placeholder="e.g., 2-3 volunteers"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Leagues Hours"
							name="leagues_hours"
							icon={IconClock}
							placeholder="e.g., 10-15 hours per week"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<SelectField
							label="Status"
							name="status"
							options={statusOptions}
							required
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>

					<div className="mt-4">
						<FormField
							label="Role Description"
							name="description"
							type="textarea"
							icon={IconFileText}
							rows={4}
							placeholder="Describe the role, responsibilities, and what volunteers will be doing..."
							required
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Requirements Section */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconFileText size={20} className="mr-2 text-[#C7102F]" />
						Requirements & Specifications
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							label="Skills"
							name="skills"
							type="textarea"
							icon={IconStar}
							rows={3}
							placeholder="List required skills and experience..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Personality"
							name="personality"
							type="textarea"
							icon={IconHeart}
							rows={3}
							placeholder="Describe ideal personality traits..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Leagues Days"
							name="leagues_days"
							type="textarea"
							icon={IconCalendar}
							rows={2}
							placeholder="e.g., Monday to Friday, some weekends"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Reports"
							name="reports"
							icon={IconUser}
							placeholder="e.g., Weekly reports to coordinator"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>

					<div className="mt-6">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Basic Requirements</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<CheckboxField label="Criminal" name="criminal" icon={IconShield} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Transport" name="transport" icon={IconCar} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Wheelchair" name="wheelchair" icon={IconAccessible} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Toilet" name="toilet" icon={IconFileText} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Stairs" name="stairs" icon={IconStairs} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Home" name="home" icon={IconHome} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Oneoff" name="oneoff" icon={IconCalendar} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Paid Job" name="paid_job" icon={IconFileText} formData={formData} handleInputChange={handleInputChange} />
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Special Requirements</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<CheckboxField label="Youth" name="youth" icon={IconUsers} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="English" name="english" icon={IconFileText} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Disability" name="disability" icon={IconAccessible} formData={formData} handleInputChange={handleInputChange} />
							<CheckboxField label="Mental" name="mental" icon={IconMedicalCross} formData={formData} handleInputChange={handleInputChange} />
						</div>
					</div>
				</div>

				{/* Placement & Activities */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconMapPin size={20} className="mr-2 text-[#C7102F]" />
						Placement & Activities
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<MultiSelectField
							label="Regions of Placement"
							name="region_of_placement_list"
							options={regionOptions}
							formData={formData}
							handleMultiSelectChange={handleMultiSelectChange}
						/>
						
						<MultiSelectField
							label="Available Days"
							name="days_list"
							options={daysOptions}
							formData={formData}
							handleMultiSelectChange={handleMultiSelectChange}
						/>
						
						<MultiSelectField
							label="Available Times"
							name="time_list"
							options={timeOptions}
							formData={formData}
							handleMultiSelectChange={handleMultiSelectChange}
						/>
					</div>

					<div className="mt-6">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Activity Categories</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<MultiSelectField
								label="Activities Driving"
								name="activities_driving_list"
								options={activities_driving_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activities Administration"
								name="activities_administration_list"
								options={activities_administration_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activities Mantinance"
								name="activities_mantinance_list"
								options={activities_mantinance_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activities Home Cares"
								name="activities_home_cares_list"
								options={activities_home_cares_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activities Technology"
								name="activities_technology_list"
								options={activities_technology_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activities Event"
								name="activities_event_list"
								options={activities_event_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activites Hospitality"
								name="activities_hospitality_list"
								options={activities_hospitality_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activites Support"
								name="activities_support_list"
								options={activities_support_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activites Financial"
								name="activities_financial_list"
								options={activities_financial_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activites Other"
								name="activities_other_list"
								options={activities_other_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activites Sport"
								name="activities_sport_list"
								options={activities_sport_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
							<MultiSelectField
								label="Activites Group"
								name="activities_group_list"
								options={activities_group_list}
								formData={formData}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
						</div>
					</div>
				</div>

				{/* Duration & Training */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconClock size={20} className="mr-2 text-[#C7102F]" />
						Duration & Training
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<DateField label="Start Date" name="start_date" formData={formData} handleInputChange={handleInputChange} />
						<DateField label="End Date" name="end_date" formData={formData} handleInputChange={handleInputChange} />
						<DateField label="Date Added" name="date_added" formData={formData} handleInputChange={handleInputChange} />
						
						<SelectField
							label="Filter Color"
							name="filter_color"
							options={filterColorOptions}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>

					<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							label="Training"
							name="training"
							type="textarea"
							icon={IconSchool}
							rows={3}
							placeholder="Describe training and orientation provided..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Supervision"
							name="supervision"
							type="textarea"
							icon={IconUser}
							rows={3}
							placeholder="Describe supervision and support structure..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Reimbursements"
							name="reimbursement"
							type="textarea"
							icon={IconFileText}
							rows={2}
							placeholder="Travel, parking, or other reimbursements..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Other Reimbursements"
							name="reimbursement_other"
							type="textarea"
							icon={IconFileText}
							rows={2}
							placeholder="Additional benefits or reimbursements..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Additional Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconFileText size={20} className="mr-2 text-[#C7102F]" />
						Additional Information
					</h2>
					
					<div className="space-y-4">
						<FormField
							label="Results"
							name="results"
							type="textarea"
							icon={IconStar}
							rows={3}
							placeholder="What outcomes are expected from this role..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Other Information"
							name="other"
							type="textarea"
							icon={IconFileText}
							rows={3}
							placeholder="Any other relevant information..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FormField
							label="Notes"
							name="notes"
							type="textarea"
							icon={IconFileText}
							rows={3}
							placeholder="Internal notes or comments..."
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						
						<FileField
							label="Attachments"
							name="attachments"
							formData={formData}
							handleFileChange={handleFileChange}
							currentAttachmentUrl={currentAttachmentUrl}
						/>
					</div>
				</div>

				{/* Comments Section */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconFileText size={20} className="mr-2 text-[#C7102F]" />
						Comments
					</h2>
					
					{/* Previous Comments History */}
					{formData.comments && formData.comments.length > 0 && (
						<div className="mb-6">
							<h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
								<IconMessage size={16} className="mr-2" />
								Previous Comments
							</h3>
							<div className="space-y-3 max-h-64 overflow-y-auto">
								{formData.comments.map((comment) => (
									<div key={comment.id} className="bg-gray-50 rounded-lg py-2 px-3 border border-gray-100 flex flex-wrap gap-3 items-end">
										<p className="text-gray-800 text-sm">{comment.comment}</p>
										<div className="text-xs text-gray-500">
											By <span className="font-medium">{comment.admin}</span> on {formatDateTime(comment.created_at)}
										</div>
									</div>
								))}
							</div>
							<div className="border-t border-gray-200 mt-4 pt-4">
								<h4 className="text-sm font-medium text-gray-700 mb-3">Add New Comment</h4>
							</div>
						</div>
					)}
					
					<FormField
						label={formData.comments.length > 0 ? "" : "Comment"}
						name="comment"
						type="textarea"
						placeholder="Add any additional comments or notes about this organisation..."
						rows={4}
						formData={formData}
						handleInputChange={handleInputChange}
					/>
				</div>

				{/* Submit Buttons */}
				<div className="flex justify-end space-x-4">
					<Link
						to="/admin/roles"
						className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
					>
						Cancel
					</Link>
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-6 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
					>
						<IconDeviceFloppy size={18} />
						<span>{isSubmitting ? 'Updating...' : 'Update Role'}</span>
					</button>
				</div>
			</form>

				{/* Delete Confirmation Modal */}
				{showDeleteModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-lg max-w-md w-full p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Role</h3>
							<p className="text-gray-600 mb-6">
								Are you sure you want to delete this role? This action cannot be undone.
							</p>
							<div className="flex justify-end space-x-4">
								<button
									onClick={() => setShowDeleteModal(false)}
									disabled={isDeleting}
									className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
								>
									Cancel
								</button>
								<button
									onClick={handleDelete}
									disabled={isDeleting}
									className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isDeleting ? (
										<>
											<svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
											</svg>
											Deleting...
										</>
									) : (
										<>
											<IconTrash size={16} className="mr-2" />
											Delete Role
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
	);
}
