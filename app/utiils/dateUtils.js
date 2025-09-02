export function formatDate(dateInput) {
	if (!dateInput) return 'N/A';
	
	try {
		const date = new Date(dateInput);
		if (isNaN(date.getTime())) return 'N/A';
		
		return date.toLocaleDateString('en-NZ', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	} catch {
		return 'N/A';
	}
}

export function formatDateShort(dateInput) {
	if (!dateInput) return 'N/A';
	
	try {
		const date = new Date(dateInput);
		if (isNaN(date.getTime())) return 'N/A';
		
		return date.toLocaleDateString('en-NZ', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	} catch {
		return 'N/A';
	}
}

// Helper function to format date and time
export const formatDateTime = (dateString) => {
	if (!dateString) return '';
	const date = new Date(dateString);
	const options = {
		year: 'numeric',
		month: 'long', 
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	};
	return date.toLocaleDateString('en-NZ', options);
};

/**
 * Format date for file names (e.g., "2025-08-25")
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} - Formatted date string for file names
 */
export function formatDateForFilename(dateInput = new Date()) {
	try {
		const date = new Date(dateInput);
		if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
		
		return date.toISOString().split('T')[0];
	} catch {
		return new Date().toISOString().split('T')[0];
	}
}

/**
 * Get current date in New Zealand timezone
 * @returns {string} - ISO string in NZ timezone
 */
export function getCurrentNZDate() {
	const now = new Date();
	// Convert to New Zealand timezone
	const nzDate = new Date(now.toLocaleString("en-US", {timeZone: "Pacific/Auckland"}));
	return nzDate.toISOString();
}

/**
 * Calculate age from year of birth
 * @param {number} yearOfBirth - Year of birth
 * @returns {number|string} - Age or 'N/A'
 */
export function calculateAge(yearOfBirth) {
	if (!yearOfBirth || isNaN(yearOfBirth)) return 'N/A';
	const currentYear = new Date().getFullYear();
	const age = currentYear - yearOfBirth;
	return age >= 0 && age <= 150 ? age : 'N/A';
}
