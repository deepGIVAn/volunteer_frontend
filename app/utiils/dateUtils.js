/**
 * Date utility functions for New Zealand date formatting
 */

/**
 * Format date to New Zealand locale with full date format
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} - Formatted date string (e.g., "25 August 2025")
 */
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

/**
 * Format date to New Zealand locale with short date format
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} - Formatted date string (e.g., "25/08/2025")
 */
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

/**
 * Format date and time to New Zealand locale
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} - Formatted date and time string (e.g., "25 August 2025, 3:30 PM")
 */
export function formatDateTime(dateInput) {
    if (!dateInput) return 'N/A';
    
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return 'N/A';
        
        return date.toLocaleString('en-NZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch {
        return 'N/A';
    }
}

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
