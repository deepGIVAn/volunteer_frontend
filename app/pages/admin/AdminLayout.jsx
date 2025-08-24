import { Outlet } from "@remix-run/react";
import { Form, NavLink } from "@remix-run/react";
import { 
	IconChevronLeft, 
	IconHome, 
	IconLogout2, 
	IconBuilding, 
	IconUsers, 
	IconTrash, 
	IconShield 
} from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import { RoutesPath } from "../../utiils/RoutesPath";

const sidebarItems = [
	{ label: 'Dashboard', icon: <IconHome size={18} />, type: 'link', to: RoutesPath.admin },
	{ label: 'Organisations', icon: <IconBuilding size={18} />, type: 'link', to: RoutesPath.adminOrganisations },
	{ label: 'Volunteers', icon: <IconUsers size={18} />, type: 'link', to: RoutesPath.adminVolunteers },
	{ label: 'Roles', icon: <IconShield size={18} />, type: 'link', to: RoutesPath.adminRoles },
	{ label: 'Recycle Bin', icon: <IconTrash size={18} />, type: 'link', to: RoutesPath.adminRecycleBin },
]

export default function AdminLayout() {
	// const [sidebarItems, setSidebarItems] = useState([]);

	const [sidebarOpen1, setSidebarOpen] = useState(true);
	const [hoverSidebar, setHoverSidebar] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null);

	const sidebarOpen = hoverSidebar || sidebarOpen1;

	return (
		<div className="bg-white h-screen w-screen">
			<div className="flex h-screen bg-gray-50">
				<div
					className={`relative transition-all duration-300 bg-white border-r shadow-lg flex flex-col ${sidebarOpen ? 'w-72' : 'w-16'}`}
				>
					<div className="flex items-center justify-center px-4 py-4 border-b relative">
						<img src="/images/logo.avif" alt="Logo" className="max-h-14" />
						{/* <span className={`font-bold text-lg tracking-wide  ${!sidebarOpen ? 'opacity-0 w-0 h-[28px]' : 'opacity-100 w-auto'}`}>DASHBOARD</span> */}
						<button className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white border shadow w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition z-30" onClick={() => setSidebarOpen(prev => !prev)}>
							{sidebarOpen ? <>
								<IconChevronLeft size={18} />
							</> : <>
								<IconChevronLeft size={18} className="rotate-180" />
							</>}
						</button>
					</div>
					<nav 
						className="flex-1 px-2 py-4 space-y-1"
						onMouseEnter={() => setHoverSidebar(true)}
						onMouseLeave={() => setHoverSidebar(false)}
					>
						{sidebarItems.map((item, index)=>(
							<div key={`${item.label}-${index}`}>
								{/* Products dropdown */}
								{item.type === 'dropdown' ? (
									<div>
										<button
											onClick={() => setOpenDropdown(openDropdown === `${item.label}-${index}` ? null : `${item.label}-${index}`)}
											className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${openDropdown === `${item.label}-${index}` && sidebarOpen ? 'text-primary font-bold bg-red-50' : 'text-gray-700 hover:bg-red-50'} ${!sidebarOpen ? 'justify-center px-0' : ''}`}
										>
											<span className={`${!sidebarOpen ? '' : 'mr-3'}`}>{item.icon}</span>
											{sidebarOpen && (
												<div className={`relative text-sm font-normal !duration-0 ${!sidebarOpen ? 'opacity-0 w-0 absolute !text-white' : 'opacity-100 w-auto'}`}>{item.label}</div>
											)}
											{sidebarOpen && (
												<span className={`ml-auto text-xs transition-transform ${openDropdown === `${item.label}-${index}` ? 'rotate-90' : ''}`}><IconChevronLeft size={18} className="rotate-180" /></span>
											)}
										</button>
										{/* Dropdown */}
										{openDropdown === `${item.label}-${index}` && sidebarOpen && (
											<div className="ml-8 mt-1 border-l-2 border-gray-200 pl-4 flex flex-col gap-1">
												{item.dropdown.map((sub) => (
													<NavLink
														end
														key={sub.label} 
														to={sub.to} 
														className={({ isActive }) => 
															clsx(
																'py-1 text-xs hover:text-primary hover:font-semibold',
																isActive ? 'text-primary font-semibold' : 'text-gray-700'
															)
														}
														// className={`${({ isActive }) => isActive ? 'text-blue-700 font-semibold' : 'text-gray-700'}  py-1 text-[15px] hover:text-blue-700 hover:font-semibold`}
													>
														{sub.label}
													</NavLink>
												))}
											</div>
										)}
									</div>
								) : (
									<NavLink
										end
										onMouseEnter={() => setHoverSidebar(true)}
										// onMouseLeave={() => setHoverSidebar(false)}
										to={item.to}
										className={({ isActive }) =>
											clsx(
												'flex items-center px-4 py-2 rounded-lg transition-colors',
												!sidebarOpen && 'justify-center px-0',
												isActive ? 'text-primary font-semibold bg-red-50' : 'text-gray-700 hover:bg-red-50'
											)
										}
									>
										<span className={`${!sidebarOpen ? '' : 'mr-3'}`}>{item.icon}</span>
										{sidebarOpen && (
											<div className={`relative text-sm font-normal !duration-0 ${!sidebarOpen ? 'opacity-0 w-0 absolute !text-white' : 'opacity-100 w-auto'}`}>{item.label}</div>
										)}
										{/* <span className={`transition-all text-sm font-semibold duration-200 ${!sidebarOpen ? 'opacity-0 w-0 absolute' : 'opacity-100 w-auto'}`}>{item.label}</span> */}
									</NavLink>
								)}
							</div>
						))}
					</nav>
					<div 
						className={`mt-auto px-3 py-2 border-t transition-all duration-200 ${!sidebarOpen ? 'px-0' : ''}`}
						onMouseEnter={() => setHoverSidebar(true)}
						onMouseLeave={() => setHoverSidebar(false)}
					>
						<div className="flex flex-col gap-2">
						<Form method="post" action="/logout" className="w-full">
							<button
								className={`flex w-full items-center px-4 py-2 rounded-lg transition-colors ${!sidebarOpen ? 'justify-center px-0' : ''} text-gray-700 hover:bg-red-50`}
							>
								<span className={`${!sidebarOpen ? '' : 'mr-2'}`}>
									<IconLogout2 size={18} className="text-red-500"  />
								</span>
								<span className={`transition-all text-xs font-semibold text-red-500 duration-200 ${!sidebarOpen ? 'opacity-0 w-0 absolute' : 'opacity-100 w-auto'}`}>Logout</span>
							</button>
						</Form>
						</div>
					</div>
				</div>
				<div className="w-full p-10 overflow-auto" data-lenis-prevent>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
