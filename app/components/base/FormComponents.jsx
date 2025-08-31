import { 
    IconCalendar,
    IconPaperclip,
    IconChevronDown
} from '@tabler/icons-react';

export const FormField = ({ label, name, type = 'text', required = false, placeholder, icon: Icon, rows, formData, handleInputChange }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
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

export const CheckboxField = ({ label, name, description, formData, handleInputChange }) => (
    <div className="flex items-start space-x-3">
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={formData[name]}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-[#C7102F] focus:ring-[#C7102F] border-gray-300 rounded"
        />
        <div className="flex-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
        </div>
    </div>
);

export const FileField = ({ label, name, required = false, formData, handleFileChange, currentAttachmentUrl }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {/* Show current attachment if exists */}
        {currentAttachmentUrl && !formData[name] && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current attachment:</p>
                <a 
                    href={currentAttachmentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                    View current file
                </a>
            </div>
        )}
        
        <div className="flex items-center space-x-4">
            <label
                htmlFor={name}
                className="inline-flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer font-medium text-sm shadow-sm bg-gray-100 hover:bg-gray-200"
            >
                <IconPaperclip size={18} className="mr-2" />
                {currentAttachmentUrl && !formData[name] ? 'Replace File' : 'Choose File'}
            </label>
            <input
                type="file"
                id={name}
                name={name}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <span className="text-sm text-gray-500 flex-1">
                {formData[name] ? formData[name].name : 
                 currentAttachmentUrl ? 'Replace with new file' : 'No file chosen'}
            </span>
        </div>
        <p className="text-xs text-gray-500">
            Supported formats: JPG, JPEG, PNG, AVIF (Max 25MB)
        </p>
    </div>
);

export const DateField = ({ label, name, required = false, formData, handleInputChange }) => (
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

export const MultiSelectField = ({ label, name, options, required = false, formData, handleMultiSelectChange }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="border border-gray-300 rounded-lg p-3 max-h-80 overflow-y-auto">
            {options && options.length > 0 ? (
                options.map((option) => {
                    const isChecked = formData[name] && formData[name].includes(option.seq);
                    
                    return (
                        <div key={option.seq} className="flex items-center space-x-2 py-1">
                            <input
                                type="checkbox"
                                id={`${name}_${option.seq}`}
                                checked={isChecked}
                                onChange={(e) => {
                                    const currentList = formData[name] || [];
                                    const newList = e.target.checked
                                        ? [...currentList, option.seq]
                                        : currentList.filter(id => id !== option.seq);
                                    handleMultiSelectChange(name, newList);
                                }}
                                className="h-4 w-4 text-[#C7102F] focus:ring-[#C7102F] border-gray-300 rounded"
                            />
                            <label htmlFor={`${name}_${option.seq}`} className="text-sm text-gray-700">
                                {option.region || option.service || option.name || option.group_activity || option.sport_activity || option.other_activity || option.financial_activity || option.support_activity || option.hospitality_activity || option.event_activity || option.technology_activity || option.home_cares_activity || option.mantinance_activity || option.administration_activity || option.driving_activity || option.time || option.day || 'Unknown'}
                            </label>
                        </div>
                    );
                })
            ) : (
                <div className="text-sm text-gray-500 py-2">
                    No options available
                </div>
            )}
        </div>
    </div>
);

export const SelectField = ({ label, name, options, required = false, formData, handleInputChange, placeholder = "Select an option" }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className='relative'>
            <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent appearance-none text-sm font-medium"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <IconChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 pointer-events-none" />
        </div>
    </div>
);
