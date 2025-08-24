import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { IconEye, IconEyeOff, IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { routesPath } from "../../utiils/routesPath";

export default function LoginPage() {
	const BACKEND_URL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		// Basic validation
		if (!email || !password) {
			setError("Please fill in all fields");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`${BACKEND_URL}/admin/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					rememberMe
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setSuccess("Login successful! Redirecting...");
				
				console.log(data);
				
				// Store token if provided
				// if (data.token) {
				// 	localStorage.setItem('authToken', data.token);
				// }
				
				// Make callback request after successful login
				try {
					const callbackResponse = await fetch(`/auth/callback/`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
						redirect: 'manual' // Handle redirects manually
					});

					// Check if it's a redirect response (status 302)
					if (callbackResponse.status === 302 || callbackResponse.type === 'opaqueredirect') {
						// Callback successful and redirected, navigate to admin
						setTimeout(() => {
							navigate(routesPath.admin);
						}, 1500);
					} else if (callbackResponse.ok) {
						// Callback successful (if it returns JSON instead of redirect)
						setTimeout(() => {
							navigate(routesPath.admin);
						}, 1500);
					} else {
						// Callback failed
						const callbackData = await callbackResponse.json();
						console.warn("Callback failed:", callbackData);
						setError("Authentication callback failed. Please try again.");
						return;
					}
				} catch (callbackErr) {
					console.error("Callback error:", callbackErr);
					setError("Authentication callback failed. Please try again.");
					return;
				}
			} else {
				setError(data.message || "Login failed. Please try again.");
			}
		} catch (err) {
			setError("Network error. Please check your connection and try again.");
			console.error("Login error:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-sm space-y-6">
				{/* Logo and Header */}
				<div className="text-center">
					<div className="flex justify-center items-center mb-3">
						<img src="/images/logo.avif" alt="Logo" className="h-16" />
					</div>
					<h2 className="text-xl font-bold text-gray-900">
						Log In
					</h2>
				</div>

				<div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Error Message */}
						{error && (
							<div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
								<IconAlertCircle className="h-4 w-4 text-red-500" />
								<span className="text-sm text-red-700">{error}</span>
							</div>
						)}

						{/* Success Message */}
						{success && (
							<div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md">
								<IconCheck className="h-4 w-4 text-green-500" />
								<span className="text-sm text-green-700">{success}</span>
							</div>
						)}

						{/* Email Field */}
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors duration-200"
								placeholder="Email"
								disabled={loading}
							/>
						</div>

						{/* Password Field */}
						<div className="relative">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none relative block w-full px-3 py-2.5 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors duration-200"
								placeholder="Password"
								disabled={loading}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 px-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
								disabled={loading}
							>
								{showPassword ? (
									<IconEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
								) : (
									<IconEye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
								)}
							</button>
						</div>

						{/* Remember Me Checkbox */}
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
								className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
								disabled={loading}
							/>
							<label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
								Remember me
							</label>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? (
									<div className="flex items-center space-x-2">
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
										<span>Logging in...</span>
									</div>
								) : (
									"Log in"
								)}
							</button>
						</div>
					</form>

					{/* Additional Links */}
					<div className="mt-4">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or</span>
							</div>
						</div>

						<div className="mt-4 text-center space-y-2">
							<Link
								to="/signup"
								className="block text-sm text-primary hover:text-red-700 font-medium transition-colors duration-200"
							>
								Don&apos;t have an account? Sign up
							</Link>
							<Link
								to="/forgot-password"
								className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
							>
								Forgot your password?
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
