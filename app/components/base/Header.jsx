import { useState, useEffect } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Prevent body scrolling when menu is open
        if (!isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
    };

    const navigationItems = [
        { name: 'Home', href: '/' },
        { name: 'About us', href: '/about' },
        { name: 'News', href: '/news' },
        { name: 'Events', href: '/events' },
        { name: 'For Volunteers', href: '/volunteers' },
        { name: 'For Organizations', href: '/organizations' },
        { name: 'Donate', href: '/donate' },
        { name: 'Contact Us', href: '/contact' }
    ];

    return (
        <>
            {/* Header with scroll behavior */}
            <header 
                id="main-header" 
                className={`fixed w-full transition-all duration-300 z-50 bg-white ${
                    isScrolled ? 'shadow-md' : ''
                }`}
            >
                <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                    <div className="logo">
                        <img 
                            src="/images/logo.avif" 
                            alt="Volunteer Central" 
                            className="h-12"
                        />
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-1">
                            {navigationItems.map((item, index) => (
                                <li key={item.name}>
                                    <a 
                                        href={item.href} 
                                        className={`headernav-button ${index === navigationItems.length - 1 ? 'headernav-contact' : ''}`}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-black p-2 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Open mobile menu"
                        >
                            <IconMenu2 size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu - Full screen with slide animation */}
            <div 
                className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } ${isMobileMenuOpen ? '' : 'hidden'}`}
            >
                <div className="flex justify-end p-4">
                    <button 
                        onClick={closeMobileMenu}
                        className="text-black p-2 hover:text-red-500 transition-colors"
                        aria-label="Close mobile menu"
                    >
                        <IconX size={24} />
                    </button>
                </div>
                
                <div className="flex flex-col pt-8 px-2">
                    <ul className="w-full">
                        {navigationItems.map((item) => (
                            <li key={item.name} className="border-b border-gray-200">
                                <a 
                                    href={item.href} 
                                    onClick={closeMobileMenu}
                                    className="block py-3 px-6 text-base text-gray-800 hover:text-red-500 transition-colors"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div 
                    role="button"
                    tabIndex={0}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            closeMobileMenu();
                        }
                    }}
                    aria-label="Close mobile menu"
                />
            )}
        </>
    );
}
