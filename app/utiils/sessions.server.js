import { createCookieSessionStorage } from "@remix-run/node";

// export const sessionStorage = createCookieSessionStorage({
// 	cookie: {
// 		name: "_session",
// 		sameSite: "lax", 
// 		path: "/",
// 		httpOnly: true,
// 		secrets: ["change-this-secret-in-production"],
// 		secure: false,          // Set secure to false for development/HTTP access Change to true only when using HTTPS in production
// 		maxAge: 60 * 60 * 24 * 7, // 7 days Set max age for better session management  
// 	},
// });

// -----------------------------------------------------------------------------------------------------

// Safe environment variable access
function getEnvVar(key, defaultValue = "") {
	try {
		// In Remix server context, process should be available
		return process?.env?.[key] || defaultValue;
	} catch {
		return defaultValue;
	}
}

// Determine if we should use secure cookies
function shouldUseSecureCookies() {
	const nodeEnv = getEnvVar("NODE_ENV", "development");
	const httpsEnabled = getEnvVar("HTTPS", "false") === "true";
	
	// Only use secure cookies in production with HTTPS
	return nodeEnv === "production" && httpsEnabled;
}

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_session",
		sameSite: "lax", 
		path: "/",
		httpOnly: true,
		secrets: [getEnvVar("SESSION_SECRET", "change-this-secret-in-production")],
		// Dynamic secure flag based on environment
		secure: shouldUseSecureCookies(),
		// Set max age for better session management  
		maxAge: 60 * 60 * 24 * 1, // 7 days
	},
});


export const { getSession, commitSession, destroySession } = sessionStorage;