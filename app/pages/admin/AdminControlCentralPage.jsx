import { useEffect, useState } from 'react';
import Popup from '../../components/base/Popup';
import { FormField, CheckboxField } from '../../components/base/FormComponents';
import { IconEdit, IconTrash, IconPlus, IconUser, IconBuilding, IconCalendar } from '@tabler/icons-react';
import { useRouteLoaderData } from '@remix-run/react';

const initialStaff = [
  // { id: 1, name: 'Alice Johnson', email: 'alice@email.com', password: '********', status: true },
  // { id: 2, name: 'Bob Smith', email: 'bob@email.com', password: '********', status: false },
];

export default function AdminControlCentralPage() {
  const { user } = useRouteLoaderData("routes/admin");
  const [staffList, setStaffList] = useState(initialStaff);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', status: false });
  const [formError, setFormError] = useState('');

  const openAddPopup = () => {
    setEditId(null);
  setFormData({ name: '', email: '', password: '', confirmPassword: '', status: false });
  setFormError('');
    setPopupOpen(true);
  };

  const openEditPopup = (staff) => {
    setEditId(staff.id);
    setFormData({
      name: staff.name || '',
      email: staff.email || '',
      password: typeof staff.password === 'string' ? staff.password : (staff.password === undefined || staff.password === null ? '' : String(staff.password)),
      confirmPassword: '',
      status: typeof staff.status === 'boolean' ? staff.status : false
    });
    setFormError('');
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (formData.password !== formData.confirmPassword) {
      setFormError('Password and Confirm Password must match.');
      return;
    }
    if (editId) {
      // POST request to update staff
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/update-staff/${editId}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': user?.token ? `Bearer ${user.token}` : ''
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            status: formData.status
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          setFormError(errorData.message || 'Failed to update staff.');
          return;
        }
        const updatedStaff = await response.json();
        setStaffList((prev) => prev.map((s) => (
          s.id === editId ? { ...s, ...updatedStaff } : s
        )));
        setPopupOpen(false);
      } catch (err) {
        setFormError('Network error. Please try again.');
      }
    } else {
      // POST request for creating staff
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/create-staff/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': user?.token ? `Bearer ${user.token}` : ''
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            status: formData.status
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          setFormError(errorData.message || 'Failed to create staff.');
          return;
        }
        const newStaff = await response.json();
        // console.log('Created Staff:', newStaff);
        setStaffList((prev) => [
          ...prev,
          { ...newStaff, id: newStaff.id || Date.now() },
        ]);
        setPopupOpen(false);
      } catch (err) {
        setFormError('Network error. Please try again.');
      }
      
      // setStaffList((prev) => [
      //   ...prev,
      //   { ...formData, password: formData.password || '', id: Date.now() },
      // ]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/delete-staff/${id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': user?.token ? `Bearer ${user.token}` : ''
          }
        });
        if (!response.ok) {
          // Optionally handle error
          return;
        }
        setStaffList((prev) => prev.filter((s) => s.id !== id));
      } catch (err) {
        // Optionally handle error
      }
    }
  };

  // Fetch all staff on first render
  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-all-staff/`, {
          method: 'GET',
          headers: {
            'Authorization': user?.token ? `Bearer ${user.token}` : ''
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStaffList(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchStaff();
  }, []);

  return (
    <div className="text-sm md:text-base">
  <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1 text-base">Manage your staff and their access</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
          onClick={openAddPopup}
        >
          <IconPlus size={20} className="mr-2" />
          Add Staff
        </button>
      </div>

      {/* Statistics Tiles */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm md:text-base">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{staffList.length}</p>
            </div>
            <IconUser className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{staffList.filter(s => s.status).length}</p>
            </div>
            <IconBuilding className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{staffList.filter(s => !s.status).length}</p>
            </div>
            <IconCalendar className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden text-[15px] md:text-base">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <IconUser size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No staff members found</p>
                      <p className="text-sm">Get started by adding your first staff member.</p>
                      <button
                        onClick={openAddPopup}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-[#C7102F] text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <IconPlus size={20} className="mr-2" />
                        Add Staff
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                staffList.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${staff.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{staff.status ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="inline-flex items-center text-xs gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                          onClick={() => openEditPopup(staff)}
                          title="Edit"
                        >
                          <IconEdit size={14} />
                          Edit
                        </button>
                        <button
                          className="inline-flex items-center text-xs gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
                          onClick={() => handleDelete(staff.id)}
                          title="Delete"
                        >
                          <IconTrash size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Popup isOpen={popupOpen} onClose={closePopup} title={editId ? 'Edit Staff' : 'Add Staff'} maxWidth="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <FormField
            label="Name"
            name="name"
            required
            formData={formData}
            handleInputChange={handleInputChange}
            placeholder="Enter staff name"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            required
            formData={formData}
            handleInputChange={handleInputChange}
            placeholder="Enter staff email"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            required={!editId}
            formData={formData}
            handleInputChange={handleInputChange}
            placeholder={editId ? 'Leave blank to keep unchanged' : 'Enter password'}
          />
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required={!editId}
            formData={formData}
            handleInputChange={handleInputChange}
            placeholder="Re-enter password"
          />
          {formError && (
            <div className="text-red-600 text-sm font-normal">{formError}</div>
          )}
          <CheckboxField
            label="Active Status"
            name="status"
            formData={formData}
            handleInputChange={handleInputChange}
            description="Check if this staff member is active."
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
              onClick={closePopup}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#C7102F] text-white font-semibold shadow"
            >
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
}
