import { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from '@remix-run/react';
import { 
    IconPlus, 
    IconEye, 
    IconEdit, 
    IconSearch,
    IconFilter,
    IconBuilding,
    IconChevronDown,
    IconDownload,
    IconUser,
    IconCalendar
} from '@tabler/icons-react';
import Popup from '../../components/base/Popup';
import OrganisationView from '../../components/base/OrganisationView';
import { formatDateForFilename } from '../../utiils/dateUtils';
import clsx from 'clsx';

export default function AdminOrganisationsPage() {
    const { user } = useRouteLoaderData("routes/admin");
    const [organisations, setOrganisations] = useState([]);
    const [filteredOrganisations, setFilteredOrganisations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedOrganisation, setSelectedOrganisation] = useState(null);
    const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchOrganisations = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-organisations/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': user?.token ? `Bearer ${user.token}` : ''
                    },
                });
                const mockData = await response.json();
                
                setOrganisations(mockData);
                setFilteredOrganisations(mockData);
            } catch (error) {
                console.error('Error fetching organisations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrganisations();
    }, []);

    // Filter organisations based on search term and status
    useEffect(() => {
        let filtered = organisations;

        if (searchTerm) {
            filtered = filtered.filter(org =>
                org.organisation_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                org.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                org.contact_email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(org => org.status === parseInt(statusFilter));
        }

        setFilteredOrganisations(filtered);
    }, [searchTerm, statusFilter, organisations]);

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

    const handleViewOrganisation = (organisation) => {
        setSelectedOrganisation(organisation);
        setIsViewPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsViewPopupOpen(false);
        setSelectedOrganisation(null);
    };

    const handleExportToExcel = async () => {
        setExportLoading(true);
        try {
            // TODO: Replace with actual API call to export organisations
            // For now, we'll create a simple CSV export using the current data
            const csvContent = [
                // CSV Header
                ['Name', 'Branch', 'Contact Name', 'Contact Email', 'Contact Phone', 'Address', 'Status', 'Types', 'Regions'].join(','),
                // CSV Data
                ...filteredOrganisations.map(org => [
                    `"${org.organisation_name || ''}"`,
                    `"${org.organisation_branch || ''}"`,
                    `"${org.contact_name || ''}"`,
                    `"${org.contact_email || ''}"`,
                    `"${org.contact_phone || ''}"`,
                    `"${org.physical_address || ''}"`,
                    `"${getStatusText(org.status)}"`,
                    `"${org.organisation_types_list ? org.organisation_types_list.join('; ') : ''}"`,
                    `"${org.regions ? org.regions.join('; ') : ''}"`
                ].join(','))
            ].join('\n');

            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `organisations_export_${formatDateForFilename()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting data:', error);
            alert('Error exporting data. Please try again.');
        } finally {
            setExportLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Organisations Management</h1>
                    <p className="text-gray-600 mt-1">Manage volunteer organisations and their details</p>
                </div>
                <Link
                    to="/admin/add-organisation"
                    className="inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
                >
                    <IconPlus size={20} className="mr-2" />
                    Add Organisation
                </Link>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-4">
                            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-[#C7102F] rounded-full animate-spin border-t-transparent"></div>
                        </div>
                        <p className="text-gray-600 font-medium">Loading organisations...</p>
                        <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your data</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Organisations</p>
                                    <p className="text-2xl font-bold text-gray-900">{organisations.length}</p>
                                </div>
                                <IconBuilding className="text-blue-500" size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Active</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {organisations.filter(org => org.status === 1).length}
                                    </p>
                                </div>
                                <IconFilter className="text-green-500" size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Inactive</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {organisations.filter(org => org.status === 2).length}
                                    </p>
                                </div>
                                <IconUser className="text-red-500" size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Awaiting Approval</p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {organisations.filter(org => org.status === 3).length}
                                    </p>
                                </div>
                                <IconCalendar className="text-yellow-500" size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Draft</p>
                                    <p className="text-2xl font-bold text-gray-600">
                                        {organisations.filter(org => org.status === 4).length}
                                    </p>
                                </div>
                                <IconUser className="text-gray-500" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <IconSearch size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search organisations, contacts, or emails..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="sm:w-48">
                                <div className="relative">
                                    <IconFilter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full pl-10 pr-8 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none"
                                    >
                                        <option value="">All Status</option>
                                        <option value="1">Active</option>
                                        <option value="2">Inactive</option>
                                        <option value="3">Awaiting Approval</option>
                                        <option value="4">Draft</option>
                                    </select>
                                    <IconChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Export Button */}
                            <div className="sm:w-auto">
                                <button
                                    onClick={handleExportToExcel}
                                    disabled={exportLoading || filteredOrganisations.length === 0}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
                                >
                                    {exportLoading ? (
                                        <>
                                            <svg className="animate-spin h-3.5 w-3.5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                            </svg>
                                            Exporting...
                                        </>
                                    ) : (
                                        <>
                                            <IconDownload size={16} className="mr-2" />
                                            Export Excel
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Organisations Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrganisations.length > 0 ? (
                                        filteredOrganisations.map((organisation) => (
                                            <tr key={organisation.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                            <IconBuilding size={16} className="text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {organisation.organisation_name}
                                                            </div>
                                                            {organisation.organisation_branch && (
                                                                <div className="text-sm text-gray-500">
                                                                    {organisation.organisation_branch}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{organisation.contact_name || 'N/A'}</div>
                                                    <div className="text-sm text-gray-500">{organisation.contact_email || 'N/A'}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs line-clamp-2">
                                                        {organisation.physical_address || 'N/A'}
                                                    </div>
                                                    {/* {organisation.regions && organisation.regions.length > 0 && (
                                                        <div className="text-sm text-gray-500">
                                                            Regions: {organisation.regions.join(', ')}
                                                        </div>
                                                    )} */}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={clsx(
                                                        "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                                        getStatusColor(organisation.status)
                                                    )}>
                                                        {getStatusText(organisation.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {organisation.organisation_type_list && organisation.organisation_type_list.length > 0 ? (
                                                            organisation.organisation_type_list.slice(0, 2).map((type, index) => (
                                                                <span key={index} className="inline-flex text-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                                    {type}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-sm text-gray-500">No types</span>
                                                        )}
                                                        {organisation.organisation_type_list && organisation.organisation_type_list.length > 2 && (
                                                            <span className="text-xs text-gray-500">+{organisation.organisation_type_list.length - 2} more</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleViewOrganisation(organisation)}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                                                        >
                                                            <IconEye size={16} />
                                                            View
                                                        </button>
                                                        <Link
                                                            to={`/admin/edit-organisation/${organisation.id}`}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                                                        >
                                                            <IconEdit size={16} />
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center">
                                                    <IconBuilding size={48} className="text-gray-300 mb-4" />
                                                    <p className="text-lg font-medium">No organisations found</p>
                                                    <p className="text-sm">
                                                        {searchTerm || statusFilter
                                                            ? "Try adjusting your filters to see more results."
                                                            : "Get started by adding your first organisation."
                                                        }
                                                    </p>
                                                    {!searchTerm && !statusFilter && (
                                                        <Link
                                                            to="/admin/add-organisation"
                                                            className="mt-4 inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors"
                                                        >
                                                            <IconPlus size={20} className="mr-2" />
                                                            Add Organisation
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* View Organisation Popup */}
                    <Popup
                        isOpen={isViewPopupOpen}
                        onClose={handleClosePopup}
                        title="Organisation Details"
                        maxWidth="max-w-6xl"
                    >
                        <OrganisationView organisation={selectedOrganisation} />
                    </Popup>
                </>
            )}
        </div>
    );
}
