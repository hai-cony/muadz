import Navbar from "@/Components/Navbar";
import { Head, Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function Kecamatan({ auth, tahun }) {
    const [thn, setThn] = useState(0);
    const [kab, setKab] = useState([]);
    const [kec, setKec] = useState([]);
    const [loading, setLoading] = useState(false);
    const { flash } = usePage().props;

    const [tambah, setTambah] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [kecId, setKecId] = useState(0);
    const [kecName, setKecName] = useState();
    const [kabName, setKabName] = useState();
    const [newKec, setNewKec] = useState();
    const [newKab, setNewKab] = useState();
    const [error, setError] = useState({});

    const queryTahun = async (thn) => {
        setLoading(true);
        await axios
            .post(route("api-get-kabupaten", { tahun: thn }))
            .then((res) => {
                setKab(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const getKecamatan = async (id) => {
        setLoading(true);
        await axios
            .post(route("api-get-kecamatan", { tahun: thn, kabId: id }))
            .then((res) => {
                setKec(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const del = (e) => {
        e.preventDefault();
        router.post(route("kelola-database-hapus-kecamatan"), {
            kecName: kecName,
            id: kecId,
        });
        setConfirm(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (
            thn == 0 ||
            thn == "Pilih Tahun" ||
            !newKab ||
            newKab == "Pilih Kabupaten"
        )
            return setError({
                thnRequire: "Tentukan Tahun dan Kabupaten terlebih dahulu!",
            });
        router.post("/kelola-database/kecamatan", {
            newKec: newKec,
            newKabId: newKab,
        });
        setTambah(false);
        setError({});
    };

    return (
        <>
            <Head title="Kelola Kecamatan" />
            <Navbar isAdmin={auth} />
            <div className="max-w-6xl mt-10 mx-auto shadow-md">
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
                {flash.message && (
                    <div className="alert my-5 px-5 bg-green-500/30">
                        {flash.message}
                    </div>
                )}
                <div className="flex mt-10 justify-between">
                    <div className="ml-5 font-semibold">Kecamatan</div>
                    <div className="font-semibold mx-5">
                        <div
                            className="text-sm px-2 py-0.5 hover:cursor-pointer transition duration-200 text-green-600 border border-green-600 rounded-md hover:bg-green-100"
                            onClick={() => setTambah(true)}
                        >
                            Tambah
                        </div>
                    </div>
                </div>
                <div className="w-full mx-auto px-5 mt-5 pb-5">
                    <select
                        onChange={(e) => {
                            setThn(e.target.value);
                            setKec([]);
                            queryTahun(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-200 text-gray-800 focus:border-slate-400 focus:ring-0 text-sm rounded-lg block w-full"
                    >
                        <option defaultValue="">Pilih Tahun</option>
                        {tahun.map((item) => {
                            return (
                                <option key={item.id} value={item.thn}>
                                    {item.thn}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {kab.length > 0 ? (
                    <div className="w-full mx-auto px-5 mt-5 pb-5">
                        <select
                            onChange={(e) => {
                                setNewKab(e.target.value);
                                getKecamatan(e.target.value);
                            }}
                            className="bg-gray-50 border border-gray-200 text-gray-800 focus:border-slate-400 focus:ring-0 text-sm rounded-lg block w-full"
                        >
                            <option defaultValue="">Pilih Kabupaten</option>
                            {kab.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.kab}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                ) : null}
                {kec.length > 0 ? (
                    <>
                        <div className="max-w-6xl mx-auto shadow-md rounded-b-md">
                            <div>
                                {kec.map((item) => {
                                    return (
                                        <div
                                            className="px-5 py-2 transition duration-100 hover:bg-gray-200/30 flex justify-between"
                                            key={item.id}
                                        >
                                            <div>{item.kec}</div>
                                            <div
                                                className="text-xs pt-1 pl-2 pr-1 border-l border-gray-400 hover:cursor-pointer hover:text-red-800 transition duration-200"
                                                onClick={() => {
                                                    setConfirm(true);
                                                    setKecName(item.kec);
                                                    setKabName(item.kab);
                                                    setKecId(item.id);
                                                }}
                                            >
                                                Hapus
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ) : null}
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
                            <h3 className="mb-4 text-xl px-5 text-center font-medium text-gray-900">
                                Hapus Kecamatan {kecName} Kabupaten {kabName}{" "}
                                Tahun {thn}?
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
                                    onClick={(e) => del(e)}
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
                            onClick={() => {
                                setTambah(false);
                                setError({});
                            }}
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
                                Tambah Kecamatan
                            </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Kecamatan
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setNewKec(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Contoh : Palasah"
                                        required={true}
                                    />
                                </div>
                                {error.thnRequire ? (
                                    <small className="text-red-500">
                                        {error.thnRequire}
                                    </small>
                                ) : null}
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
            {loading ? (
                <div role="status" className="p-5 flex justify-center">
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : null}
        </>
    );
}
