import { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from '@remix-run/react';
import { 
    IconPlus, 
    IconEye, 
    IconEdit, 
    IconSearch,
    IconFilter,
    IconUser,
    IconMail,
    IconPhone,
    IconChevronDown,
    IconCalendar,
    IconDownload,
    IconMapPin
} from '@tabler/icons-react';
import Popup from '../../components/base/Popup';
import VolunteerView from '../../components/base/VolunteerView';
import { formatDateForFilename, calculateAge } from '../../utiils/dateUtils';
import clsx from 'clsx';

export default function AdminVolunteersPage() {
    const { user } = useRouteLoaderData("routes/admin");
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockData = [
                    {
                        id: '1',
                        title: 'Ms.',
                        first_name: 'Sarah',
                        last_name: 'Johnson',
                        email: 'sarah.johnson@email.com',
                        street: '123 Main Street',
                        city: 'Palmerston North',
                        post_code: '4410',
                        phone: '06-123-4567',
                        year_of_birth: 1985,
                        date_added: '2024-01-15T10:30:00Z',
                        hours: '10-15 hours/week',
                        qualification: 'Bachelor of Social Work',
                        work_experience: '5 years in community services',
                        skills: 'Communication, Event planning, Computer skills',
                        health: 'Good health, no restrictions',
                        other_information: 'Available weekends',
                        notes: 'Very reliable volunteer',
                        languages: 'English, Māori',
                        type_of_work_list: [1, 3],
                        region_of_placement_list: [1, 2],
                        refer_from_list: [1],
                        days_list: [1, 2, 6],
                        time_list: [1, 2],
                        labour_list: [1],
                        status: 1,
                        color: 1,
                        transport_list: [1, 2],
                        review_date: '2024-12-15T10:30:00Z',
                        gender: 2,
                        ethnic_origin_list: [1],
                        activities_list: [1, 2, 3],
                        activities_driving_list: [1],
                        activities_administration_list: [1, 2],
                        activities_mantinance_list: [],
                        activities_homecares_list: [1],
                        activities_technology_list: [1, 2],
                        activities_event_list: [1],
                        activities_hospitality_list: [],
                        activities_support_list: [1, 2],
                        activities_financial_list: [],
                        activities_other_list: [],
                        activities_sport_list: [1],
                        activities_group_list: [1],
                        deleted_at: null,
                        created_at: '2024-01-15T10:30:00Z',
                        updated_at: '2024-01-20T14:45:00Z'
                    },
                    {
                        id: '2',
                        title: 'Mr.',
                        first_name: 'Michael',
                        last_name: 'Brown',
                        email: 'michael.brown@email.com',
                        street: '456 Oak Avenue',
                        city: 'Levin',
                        post_code: '5510',
                        phone: '06-987-6543',
                        year_of_birth: 1978,
                        date_added: '2024-02-01T09:15:00Z',
                        hours: '5-10 hours/week',
                        qualification: 'Certificate in First Aid',
                        work_experience: 'Retired teacher, 30 years experience',
                        skills: 'Teaching, Mentoring, Sports coaching',
                        health: 'Good health',
                        other_information: 'Prefers outdoor activities',
                        notes: 'Great with youth programs',
                        languages: 'English',
                        type_of_work_list: [2, 4],
                        region_of_placement_list: [3],
                        refer_from_list: [2],
                        days_list: [3, 4, 5],
                        time_list: [2, 3],
                        labour_list: [2],
                        status: 1,
                        color: 2,
                        transport_list: [1],
                        review_date: '2024-11-01T09:15:00Z',
                        gender: 1,
                        ethnic_origin_list: [2],
                        activities_list: [4, 5],
                        activities_driving_list: [],
                        activities_administration_list: [],
                        activities_mantinance_list: [1],
                        activities_homecares_list: [],
                        activities_technology_list: [],
                        activities_event_list: [1, 2],
                        activities_hospitality_list: [1],
                        activities_support_list: [1],
                        activities_financial_list: [],
                        activities_other_list: [1],
                        activities_sport_list: [1, 2],
                        activities_group_list: [],
                        deleted_at: null,
                        created_at: '2024-02-01T09:15:00Z',
                        updated_at: '2024-02-10T11:20:00Z'
                    },
                    {
                        id: '3',
                        title: 'Dr.',
                        first_name: 'Emma',
                        last_name: 'Wilson',
                        email: 'emma.wilson@email.com',
                        street: '789 Pine Road',
                        city: 'Feilding',
                        post_code: '4702',
                        phone: '06-555-1234',
                        year_of_birth: 1990,
                        date_added: '2024-01-05T16:00:00Z',
                        hours: '20+ hours/week',
                        qualification: 'PhD in Psychology',
                        work_experience: 'Clinical psychologist, research background',
                        skills: 'Counseling, Research, Data analysis',
                        health: 'Excellent health',
                        other_information: 'Specializes in youth mental health',
                        notes: 'Highly qualified, dedicated volunteer',
                        languages: 'English, Spanish, French',
                        type_of_work_list: [1, 5],
                        region_of_placement_list: [1, 4],
                        refer_from_list: [3],
                        days_list: [1, 2, 3, 4, 5],
                        time_list: [1, 2, 3],
                        labour_list: [1, 3],
                        status: 2,
                        color: 3,
                        transport_list: [1, 2, 3],
                        review_date: '2024-10-05T16:00:00Z',
                        gender: 2,
                        ethnic_origin_list: [1, 3],
                        activities_list: [1, 6, 7],
                        activities_driving_list: [1],
                        activities_administration_list: [1, 2, 3],
                        activities_mantinance_list: [],
                        activities_homecares_list: [1, 2],
                        activities_technology_list: [1, 2, 3],
                        activities_event_list: [1, 2, 3],
                        activities_hospitality_list: [1],
                        activities_support_list: [1, 2, 3],
                        activities_financial_list: [1],
                        activities_other_list: [1, 2],
                        activities_sport_list: [],
                        activities_group_list: [1, 2],
                        deleted_at: null,
                        created_at: '2024-01-05T16:00:00Z',
                        updated_at: '2024-01-05T16:00:00Z'
                    }
                ];
                
                setVolunteers(mockData);
                setFilteredVolunteers(mockData);
            } catch (error) {
                console.error('Error fetching volunteers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVolunteers();
    }, []);

    // Filter volunteers based on search term and status
    useEffect(() => {
        let filtered = volunteers;

        if (searchTerm) {
            filtered = filtered.filter(volunteer =>
                `${volunteer.first_name} ${volunteer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                volunteer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                volunteer.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                volunteer.city?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(volunteer => volunteer.status === parseInt(statusFilter));
        }

        setFilteredVolunteers(filtered);
    }, [searchTerm, statusFilter, volunteers]);

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

    const handleViewVolunteer = (volunteer) => {
        setSelectedVolunteer(volunteer);
        setIsViewPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsViewPopupOpen(false);
        setSelectedVolunteer(null);
    };

    const handleExportToExcel = async () => {
        setExportLoading(true);
        try {
            const csvContent = [
                // CSV Header
                [
                    'Name', 'Title', 'Email', 'Phone', 'City', 'Post Code', 'Age', 'Gender', 'Hours', 
                    'Status', 'Skills', 'Languages', 'Qualifications', 'Work Experience', 
                    'Health Info', 'Transport Options', 'Work Types', 'Available Days', 
                    'Date Added', 'Review Date'
                ].join(','),
                // CSV Data
                ...filteredVolunteers.map(volunteer => [
                    `"${volunteer.first_name || ''} ${volunteer.last_name || ''}"`,
                    `"${volunteer.title || ''}"`,
                    `"${volunteer.email || ''}"`,
                    `"${volunteer.phone || ''}"`,
                    `"${volunteer.city || ''}"`,
                    `"${volunteer.post_code || ''}"`,
                    volunteer.year_of_birth ? calculateAge(volunteer.year_of_birth) : '',
                    volunteer.gender === 1 ? 'Male' : volunteer.gender === 2 ? 'Female' : volunteer.gender === 3 ? 'Other' : 'Not specified',
                    `"${volunteer.hours || ''}"`,
                    `"${getStatusText(volunteer.status)}"`,
                    `"${volunteer.skills || ''}"`,
                    `"${volunteer.languages || ''}"`,
                    `"${volunteer.qualification || ''}"`,
                    `"${volunteer.work_experience || ''}"`,
                    `"${volunteer.health || ''}"`,
                    volunteer.transport_list ? `${volunteer.transport_list.length} options` : '0 options',
                    volunteer.type_of_work_list ? `${volunteer.type_of_work_list.length} types` : '0 types',
                    volunteer.days_list ? `${volunteer.days_list.length} days` : '0 days',
                    volunteer.date_added ? new Date(volunteer.date_added).toLocaleDateString() : '',
                    volunteer.review_date ? new Date(volunteer.review_date).toLocaleDateString() : ''
                ].join(','))
            ].join('\n');

            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `volunteers_export_${formatDateForFilename()}.csv`);
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
                    <h1 className="text-2xl font-bold text-gray-900">Volunteers Management</h1>
                    <p className="text-gray-600 mt-1">Manage volunteers and their information</p>
                </div>
                <Link
                    to="/admin/add-volunteer"
                    className="inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
                >
                    <IconPlus size={20} className="mr-2" />
                    Add Volunteer
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
                        <p className="text-gray-600 font-medium">Loading volunteers...</p>
                        <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your data</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Volunteers</p>
                                    <p className="text-2xl font-bold text-gray-900">{volunteers.length}</p>
                                </div>
                                <IconUser className="text-blue-500" size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Active</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {volunteers.filter(vol => vol.status === 1).length}
                                    </p>
                                </div>
                                <IconFilter className="text-green-500" size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {volunteers.filter(vol => vol.status === 2).length}
                                    </p>
                                </div>
                                <IconCalendar className="text-yellow-500" size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Filtered Results</p>
                                    <p className="text-2xl font-bold text-gray-900">{filteredVolunteers.length}</p>
                                </div>
                                <IconMapPin className="text-purple-500" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <IconSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search volunteers, emails, or phone numbers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="sm:w-48">
                                <div className="relative">
                                    <IconFilter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none"
                                    >
                                        <option value="">All Status</option>
                                        <option value="1">Active</option>
                                        <option value="2">Pending</option>
                                        <option value="3">Inactive</option>
                                        <option value="4">On Hold</option>
                                        <option value="5">Completed</option>
                                    </select>
                                    <IconChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Export Button */}
                            <div className="sm:w-auto">
                                <button
                                    onClick={handleExportToExcel}
                                    disabled={exportLoading || filteredVolunteers.length === 0}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
                                >
                                    {exportLoading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                            </svg>
                                            Exporting...
                                        </>
                                    ) : (
                                        <>
                                            <IconDownload size={18} className="mr-2" />
                                            Export Excel
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Volunteers Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredVolunteers.length > 0 ? (
                                        filteredVolunteers.map((volunteer) => (
                                            <tr key={volunteer.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                            <IconUser size={18} className="text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {volunteer.title && `${volunteer.title} `}
                                                                {volunteer.first_name} {volunteer.last_name}
                                                            </div>
                                                            {volunteer.year_of_birth && (
                                                                <div className="text-sm text-gray-500">
                                                                    Age: {calculateAge(volunteer.year_of_birth)}
                                                                </div>
                                                            )}
                                                            {volunteer.gender && (
                                                                <div className="text-xs text-gray-400">
                                                                    {volunteer.gender === 1 ? 'Male' : volunteer.gender === 2 ? 'Female' : 'Other'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-start space-x-2">
                                                        <IconMail size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <div className="text-sm text-gray-900">{volunteer.email || 'N/A'}</div>
                                                            <div className="flex items-center space-x-1 mt-1">
                                                                <IconPhone size={14} className="text-gray-400" />
                                                                <span className="text-sm text-gray-500">{volunteer.phone || 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-start space-x-2">
                                                        <IconMapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <div className="text-sm text-gray-900">{volunteer.city || 'N/A'}</div>
                                                            {volunteer.post_code && (
                                                                <div className="text-sm text-gray-500">{volunteer.post_code}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm text-gray-900">{volunteer.hours || 'N/A'}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {volunteer.days_list && volunteer.days_list.length > 0 
                                                                ? `${volunteer.days_list.length} days` 
                                                                : 'Days: N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {volunteer.transport_list && volunteer.transport_list.length > 0 
                                                                ? 'Transport: Yes' 
                                                                : 'Transport: N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs">
                                                        {volunteer.skills && (
                                                            <div className="text-sm text-gray-900 truncate mb-1" title={volunteer.skills}>
                                                                {volunteer.skills.length > 50 ? `${volunteer.skills.substring(0, 50)}...` : volunteer.skills}
                                                            </div>
                                                        )}
                                                        <div className="flex flex-wrap gap-1">
                                                            {volunteer.type_of_work_list && volunteer.type_of_work_list.length > 0 && (
                                                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                                                    {volunteer.type_of_work_list.length} work types
                                                                </span>
                                                            )}
                                                            {volunteer.activities_list && volunteer.activities_list.length > 0 && (
                                                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                                                                    {volunteer.activities_list.length} activities
                                                                </span>
                                                            )}
                                                        </div>
                                                        {volunteer.languages && (
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                Languages: {volunteer.languages}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col space-y-2">
                                                        <span className={clsx(
                                                            "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                                            getStatusColor(volunteer.status)
                                                        )}>
                                                            {getStatusText(volunteer.status)}
                                                        </span>
                                                        {volunteer.review_date && (
                                                            <div className="text-xs text-gray-500">
                                                                Review: {new Date(volunteer.review_date).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleViewVolunteer(volunteer)}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                                                            title="View volunteer details"
                                                        >
                                                            <IconEye size={16} />
                                                            View
                                                        </button>
                                                        <Link
                                                            to={`/admin/edit-volunteer/${volunteer.id}`}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                                                            title="Edit volunteer"
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
                                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center">
                                                    <IconUser size={48} className="text-gray-300 mb-4" />
                                                    <p className="text-lg font-medium">No volunteers found</p>
                                                    <p className="text-sm">
                                                        {searchTerm || statusFilter
                                                            ? "Try adjusting your filters to see more results."
                                                            : "Get started by adding your first volunteer."
                                                        }
                                                    </p>
                                                    {!searchTerm && !statusFilter && (
                                                        <Link
                                                            to="/admin/add-volunteer"
                                                            className="mt-4 inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors"
                                                        >
                                                            <IconPlus size={20} className="mr-2" />
                                                            Add Volunteer
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

                    {/* View Volunteer Popup */}
                    <Popup
                        isOpen={isViewPopupOpen}
                        onClose={handleClosePopup}
                        title="Volunteer Details"
                        maxWidth="max-w-7xl"
                    >
                        <VolunteerView volunteer={selectedVolunteer} />
                    </Popup>
                </>
            )}
        </div>
    );
}
