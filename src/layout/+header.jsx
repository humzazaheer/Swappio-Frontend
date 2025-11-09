import { Link } from "react-router";
import { RoutePath } from "@routes/routes";
import { useContext, useState } from "react";
import { AuthContext } from "@context/AuthContext";


const Header = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuButtons = document.querySelectorAll('.menu-btn');
    const mobileMenus = document.querySelectorAll('.mobile-menu');

    menuButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            mobileMenus[index].classList.toggle('hidden');
        });
    });
    return (
        <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-indigo-700 to-violet-500 transition-all">

            <Link to={'/'} className="text-white text-2xl">Swappio</Link>

            <ul className="text-white md:flex hidden items-center gap-10">
                <li><Link to="/" className="text-sm">Home</Link></li>
                <li><Link to={RoutePath.CATEGORIES} className="text-sm">Categories</Link></li>
                <li><Link to={RoutePath.ADS} className="text-sm">Ads</Link></li>
            </ul>

            <div className="relative inline-block text-left">
                {/* Trigger button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer text-sm px-4 py-2 border rounded-full text-white border-gray-300 shadow-sm hover:bg-white hover:text-indigo-500"
                >
                    { user ? user.email : 'Account'}
                </button>

                {/* Dropdown panel */}
                {isOpen && (
                    <div
                        className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white border border-gray-200 shadow-lg "
                    >
                        <div className="py-1">
                        {user ?
                        <Link className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" to={`${RoutePath.AUTH}/${RoutePath.LOGOUT}`}>Logout</Link>
                        :
                        <> 
                            <Link className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" to={`${RoutePath.AUTH}/${RoutePath.LOGIN}`}>Login</Link>
                            <Link className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" to={`${RoutePath.AUTH}/${RoutePath.REGISTER}`}>Register</Link>
                        </>
                        
                        }
                            </div>
                    </div>
                )}
            </div>

            <button aria-label="menu-btn" type="button" className="menu-btn inline-block md:hidden active:scale-90 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
                    <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
                </svg>
            </button>

            <div className="mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 hidden md:hidden">
                <ul className="flex flex-col space-y-4 text-white text-lg">
                    <li><Link to="/" className="text-sm">Home</Link></li>
                    <li><Link to={RoutePath.CATEGORIES} className="text-sm">Categories</Link></li>
                    <li><Link to={RoutePath.ADS} className="text-sm">Ads</Link></li>
                </ul>
                <div className="relative inline-block text-left">
                    {/* Trigger button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer text-sm px-4 py-2 border rounded-full text-white border-gray-300 shadow-sm hover:bg-white hover:text-indigo-500"
                    >
                        Account
                    </button>

                    {/* Dropdown panel */}
                    {isOpen && (
                        <div
                            className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white border border-gray-200 shadow-lg "
                        >
                            <div className="py-1">

                                <Link className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" to={`${RoutePath.AUTH}/${RoutePath.LOGIN}`}>Login</Link>
                                <Link className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" to={`${RoutePath.AUTH}/${RoutePath.REGISTER}`}>Register</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header;