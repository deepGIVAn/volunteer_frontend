import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from '@remix-run/react';
import { 
    IconArrowLeft, 
    IconBriefcase, 
    IconBuilding, 
    IconMapPin, 
    IconMail, 
    IconCalendar,
    IconClock,
    IconFileText,
    IconDeviceFloppy,
    IconPaperclip,
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
    IconTrash
} from '@tabler/icons-react';

export default function EditRolePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        organisation: '',
        contact: '',
        branch: '',
        status: 2,
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

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Mock data - replace with actual API calls
    const organisationOptions = [
        { id: '1', name: 'Palmerston North Community Centre' },
        { id: '2', name: 'Youth Development Trust' },
        { id: '3', name: 'Horowhenua Health Services' },
        { id: '4', name: 'Environmental Action Group' },
        { id: '5', name: 'Arts & Culture Foundation' }
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

    const activitiesOptions = [
        { seq: 1, name: 'Administrative Tasks' },
        { seq: 2, name: 'Direct Client Support' },
        { seq: 3, name: 'Event Organisation' },
        { seq: 4, name: 'Teaching/Training' },
        { seq: 5, name: 'Fundraising' },
        { seq: 6, name: 'Research' },
        { seq: 7, name: 'IT Support' }
    ];

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

    // Load role data on component mount
    useEffect(() => {
        const loadRoleData = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock role data
                const mockRole = {
                    id: id,
                    title: 'Community Support Volunteer',
                    organisation: '1',
                    contact: 'Sarah Johnson - Volunteer Coordinator',
                    branch: 'Main Branch',
                    status: 1,
                    vols_req: '2-3 volunteers',
                    reports: 'Weekly reports to coordinator',
                    email: 'volunteers@pncc.org.nz',
                    date_added: '2024-01-15',
                    description: 'Assist with community events and support services for local residents.',
                    results: 'Improved community engagement and support service delivery.',
                    leagues_hours: '10-15 hours per week',
                    skills: 'Communication, Event planning, Basic computer skills',
                    personality: 'Friendly, patient, good listener, team player',
                    criminal: true,
                    transport: true,
                    wheelchair: false,
                    toilet: true,
                    stairs: false,
                    home: false,
                    oneoff: false,
                    leagues_days: 'Monday to Friday, some weekends',
                    start_date: '2024-02-01',
                    end_date: '2024-12-31',
                    training: 'Initial orientation, ongoing support workshops',
                    reimbursement: 'Travel expenses',
                    reimbursement_other: 'Parking costs covered',
                    supervision: 'Direct supervision by coordinator',
                    other: 'Uniform provided, flexible schedule',
                    paid_job: false,
                    notes: 'Great opportunity for community involvement',
                    filter_color: 1,
                    youth: false,
                    english: true,
                    disability: true,
                    mental: false,
                    region_of_placement_list: [1, 2],
                    days_list: [1, 2, 3, 4, 5],
                    time_list: [1, 2],
                    activities_driving_list: [],
                    activities_administration_list: [1, 2],
                    activities_mantinance_list: [],
                    activities_home_cares_list: [],
                    activities_technology_list: [1],
                    activities_event_list: [1, 2],
                    activities_hospitality_list: [1],
                    activities_support_list: [1, 2, 3],
                    activities_financial_list: [],
                    activities_other_list: [],
                    activities_sport_list: [],
                    activities_group_list: [1],
                    attachments: 'role_description.pdf'
                };
                
                setFormData(mockRole);
            } catch (error) {
                console.error('Error loading role data:', error);
                alert('Error loading role data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            loadRoleData();
        }
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

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Role data to update:', formData);
            
            // Here you would typically send the data to your API
            // const response = await fetch(`/api/roles/${id}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Deleting role:', id);
            
            // Here you would typically send the delete request to your API
            // const response = await fetch(`/api/roles/${id}`, {
            //     method: 'DELETE'
            // });
            
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

    const FormField = ({ label, name, type = 'text', required = false, placeholder, icon: Icon, rows, options }) => (
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
                        value={formData[name] || ''}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent`}
                    />
                ) : type === 'select' ? (
                    <select
                        id={name}
                        name={name}
                        value={formData[name] || ''}
                        onChange={handleInputChange}
                        className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent`}
                    >
                        <option value="">Select {label}</option>
                        {options && options.map((option) => (
                            <option key={option.id || option.seq} value={option.id || option.seq}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={formData[name] || ''}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent`}
                    />
                )}
            </div>
        </div>
    );

    const CheckboxField = ({ label, name, icon: Icon }) => (
        <div className="flex items-center space-x-3">
            {Icon && <Icon size={18} className="text-gray-400" />}
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    name={name}
                    checked={formData[name] || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#C7102F] focus:ring-[#C7102F] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{label}</span>
            </label>
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
                            checked={(formData[name] || []).includes(option.seq)}
                            onChange={(e) => {
                                const selectedIds = formData[name] || [];
                                if (e.target.checked) {
                                    handleMultiSelectChange(name, [...selectedIds, option.seq]);
                                } else {
                                    handleMultiSelectChange(name, selectedIds.filter(id => id !== option.seq));
                                }
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
                    {formData[name] ? (
                        typeof formData[name] === 'string' ? formData[name] : formData[name].name
                    ) : 'No file chosen'}
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
                    value={formData[name] || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent"
                />
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="relative w-16 h-16 mx-auto mb-4">
                                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-[#C7102F] rounded-full animate-spin border-t-transparent"></div>
                            </div>
                            <p className="text-gray-600 font-medium">Loading role data...</p>
                            <p className="text-sm text-gray-500 mt-1">Please wait while we fetch the role information</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/roles"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        <IconArrowLeft size={16} className="mr-1" />
                        Back to Roles
                    </Link>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Edit Role</h1>
                            <p className="text-gray-600 mt-2">Update role information and requirements</p>
                        </div>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
                        >
                            <IconTrash size={18} className="mr-2" />
                            Delete Role
                        </button>
                    </div>
                </div>

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
                            />
                            
                            <FormField
                                label="Organisation"
                                name="organisation"
                                type="select"
                                icon={IconBuilding}
                                required
                                options={organisationOptions}
                            />
                            
                            <FormField
                                label="Branch"
                                name="branch"
                                icon={IconMapPin}
                                placeholder="e.g., Main Branch"
                            />
                            
                            <FormField
                                label="Contact Person"
                                name="contact"
                                icon={IconUser}
                                placeholder="e.g., Sarah Johnson - Volunteer Coordinator"
                            />
                            
                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                                icon={IconMail}
                                placeholder="volunteers@organisation.org.nz"
                            />
                            
                            <FormField
                                label="Volunteers Required"
                                name="vols_req"
                                icon={IconUsers}
                                placeholder="e.g., 2-3 volunteers"
                            />
                            
                            <FormField
                                label="Hours Required"
                                name="leagues_hours"
                                icon={IconClock}
                                placeholder="e.g., 10-15 hours per week"
                            />
                            
                            <FormField
                                label="Status"
                                name="status"
                                type="select"
                                icon={IconFileText}
                                options={statusOptions}
                                required
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
                            />
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Requirements & Specifications</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                label="Required Skills"
                                name="skills"
                                type="textarea"
                                icon={IconStar}
                                rows={3}
                                placeholder="List required skills and experience..."
                            />
                            
                            <FormField
                                label="Personality Traits"
                                name="personality"
                                type="textarea"
                                icon={IconHeart}
                                rows={3}
                                placeholder="Describe ideal personality traits..."
                            />
                            
                            <FormField
                                label="Available Days"
                                name="leagues_days"
                                type="textarea"
                                icon={IconCalendar}
                                rows={2}
                                placeholder="e.g., Monday to Friday, some weekends"
                            />
                            
                            <FormField
                                label="Reports To"
                                name="reports"
                                icon={IconUser}
                                placeholder="e.g., Weekly reports to coordinator"
                            />
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Requirements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <CheckboxField label="Criminal Check Required" name="criminal" icon={IconShield} />
                                <CheckboxField label="Transport Required" name="transport" icon={IconCar} />
                                <CheckboxField label="Wheelchair Access" name="wheelchair" icon={IconAccessible} />
                                <CheckboxField label="Toilet Facilities" name="toilet" icon={IconFileText} />
                                <CheckboxField label="Stairs Access" name="stairs" icon={IconStairs} />
                                <CheckboxField label="Home Based Role" name="home" icon={IconHome} />
                                <CheckboxField label="One-off Role" name="oneoff" icon={IconCalendar} />
                                <CheckboxField label="Paid Position" name="paid_job" icon={IconFileText} />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Special Requirements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <CheckboxField label="Youth Work" name="youth" icon={IconUsers} />
                                <CheckboxField label="English Required" name="english" icon={IconFileText} />
                                <CheckboxField label="Disability Support" name="disability" icon={IconAccessible} />
                                <CheckboxField label="Mental Health Support" name="mental" icon={IconMedicalCross} />
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
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Categories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <MultiSelectField
                                    label="Administration"
                                    name="activities_administration_list"
                                    options={activitiesOptions}
                                />
                                <MultiSelectField
                                    label="Events"
                                    name="activities_event_list"
                                    options={activitiesOptions}
                                />
                                <MultiSelectField
                                    label="Support Services"
                                    name="activities_support_list"
                                    options={activitiesOptions}
                                />
                                <MultiSelectField
                                    label="Technology"
                                    name="activities_technology_list"
                                    options={activitiesOptions}
                                />
                                <MultiSelectField
                                    label="Hospitality"
                                    name="activities_hospitality_list"
                                    options={activitiesOptions}
                                />
                                <MultiSelectField
                                    label="Group Activities"
                                    name="activities_group_list"
                                    options={activitiesOptions}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Duration & Training */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Duration & Training</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DateField label="Start Date" name="start_date" />
                            <DateField label="End Date" name="end_date" />
                            <DateField label="Date Added" name="date_added" />
                            
                            <FormField
                                label="Filter Color"
                                name="filter_color"
                                type="select"
                                icon={IconFileText}
                                options={filterColorOptions}
                            />
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                label="Training Provided"
                                name="training"
                                type="textarea"
                                icon={IconSchool}
                                rows={3}
                                placeholder="Describe training and orientation provided..."
                            />
                            
                            <FormField
                                label="Supervision"
                                name="supervision"
                                type="textarea"
                                icon={IconUser}
                                rows={3}
                                placeholder="Describe supervision and support structure..."
                            />
                            
                            <FormField
                                label="Reimbursements"
                                name="reimbursement"
                                type="textarea"
                                icon={IconFileText}
                                rows={2}
                                placeholder="Travel, parking, or other reimbursements..."
                            />
                            
                            <FormField
                                label="Other Reimbursements"
                                name="reimbursement_other"
                                type="textarea"
                                icon={IconFileText}
                                rows={2}
                                placeholder="Additional benefits or reimbursements..."
                            />
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
                        
                        <div className="space-y-6">
                            <FormField
                                label="Expected Results"
                                name="results"
                                type="textarea"
                                icon={IconStar}
                                rows={3}
                                placeholder="What outcomes are expected from this role..."
                            />
                            
                            <FormField
                                label="Other Information"
                                name="other"
                                type="textarea"
                                icon={IconFileText}
                                rows={3}
                                placeholder="Any other relevant information..."
                            />
                            
                            <FormField
                                label="Notes"
                                name="notes"
                                type="textarea"
                                icon={IconFileText}
                                rows={3}
                                placeholder="Internal notes or comments..."
                            />
                            
                            <FileField
                                label="Role Attachments"
                                name="attachments"
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
                                    Updating Role...
                                </>
                            ) : (
                                <>
                                    <IconDeviceFloppy size={18} className="mr-2" />
                                    Update Role
                                </>
                            )}
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
        </div>
    );
}
