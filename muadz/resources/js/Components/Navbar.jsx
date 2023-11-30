import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Navbar(props) {
    const [toggle, setToggle] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    useEffect(() => {
        const name = document.querySelector("#name");
        const superadmin = document.querySelector("#superadmin");
        const superadminbtn = document.querySelector("#superadminbtn");
        const superadminbtnmobile = document.querySelector(
            "#superadminbtnmobile"
        );
        const superadminmobile = document.querySelector("#superadminmobile");

        window.addEventListener("click", (e) => {
            if (e.target == name) return;
            if (
                e.target == superadmin ||
                e.target == superadminbtn ||
                e.target == superadminbtnmobile ||
                e.target == superadminmobile
            )
                return;
            setProfileDropdown(false);
            setDropdown(false);
        });
    });
    return (
        <>
            {/* navbar goes here */}
            <nav className="bg-gray-100" id="navbar">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-4">
                            {/* logo */}
                            <div>
                                <Link
                                    href={route("main")}
                                    className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                                >
                                    <span className="font-bold">Al-Mizan</span>
                                </Link>
                            </div>
                            {/* primary nav */}
                            <div className="hidden text-sm md:flex items-center space-x-1">
                                <Link
                                    href={route("pemilihan")}
                                    className="py-5 px-3 text-gray-700 hover:text-gray-900"
                                >
                                    Pemilihan
                                </Link>
                                {props.isAdmin.user && (
                                    <Link
                                        href={route("user-tps")}
                                        className="py-5 px-3 text-gray-700 hover:text-gray-900"
                                    >
                                        Admin
                                    </Link>
                                )}
                                {/* Dropdown */}
                                {props.isAdmin.user &&
                                props.isAdmin.user.is_admin == 1 ? (
                                    <div className="dropdown text-sm inline-block relative">
                                        <button
                                            onClick={() =>
                                                setDropdown(!dropdown)
                                            }
                                            className="py-2 px-4 rounded inline-flex items-center"
                                            id="superadminbtn"
                                        >
                                            <span
                                                className="mr-1"
                                                id="superadmin"
                                            >
                                                Super Admin
                                            </span>
                                            <svg
                                                className={`fill-current h-4 w-4 transition duration-300 ${
                                                    dropdown ? "rotate-180" : ""
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                                            </svg>
                                        </button>
                                        <ul
                                            className={`dropdown-menu absolute text-gray-700 pt-1 ${
                                                dropdown ? "" : "hidden"
                                            }`}
                                        >
                                            <li className="">
                                                <Link
                                                    className="rounded-t bg-gray-100 hover:bg-gray-200/80 py-2 px-4 block whitespace-no-wrap"
                                                    href={route("register")}
                                                >
                                                    Registrasi Akun Baru
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link
                                                    href={route(
                                                        "kelola-database"
                                                    )}
                                                    className="bg-gray-100 hover:bg-gray-200/80 py-2 px-4 block whitespace-no-wrap"
                                                >
                                                    Kelola Database
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        {/* secondary nav */}
                        <div className="hidden md:flex items-center space-x-1">
                            {props.isAdmin.user ? (
                                <div className="dropdown text-sm inline-block relative">
                                    <div
                                        onClick={() =>
                                            setProfileDropdown(!profileDropdown)
                                        }
                                        id="name"
                                        className="hover:cursor-pointer py-2 px-3 font-semibold text-sm bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                                    >
                                        {props.isAdmin.user.name}
                                    </div>
                                    <ul
                                        className={`dropdown-menu absolute right-0 text-gray-700 pt-1 ${
                                            profileDropdown ? "" : "hidden"
                                        }`}
                                    >
                                        <li className="">
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="bg-gray-100 hover:bg-gray-200/80 py-2 px-4 block whitespace-no-wrap"
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="py-2 px-3 font-semibold text-sm bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                        {/* mobile button goes here */}
                        <div className="md:hidden flex items-center">
                            <button
                                className="mobile-menu-button"
                                onClick={() => setToggle(!toggle)}
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* mobile menu */}
                <div
                    className={`mobile-menu md:hidden ${
                        toggle ? "" : "hidden"
                    }`}
                >
                    <div className="flex justify-between mb-3 py-2 px-4 text-sm font-semibold hover:bg-gray-200">
                        {props.isAdmin.user != null ? (
                            <>
                                {props.isAdmin.user.name}
                                <Link
                                    href={route("logout")}
                                    className="bg-red-500/80 px-2 py-0.5 rounded-md hover:cursor-pointer"
                                >
                                    logout
                                </Link>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    <Link
                        href={route("pemilihan")}
                        className="block py-2 px-4 text-sm hover:bg-gray-200"
                    >
                        Pemilihan
                    </Link>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-200"
                    >
                        Admin
                    </a>
                    {/* Dropdown */}
                    <div
                        onClick={() => setDropdown(!dropdown)}
                        className="dropdown inline-block relative w-full"
                    >
                        <button
                            className="py-2 px-4 rounded inline-flex w-full justify-between items-center"
                            id="superadminbtnmobile"
                        >
                            <span
                                className="text-sm mr-1"
                                id="superadminmobile"
                            >
                                Super Admin
                            </span>
                            <svg
                                className={`fill-current h-4 w-4 transition duration-300 ${
                                    dropdown ? "rotate-180" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                            </svg>
                        </button>
                        <ul
                            className={`dropdown-menu absolute text-gray-700 w-full text-sm ${
                                dropdown ? "" : "hidden"
                            }`}
                        >
                            <li className="">
                                <a
                                    className="rounded-t bg-gray-100 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                                    href="#"
                                >
                                    Registrasi Akun Baru
                                </a>
                            </li>
                            <li className="">
                                <Link
                                    href={route("kelola-database")}
                                    className="bg-gray-100 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                                >
                                    Kelola Database
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
