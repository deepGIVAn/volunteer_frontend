import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useRouteLoaderData } from '@remix-run/react';
import { 
	IconArrowLeft, 
	IconBuilding, 
	IconMapPin, 
	IconMail, 
	IconPhone, 
	IconWorld,
	IconUser,
	IconClock,
	IconFileText,
	IconDeviceFloppy,
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

export default function EditOrganisationPage({organisation, regions, types}) {
	const { id } = useParams();
	const { user } = useRouteLoaderData("routes/admin");
	const navigate = useNavigate();

	// Helper function to convert date format
	const formatDateForInput = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toISOString().split('T')[0];
	};
	
	// Helper function to convert string arrays to number arrays
	const convertToNumbers = (arr) => {
		if (!arr || !Array.isArray(arr)) return [];
		return arr.map(item => typeof item === 'string' ? parseInt(item, 10) : item);
	};
	
	// Helper function to ensure status is a number
	const convertStatusToNumber = (status) => {
		if (status === null || status === undefined) return 4; // Default to Draft
		return typeof status === 'string' ? parseInt(status, 10) : status;
	};
	
	const [formData, setFormData] = useState({
		title: organisation?.title || '',
		organisation_name: organisation?.organisation_name || '',
		regions_list: convertToNumbers(organisation?.regions_list || []),
		organisation_branch: organisation?.organisation_branch || '',
		physical_address: organisation?.physical_address || '',
		postal_address: organisation?.postal_address || '',
		contact_name: organisation?.contact_name || '',
		contact_phone: organisation?.contact_phone || '',
		contact_email: organisation?.contact_email || '',
		company_aim: organisation?.company_aim || '',
		website: organisation?.website || '',
		volunteer_name: organisation?.volunteer_name || '',
		volunteer_phone: organisation?.volunteer_phone || '',
		volunteer_email: organisation?.volunteer_email || '',
		time_role: organisation?.time_role || '',
		disability: organisation?.disability || false,
		policies: organisation?.policies || false,
		risk: organisation?.risk || false,
		charity_number: organisation?.charity_number || '',
		fee: organisation?.fee || '',
		organisation_type_list: convertToNumbers(organisation?.organisation_type_numbers || organisation?.organisation_type_list || []),
		status: convertStatusToNumber(organisation?.status),
		date_added: formatDateForInput(organisation?.added_date || organisation?.date_added),
		date_deactivated: formatDateForInput(organisation?.deactivated_date || organisation?.date_deactivated),
		attachment: null, // Reset to null as we can't pre-populate file inputs
		comments: organisation?.comments || [],
		comment: ''
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentAttachmentUrl, setCurrentAttachmentUrl] = useState(organisation?.attachment || null);

	// Update form data when organisation prop changes
	useEffect(() => {
		if (organisation) {
			setFormData({
				title: organisation?.title || '',
				organisation_name: organisation?.organisation_name || '',
				regions_list: convertToNumbers(organisation?.regions_list || []),
				organisation_branch: organisation?.organisation_branch || '',
				physical_address: organisation?.physical_address || '',
				postal_address: organisation?.postal_address || '',
				contact_name: organisation?.contact_name || '',
				contact_phone: organisation?.contact_phone || '',
				contact_email: organisation?.contact_email || '',
				company_aim: organisation?.company_aim || '',
				website: organisation?.website || '',
				volunteer_name: organisation?.volunteer_name || '',
				volunteer_phone: organisation?.volunteer_phone || '',
				volunteer_email: organisation?.volunteer_email || '',
				time_role: organisation?.time_role || '',
				disability: organisation?.disability || false,
				policies: organisation?.policies || false,
				risk: organisation?.risk || false,
				charity_number: organisation?.charity_number || '',
				fee: organisation?.fee || '',
				organisation_type_list: convertToNumbers(organisation?.organisation_type_numbers || organisation?.organisation_type_list || []),
				status: convertStatusToNumber(organisation?.status),
				date_added: formatDateForInput(organisation?.added_date || organisation?.date_added),
				date_deactivated: formatDateForInput(organisation?.deactivated_date || organisation?.date_deactivated),
				attachment: null,
				comments: organisation?.comments || [],
				comment: ''
			});
			setCurrentAttachmentUrl(organisation?.attachment || null);
		}
	}, [organisation]);

	const organisationTypes = types;

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		
		let processedValue = value;
		if (type === 'checkbox') {
			processedValue = checked;
		} else if (name === 'status') {
			// Ensure status is always a number
			processedValue = parseInt(value, 10);
		} else if (type === 'number') {
			processedValue = parseInt(value, 10);
		}
		
		
		setFormData(prev => ({
			...prev,
			[name]: processedValue
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData(prev => ({
			...prev,
			attachment: file
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
		for (const key in formData) {
			if (formData[key] instanceof File && formData[key]) {
				form.append(key, formData[key]);
			} else if (Array.isArray(formData[key])) {
				// Handle arrays with proper backend format
				if (key === 'organisation_type_list' || key === 'regions_list') {
					formData[key].forEach(val => form.append(`${key}[]`, val));
				} else {
					formData[key].forEach(val => form.append(key, val));
				}
			} else if (formData[key] !== null && formData[key] !== undefined) {
				form.append(key, formData[key]);
			}
		}
		
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/update-organisation/${id}/`, {
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
			console.log('Organisation updated:', data);
			
			alert('Organisation updated successfully!');
			navigate('/admin/organisations');
			
		} catch (error) {
			console.error('Error updating organisation:', error);
			alert('Error updating organisation. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this organisation? This action cannot be undone.')) {
			return;
		}
		setIsDeleting(true);
		
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/delete-organisation/${id}/`,{
				method: 'DELETE',
				headers: {
						'Authorization': user?.token ? `Bearer ${user.token}` : ''
				},
			})
			const data = await res.json();
			console.log(data);
			alert('Organisation deleted successfully!');
			navigate('/admin/organisations');
		} catch (error) {
			console.error('Error deleting organisation:', error);
			alert('Error deleting organisation. Please try again.');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Link 
							to="/admin/organisations" 
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<IconArrowLeft size={20} className="text-gray-600" />
						</Link>
						<h1 className="text-2xl font-bold text-gray-900">Edit Organisation</h1>
					</div>
					<button
						onClick={handleDelete}
						disabled={isDeleting}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
					>
						<IconTrash size={18} />
						<span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
					</button>
				</div>
				<p className="text-gray-600">Update the organisation details below.</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Basic Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconBuilding size={20} className="mr-2 text-[#C7102F]" />
						Basic Information
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							label="Title"
							name="title"
							placeholder="Mr., Ms., Dr., etc."
							icon={IconUser}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Organisation Name"
							name="organisation_name"
							required
							placeholder="Enter organisation name"
							icon={IconBuilding}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Organisation Branch"
							name="organisation_branch"
							placeholder="Branch or division name"
							icon={IconBuilding}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Website"
							name="website"
							type="url"
							placeholder="https://example.com"
							icon={IconWorld}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>
					<div className="mt-4">
						<FormField
							label="Company Aim"
							name="company_aim"
							type="textarea"
							placeholder="Describe the organisation's mission and goals"
							rows={4}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Location & Classification */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconMapPin size={20} className="mr-2 text-[#C7102F]" />
						Location & Classification
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							label="Physical Address"
							name="physical_address"
							type="textarea"
							placeholder="Enter physical address"
							rows={3}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Postal Address"
							name="postal_address"
							type="textarea"
							placeholder="Enter postal address"
							rows={3}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
						<MultiSelectField
							label="Regions"
							name="regions_list"
							options={regions}
							formData={formData}
							handleMultiSelectChange={handleMultiSelectChange}
						/>
						<MultiSelectField
							label="Organisation Types"
							name="organisation_type_list"
							options={organisationTypes}
							formData={formData}
							handleMultiSelectChange={handleMultiSelectChange}
						/>
					</div>
				</div>

				{/* Contact Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconUser size={20} className="mr-2 text-[#C7102F]" />
						Contact Information
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							label="Contact Name"
							name="contact_name"
							placeholder="Primary contact person"
							icon={IconUser}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Contact Phone"
							name="contact_phone"
							type="tel"
							placeholder="Phone number"
							icon={IconPhone}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Contact Email"
							name="contact_email"
							type="email"
							placeholder="email@example.com"
							icon={IconMail}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Volunteer Coordinator */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
						<IconUser size={20} className="mr-2 text-[#C7102F]" />
						Volunteer Coordinator
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							label="Volunteer Coordinator Name"
							name="volunteer_name"
							placeholder="Volunteer coordinator name"
							icon={IconUser}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Volunteer Coordinator Phone"
							name="volunteer_phone"
							type="tel"
							placeholder="Phone number"
							icon={IconPhone}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Volunteer Coordinator Email"
							name="volunteer_email"
							type="email"
							placeholder="email@example.com"
							icon={IconMail}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Time Role"
							name="time_role"
							placeholder="Full-time, Part-time, etc."
							icon={IconClock}
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
					
					{/* Date Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<DateField
							label="Date Added"
							name="date_added"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<DateField
							label="Date Deactivated"
							name="date_deactivated"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>

					{/* Basic Info Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<FormField
							label="Charity Number"
							name="charity_number"
							placeholder="Charity registration number"
							icon={IconFileText}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<FormField
							label="Fee"
							name="fee"
							placeholder="Membership or service fee"
							icon={IconFileText}
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>

					{/* Status Dropdown */}
					<div className="mb-6">
						<SelectField
							label="Status"
							name="status"
							options={[
								{ value: 1, label: 'Active' },
								{ value: 2, label: 'Inactive' },
								{ value: 3, label: 'Awaiting Approval' },
								{ value: 4, label: 'Draft' }
							]}
							placeholder="Select status"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
					</div>

					{/* File Attachment */}
					<div className="mb-6">
						<FileField
							label="Attachment"
							name="attachment"
							formData={formData}
							handleFileChange={handleFileChange}
							currentAttachmentUrl={currentAttachmentUrl}
						/>
					</div>
					
					<div className="space-y-4">
						<CheckboxField
							label="Disability Support"
							name="disability"
							description="Organisation provides support for people with disabilities"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<CheckboxField
							label="Policies in Place"
							name="policies"
							description="Organisation has relevant policies and procedures"
							formData={formData}
							handleInputChange={handleInputChange}
						/>
						<CheckboxField
							label="Risk Assessment"
							name="risk"
							description="Organisation conducts risk assessments"
							formData={formData}
							handleInputChange={handleInputChange}
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

				{/* Submit Button */}
				<div className="flex justify-end space-x-4">
					<Link
						to="/admin/organisations"
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
						<span>{isSubmitting ? 'Updating...' : 'Update Organisation'}</span>
					</button>
				</div>
			</form>
		</div>
	);
}
