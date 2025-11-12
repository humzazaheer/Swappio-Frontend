import { RoutePath } from "@routes/routes";
import { Link } from "react-router";
import { Dropdown, DropdownItem } from "@components/Dropdown";
import { useAuth } from "@context/AuthContext";
import useCategories from "@hooks/useCategories";

const Header = () => {
    const { user } = useAuth();
    const categories = useCategories();

    return (
        <>
            <header className="flex items-center sticky top-5 justify-between px-6 py-3 md:py-4 shadow shadow-violet-100 max-w-5xl rounded-full mx-auto w-full  bg-linear-to-r from-violet-100 to-zinc-50">
                <a href="/">
                    Swappio
                </a>
                <nav id="menu" className="max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-0 transition-[width]   flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal">
                    <Link to="/" className="text-sm">Home</Link>
                    <li className="relative group list-none">
                        <Link to={RoutePath.CATEGORIES} className="text-sm py-1">Categories</Link>
                        <ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-out transform scale-95 group-hover:scale-100 origin-top-left mt-1 absolute left-0 w-56 rounded-md shadow-lg bg-white  ring-opacity-5 z-10">
                            {categories.map((category) => (
                                <li key={category.id} className="">
                                    <Link to={RoutePath.CATEGORIES + '/' + category.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <Link to={RoutePath.ADS} className="text-sm">Ads</Link>
                    <button id="closeMenu" className="md:hidden text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </nav>
                <div className="flex items-center space-x-4">
                    {/* <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
                                stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button> */}
                    <Dropdown label={user ? user.email : 'Account'}>
                        {user ?
                            <>
                                <DropdownItem href={RoutePath.USER + '/' + RoutePath.PROFILE}>
                                    Profile
                                </DropdownItem>
                                <DropdownItem href={RoutePath.USER + '/' + RoutePath.LOGOUT}>
                                    Logout
                                </DropdownItem>
                            </>
                            :
                            <>
                                <DropdownItem href={RoutePath.AUTH + '/' + RoutePath.LOGIN}>
                                    Login
                                </DropdownItem>
                                <DropdownItem href={RoutePath.AUTH + '/' + RoutePath.REGISTER}>
                                    Signup
                                </DropdownItem>
                            </>
                        }

                    </Dropdown>
                    <button id="openMenu" className="md:hidden text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

        </>
    )
}
export default Header;