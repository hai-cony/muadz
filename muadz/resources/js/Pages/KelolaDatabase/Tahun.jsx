import { Head, Link, router, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { useEffect, useState } from "react";

export default function Tahun({ auth, tahun }) {
    const [thn, setThn] = useState(tahun);
    const [thnName, setThnName] = useState();
    const [tambah, setTambah] = useState(false);
    const [newThn, setNewThn] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [id, setId] = useState(0);
    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        router.post("/kelola-database/tahun", { newThn: newThn });
        setTambah(false);
        setConfirm(false);
    };

    const del = () => {
        router.post(route("kelola-database-hapus-tahun"), { id: id });
        setConfirm(false);
    };
    return (
        <>
            <Head title="Kelola Tahun" />
            <Navbar isAdmin={auth} />
            <div className="max-w-6xl mt-10 mx-auto shadow-md">
                {flash.message && (
                    <div className="alert my-5 px-5 bg-green-500/30">
                        {flash.message}
                    </div>
                )}
                <div className="ml-5 pt-2">
                    <Link href={route("kelola-database")}>
                        <svg
                            width="24"
                            height="24"
                            className=" text-gray-500 hover:cursor-pointer"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
                                fill="currentColor"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="font-semibold mx-5 py-5 flex justify-between">
                    <div>Tahun</div>
                    <div
                        className="text-sm px-2 py-0.5 bg-green-500 rounded-md hover:cursor-pointer hover:bg-green-400 transition duration-200 text-gray-100"
                        onClick={() => setTambah(true)}
                    >
                        Tambah
                    </div>
                </div>

                <div>
                    {thn.map((item) => {
                        return (
                            <div
                                className="px-5 py-2 transition duration-100 hover:bg-gray-200/30 flex justify-between"
                                key={item.id}
                            >
                                <div>{item.thn}</div>
                                <div
                                    className="text-xs bg-red-500 pt-1 px-1 rounded-md hover:cursor-pointer hover:text-white transition duration-200"
                                    onClick={() => {
                                        setConfirm(true);
                                        setId(item.id);
                                        setThnName(item.thn);
                                    }}
                                >
                                    Delete
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* MODAL DELETE */}
            <div
                className={`fixed top-0 left-0 right-0 bg-black/30 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                    confirm ? "" : "hidden"
                }`}
            >
                <div className="relative mx-auto translate-y-full w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-gray-200 rounded-lg shadow">
                        <button
                            onClick={() => setConfirm(false)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="authentication-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl text-center font-medium text-gray-900">
                                Hapus Tahun {thnName}?
                            </h3>
                            <form className="flex" action="#">
                                <button
                                    type="submit"
                                    onClick={() => setConfirm(false)}
                                    className="w-full mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => del()}
                                    className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Hapus
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL */}
            <div
                className={`fixed top-0 left-0 right-0 bg-black/30 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                    tambah ? "" : "hidden"
                }`}
            >
                <div className="relative mx-auto translate-y-full w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-gray-200 rounded-lg shadow">
                        <button
                            onClick={() => setTambah(false)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="authentication-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">
                                Tambah Tahun
                            </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Tahun
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setNewThn(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Contoh : 2023"
                                        required={true}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    onClick={submit}
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Tambah
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
