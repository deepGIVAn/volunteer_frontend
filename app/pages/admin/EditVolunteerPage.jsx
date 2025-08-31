import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useRouteLoaderData } from '@remix-run/react';
import {
	IconArrowLeft,
	IconUser,
	IconMapPin,
	IconMail,
	IconPhone,
	// IconCalendar,
	IconClock,
	IconFileText,
	IconDeviceFloppy,
	IconStar,
	IconHeart,
	IconSchool,
	IconTrash
} from '@tabler/icons-react';
import {
	FormField,
	MultiSelectField,
	DateField,
	SelectField
} from '../../components/base/FormComponents';

export default function EditVolunteerPage({
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
	activities_group_list,
	volunteer
}) {
	const { id } = useParams();
	const { user } = useRouteLoaderData("routes/admin");
	const navigate = useNavigate();
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
		if (status === null || status === undefined) return 3; // Default: Review
		return typeof status === 'string' ? parseInt(status, 10) : status;
	};

	const [formData, setFormData] = useState({
		title: volunteer?.title || '',
		first_name: volunteer?.first_name || '',
		last_name: volunteer?.last_name || '',
		email: volunteer?.email || '',
		street: volunteer?.street || '',
		city: volunteer?.city || '',
		post_code: volunteer?.post_code || '',
		phone: volunteer?.phone || '',
		year_of_birth: volunteer?.year_of_birth || '',
		date_added: formatDateForInput(volunteer?.date_added),
		hours: volunteer?.hours || '',
		qualification: volunteer?.qualification || '',
		work_experience: volunteer?.work_experience || '',
		skills: volunteer?.skills || '',
		health: volunteer?.health || '',
		other_information: volunteer?.other_information || '',
		notes: volunteer?.notes || '',
		languages: volunteer?.languages || '',
		type_of_work_list: convertToNumbers(volunteer?.type_of_work_list || []),
		region_of_placement_list: convertToNumbers(volunteer?.region_of_placement_list || []),
		refer_from_list: convertToNumbers(volunteer?.refer_from_list || []),
		days_list: convertToNumbers(volunteer?.days_list || []),
		time_list: convertToNumbers(volunteer?.time_list || []),
		labour_list: convertToNumbers(volunteer?.labour_list || []),
		status: convertStatusToNumber(volunteer?.status),
		color: volunteer?.color !== undefined ? volunteer.color : 0,
		transport_list: convertToNumbers(volunteer?.transport_list || []),
		review_date: formatDateForInput(volunteer?.review_date),
		gender: volunteer?.gender !== undefined ? volunteer.gender : 0,
		ethnic_origin_list: convertToNumbers(volunteer?.ethnic_origin_list || []),
		activities_list: convertToNumbers(volunteer?.activities_list || []),
		activities_driving_list: convertToNumbers(volunteer?.activities_driving_list || []),
		activities_administration_list: convertToNumbers(volunteer?.activities_administration_list || []),
		activities_mantinance_list: convertToNumbers(volunteer?.activities_mantinance_list || []),
		activities_home_cares_list: convertToNumbers(volunteer?.activities_home_cares_list || []),
		activities_technology_list: convertToNumbers(volunteer?.activities_technology_list || []),
		activities_event_list: convertToNumbers(volunteer?.activities_event_list || []),
		activities_hospitality_list: convertToNumbers(volunteer?.activities_hospitality_list || []),
		activities_support_list: convertToNumbers(volunteer?.activities_support_list || []),
		activities_financial_list: convertToNumbers(volunteer?.activities_financial_list || []),
		activities_other_list: convertToNumbers(volunteer?.activities_other_list || []),
		activities_sport_list: convertToNumbers(volunteer?.activities_sport_list || []),
		activities_group_list: convertToNumbers(volunteer?.activities_group_list || []),
	});

	// Update form data when volunteer prop changes
	useEffect(() => {
		if (volunteer) {
			setFormData({
				title: volunteer?.title || '',
				first_name: volunteer?.first_name || '',
				last_name: volunteer?.last_name || '',
				email: volunteer?.email || '',
				street: volunteer?.street || '',
				city: volunteer?.city || '',
				post_code: volunteer?.post_code || '',
				phone: volunteer?.phone || '',
				year_of_birth: volunteer?.year_of_birth || '',
				date_added: formatDateForInput(volunteer?.date_added),
				hours: volunteer?.hours || '',
				qualification: volunteer?.qualification || '',
				work_experience: volunteer?.work_experience || '',
				skills: volunteer?.skills || '',
				health: volunteer?.health || '',
				other_information: volunteer?.other_information || '',
				notes: volunteer?.notes || '',
				languages: volunteer?.languages || '',
				type_of_work_list: convertToNumbers(volunteer?.type_of_work_list || []),
				region_of_placement_list: convertToNumbers(volunteer?.region_of_placement_list || []),
				refer_from_list: convertToNumbers(volunteer?.refer_from_list || []),
				days_list: convertToNumbers(volunteer?.days_list || []),
				time_list: convertToNumbers(volunteer?.time_list || []),
				labour_list: convertToNumbers(volunteer?.labour_list || []),
				status: convertStatusToNumber(volunteer?.status),
				color: volunteer?.color !== undefined ? volunteer.color : 0,
				transport_list: convertToNumbers(volunteer?.transport_list || []),
				review_date: formatDateForInput(volunteer?.review_date),
				gender: volunteer?.gender !== undefined ? volunteer.gender : 0,
				ethnic_origin_list: convertToNumbers(volunteer?.ethnic_origin_list || []),
				activities_list: convertToNumbers(volunteer?.activities_list || []),
				activities_driving_list: convertToNumbers(volunteer?.activities_driving_list || []),
				activities_administration_list: convertToNumbers(volunteer?.activities_administration_list || []),
				activities_mantinance_list: convertToNumbers(volunteer?.activities_mantinance_list || []),
				activities_home_cares_list: convertToNumbers(volunteer?.activities_home_cares_list || []),
				activities_technology_list: convertToNumbers(volunteer?.activities_technology_list || []),
				activities_event_list: convertToNumbers(volunteer?.activities_event_list || []),
				activities_hospitality_list: convertToNumbers(volunteer?.activities_hospitality_list || []),
				activities_support_list: convertToNumbers(volunteer?.activities_support_list || []),
				activities_financial_list: convertToNumbers(volunteer?.activities_financial_list || []),
				activities_other_list: convertToNumbers(volunteer?.activities_other_list || []),
				activities_sport_list: convertToNumbers(volunteer?.activities_sport_list || []),
				activities_group_list: convertToNumbers(volunteer?.activities_group_list || []),
			});
		}
	}, [volunteer]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	// Option sets from props
	const genderOptions = [
		{ value: 1, label: 'Male' },
		{ value: 2, label: 'Female' },
		{ value: 3, label: 'Other' },
		{ value: 4, label: 'Not to Answer' }
	];
	const statusOptions = [
		{ value: 1, label: 'Active' },
		{ value: 2, label: 'DeActivated' },
		{ value: 3, label: 'Review' }
	];
	const colorOptions = [
		{ value: 0, label: 'NiL' },
		{ value: 1, label: 'Green' },
		{ value: 2, label: 'Orange' },
		{ value: 3, label: 'Red' },
	];

	useEffect(() => {
		// TODO: Replace with actual API call to fetch volunteer data by id
		// For now, just set loading to false
		setIsLoading(false);
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
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
		const arrayFields = [
			'type_of_work_list',
			'region_of_placement_list',
			'refer_from_list',
			'days_list',
			'time_list',
			'labour_list',
			'transport_list',
			'ethnic_origin_list',
			'activities_list',
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
			// TODO: Replace with actual API call
			// Example:
			const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/update-volunteer/${id}/`, {
				method: 'POST',
				headers: {
					'Authorization': user?.token ? `Bearer ${user.token}` : ''
				},
				body: form
			});
			if (!response.ok) throw new Error('Network response was not ok');
			const data = await response.json();
			console.log('Volunteer updated:', data);
			alert('Volunteer updated successfully!');
			navigate('/admin/volunteers');
		} catch (error) {
			console.error('Error updating volunteer:', error);
			alert('Error updating volunteer. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/delete-volunteer/${id}/`,{
				method: 'DELETE',
				headers: {
					'Authorization': user?.token ? `Bearer ${user.token}` : ''
				},
			})
			const data = await res.json();
			console.log(data);
			alert('Volunteer deleted successfully!');
			navigate('/admin/volunteers');
		} catch (error) {
			console.error('Error deleting volunteer:', error);
			alert('Error deleting volunteer. Please try again.');
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
							to="/admin/volunteers"
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<IconArrowLeft size={20} className="text-gray-600" />
						</Link>
						<h1 className="text-2xl font-bold text-gray-900">
							Edit Volunteer
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
				<p className="text-gray-600">Update the volunteer's details below.</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Personal Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconUser size={20} className="mr-2 text-[#C7102F]" />
						Personal Information
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<FormField label="Title" name="title" placeholder="Mr., Ms., Dr., etc." formData={formData} handleInputChange={handleInputChange} icon={IconUser} />
						<FormField label="First Name" name="first_name" required placeholder="Enter first name" formData={formData} handleInputChange={handleInputChange} icon={IconUser} />
						<FormField label="Last Name" name="last_name" required placeholder="Enter last name" formData={formData} handleInputChange={handleInputChange} icon={IconUser} />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
						<FormField label="Email" name="email" type="email" placeholder="email@example.com" formData={formData} handleInputChange={handleInputChange} icon={IconMail} />
						<FormField label="Phone" name="phone" type="tel" placeholder="Phone number" formData={formData} handleInputChange={handleInputChange} icon={IconPhone} />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
						<FormField label="Year of Birth" name="year_of_birth" type="number" placeholder="e.g., 1990" formData={formData} handleInputChange={handleInputChange} />
						<SelectField label="Gender" name="gender" options={genderOptions} placeholder="Select gender" formData={formData} handleInputChange={handleInputChange} />
					</div>
				</div>

				{/* Address Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconMapPin size={20} className="mr-2 text-[#C7102F]" />
						Address Information
					</h2>
					<div className="grid grid-cols-1 gap-4">
						<FormField label="Street Address" name="street" placeholder="Enter street address" formData={formData} handleInputChange={handleInputChange} icon={IconMapPin} />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField label="City" name="city" placeholder="Enter city" formData={formData} handleInputChange={handleInputChange} icon={IconMapPin} />
							<FormField label="Post Code" name="post_code" placeholder="Enter post code" formData={formData} handleInputChange={handleInputChange} />
						</div>
					</div>
				</div>

				{/* Volunteer Details */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconClock size={20} className="mr-2 text-[#C7102F]" />
						Volunteer Details
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<DateField label="Date Added" name="date_added" formData={formData} handleInputChange={handleInputChange} />
						<DateField label="Review Date" name="review_date" formData={formData} handleInputChange={handleInputChange} />
						<FormField label="Hours Available" name="hours" placeholder="e.g., 10-15 hours/week" formData={formData} handleInputChange={handleInputChange} icon={IconClock} />
						<FormField label="Languages" name="languages" placeholder="e.g., English, Māori, Spanish" formData={formData} handleInputChange={handleInputChange} />
						<SelectField label="Status" name="status" options={statusOptions} placeholder="Select status" formData={formData} handleInputChange={handleInputChange} />
						<SelectField label="Color" name="color" options={colorOptions} placeholder="Select color" formData={formData} handleInputChange={handleInputChange} />
					</div>
				</div>

				{/* Experience & Skills */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconFileText size={20} className="mr-2 text-[#C7102F]" />
						Experience & Skills
					</h2>
					<div className="space-y-4">
						<FormField label="Qualifications" name="qualification" type="textarea" placeholder="Describe any relevant qualifications" formData={formData} handleInputChange={handleInputChange} icon={IconSchool} rows={3} />
						<FormField label="Work Experience" name="work_experience" type="textarea" placeholder="Describe relevant work experience" formData={formData} handleInputChange={handleInputChange} icon={IconFileText} rows={3} />
						<FormField label="Skills" name="skills" type="textarea" placeholder="List relevant skills" formData={formData} handleInputChange={handleInputChange} icon={IconStar} rows={3} />
					</div>
				</div>

				{/* Preferences & Availability */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconClock size={20} className="mr-2 text-[#C7102F]" />
						Preferences & Availability
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<MultiSelectField label="Type of Work" name="type_of_work_list" options={type_of_work_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Regions of Placement" name="region_of_placement_list" options={regions || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Available Days" name="days_list" options={days_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Available Times" name="time_list" options={time_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Transport Options" name="transport_list" options={transport_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Labour" name="labour_list" options={labour_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Refer From" name="refer_from_list" options={refer_from_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Ethnic Origin" name="ethnic_origin_list" options={ethnic_origin_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
					</div>
				</div>

				{/* Activities */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconFileText size={20} className="mr-2 text-[#C7102F]" />
						Activities
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<MultiSelectField label="Activities" name="activities_list" options={activities_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Driving" name="activities_driving_list" options={activities_driving_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Administration" name="activities_administration_list" options={activities_administration_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Mantinance" name="activities_mantinance_list" options={activities_mantinance_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Home Cares" name="activities_home_cares_list" options={activities_home_cares_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Technology" name="activities_technology_list" options={activities_technology_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Event" name="activities_event_list" options={activities_event_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Hospitality" name="activities_hospitality_list" options={activities_hospitality_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Support" name="activities_support_list" options={activities_support_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Financial" name="activities_financial_list" options={activities_financial_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Other" name="activities_other_list" options={activities_other_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Sport" name="activities_sport_list" options={activities_sport_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
						<MultiSelectField label="Activities Group" name="activities_group_list" options={activities_group_list || []} formData={formData} handleMultiSelectChange={handleMultiSelectChange} />
					</div>
				</div>

				{/* Additional Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconFileText size={20} className="mr-2 text-[#C7102F]" />
						Additional Information
					</h2>
					<div className="space-y-4">
						<FormField label="Health Information" name="health" type="textarea" placeholder="Any health considerations or requirements" formData={formData} handleInputChange={handleInputChange} icon={IconHeart} rows={3} />
						<FormField label="Other Information" name="other_information" type="textarea" placeholder="Any other relevant information" formData={formData} handleInputChange={handleInputChange} icon={IconFileText} rows={3} />
						<FormField label="Notes" name="notes" type="textarea" placeholder="Internal notes about the volunteer" formData={formData} handleInputChange={handleInputChange} icon={IconFileText} rows={3} />
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end space-x-4">
					<Link
						to="/admin/volunteers"
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
						<span>{isSubmitting ? 'Saving...' : 'Update Volunteer'}</span>
					</button>
				</div>
			</form>

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
						<div className="flex items-center space-x-3 mb-4">
							<h3 className="text-lg font-medium text-gray-900">Delete Volunteer</h3>
						</div>
						<p className="text-gray-600 mb-6">
							Are you sure you want to delete this volunteer? This action cannot be undone.
						</p>
						<div className="flex justify-end space-x-3">
							<button
								onClick={() => setShowDeleteModal(false)}
								disabled={isDeleting}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								disabled={isDeleting}
								className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
							>
								<IconTrash size={18} />
								<span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
