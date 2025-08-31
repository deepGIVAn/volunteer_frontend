import { 
    IconBriefcase, 
    IconBuilding, 
    IconMapPin, 
    IconMail, 
    IconPhone, 
    IconCalendar, 
    IconClock,
    IconFileText,
    IconCheck,
    IconX,
    IconUser,
    IconCar,
    IconUsers,
    IconStar,
    IconSchool,
    IconMedicalCross,
    IconPaperclip,
    IconEye,
    IconHeart,
    IconShield,
    IconAccessible,
    IconStairs,
    IconHome,
    IconClockHour4
} from '@tabler/icons-react';
import { formatDate } from '../../utiils/dateUtils';

export default function RoleView({ role }) {
    if (!role) return null;

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
            case 3: return 'On-Hold';
            default: return 'Unknown';
        }
    };

    const getFilterColorText = (color) => {
        switch (color) {
            case 1: return 'Green';
            case 2: return 'Orange';
            case 3: return 'Red';
            default: return 'Default';
        }
    };

    const getFilterColorBadge = (color) => {
        const colors = {
            0: 'bg-gray-100 text-gray-800',
            1: 'bg-green-100 text-green-800',
            2: 'bg-orange-100 text-orange-800',
            3: 'bg-red-100 text-red-800',
        };
        return colors[color] || colors[0];
    };

    // Mock option mappings - replace with actual data
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

    const activitiesOptions = {
        1: 'Administrative Tasks',
        2: 'Direct Client Support',
        3: 'Event Organisation',
        4: 'Teaching/Training',
        5: 'Fundraising',
        6: 'Research',
        7: 'IT Support'
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
                        <IconBriefcase size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {role.title}
                        </h3>
                        <p className="text-gray-600">{role.organisation?.name}</p>
                        {role.branch && (
                            <p className="text-gray-500 text-sm">{role.branch}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(role.status)}`}>
                        {getStatusText(role.status)}
                    </span>
                    {role.filter_color > 0 && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getFilterColorBadge(role.filter_color)}`}>
                            {getFilterColorText(role.filter_color)} Priority
                        </span>
                    )}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Role Information</h4>
                    
                    <InfoRow icon={IconBriefcase} label="Role Title" value={role.title} />
                    <InfoRow icon={IconBuilding} label="Organisation" value={role.organisation?.name} />
                    <InfoRow icon={IconMapPin} label="Branch" value={role.branch} />
                    <InfoRow icon={IconUsers} label="Volunteers Required" value={role.vols_req} />
                    <InfoRow icon={IconClock} label="Hours" value={role.leagues_hours} />
                    <InfoRow icon={IconCalendar} label="Days" value={role.leagues_days} />

                    {role.description && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconFileText size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Description:</span>
                                <div className="mt-1 text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {role.description}
                                </div>
                            </div>
                        </div>
                    )}

                    {role.skills && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconStar size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Required Skills:</span>
                                <div className="mt-1 text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {role.skills}
                                </div>
                            </div>
                        </div>
                    )}

                    {role.personality && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconHeart size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Personality Traits:</span>
                                <div className="mt-1 text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {role.personality}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placement Preferences */}
                    {role.region_of_placement_list && role.region_of_placement_list.length > 0 && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconMapPin size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Regions:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {mapArrayToOptions(role.region_of_placement_list, regionOptions).map((region, index) => (
                                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                            {region}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {role.days_list && role.days_list.length > 0 && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconCalendar size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Available Days:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {mapArrayToOptions(role.days_list, daysOptions).map((day, index) => (
                                        <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                                            {day}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {role.time_list && role.time_list.length > 0 && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconClockHour4 size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Available Times:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {mapArrayToOptions(role.time_list, timeOptions).map((time, index) => (
                                        <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                                            {time}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Contact & Requirements</h4>
                    
                    <InfoRow icon={IconUser} label="Contact Person" value={role.contact} />
                    <InfoRow icon={IconMail} label="Email" value={role.email} />
                    <InfoRow icon={IconFileText} label="Reports To" value={role.reports} />

                    {/* Requirements Section */}
                    <div className="pt-4">
                        <h5 className="text-md font-medium text-gray-900 mb-3">Requirements</h5>
                        
                        <InfoRow icon={IconShield} label="Criminal Check Required" value={role.criminal} isBoolean={true} />
                        <InfoRow icon={IconCar} label="Transport Required" value={role.transport} isBoolean={true} />
                        <InfoRow icon={IconAccessible} label="Wheelchair Access" value={role.wheelchair} isBoolean={true} />
                        <InfoRow icon={IconFileText} label="Toilet Facilities" value={role.toilet} isBoolean={true} />
                        <InfoRow icon={IconStairs} label="Stairs Access" value={role.stairs} isBoolean={true} />
                        <InfoRow icon={IconHome} label="Home Based" value={role.home} isBoolean={true} />
                        <InfoRow icon={IconCalendar} label="One-off Role" value={role.oneoff} isBoolean={true} />
                        <InfoRow icon={IconFileText} label="Paid Position" value={role.paid_job} isBoolean={true} />
                    </div>

                    {/* Special Requirements */}
                    <div className="pt-4">
                        <h5 className="text-md font-medium text-gray-900 mb-3">Special Requirements</h5>
                        
                        <InfoRow icon={IconUsers} label="Youth Work" value={role.youth} isBoolean={true} />
                        <InfoRow icon={IconFileText} label="English Required" value={role.english} isBoolean={true} />
                        <InfoRow icon={IconAccessible} label="Disability Support" value={role.disability} isBoolean={true} />
                        <InfoRow icon={IconMedicalCross} label="Mental Health Support" value={role.mental} isBoolean={true} />
                    </div>

                    {/* Dates */}
                    <div className="pt-4">
                        <h5 className="text-md font-medium text-gray-900 mb-3">Timeline</h5>
                        
                        <InfoRow icon={IconCalendar} label="Start Date" value={role.start_date ? formatDate(role.start_date) : null} />
                        <InfoRow icon={IconCalendar} label="End Date" value={role.end_date ? formatDate(role.end_date) : null} />
                        <InfoRow icon={IconCalendar} label="Date Added" value={role.date_added ? formatDate(role.date_added) : null} />
                    </div>
                </div>
            </div>

            {/* Training & Support Section */}
            {(role.training || role.reimbursement || role.reimbursement_other || role.supervision) && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Training & Support</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {role.training && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconSchool size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Training Provided:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {role.training}
                                </div>
                            </div>
                        )}
                        {role.reimbursement && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconFileText size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Reimbursements:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {role.reimbursement}
                                    {role.reimbursement_other && (
                                        <>
                                            <br />
                                            <strong>Other:</strong> {role.reimbursement_other}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        {role.supervision && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconUser size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Supervision:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {role.supervision}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Activities Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Activity Categories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { key: 'activities_driving_list', label: 'Driving' },
                        { key: 'activities_administration_list', label: 'Administration' },
                        { key: 'activities_mantinance_list', label: 'Maintenance' },
                        { key: 'activities_home_cares_list', label: 'Home Care' },
                        { key: 'activities_technology_list', label: 'Technology' },
                        { key: 'activities_event_list', label: 'Events' },
                        { key: 'activities_hospitality_list', label: 'Hospitality' },
                        { key: 'activities_support_list', label: 'Support' },
                        { key: 'activities_financial_list', label: 'Financial' },
                        { key: 'activities_other_list', label: 'Other' },
                        { key: 'activities_sport_list', label: 'Sports' },
                        { key: 'activities_group_list', label: 'Group Activities' }
                    ].map(({ key, label }) => {
                        const activities = role[key];
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

            {/* Additional Information */}
            {(role.results || role.other || role.notes) && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h4>
                    <div className="grid grid-cols-1 gap-4">
                        {role.results && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconStar size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Expected Results:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {role.results}
                                </div>
                            </div>
                        )}
                        {role.other && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconFileText size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Other Information:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {role.other}
                                </div>
                            </div>
                        )}
                        {role.notes && (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <IconFileText size={20} className="text-[#C7102F]" />
                                    <span className="text-sm font-medium text-gray-600">Notes:</span>
                                </div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3 ml-8">
                                    {role.notes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Attachments Section */}
            {role.attachments && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Attachments</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconPaperclip size={20} className="text-[#C7102F]" />
                                <span className="text-sm text-gray-700">{role.attachments}</span>
                            </div>
                            <button
                                onClick={() => {
                                    if (role.attachments) {
                                        window.open(role.attachments, '_blank');
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
            )}

            {/* Timeline */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4">System Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {role.date_added && (
                        <div>
                            <span className="font-medium text-gray-600">Added:</span>
                            <p className="text-gray-900">{formatDate(role.date_added)}</p>
                        </div>
                    )}
                    {/* {role.created_at && (
                        <div>
                            <span className="font-medium text-gray-600">Created:</span>
                            <p className="text-gray-900">{formatDate(role.created_at)}</p>
                        </div>
                    )}
                    {role.updated_at && (
                        <div>
                            <span className="font-medium text-gray-600">Last Updated:</span>
                            <p className="text-gray-900">{formatDate(role.updated_at)}</p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
