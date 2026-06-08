import { useState, useEffect } from "react";
import { ARBITRATION_REQUEST_URL, DEALER_LOGIN_URL } from "../constants";
import data from "../data.json";
import logo from "../assets/images/mid-kansas-auto-auction-logo.png";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <>
            {/* Banner with links */}
            <div className="bg-white">
                <div className="px-4 py-3.5 flex container justify-end gap-6">
                    <a
                        href={DEALER_LOGIN_URL}
                        className="rounded-lg text-white bg-brand-primary px-8 py-2 hover:brightness-120 transition text-sm font-semibold"
                    >
                        Dealer Login
                    </a>
                    <a
                        href={ARBITRATION_REQUEST_URL}
                        className="rounded-lg text-white bg-brand-primary px-8 py-2 hover:brightness-120 transition text-sm font-semibold"
                    >
                        Arbitration Request
                    </a>
                </div>
            </div>

            {/* Navbar */}
            <nav className="bg-brand-gray">
                <div className="container py-6 flex flex-col lg:flex-row items-center justify-between">
                    {/* Logo */}
                    <div className="w-full lg:w-auto flex items-center justify-between md:justify-center ">
                        <a href="/" data-astro-prefetch="true">
                            <img
                                src={logo.src}
                                alt="MKSAA Logo"
                                className="max-w-[10rem]"
                            />
                        </a>

                        {/* Hamburger button */}
                        <button
                            className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2 group"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                                    isMobileMenuOpen
                                        ? "rotate-45 translate-y-2"
                                        : ""
                                }`}
                            />
                            <span
                                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                                    isMobileMenuOpen ? "opacity-0" : ""
                                }`}
                            />
                            <span
                                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                                    isMobileMenuOpen
                                        ? "-rotate-45 -translate-y-2"
                                        : ""
                                }`}
                            />
                        </button>
                    </div>

                    {/* Desktop Links */}
                    <div
                        className={`hidden lg:flex flex-row items-center gap-4 xl:gap-8 ${!isMobileMenuOpen ? "mt-6 lg:mt-0" : ""}`}
                    >
                        {data.navlinks.map((link, index) => {
                            const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
                            return (
                                <div key={index} className="relative group py-2">
                                    <a
                                        href={link.href}
                                        data-astro-prefetch="true"
                                        className={`transition flex items-center gap-1 text-[15px] ${isActive ? "text-red-500 font-medium" : "text-white font-light hover:text-red-500"}`}
                                    >
                                        {link.name}
                                        {link.children && (
                                            <svg
                                                className="w-3 h-3 mt-0.5 transition-transform group-hover:rotate-180"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        )}
                                    </a>

                                    {link.children && (
                                        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            <div className="bg-white rounded shadow-lg min-w-max py-1">
                                                {link.children.map(
                                                    (child, childIndex) => (
                                                        <a
                                                            key={childIndex}
                                                            href={child.href}
                                                            data-astro-prefetch="true"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition whitespace-nowrap"
                                                        >
                                                            {child.name}
                                                        </a>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-5 pb-6 flex flex-col">
                        {data.navlinks.map((link, index) => (
                            <div
                                key={index}
                                className="border-b border-white/10"
                            >
                                <div className="flex items-center justify-between">
                                    <a
                                        href={link.href}
                                        data-astro-prefetch="true"
                                        className={`font-light py-3 flex-1 transition ${currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href)) ? "text-red-500 font-medium" : "text-white hover:text-red-500"}`}
                                    >
                                        {link.name}
                                    </a>
                                    {link.children && (
                                        <button
                                            onClick={() =>
                                                toggleDropdown(index)
                                            }
                                            className="p-3 text-white"
                                            aria-label="Toggle submenu"
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${
                                                    openDropdown === index
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {link.children && (
                                    <div
                                        className={`overflow-hidden transition-all duration-200 ${
                                            openDropdown === index
                                                ? "max-h-48"
                                                : "max-h-0"
                                        }`}
                                    >
                                        <div className="pl-4 pb-2 flex flex-col">
                                            {link.children.map(
                                                (child, childIndex) => (
                                                    <a
                                                        key={childIndex}
                                                        href={child.href}
                                                        data-astro-prefetch="true"
                                                        className="text-gray-300 hover:text-white py-2 text-sm transition"
                                                    >
                                                        {child.name}
                                                    </a>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
