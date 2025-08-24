import { useState, useEffect } from 'react';
import { Link, useParams } from '@remix-run/react';
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
    IconCalendar,
    IconPaperclip
} from '@tabler/icons-react';

export default function EditOrganisationPage() {
    const { id } = useParams();
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
        status: 4,
        date_added: '',
        date_deactivated: '',
        attachment: null
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const statusOptions = [
        { value: 1, label: 'Active', color: 'text-green-600' },
        { value: 2, label: 'Pending', color: 'text-yellow-600' },
        { value: 3, label: 'Inactive', color: 'text-red-600' },
        { value: 4, label: 'Draft', color: 'text-gray-600' }
    ];

    useEffect(() => {
        // TODO: Replace with actual API call to fetch organisation data
        const fetchOrganisation = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock data for demonstration
                const mockData = {
                    id,
                    title: 'Ms.',
                    organisation_name: 'Community Health Centre',
                    regions_list: [1, 2],
                    organisation_branch: 'Main Branch',
                    physical_address: '123 Main Street\nPalmerston North\nNew Zealand',
                    postal_address: 'PO Box 123\nPalmerston North\nNew Zealand',
                    contact_name: 'Jane Smith',
                    contact_phone: '06-123-4567',
                    contact_email: 'jane@healthcentre.co.nz',
                    company_aim: 'To provide accessible healthcare services to the community.',
                    website: 'https://healthcentre.co.nz',
                    volunteer_name: 'John Doe',
                    volunteer_phone: '06-765-4321',
                    volunteer_email: 'john@healthcentre.co.nz',
                    time_role: 'Part-time',
                    disability: true,
                    policies: true,
                    risk: true,
                    charity_number: 'CC12345',
                    fee: 'No fee',
                    organisation_type_list: [1, 3],
                    status: 1
                };
                
                setFormData(mockData);
            } catch (error) {
                console.error('Error fetching organisation:', error);
                alert('Error loading organisation data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrganisation();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value)
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
            console.log('Updating organisation:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Organisation updated successfully!');
            
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
            // TODO: Replace with actual API call
            console.log('Deleting organisation:', id);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Organisation deleted successfully!');
            // TODO: Redirect to organisations list
            
        } catch (error) {
            console.error('Error deleting organisation:', error);
            alert('Error deleting organisation. Please try again.');
        } finally {
            setIsDeleting(false);
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
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <span className="text-sm text-gray-500 flex-1">
                    {formData[name] ? formData[name].name : 'No file chosen'}
                </span>
            </div>
            <p className="text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
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

    if (isLoading) {
        return (
            <div className="">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
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
                {/* Status */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
                    <div className="space-y-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Organisation Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none text-sm font-medium"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.75rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.5em 1.5em'
                            }}
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

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
                    <div className="mt-4">
                        <FormField
                            label="Company Aim"
                            name="company_aim"
                            type="textarea"
                            placeholder="Describe the organisation's mission and goals"
                            rows={4}
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
                        <span>{isSubmitting ? 'Updating...' : 'Update Organisation'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
