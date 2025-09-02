import { 
    IconUser, 
    IconMail, 
    IconPhone, 
    IconMapPin, 
    IconCalendar, 
    IconClock,
    IconFileText,
    IconCheck,
    IconX,
    // IconHeart,
    IconCar,
    IconUsers,
    IconStar,
    IconBriefcase,
    IconSchool,
    IconMedicalCross,
    IconPaperclip,
    IconEye,
    IconMessage
} from '@tabler/icons-react';
import { formatDate, calculateAge, formatDateTime } from '../../utiils/dateUtils';

export default function VolunteerView({ volunteer }) {
    if (!volunteer) return null;

    const InfoRow = ({ icon: Icon, label, value, isArray = false, isBoolean = false }) => {
        if (!value && !isBoolean && (!isArray || (isArray && (!Array.isArray(value) || value.length === 0)))) return null;
        
        return (
            <div className="flex items-start space-x-3 py-2">
                <Icon size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                <div className="flex-1">
                    <span className="text-sm font-medium text-gray-600">{label}:</span>
                    <div className="mt-1">
                        {isBoolean ? (
                            <div className="flex items-center space-x-2">
                                {value ? (
                                    <IconCheck size={16} className="text-green-600" />
                                ) : (
                                    <IconX size={16} className="text-red-600" />
                                )}
                                <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                                    {value ? 'Yes' : 'No'}
                                </span>
                            </div>
                        ) : isArray ? (
                            <div className="flex flex-wrap gap-2">
                                {value.map((item, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-900 whitespace-pre-wrap">{value}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 1: return 'bg-green-100 text-green-800';
            case 2: return 'bg-red-100 text-red-800';
            case 3: return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1: return 'Active';
            case 2: return 'DeActivated';
            case 3: return 'Review';
            default: return 'Unknown';
        }
    };

    const getGenderText = (gender) => {
        switch (gender) {
            case 1: return 'Male';
            case 2: return 'Female';
            case 3: return 'Other';
            case 4: return 'Not to Answer';
            default: return 'Not specified';
        }
    };

    const getColorText = (color) => {
        switch (color) {
            case 0: return 'NiL';
            case 1: return 'Green';
            case 2: return 'Orange';
            case 3: return 'Red';
            default: return 'Default';
        }
    };

    // Mock option mappings - replace with actual data
    const typeOfWorkOptions = {
        1: 'Community Services',
        2: 'Education & Training',
        3: 'Health & Medical',
        4: 'Environment',
        5: 'Arts & Culture'
    };

    const regionOptions = {
        1: 'Palmerston North',
        2: 'Manawatū',
        3: 'Horowhenua',
        4: 'Tararua'
    };

    const daysOptions = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
    };

    const timeOptions = {
        1: 'Morning (6am-12pm)',
        2: 'Afternoon (12pm-6pm)',
        3: 'Evening (6pm-12am)',
        4: 'Night (12am-6am)'
    };

    const transportOptions = {
        1: 'Own Vehicle',
        2: 'Public Transport',
        3: 'Walking/Cycling',
        4: 'Needs Transport'
    };

    const activitiesOptions = {
        1: 'Administrative Tasks',
        2: 'Direct Client Support',
        3: 'Event Organisation',
        4: 'Teaching/Training',
        5: 'Fundraising',
        6: 'Research',
        7: 'IT Support'
    };

    const ethnicOriginOptions = {
        1: 'NZ European',
        2: 'Māori',
        3: 'Pacific Islander',
        4: 'Asian',
        5: 'Other'
    };

    const mapArrayToOptions = (array, optionsMap) => {
        if (!array || !Array.isArray(array)) return [];
        return array.map(id => optionsMap[id]).filter(Boolean);
    };

    return (
        <div className="p-6">
            {/* Header with Status */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconUser size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {volunteer.title && `${volunteer.title} `}{volunteer.first_name} {volunteer.last_name}
                        </h3>
                        <p className="text-gray-600">{volunteer.email}</p>
                        {volunteer.year_of_birth && (
                            <p className="text-gray-500 text-sm">Age: {calculateAge(volunteer.year_of_birth)}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(volunteer.status)}`}>
                        {getStatusText(volunteer.status)}
                    </span>
                    {volunteer.color > 0 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            Color: {getColorText(volunteer.color)}
                        </span>
                    )}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                    
                    <InfoRow icon={IconUser} label="Title" value={volunteer.title} />
                    <InfoRow icon={IconUser} label="Full Name" value={`${volunteer.first_name} ${volunteer.last_name}`} />
                    <InfoRow icon={IconMail} label="Email" value={volunteer.email} />
                    <InfoRow icon={IconPhone} label="Phone" value={volunteer.phone} />
                    <InfoRow 
                        icon={IconMapPin} 
                        label="Address" 
                        value={volunteer.street ? `${volunteer.street}, ${volunteer.city} ${volunteer.post_code}` : `${volunteer.city} ${volunteer.post_code}`} 
                    />
                    <InfoRow icon={IconUser} label="Gender" value={getGenderText(volunteer.gender)} />
                    <InfoRow icon={IconCalendar} label="Year of Birth" value={volunteer.year_of_birth} />
                    <InfoRow icon={IconFileText} label="Languages" value={volunteer.languages} />

                    {volunteer.ethnic_origin_list && volunteer.ethnic_origin_list.length > 0 && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconUsers size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Ethnic Origin:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {mapArrayToOptions(volunteer.ethnic_origin_list, ethnicOriginOptions).map((origin, index) => (
                                        <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                                            {origin}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Experience & Qualifications */}
                    <div className="pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Experience & Qualifications</h4>
                        
                        <InfoRow icon={IconSchool} label="Qualifications" value={volunteer.qualification} />
                        <InfoRow icon={IconBriefcase} label="Work Experience" value={volunteer.work_experience} />
                        <InfoRow icon={IconStar} label="Skills" value={volunteer.skills} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Volunteer Details</h4>
                    
                    <InfoRow icon={IconClock} label="Hours Available" value={volunteer.hours} />
                    <InfoRow icon={IconCalendar} label="Date Added" value={formatDate(volunteer.date_added)} />
                    <InfoRow icon={IconCalendar} label="Review Date" value={formatDate(volunteer.review_date)} />

                    {/* Work Preferences */}
                    <div className="pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Work Preferences</h4>
                        
                        {volunteer.type_of_work_list && volunteer.type_of_work_list.length > 0 && (
                            <div className="flex items-start space-x-3 py-2">
                                <IconBriefcase size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-600">Type of Work:</span>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {mapArrayToOptions(volunteer.type_of_work_list, typeOfWorkOptions).map((work, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                                {work}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {volunteer.region_of_placement_list && volunteer.region_of_placement_list.length > 0 && (
                            <div className="flex items-start space-x-3 py-2">
                                <IconMapPin size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-600">Regions of Placement:</span>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {mapArrayToOptions(volunteer.region_of_placement_list, regionOptions).map((region, index) => (
                                            <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                                {region}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {volunteer.days_list && volunteer.days_list.length > 0 && (
                            <div className="flex items-start space-x-3 py-2">
                                <IconCalendar size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-600">Available Days:</span>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {mapArrayToOptions(volunteer.days_list, daysOptions).map((day, index) => (
                                            <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {volunteer.time_list && volunteer.time_list.length > 0 && (
                            <div className="flex items-start space-x-3 py-2">
                                <IconClock size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-600">Available Times:</span>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {mapArrayToOptions(volunteer.time_list, timeOptions).map((time, index) => (
                                            <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                                                {time}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {volunteer.transport_list && volunteer.transport_list.length > 0 && (
                            <div className="flex items-start space-x-3 py-2">
                                <IconCar size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-600">Transport:</span>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {mapArrayToOptions(volunteer.transport_list, transportOptions).map((transport, index) => (
                                            <span key={index} className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">
                                                {transport}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Activities Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Activity Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {volunteer.activities_list && volunteer.activities_list.length > 0 && (
                        <div>
                            <span className="text-sm font-medium text-gray-600">General Activities:</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {mapArrayToOptions(volunteer.activities_list, activitiesOptions).map((activity, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                        {activity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {[
                        { key: 'activities_driving_list', label: 'Driving' },
                        { key: 'activities_administration_list', label: 'Administration' },
                        { key: 'activities_mantinance_list', label: 'Maintenance' },
                        { key: 'activities_homecares_list', label: 'Home Care' },
                        { key: 'activities_technology_list', label: 'Technology' },
                        { key: 'activities_event_list', label: 'Events' },
                        { key: 'activities_hospitality_list', label: 'Hospitality' },
                        { key: 'activities_support_list', label: 'Support' },
                        { key: 'activities_financial_list', label: 'Financial' },
                        { key: 'activities_other_list', label: 'Other' },
                        { key: 'activities_sport_list', label: 'Sports' },
                        { key: 'activities_group_list', label: 'Group Activities' }
                    ].map(({ key, label }) => {
                        const activities = volunteer[key];
                        if (!activities || activities.length === 0) return null;
                        
                        return (
                            <div key={key}>
                                <span className="text-sm font-medium text-gray-600">{label}:</span>
                                <div className="mt-1">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                        {activities.length} selected
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Health and Additional Information */}
            {(volunteer.health || volunteer.other_information || volunteer.notes) && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h4>
                    <div className="grid grid-cols-1 gap-4">
                        {volunteer.health && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconMedicalCross size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Health Information:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {volunteer.health}
                                </div>
                            </div>
                        )}
                        {volunteer.other_information && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconFileText size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Other Information:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {volunteer.other_information}
                                </div>
                            </div>
                        )}
                        {volunteer.notes && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconFileText size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Notes:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {volunteer.notes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Attachments Section - if needed in future */}
            {volunteer.attachment && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Attachments</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconPaperclip size={20} className="text-[#C7102F]" />
                                <div>
                                    <button
                                        onClick={() => {
                                            if (volunteer.attachment) {
                                                window.open(volunteer.attachment, '_blank');
                                            }
                                        }}
                                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                                        title="Preview attachment"
                                    >
                                        <IconEye size={14} className="mr-1" />
                                        Preview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Section */}
            {volunteer.comments && volunteer.comments.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <IconMessage size={20} className="mr-2 text-[#C7102F]" />
                        Comments History
                    </h4>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {volunteer.comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 rounded-lg py-2 px-3 border border-gray-100 flex flex-wrap gap-3 items-end">
                                <p className="text-gray-800 text-sm">{comment.comment}</p>
                                <div className="text-xs text-gray-500">
                                    By <span className="font-medium">{comment.admin || comment.created_by}</span> on {formatDateTime(comment.created_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Timeline */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {volunteer.date_added && (
                        <div>
                            <span className="font-medium text-gray-600">Added:</span>
                            <p className="text-gray-900">{formatDate(volunteer.date_added)}</p>
                        </div>
                    )}
                    {volunteer.review_date && (
                        <div>
                            <span className="font-medium text-gray-600">Next Review:</span>
                            <p className="text-gray-900">{formatDate(volunteer.review_date)}</p>
                        </div>
                    )}
                    {/* {volunteer.created_at && (
                        <div>
                            <span className="font-medium text-gray-600">Created:</span>
                            <p className="text-gray-900">{formatDate(volunteer.created_at)}</p>
                        </div>
                    )}
                    {volunteer.updated_at && (
                        <div>
                            <span className="font-medium text-gray-600">Last Updated:</span>
                            <p className="text-gray-900">{formatDate(volunteer.updated_at)}</p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
