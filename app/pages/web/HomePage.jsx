import { useState } from 'react';
import WebLayout from "../../components/base/WebLayout";
import DropDown from "../../components/base/DropDown";
import "../../styles/animations.css";
import { 
    IconChevronLeft, 
    IconChevronRight, 
    IconMail, 
    IconPhone, 
    IconMapPin,
    IconSend,
    IconUser,
    IconMessage
} from '@tabler/icons-react';

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        region: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Team slider functionality
    const teamSlides = [
        {
            title: "HISTORY",
            subtitle: "Where everything started",
            content: "Volunteer Resource Centre - Manawatu & Districts (VRC) is a charitable trust established in 2005 to develop a volunteer centre in the region. The doors first opened on 24th June 2010, aiming to connect the community through volunteering. Ten years later, VRC took on the new identity of Volunteer Central to consolidate the direction the centre has taken. In 2022, we continued our development to incorporate and acknowledge our partnership responsibilities in the Treaty of Waitangi, as a result, Whatunga Tūao | Volunteer Central was born."
        },
        {
            title: "TEAM AND BOARD",
            subtitle: "Operational & Strategic",
            content: "Whatunga Tūao | Volunteer Central has two paid staff and a team of committed volunteers to provide the service. The service is supported by an amazing board of volunteers who focus on service strategy."
        },
        {
            title: "MISSION, VISION AND VALUES",
            subtitle: "Why we do what we do",
            content: (
                <ul className="text-left space-y-2">
                    <li><strong>Mission:</strong> Moving volunteering to front-of-mind.</li>
                    <li><strong>Vision:</strong> Create a volunteering legacy built around people and quality.</li>
                    <li><strong>Values:</strong> Inclusivity (We will welcome everyone), Integrity (We do what and when we say), Reputation (Quality, not quantity is our mantra), and Relationships (We believe in the strength of sharing and working together. People first).</li>
                </ul>
            )
        }
    ];

    const testimonials = [
        {
            organisation: "Social Socks",
            content: "Thank you all so much for connecting us with such beautiful people, who simply want to help make a difference. We would certainly not be able to do our work in the local community if it wasn't for them."
        },
        {
            organisation: "MASH Trust",
            content: "Thank you for this beautiful and heart warming newsletter. Just love your thinking of inclusion ...something I am passionate about. Great read."
        },
        {
            organisation: "Te Manawa",
            content: "Just want to say a huge thank you, thank you for arranging the 3 volunteers for me on the Monday...at the very last minute too. You and your team are Awesome"
        },
        {
            organisation: "Blind and Low Vision",
            content: "Thank you so much for this connection with her. She sounds to have wonderful qualities. We appreciate the wonderful work you do."
        }
    ];

    const regions = [
        { name: 'Palmy', href: '/regions/palmy' },
        { name: 'Manawatū', href: '/regions/manawatu' },
        { name: 'Tararua', href: '/regions/tararua' },
        { name: 'Horowhenua', href: '/regions/horowhenua' }
    ];

    const sponsors = [
        { name: 'UCOL', logo: '/images/UCOL.avif', url: 'https://www.ucol.ac.nz/' },
        { name: 'Advantage', logo: '/images/Advantage.avif', url: 'https://advantage.nz/' }
    ];

    const regionOptions = [
        { value: 'palmerston-north', label: 'Palmerston North' },
        { value: 'horowhenua', label: 'Horowhenua' },
        { value: 'tararua', label: 'Tararua' },
        { value: 'manawatu', label: 'Manawatū' }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % teamSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + teamSlides.length) % teamSlides.length);
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Thank you for your interest! We\'ll be in touch soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            region: '',
            message: ''
        });
        setIsSubmitting(false);
    };

    return (
        <WebLayout>
            {/* Hero Section */}
            <div className="">
                <section className="relative h-[calc(100vh-70px)] overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
                    {/* Floating Elements Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-10 w-20 h-20 bg-[#C7102F] opacity-10 rounded-full animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-16 h-16 bg-[#f8d568] opacity-20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-32 left-20 w-12 h-12 bg-blue-300 opacity-15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-20 right-32 w-24 h-24 bg-green-300 opacity-10 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[#C7102F] opacity-20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                    </div>
                    
                    <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
                        <h1 className="mb-6 transform hover:scale-105 transition-transform duration-300">
                            <span className="text-[#C7102F] text-4xl md:text-6xl font-bold animate-fade-in-up" style={{ fontFamily: 'IvyJournal, serif' }}>
                                Volunteering
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-black mb-12 animate-fade-in-up opacity-90" style={{ fontFamily: 'IvyJournal, serif', animationDelay: '0.3s' }}>
                            Matching passion with purpose
                        </p>
                        <a 
                            href="/register" 
                            className="animated-button bg-[#C7102F] hover:bg-red-700 text-white font-medium py-4 px-8 rounded-md transition duration-300 relative overflow-hidden group shadow-lg transform hover:scale-105 hover:shadow-2xl animate-fade-in-up"
                            style={{ animationDelay: '0.6s' }}
                        >
                            <span className="relative z-10">Register as a volunteer</span>
                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-yellow-200 opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                        </a>

                        <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                            <p className="text-black text-xl mb-6" style={{ fontFamily: 'IvyJournal, serif' }}>
                                Find your perfect role
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-lg font-semibold text-[#C7102F]">
                                {regions.map((region, index) => (
                                    <a 
                                        key={region.name}
                                        href={region.href} 
                                        className="bg-[#f1f1f1] bg-opacity-80 py-4 px-6 rounded-md hover:rounded-3xl hover:text-white hover:bg-[#C7102F] hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 hover:rotate-1 animate-slide-in-up"
                                        style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                                    >
                                        {region.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Information Strip - Light Background */}
                <section className="py-12 bg-gradient-to-r from-[#fafafa] via-white to-[#fafafa] border-gray-200 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C7102F] via-[#f8d568] to-[#C7102F] opacity-30"></div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0 md:mr-8 transform hover:scale-105 transition-transform duration-300">
                                <h2 className="text-2xl font-semibold text-[#323232] mb-2">
                                    Looking for further information?
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="/volunteers" 
                                    className="border border-[#323232] text-[#323232] hover:bg-[#323232] hover:text-white px-6 py-3 transition-all duration-300 rounded-md transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                                >
                                    <span className="relative z-10">For Volunteers</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                                </a>
                                <a 
                                    href="/organisations" 
                                    className="border border-[#323232] text-[#323232] hover:bg-[#323232] hover:text-white px-6 py-3 transition-all duration-300 rounded-md transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                                >
                                    <span className="relative z-10">For Organisations</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                                </a>
                                <a 
                                    href="/contact" 
                                    className="border border-[#ab3338] text-[#ab3338] hover:bg-[#ab3338] hover:text-white px-6 py-3 transition-all duration-300 rounded-md transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Contact us</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Information Strip 2 - Dark Background */}
                <section className="py-10 bg-gradient-to-r from-[#00305B] via-[#004080] to-[#00305B] text-white relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0 transform hover:scale-105 transition-transform duration-300">
                                <h3 className="text-xl font-medium">Our Location</h3>
                            </div>
                            <div className="text-center md:text-left max-w-4xl">
                                <p className="text-sm md:text-base leading-relaxed">
                                    Kia ora, this centre covers Palmerston North, Manawatū, Horowhenua and Tararua regions. 
                                    If you are looking for assistance on Dunedin, Waitaki, Oamaru, Invercargill, Central Otago and Queenstown Lakes please{' '}
                                    <a 
                                        href="https://volunteersouth.org.nz/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="underline hover:text-[#ab3338] transition-colors hover:no-underline relative group"
                                    >
                                        <span className="relative z-10">click here</span>
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ab3338] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                    </a>{' '}
                                    to be redirected to <strong>Volunteer South</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Services Section */}
                <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-[#f8d568] opacity-10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#C7102F] opacity-5 rounded-full blur-2xl"></div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#C7102F] mb-4 transform hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'IvyJournal, serif' }}>
                                OUR SERVICES
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#f8d568] to-[#f0c344] mx-auto rounded-full"></div>
                            <div className="mt-2 w-12 h-0.5 bg-[#C7102F] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {/* Service Card 1 */}
                            <div className="service-card group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C7102F] to-[#ab3338] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                    <img 
                                        src="/images/service1.avif" 
                                        alt="Support Volunteers" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-[#f8d568] to-[#f0c344] py-4 px-6 text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                        <h3 className="text-xl font-semibold text-[#333] relative z-10">Support Volunteers</h3>
                                    </div>
                                    <div className="bg-white p-6 text-gray-700 relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C7102F] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        <p className="leading-relaxed">
                                            We empower people to achieve the best they can by creating connections to the community, 
                                            to a purpose, to new opportunities and challenges. We help find new ways to thrive through volunteering.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Service Card 2 */}
                            <div className="service-card group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 hover:-rotate-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C7102F] to-[#ab3338] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                    <img 
                                        src="/images/service2.avif" 
                                        alt="Support Organisations" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-[#f8d568] to-[#f0c344] py-4 px-6 text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                        <h3 className="text-xl font-semibold text-[#333] relative z-10">Support Organisations</h3>
                                    </div>
                                    <div className="bg-white p-6 text-gray-700 relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C7102F] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        <p className="leading-relaxed">
                                            We assist organisations to achieve their goals by developing roles, supporting the recruitment 
                                            of suitable volunteers, offering training and making relevant information and connections available.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Service Card 3 */}
                            <div className="service-card group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C7102F] to-[#ab3338] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                    <img 
                                        src="/images/service3.avif" 
                                        alt="Create Opportunities" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-[#f8d568] to-[#f0c344] py-4 px-6 text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                        <h3 className="text-xl font-semibold text-[#333] relative z-10">Create Opportunities</h3>
                                    </div>
                                    <div className="bg-white p-6 text-gray-700 relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C7102F] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        <p className="leading-relaxed">
                                            We connect the community through events and activities. We raise awareness about volunteering 
                                            and we celebrate volunteers through recognition events. We make information available through 
                                            Social Media, Newsletters, and our website.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-gradient-to-br from-[#fafafa] via-gray-100 to-[#f5f5f5] relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-8 gap-4 h-full">
                            {[...Array(64)].map((_, i) => (
                                <div key={i} className="bg-[#C7102F] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12">
                            <div className="bg-gradient-to-r from-[#f8d568] via-[#f0c344] to-[#f8d568] py-4 max-w-3xl mx-auto rounded-2xl transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                                <h2 className="text-3xl font-bold text-[#333] relative z-10" style={{ fontFamily: 'IvyJournal, serif' }}>
                                    TESTIMONIALS
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index} 
                                    className="testimonial-card bg-gradient-to-br from-[#5d5e7e] to-[#4a4b6a] text-white p-6 rounded-2xl shadow-lg relative transform hover:scale-105 hover:rotate-1 transition-all duration-300 hover:shadow-2xl"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff6b6b] to-[#ffa726] rounded-t-2xl"></div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ff6b6b] rounded-full opacity-20 animate-ping"></div>
                                    <h3 className="text-[#ff6b6b] font-medium mb-4 relative z-10">{testimonial.organisation}</h3>
                                    <p className="text-sm italic mb-10 leading-relaxed relative z-10">
                                        {testimonial.content}
                                    </p>
                                    <div className="text-[#ff6b6b] text-5xl absolute bottom-4 right-6 opacity-30 transform hover:scale-110 transition-transform duration-300">&ldquo;</div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-0 hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team and Board Section with Slider */}
                <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#C7102F] to-transparent opacity-30"></div>
                    <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-transparent via-[#f8d568] to-transparent opacity-30"></div>
                    
                    <div className="container mx-auto px-4 overflow-hidden relative z-10">
                        <div className="team-slider-container relative max-w-4xl mx-auto">
                            <div className="team-slides overflow-hidden">
                                <div 
                                    className="team-slide-track flex transition-transform duration-500"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {teamSlides.map((slide, index) => (
                                        <div key={index} className="team-slide w-full flex-shrink-0">
                                            <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
                                                <h2 className="text-3xl font-bold text-[#C7102F] mb-2 relative" style={{ fontFamily: 'IvyJournal, serif' }}>
                                                    {slide.title}
                                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#f8d568] to-[#f0c344] rounded-full"></div>
                                                </h2>
                                                <p className="text-lg text-gray-600 italic mt-4">{slide.subtitle}</p>
                                            </div>
                                            <div className="text-center px-8">
                                                <div className="text-gray-700 mb-8 leading-relaxed bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                                                    {typeof slide.content === 'string' ? (
                                                        <p>{slide.content}</p>
                                                    ) : (
                                                        slide.content
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center mt-8">
                                                <a 
                                                    href="/about" 
                                                    className="animated-button inline-block bg-gradient-to-r from-[#C7102F] to-[#ab3338] hover:from-[#ab3338] hover:to-[#8B2635] text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 relative overflow-hidden group transform hover:scale-105 hover:shadow-lg"
                                                >
                                                    <span className="relative z-10">View More</span>
                                                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button 
                                onClick={prevSlide}
                                className="absolute top-1/2 -translate-y-1/2 left-0 -ml-6 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#C7102F] focus:outline-none transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg rounded-full"
                            >
                                <IconChevronLeft size={32} />
                            </button>

                            <button 
                                onClick={nextSlide}
                                className="absolute top-1/2 -translate-y-1/2 right-0 -mr-6 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#C7102F] focus:outline-none transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg rounded-full"
                            >
                                <IconChevronRight size={32} />
                            </button>

                            {/* Dots Navigation */}
                            <div className="flex justify-center mt-8 space-x-2">
                                {teamSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none transform hover:scale-125 ${
                                            currentSlide === index 
                                                ? 'bg-[#C7102F] shadow-lg' 
                                                : 'bg-gray-300 hover:bg-[#C7102F]'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section 
                    className="relative py-32 bg-cover bg-center bg-no-repeat overflow-hidden"
                    style={{ backgroundImage: "url('/images/quote_back.avif')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div>
                    {/* Animated Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <div className="transform hover:scale-105 transition-transform duration-300">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 leading-tight animate-fade-in-up" style={{ fontFamily: 'IvyJournal, serif' }}>
                                    &ldquo;No one can do everything,<br />
                                    but everyone can do something.&rdquo;
                                </h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#C7102F] to-[#f8d568] mx-auto mb-4 rounded-full"></div>
                                <div className="w-8 h-0.5 bg-white mx-auto mb-4 rounded-full opacity-60"></div>
                                <p className="text-lg italic animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Max Lucado</p>
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                            <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-[#f8d568]/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-[#C7102F] mb-4" style={{ fontFamily: 'IvyJournal, serif' }}>
                                GET IN TOUCH
                            </h2>
                            <div className="w-24 h-1 bg-[#C7102F] mx-auto mb-4"></div>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Ready to make a difference? Join our community of volunteers and help create positive change in your region.
                            </p>
                        </div>

                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                
                                {/* Left side - Contact Info with Creative Design */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#C7102F] to-[#ab3338] rounded-2xl transform rotate-3"></div>
                                    <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C7102F] rounded-full mb-4">
                                                <IconMail size={28} className="text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Let&apos;s Connect</h3>
                                            <p className="text-gray-600">
                                                We&apos;re here to help you find the perfect volunteering opportunity.
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex-shrink-0 w-12 h-12 bg-[#C7102F] rounded-full flex items-center justify-center">
                                                    <IconMail size={20} className="text-white" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500">Email us</p>
                                                    <p className="text-gray-900 font-medium">info@volunteercentral.nz</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex-shrink-0 w-12 h-12 bg-[#C7102F] rounded-full flex items-center justify-center">
                                                    <IconPhone size={20} className="text-white" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500">Call us</p>
                                                    <p className="text-gray-900 font-medium">06 354 6027</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex-shrink-0 w-12 h-12 bg-[#C7102F] rounded-full flex items-center justify-center">
                                                    <IconMapPin size={20} className="text-white" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500">Visit us</p>
                                                    <p className="text-gray-900 font-medium">77 King Street, PN</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 p-4 bg-gradient-to-r from-[#f8d568] to-[#f0c344] rounded-lg">
                                            <p className="text-center text-gray-800 font-medium">
                                                💡 Did you know? Over 500 volunteers have found their perfect match through our platform!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side - Enhanced Form */}
                                <div className="relative">
                                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                                Start Your Volunteer Journey
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Fill out the form below and we&apos;ll connect you with meaningful volunteer opportunities 
                                                that match your interests and schedule.
                                            </p>
                                        </div>

                                        <form onSubmit={handleFormSubmit} className="space-y-6">
                                            {/* Name Input */}
                                            <div className="relative">
                                                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <IconUser size={18} className="text-gray-400" />
                                                    </div>
                                                    <input 
                                                        id="contact-name"
                                                        type="text" 
                                                        name="name" 
                                                        placeholder="Enter your full name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Input */}
                                            <div className="relative">
                                                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <IconMail size={18} className="text-gray-400" />
                                                    </div>
                                                    <input 
                                                        id="contact-email"
                                                        type="email" 
                                                        name="email" 
                                                        placeholder="Enter your email address"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone Input */}
                                            <div className="relative">
                                                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <IconPhone size={18} className="text-gray-400" />
                                                    </div>
                                                    <input 
                                                        id="contact-phone"
                                                        type="tel" 
                                                        name="phone" 
                                                        placeholder="Enter your phone number"
                                                        value={formData.phone}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            {/* Region Dropdown */}
                                            <div className="relative">
                                                <label htmlFor="contact-region" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Preferred Region
                                                </label>
                                                <DropDown
                                                    name="region"
                                                    value={formData.region}
                                                    onChange={handleFormChange}
                                                    options={regionOptions}
                                                    placeholder="Select your preferred region"
                                                    searchPlaceholder="Search regions..."
                                                />
                                            </div>

                                            {/* Message Input */}
                                            <div className="relative">
                                                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tell us about yourself
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute top-3 left-3 pointer-events-none">
                                                        <IconMessage size={18} className="text-gray-400" />
                                                    </div>
                                                    <textarea 
                                                        id="contact-message"
                                                        name="message" 
                                                        placeholder="Share your interests, skills, or what type of volunteer work excites you..."
                                                        rows="4"
                                                        value={formData.message}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C7102F] focus:border-transparent transition-all duration-200 resize-none"
                                                    ></textarea>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="pt-4">
                                                <button 
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-gradient-to-r from-[#C7102F] to-[#ab3338] hover:from-[#ab3338] hover:to-[#8B2635] text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                                >
                                                    <span className="relative z-10 flex items-center justify-center">
                                                        {isSubmitting ? (
                                                            <>
                                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IconSend size={20} className="mr-2" />
                                                                Send Message
                                                            </>
                                                        )}
                                                    </span>
                                                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                                                </button>
                                            </div>

                                            <p className="text-xs text-gray-500 text-center">
                                                By submitting this form, you agree to our privacy policy and terms of service.
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sponsors Section */}
                <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C7102F] via-[#f8d568] to-[#C7102F] opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-[#C7102F] via-[#f8d568] to-[#C7102F] opacity-50"></div>
                    
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl font-bold text-[#C7102F] mb-12 transform hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'IvyJournal, serif' }}>
                            OUR SPONSORS
                        </h2>
                        <div className="flex flex-wrap justify-center items-center gap-12">
                            {sponsors.map((sponsor, index) => (
                                <a 
                                    key={sponsor.name}
                                    href={sponsor.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-all duration-300 transform hover:scale-110 hover:shadow-lg rounded-lg p-4 bg-white/50 backdrop-blur-sm border border-gray-200/50"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <img 
                                        src={sponsor.logo} 
                                        alt={sponsor.name} 
                                        className="h-16 object-contain filter hover:brightness-110 transition-all duration-300"
                                    />
                                </a>
                            ))}
                        </div>
                        
                        {/* Appreciation Message */}
                        <div className="mt-12 max-w-2xl mx-auto">
                            <p className="text-gray-600 italic bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                                We extend our heartfelt gratitude to our sponsors for their continued support in making volunteering accessible to everyone.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </WebLayout>
    );
}
