import { 
    IconUser, 
    IconMail, 
    IconPhone, 
    IconMapPin, 
    IconCalendar, 
    IconClock,
    IconFileText,
    IconCheck,
    IconX
} from '@tabler/icons-react';
import { formatDate, calculateAge } from '../../utiils/dateUtils';

export default function VolunteerView({ volunteer }) {
    if (!volunteer) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 1: return 'bg-green-100 text-green-800';
            case 2: return 'bg-yellow-100 text-yellow-800';
            case 3: return 'bg-red-100 text-red-800';
            case 4: return 'bg-blue-100 text-blue-800';
            case 5: return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1: return 'Active';
            case 2: return 'Pending';
            case 3: return 'Inactive';
            case 4: return 'On Hold';
            case 5: return 'Completed';
            default: return 'Unknown';
        }
    };

    const getGenderText = (gender) => {
        switch (gender) {
            case 1: return 'Male';
            case 2: return 'Female';
            case 3: return 'Other';
            case 0: return 'Not specified';
            default: return 'Not specified';
        }
    };

    const InfoRow = ({ icon: Icon, label, value, isArray = false }) => {
        if (!value || (isArray && (!Array.isArray(value) || value.length === 0))) return null;
        
        return (
            <div className="flex items-start space-x-3">
                <Icon size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    <div className="text-sm text-gray-900 mt-1">
                        {isArray ? value.join(', ') : value}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header with status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconUser size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {volunteer.title && `${volunteer.title} `}{volunteer.first_name} {volunteer.last_name}
                        </h3>
                        <p className="text-gray-600">{volunteer.email}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(volunteer.status)}`}>
                    {getStatusText(volunteer.status)}
                </span>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Contact Information
                    </h4>
                    <InfoRow icon={IconMail} label="Email" value={volunteer.email} />
                    <InfoRow icon={IconPhone} label="Phone" value={volunteer.phone} />
                    <InfoRow 
                        icon={IconMapPin} 
                        label="Address" 
                        value={volunteer.street ? `${volunteer.street}, ${volunteer.city} ${volunteer.post_code}` : `${volunteer.city} ${volunteer.post_code}`} 
                    />
                    <InfoRow icon={IconUser} label="Gender" value={getGenderText(volunteer.gender)} />
                    <InfoRow icon={IconCalendar} label="Age" value={calculateAge(volunteer.year_of_birth)} />
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Volunteer Details
                    </h4>
                    <InfoRow icon={IconClock} label="Hours Available" value={volunteer.hours} />
                    <InfoRow icon={IconCalendar} label="Date Added" value={formatDate(volunteer.date_added)} />
                    <InfoRow icon={IconCalendar} label="Review Date" value={formatDate(volunteer.review_date)} />
                    <InfoRow icon={IconFileText} label="Languages" value={volunteer.languages} />
                </div>
            </div>

            {/* Experience & Qualifications */}
            {(volunteer.qualification || volunteer.work_experience || volunteer.skills) && (
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Experience & Qualifications
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                        {volunteer.qualification && (
                            <div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Qualifications</div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {volunteer.qualification}
                                </div>
                            </div>
                        )}
                        {volunteer.work_experience && (
                            <div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Work Experience</div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {volunteer.work_experience}
                                </div>
                            </div>
                        )}
                        {volunteer.skills && (
                            <div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Skills</div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {volunteer.skills}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Additional Information */}
            {(volunteer.health || volunteer.other_information || volunteer.notes) && (
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Additional Information
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                        {volunteer.health && (
                            <div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Health Information</div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {volunteer.health}
                                </div>
                            </div>
                        )}
                        {volunteer.other_information && (
                            <div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Other Information</div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {volunteer.other_information}
                                </div>
                            </div>
                        )}
                        {volunteer.notes && (
                            <div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Notes</div>
                                <div className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
                                    {volunteer.notes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Lists Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Preferences & Categories
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="font-medium text-gray-700 mb-1">Type of Work</div>
                        <div className="text-gray-600">
                            {volunteer.type_of_work_list && volunteer.type_of_work_list.length > 0 
                                ? `${volunteer.type_of_work_list.length} selected` 
                                : 'None specified'}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-700 mb-1">Regions of Placement</div>
                        <div className="text-gray-600">
                            {volunteer.region_of_placement_list && volunteer.region_of_placement_list.length > 0 
                                ? `${volunteer.region_of_placement_list.length} selected` 
                                : 'None specified'}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-700 mb-1">Available Days</div>
                        <div className="text-gray-600">
                            {volunteer.days_list && volunteer.days_list.length > 0 
                                ? `${volunteer.days_list.length} days selected` 
                                : 'None specified'}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-700 mb-1">Available Times</div>
                        <div className="text-gray-600">
                            {volunteer.time_list && volunteer.time_list.length > 0 
                                ? `${volunteer.time_list.length} times selected` 
                                : 'None specified'}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-700 mb-1">Transport</div>
                        <div className="text-gray-600">
                            {volunteer.transport_list && volunteer.transport_list.length > 0 
                                ? `${volunteer.transport_list.length} options selected` 
                                : 'None specified'}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-700 mb-1">Activities</div>
                        <div className="text-gray-600">
                            {volunteer.activities_list && volunteer.activities_list.length > 0 
                                ? `${volunteer.activities_list.length} activities selected` 
                                : 'None specified'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Timeline
                </h4>
                <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-sm">
                        <IconCalendar size={16} className="text-gray-400" />
                        <span className="text-gray-600">Created:</span>
                        <span className="text-gray-900">{formatDate(volunteer.created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <IconCalendar size={16} className="text-gray-400" />
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="text-gray-900">{formatDate(volunteer.updated_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
