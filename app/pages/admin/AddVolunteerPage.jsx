import { useState } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { 
    IconArrowLeft, 
    IconUser, 
    IconMapPin, 
    IconMail, 
    IconPhone, 
    IconCalendar,
    IconClock,
    IconFileText,
    IconDeviceFloppy,
    IconPaperclip
} from '@tabler/icons-react';

export default function AddVolunteerPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        street: '',
        city: '',
        post_code: '',
        phone: '',
        year_of_birth: '',
        date_added: '',
        hours: '',
        qualification: '',
        work_experience: '',
        skills: '',
        health: '',
        other_information: '',
        notes: '',
        languages: '',
        type_of_work_list: [],
        region_of_placement_list: [],
        refer_from_list: [],
        days_list: [],
        time_list: [],
        labour_list: [],
        status: 2, // Pending
        color: 0,
        transport_list: [],
        review_date: '',
        gender: 0,
        ethnic_origin_list: [],
        activities_list: [],
        activities_driving_list: [],
        activities_administration_list: [],
        activities_mantinance_list: [],
        activities_homecares_list: [],
        activities_technology_list: [],
        activities_event_list: [],
        activities_hospitality_list: [],
        activities_support_list: [],
        activities_financial_list: [],
        activities_other_list: [],
        activities_sport_list: [],
        activities_group_list: [],
        attachment: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock data - replace with actual API calls
    const typeOfWorkOptions = [
        { seq: 1, name: 'Community Services' },
        { seq: 2, name: 'Education & Training' },
        { seq: 3, name: 'Health & Medical' },
        { seq: 4, name: 'Environment' },
        { seq: 5, name: 'Arts & Culture' }
    ];

    const regionOptions = [
        { seq: 1, name: 'Palmerston North' },
        { seq: 2, name: 'Manawatū' },
        { seq: 3, name: 'Horowhenua' },
        { seq: 4, name: 'Tararua' }
    ];

    const daysOptions = [
        { seq: 1, name: 'Monday' },
        { seq: 2, name: 'Tuesday' },
        { seq: 3, name: 'Wednesday' },
        { seq: 4, name: 'Thursday' },
        { seq: 5, name: 'Friday' },
        { seq: 6, name: 'Saturday' },
        { seq: 7, name: 'Sunday' }
    ];

    const timeOptions = [
        { seq: 1, name: 'Morning (6am-12pm)' },
        { seq: 2, name: 'Afternoon (12pm-6pm)' },
        { seq: 3, name: 'Evening (6pm-12am)' },
        { seq: 4, name: 'Night (12am-6am)' }
    ];

    const transportOptions = [
        { seq: 1, name: 'Own Vehicle' },
        { seq: 2, name: 'Public Transport' },
        { seq: 3, name: 'Walking/Cycling' },
        { seq: 4, name: 'Needs Transport' }
    ];

    const activitiesOptions = [
        { seq: 1, name: 'Administrative Tasks' },
        { seq: 2, name: 'Direct Client Support' },
        { seq: 3, name: 'Event Organisation' },
        { seq: 4, name: 'Teaching/Training' },
        { seq: 5, name: 'Fundraising' },
        { seq: 6, name: 'Research' },
        { seq: 7, name: 'IT Support' }
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
            console.log('Submitting volunteer:', formData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Volunteer added successfully!');
            navigate('/admin/organisations'); // Redirect to all organisations
        } catch (error) {
            console.error('Error adding volunteer:', error);
            alert('Error adding volunteer. Please try again.');
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
                            {option.name}
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
                    className="inline-flex items-center px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer font-medium text-sm shadow-sm"
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

    return (
        <div className="mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <Link 
                        to="/admin/volunteers" 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <IconArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Volunteer</h1>
                </div>
                <p className="text-gray-600">Fill in the details below to add a new volunteer to the system.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <IconUser size={20} className="mr-2 text-[#C7102F]" />
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                            label="Title"
                            name="title"
                            placeholder="Mr., Ms., Dr., etc."
                            icon={IconUser}
                        />
                        <FormField
                            label="First Name"
                            name="first_name"
                            required
                            placeholder="Enter first name"
                            icon={IconUser}
                        />
                        <FormField
                            label="Last Name"
                            name="last_name"
                            required
                            placeholder="Enter last name"
                            icon={IconUser}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            icon={IconMail}
                        />
                        <FormField
                            label="Phone"
                            name="phone"
                            type="tel"
                            placeholder="Phone number"
                            icon={IconPhone}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                            label="Year of Birth"
                            name="year_of_birth"
                            type="number"
                            placeholder="e.g., 1990"
                            min="1900"
                            max={new Date().getFullYear()}
                        />
                        <div className="space-y-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent"
                            >
                                <option value={0}>Not specified</option>
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                                <option value={3}>Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <IconMapPin size={20} className="mr-2 text-[#C7102F]" />
                        Address Information
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            label="Street Address"
                            name="street"
                            placeholder="Enter street address"
                            icon={IconMapPin}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                label="City"
                                name="city"
                                placeholder="Enter city"
                                icon={IconMapPin}
                            />
                            <FormField
                                label="Post Code"
                                name="post_code"
                                placeholder="Enter post code"
                            />
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
                        <DateField
                            label="Date Added"
                            name="date_added"
                        />
                        <DateField
                            label="Review Date"
                            name="review_date"
                        />
                        <FormField
                            label="Hours Available"
                            name="hours"
                            placeholder="e.g., 10-15 hours/week"
                            icon={IconClock}
                        />
                        <FormField
                            label="Languages"
                            name="languages"
                            placeholder="e.g., English, Māori, Spanish"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none text-sm font-medium"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value={1} className="bg-gray-900 text-white">Active</option>
                                <option value={2} className="bg-gray-900 text-white">Pending</option>
                                <option value={3} className="bg-gray-900 text-white">Inactive</option>
                                <option value={4} className="bg-gray-900 text-white">On Hold</option>
                                <option value={5} className="bg-gray-900 text-white">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Experience & Skills */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <IconFileText size={20} className="mr-2 text-[#C7102F]" />
                        Experience & Skills
                    </h2>
                    <div className="space-y-4">
                        <FormField
                            label="Qualifications"
                            name="qualification"
                            type="textarea"
                            placeholder="Describe any relevant qualifications"
                            rows={3}
                        />
                        <FormField
                            label="Work Experience"
                            name="work_experience"
                            type="textarea"
                            placeholder="Describe relevant work experience"
                            rows={3}
                        />
                        <FormField
                            label="Skills"
                            name="skills"
                            type="textarea"
                            placeholder="List relevant skills"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <IconClock size={20} className="mr-2 text-[#C7102F]" />
                        Preferences & Availability
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MultiSelectField
                            label="Type of Work"
                            name="type_of_work_list"
                            options={typeOfWorkOptions}
                        />
                        <MultiSelectField
                            label="Regions of Placement"
                            name="region_of_placement_list"
                            options={regionOptions}
                        />
                        <MultiSelectField
                            label="Available Days"
                            name="days_list"
                            options={daysOptions}
                        />
                        <MultiSelectField
                            label="Available Times"
                            name="time_list"
                            options={timeOptions}
                        />
                        <MultiSelectField
                            label="Transport Options"
                            name="transport_list"
                            options={transportOptions}
                        />
                        <MultiSelectField
                            label="Activities"
                            name="activities_list"
                            options={activitiesOptions}
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
                            label="Health Information"
                            name="health"
                            type="textarea"
                            placeholder="Any health considerations or requirements"
                            rows={3}
                        />
                        <FormField
                            label="Other Information"
                            name="other_information"
                            type="textarea"
                            placeholder="Any other relevant information"
                            rows={3}
                        />
                        <FormField
                            label="Notes"
                            name="notes"
                            type="textarea"
                            placeholder="Internal notes about the volunteer"
                            rows={3}
                        />
                        <FileField
                            label="Attachment"
                            name="attachment"
                        />
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
                        <span>{isSubmitting ? 'Saving...' : 'Save Volunteer'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
