import { useState } from 'react';
import { Link } from 'react-router';

export const Dropdown = ({
    label,
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="bg-linear-to-r from-violet-600 to-violet-800 hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition cursor-pointer">
                {label}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white  ring-opacity-5 z-10">
                    <div className="py-1">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export const DropdownItem = ({href, children}) => {
    return (
        <>
        <Link to={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {children}
        </Link>
        </>
    )
}
