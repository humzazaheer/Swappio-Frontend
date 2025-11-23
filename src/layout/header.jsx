import { RoutePath } from "@routes/routes";
import { Link } from "react-router";
import { Dropdown, DropdownItem } from "@components/Dropdown";
import { useAuth } from "@context/AuthContext";
import useCategories from "@hooks/useCategories";
import logo from "@assets/logo.png"
import { ButtonAnimated } from "../components/ButtonAnimated";
import { CircleX, PlusIcon } from "lucide-react";

const Header = () => {
    const { user } = useAuth();
    const { categories } = useCategories();

    return (
        <>
            <header className="z-10 flex items-center sticky top-5 justify-between px-6 py-3 md:py-4 shadow shadow-zinc-300 max-w-6xl rounded-full mx-auto w-full  bg-linear-to-r from-violet-200 to-zinc-100">
                <a href="/">
                    <img src={logo} className="w-[150px]" />
                </a>
                <nav id="menu" className="max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-0 transition-[width]   flex-col md:flex-row flex gap-8 text-gray-900 text-md font-normal">
                    <Link to="/" className="text-md">Home</Link>
                    <li className="relative group list-none">
                        <Link to={RoutePath.CATEGORIES} className="text-md py-1">Categories</Link>
                        <ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-out transform scale-95 group-hover:scale-100 origin-top-left mt-1 absolute left-0 w-56 rounded-md shadow-lg bg-white  ring-opacity-5 z-10">
                            {categories.map((category) => (
                                <li key={category.id} className="">
                                    <Link to={`/${RoutePath.ADS}/${RoutePath.CATEGORY}/${category.id}`}
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <Link to={RoutePath.ADS} className="text-md">Ads</Link>
                    <button id="closeMenu" className="md:hidden text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </nav>
                <div className="flex items-center space-x-4">

                    <ButtonAnimated
                        href={user ? `${RoutePath.ADS}/${RoutePath.CREATE}` : `${RoutePath.AUTH}/${RoutePath.LOGIN}`}
                        name={"sell"}

                    >
                        <PlusIcon className="mt-[2px]" size={18} />
                        SELL
                    </ButtonAnimated>

                    <Dropdown label={user ? user.firstName + ' ' + user.lastName : 'Account'}>
                        {user ?
                            <>
                                <DropdownItem href={RoutePath.USER + '/' + RoutePath.PROFILE}>
                                    Profile
                                </DropdownItem>

                                {user?.role !== 'admin' &&
                                    <DropdownItem href={RoutePath.USER + '/' + RoutePath.MYADS}>
                                        My Ads
                                    </DropdownItem>
                                }
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