import { IconX } from '@tabler/icons-react';

export default function Popup({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    maxWidth = "max-w-4xl",
    showCloseButton = true 
}) {
    if (!isOpen) return null;

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div 
                className="absolute inset-0"
                onClick={onClose}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Close popup"
            />
            <div className={`bg-white rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-hidden relative z-10`}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h2>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <IconX size={20} className="text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}
