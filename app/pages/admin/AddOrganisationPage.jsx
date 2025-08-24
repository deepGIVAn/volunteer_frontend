import { useState } from 'react';
import { Link } from '@remix-run/react';
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

export default function AddOrganisationPage() {
    const [formData, setFormData] = useState({
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
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock data - replace with actual API calls
    const regions = [
        { seq: 1, region: 'Palmerston North' },
        { seq: 2, region: 'Manawatū' },
        { seq: 3, region: 'Horowhenua' },
        { seq: 4, region: 'Tararua' }
    ];

    const organisationTypes = [
        { seq: 1, service: 'Health & Medical' },
        { seq: 2, service: 'Education & Training' },
        { seq: 3, service: 'Community & Social Services' },
        { seq: 4, service: 'Environment & Conservation' },
        { seq: 5, service: 'Arts & Culture' },
        { seq: 6, service: 'Sports & Recreation' }
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
        
        try {
            // TODO: Replace with actual API call
            console.log('Submitting organisation:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Organisation added successfully!');
            // TODO: Redirect to organisations list
            
        } catch (error) {
            console.error('Error adding organisation:', error);
            alert('Error adding organisation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const FormField = ({ label, name, type = 'text', required = false, placeholder, icon: Icon, rows }) => (
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

    const CheckboxField = ({ label, name, description }) => (
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

    const FileField = ({ label, name, required = false }) => (
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

    const DateField = ({ label, name, required = false }) => (
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

    const MultiSelectField = ({ label, name, options, required = false }) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                {options.map((option) => (
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
                            {option.region || option.service}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

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
                        />
                        <FormField
                            label="Organisation Name"
                            name="organisation_name"
                            required
                            placeholder="Enter organisation name"
                            icon={IconBuilding}
                        />
                        <FormField
                            label="Organisation Branch"
                            name="organisation_branch"
                            placeholder="Branch or division name"
                            icon={IconBuilding}
                        />
                        <FormField
                            label="Website"
                            name="website"
                            type="url"
                            placeholder="https://example.com"
                            icon={IconWorld}
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
                        />
                        <FormField
                            label="Postal Address"
                            name="postal_address"
                            type="textarea"
                            placeholder="Enter postal address"
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <MultiSelectField
                            label="Regions"
                            name="regions_list"
                            options={regions}
                        />
                        <MultiSelectField
                            label="Organisation Types"
                            name="organisation_type_list"
                            options={organisationTypes}
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
                        />
                        <FormField
                            label="Contact Phone"
                            name="contact_phone"
                            type="tel"
                            placeholder="Phone number"
                            icon={IconPhone}
                        />
                        <FormField
                            label="Contact Email"
                            name="contact_email"
                            type="email"
                            placeholder="email@example.com"
                            icon={IconMail}
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
                        />
                        <FormField
                            label="Volunteer Coordinator Phone"
                            name="volunteer_phone"
                            type="tel"
                            placeholder="Phone number"
                            icon={IconPhone}
                        />
                        <FormField
                            label="Volunteer Coordinator Email"
                            name="volunteer_email"
                            type="email"
                            placeholder="email@example.com"
                            icon={IconMail}
                        />
                        <FormField
                            label="Time Role"
                            name="time_role"
                            placeholder="Full-time, Part-time, etc."
                            icon={IconClock}
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
                        />
                        <DateField
                            label="Date Deactivated"
                            name="date_deactivated"
                        />
                    </div>

                    {/* Basic Info Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <FormField
                            label="Charity Number"
                            name="charity_number"
                            placeholder="Charity registration number"
                            icon={IconFileText}
                        />
                        <FormField
                            label="Fee"
                            name="fee"
                            placeholder="Membership or service fee"
                            icon={IconFileText}
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
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <CheckboxField
                            label="Disability Support"
                            name="disability"
                            description="Organisation provides support for people with disabilities"
                        />
                        <CheckboxField
                            label="Policies in Place"
                            name="policies"
                            description="Organisation has relevant policies and procedures"
                        />
                        <CheckboxField
                            label="Risk Assessment"
                            name="risk"
                            description="Organisation conducts risk assessments"
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
