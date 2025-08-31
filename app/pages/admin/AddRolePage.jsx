
import { useState } from 'react';
import { Link, useNavigate, useRouteLoaderData } from '@remix-run/react';
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
	IconCalendar
} from '@tabler/icons-react';
import {
	FormField,
	CheckboxField,
	FileField,
	DateField,
	MultiSelectField,
	SelectField
} from '../../components/base/FormComponents';

export default function AddRolePage({ organisations, regions, days, time, activities_driving_list, activities_administration_list, activities_mantinance_list, activities_home_cares_list, activities_technology_list, activities_event_list, activities_hospitality_list, activities_support_list, activities_financial_list, activities_other_list, activities_sport_list, activities_group_list }) {
	const navigate = useNavigate();
	const { user } = useRouteLoaderData("routes/admin");
	
	const [formData, setFormData] = useState({
		title: '',
		organisation: '',
		contact: '',
		branch: '',
		status: 2, // Pending
		vols_req: '',
		reports: '',
		email: '',
		date_added: '',
		description: '',
		results: '',
		leagues_hours: '',
		skills: '',
		personality: '',
		criminal: false,
		transport: false,
		wheelchair: false,
		toilet: false,
		stairs: false,
		home: false,
		oneoff: false,
		leagues_days: '',
		start_date: '',
		end_date: '',
		training: '',
		reimbursement: '',
		reimbursement_other: '',
		supervision: '',
		other: '',
		paid_job: false,
		notes: '',
		filter_color: 0,
		youth: false,
		english: false,
		disability: false,
		mental: false,
		region_of_placement_list: [],
		days_list: [],
		time_list: [],
		activities_driving_list: [],
		activities_administration_list: [],
		activities_mantinance_list: [],
		activities_home_cares_list: [],
		activities_technology_list: [],
		activities_event_list: [],
		activities_hospitality_list: [],
		activities_support_list: [],
		activities_financial_list: [],
		activities_other_list: [],
		activities_sport_list: [],
		activities_group_list: [],
		attachments: null
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	// Use options from props
	// Map organisations prop to dropdown format: { value, label }
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
		{ seq: 1, name: 'Active' },
		{ seq: 2, name: 'DeActivated' },
		{ seq: 3, name: 'On-Hold' }
	];

	const filterColorOptions = [
		{ seq: 0, name: 'NiL' },
		{ seq: 1, name: 'Green' },
		{ seq: 2, name: 'Orange' },
		{ seq: 3, name: 'Red' }
	];

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
		
		console.log(formData);
		

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
			const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/create-role/`, {
				method: 'POST',
				headers: {
					'Authorization': user?.token ? `Bearer ${user.token}` : ''
				},
				body: form
			})

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			console.log('Role added:', data);
			
			alert('Role added successfully!');
			navigate('/admin/roles');
		} catch (error) {
			console.error('Error adding role:', error);
			alert('Error adding role. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};


	return (
		<div className="">
			<div className="">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center space-x-2">
						<Link 
							to="/admin/roles" 
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<IconArrowLeft size={20} className="text-gray-600" />
						</Link>
						<h1 className="text-2xl font-bold text-gray-900">Add New Role</h1>
					</div>
					<p className="text-gray-600">Create a new volunteer role opportunity.</p>
				</div>
				{/* <div className="mb-8">
					<Link
						to="/admin/roles"
						className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
					>
						<IconArrowLeft size={16} className="mr-1" />
						Back to Roles
					</Link>
					<h1 className="text-3xl font-bold text-gray-900">Add New Role</h1>
					<p className="text-gray-600 mt-2">Create a new volunteer role opportunity</p>
				</div> */}

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-8">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
								options={statusOptions.map(opt => ({ value: opt.seq, label: opt.name }))}
								required
								formData={formData}
								handleInputChange={handleInputChange}
							/>
						</div>

						<div className="mt-6">
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
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">Requirements & Specifications</h2>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">Placement & Activities</h2>
						
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
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">Duration & Training</h2>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<DateField label="Start Date" name="start_date" formData={formData} handleInputChange={handleInputChange} />
							<DateField label="End Date" name="end_date" formData={formData} handleInputChange={handleInputChange} />
							<DateField label="Date Added" name="date_added" formData={formData} handleInputChange={handleInputChange} />
							
							<SelectField
								label="Filter Color"
								name="filter_color"
								options={filterColorOptions.map(opt => ({ value: opt.seq, label: opt.name }))}
								formData={formData}
								handleInputChange={handleInputChange}
							/>
						</div>

						<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
						
						<div className="space-y-6">
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
							/>
						</div>
					</div>

					{/* Submit Buttons */}
					<div className="flex justify-end space-x-4">
						<Link
							to="/admin/roles"
							className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</Link>
						<button
							type="submit"
							disabled={isSubmitting}
							className="inline-flex items-center px-6 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md"
						>
							{isSubmitting ? (
								<>
									<svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
									</svg>
									Adding Role...
								</>
							) : (
								<>
									<IconDeviceFloppy size={18} className="mr-2" />
									Add Role
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
