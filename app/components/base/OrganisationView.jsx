import { 
    IconBuilding, 
    IconMapPin, 
    IconMail, 
    IconPhone, 
    IconWorld,
    IconUser,
    IconClock,
    IconCheck,
    IconX,
    IconFileText,
    IconPaperclip,
    // IconDownload,
    IconEye
} from '@tabler/icons-react';
import { formatDate } from '../../utiils/dateUtils';

export default function OrganisationView({ organisation }) {
    if (!organisation) return null;

    const InfoRow = ({ icon: Icon, label, value, isBoolean = false }) => {
        if (!value && !isBoolean) return null;
        
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
            case 4: return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1: return 'Active';
            case 2: return 'Inactive';
            case 3: return 'Awaiting Approval';
            case 4: return 'Draft';
            default: return 'Unknown';
        }
    };

    return (
        <div className="p-6">
            {/* Header with Status */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {organisation.organisation_name || 'Unnamed Organisation'}
                    </h3>
                    {organisation.organisation_branch && (
                        <p className="text-gray-600 mt-1">{organisation.organisation_branch}</p>
                    )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(organisation.status)}`}>
                    {getStatusText(organisation.status)}
                </span>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Organisation Details</h4>
                    
                    <InfoRow 
                        icon={IconUser} 
                        label="Title" 
                        value={organisation.title} 
                    />
                    
                    <InfoRow 
                        icon={IconBuilding} 
                        label="Organisation Name" 
                        value={organisation.organisation_name} 
                    />
                    
                    <InfoRow 
                        icon={IconMapPin} 
                        label="Physical Address" 
                        value={organisation.physical_address} 
                    />
                    
                    <InfoRow 
                        icon={IconMapPin} 
                        label="Postal Address" 
                        value={organisation.postal_address} 
                    />
                    
                    <InfoRow 
                        icon={IconWorld} 
                        label="Website" 
                        value={organisation.website} 
                    />
                    
                    <InfoRow 
                        icon={IconFileText} 
                        label="Company Aim" 
                        value={organisation.company_aim} 
                    />

                    {organisation.regions && organisation.regions.length > 0 && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconMapPin size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Regions:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {organisation.regions.map((region, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                            {region}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {organisation.organisation_types && organisation.organisation_types.length > 0 && (
                        <div className="flex items-start space-x-3 py-2">
                            <IconBuilding size={20} className="text-[#C7102F] mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-600">Organisation Types:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {organisation.organisation_types.map((type, index) => (
                                        <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                    
                    <InfoRow 
                        icon={IconUser} 
                        label="Contact Name" 
                        value={organisation.contact_name} 
                    />
                    
                    <InfoRow 
                        icon={IconPhone} 
                        label="Contact Phone" 
                        value={organisation.contact_phone} 
                    />
                    
                    <InfoRow 
                        icon={IconMail} 
                        label="Contact Email" 
                        value={organisation.contact_email} 
                    />

                    <div className="pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Volunteer Coordinator</h4>
                        
                        <InfoRow 
                            icon={IconUser} 
                            label="Volunteer Name" 
                            value={organisation.volunteer_name} 
                        />
                        
                        <InfoRow 
                            icon={IconPhone} 
                            label="Volunteer Phone" 
                            value={organisation.volunteer_phone} 
                        />
                        
                        <InfoRow 
                            icon={IconMail} 
                            label="Volunteer Email" 
                            value={organisation.volunteer_email} 
                        />
                        
                        <InfoRow 
                            icon={IconClock} 
                            label="Time Role" 
                            value={organisation.time_role} 
                        />
                    </div>

                    <div className="pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h4>
                        
                        <InfoRow 
                            icon={IconFileText} 
                            label="Charity Number" 
                            value={organisation.charity_number} 
                        />
                        
                        <InfoRow 
                            icon={IconFileText} 
                            label="Fee" 
                            value={organisation.fee} 
                        />
                        
                        <InfoRow 
                            icon={IconCheck} 
                            label="Disability Support" 
                            value={organisation.disability} 
                            isBoolean={true}
                        />
                        
                        <InfoRow 
                            icon={IconCheck} 
                            label="Policies in Place" 
                            value={organisation.policies} 
                            isBoolean={true}
                        />
                        
                        <InfoRow 
                            icon={IconCheck} 
                            label="Risk Assessment" 
                            value={organisation.risk} 
                            isBoolean={true}
                        />
                    </div>

                    {/* Attachments Section */}
                    {organisation.attachment && (
                        <div className="pt-4">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Attachments</h4>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <IconPaperclip size={20} className="text-[#C7102F]" />
                                        <span className="text-sm text-gray-700">
                                          {organisation.attachment && organisation.attachment.length > 20
                                            ? organisation.attachment.slice(0, 52) + '...'
                                            : organisation.attachment}
                                        </span>
                                    </div>
                                        <button
                                            onClick={() => {
                                                console.log(organisation.attachment);
                                                // Preview functionality
                                                if (organisation.attachment) {
                                                    window.open(organisation.attachment, '_blank');
                                                }
                                            }}
                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                                            title="Preview attachment"
                                        >
                                            <IconEye size={14} className="mr-1" />
                                            Preview
                                        </button>
                                    <div className="flex items-center space-x-2">
                                        {/* <button
                                            onClick={() => {
                                                // Download functionality
                                                if (organisation.attachment_url) {
                                                    const link = document.createElement('a');
                                                    link.href = organisation.attachment_url;
                                                    link.download = organisation.attachment_name || 'organisation_document';
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }
                                            }}
                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
                                            title="Download attachment"
                                        >
                                            <IconDownload size={14} className="mr-1" />
                                            Download
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Dates */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {organisation.added_date && (
                        <div>
                            <span className="font-medium text-gray-600">Added:</span>
                            <p className="text-gray-900">{formatDate(organisation.added_date)}</p>
                        </div>
                    )}
                    {organisation.deactivated_date && (
                        <div>
                            <span className="font-medium text-gray-600">Deactivated:</span>
                            <p className="text-gray-900">{formatDate(organisation.deactivated_date)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
