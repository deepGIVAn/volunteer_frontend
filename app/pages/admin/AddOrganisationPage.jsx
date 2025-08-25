import { useState } from 'react';
import { Link, useRouteLoaderData, useNavigate } from '@remix-run/react';
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
    IconCalendar,
    IconPaperclip,
    IconChevronDown
} from '@tabler/icons-react';

// Move components outside to prevent recreation on every render
const FormField = ({ label, name, type = 'text', required = false, placeholder, icon: Icon, rows, formData, handleInputChange }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon size={18} className="text-gray-400" />
                </div>
            )}
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    rows={rows || 3}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent`}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent`}
                />
            )}
        </div>
    </div>
);

const CheckboxField = ({ label, name, description, formData, handleInputChange }) => (
    <div className="flex items-start space-x-3">
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={formData[name]}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-[#C7102F] focus:ring-[#C7102F] border-gray-300 rounded"
        />
        <div className="flex-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
        </div>
    </div>
);

const FileField = ({ label, name, required = false, formData, handleFileChange }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center space-x-4">
            <label
                htmlFor={name}
                className="inline-flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer font-medium text-sm shadow-sm"
            >
                <IconPaperclip size={18} className="mr-2" />
                Choose File
            </label>
            <input
                type="file"
                id={name}
                name={name}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <span className="text-sm text-gray-500 flex-1">
                {formData[name] ? formData[name].name : 'No file chosen'}
            </span>
        </div>
        <p className="text-xs text-gray-500">
            Supported formats: JPG, JPEG, PNG, AVIF (Max 25MB)
        </p>
    </div>
);

const DateField = ({ label, name, required = false, formData, handleInputChange }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconCalendar size={18} className="text-gray-400" />
            </div>
            <input
                type="date"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent"
            />
        </div>
    </div>
);

const MultiSelectField = ({ label, name, options, required = false, formData, handleMultiSelectChange }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="border border-gray-300 rounded-lg p-3 max-h-80 overflow-y-auto">
            {options && options.length > 0 ? (
                options.map((option) => (
                    <div key={option.seq} className="flex items-center space-x-2 py-1">
                        <input
                            type="checkbox"
                            id={`${name}_${option.seq}`}
                            checked={formData[name].includes(option.seq)}
                            onChange={(e) => {
                                const currentList = formData[name];
                                const newList = e.target.checked
                                    ? [...currentList, option.seq]
                                    : currentList.filter(id => id !== option.seq);
                                handleMultiSelectChange(name, newList);
                            }}
                            className="h-4 w-4 text-[#C7102F] focus:ring-[#C7102F] border-gray-300 rounded"
                        />
                        <label htmlFor={`${name}_${option.seq}`} className="text-sm text-gray-700">
                            {option.region || option.service || option.name || 'Unknown'}
                        </label>
                    </div>
                ))
            ) : (
                <div className="text-sm text-gray-500 py-2">
                    No options available
                </div>
            )}
        </div>
    </div>
);

export default function AddOrganisationPage(props) {
    const { user } = useRouteLoaderData("routes/admin");
    const navigate = useNavigate();
    const regions = props.regions || [];
    const organisationTypes = props.types || [];
    
    const initialFormData = {
        title: '',
        organisation_name: '',
        regions_list: [],
        organisation_branch: '',
        physical_address: '',
        postal_address: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        company_aim: '',
        website: '',
        volunteer_name: '',
        volunteer_phone: '',
        volunteer_email: '',
        time_role: '',
        disability: false,
        policies: false,
        risk: false,
        charity_number: '',
        fee: '',
        organisation_type_list: [],
        status: 4, // Draft
        date_added: '',
        date_deactivated: '',
        attachment: null
    };
    
    const [formData, setFormData] = useState(initialFormData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setFormData(initialFormData);
        // Reset file input
        const fileInput = document.getElementById('attachment');
        if (fileInput) {
            fileInput.value = '';
        }
    };

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/create-organisation/`, {
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
            console.log('Organisation added:', data);
            
            // Reset form and navigate back to organisations list
            resetForm();
            navigate('/admin/organisations');
        } catch (error) {
            console.error('Error adding organisation:', error);
            alert('Error adding organisation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-2">
                    <Link 
                        to="/admin/organisations" 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <IconArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Organisation</h1>
                </div>
                <p className="text-gray-600">Fill in the details below to add a new organisation to the system.</p>
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
                            placeholder="Enter Title"
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
                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <div className='relative'>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none text-sm font-medium"
                                >
                                    <option value="" className="">Select status</option>
                                    <option value={1} className="">Active</option>
                                    <option value={2} className="">Inactive</option>
                                    <option value={3} className="">Awaiting Approval</option>
                                    <option value={4} className="">Draft</option>
                                </select>
                                <IconChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* File Attachment */}
                    <div className="mb-6">
                        <FileField
                            label="Attachment"
                            name="attachment"
                            formData={formData}
                            handleFileChange={handleFileChange}
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
                        <span>{isSubmitting ? 'Saving...' : 'Save Organisation'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
