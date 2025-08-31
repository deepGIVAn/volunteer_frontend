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
    IconDeviceFloppy
} from '@tabler/icons-react';
import { 
    FormField, 
    CheckboxField, 
    FileField, 
    DateField, 
    MultiSelectField, 
    SelectField 
} from '../../components/base/FormComponents';

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
