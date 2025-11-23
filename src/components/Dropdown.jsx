import { useState } from 'react';
import { Link } from 'react-router';

export const Dropdown = ({
    label,
    children,
    customClass
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="items-center  bg-linear-to-r from-violet-600 to-violet-800 hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-md font-medium hover:bg-indigo-700 transition cursor-pointer">
                {label}
                <svg className="-mr-1 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white  ring-opacity-5 z-10">
                    <div className="py-0">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export const DropdownItem = ({ href, children, customClass }) => {
    return (
        <>
            <Link to={href} className={customClass ? customClass : `block px-4 py-2 rounded text-md text-gray-700 hover:bg-gray-100`}>
                {children}
            </Link>
        </>
    )
}
