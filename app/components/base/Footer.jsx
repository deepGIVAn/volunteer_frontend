import { useState } from 'react';
import { 
    IconMapPin, 
    IconPhone, 
    IconMail, 
    IconBrandFacebook, 
    IconBrandInstagram, 
    IconBrandLinkedin, 
    IconBrandTwitter 
} from '@tabler/icons-react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubscribing(true);
        
        // Simulate newsletter subscription
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Reset form
        setEmail('');
        setIsSubscribing(false);
        
        // You can add actual newsletter subscription logic here
        alert('Thank you for subscribing!');
    };

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Volunteer Opportunities', href: '/volunteers' },
        { name: 'For Organisations', href: '/organisations' },
        { name: 'Contact Us', href: '/contact' }
    ];

    const socialLinks = [
        { 
            name: 'Facebook', 
            href: '#', 
            icon: <IconBrandFacebook size={20} />
        },
        { 
            name: 'Instagram', 
            href: '#', 
            icon: <IconBrandInstagram size={20} />
        },
        { 
            name: 'LinkedIn', 
            href: '#', 
            icon: <IconBrandLinkedin size={20} />
        },
        { 
            name: 'Twitter', 
            href: '#', 
            icon: <IconBrandTwitter size={20} />
        }
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#fafafa] text-black">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* Column 1: Logo and About */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <img 
                                src="/images/logo.avif" 
                                alt="Volunteer Central Logo" 
                                className="h-12 w-auto mb-4"
                            />
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Connecting volunteers with meaningful opportunities across Palmerston North, 
                                Manawatū, Horowhenua and Tararua regions.
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 block py-1"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-6 text-gray-900">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-3 mt-0.5">
                                    <IconMapPin size={16} />
                                </span>
                                <span className="text-sm text-gray-600">77 King Street, PN</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-3 mt-0.5">
                                    <IconPhone size={16} />
                                </span>
                                <a 
                                    href="tel:063546027" 
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                >
                                    06 354 6027
                                </a>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-3 mt-0.5">
                                    <IconMail size={16} />
                                </span>
                                <a 
                                    href="mailto:info@volunteercentral.nz" 
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                >
                                    info@volunteercentral.nz
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-6 text-gray-900">Stay Connected</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Subscribe to our newsletter for updates on volunteer opportunities and community events.
                        </p>
                        
                        <form onSubmit={handleNewsletterSubmit} className="mb-6">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                                <button 
                                    type="submit" 
                                    disabled={isSubscribing}
                                    className="bg-[#C7102F] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                >
                                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </div>
                        </form>
                        
                        {/* Social Media Icons */}
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600">Follow us:</p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a 
                                        key={social.name}
                                        href={social.href} 
                                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        aria-label={`Follow us on ${social.name}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-200 bg-gray-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-xs text-gray-600">
                            &copy; {currentYear} Whatunga Tūao | Volunteer Central. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a 
                                href="/privacy" 
                                className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                Privacy Policy
                            </a>
                            <a 
                                href="/terms" 
                                className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
