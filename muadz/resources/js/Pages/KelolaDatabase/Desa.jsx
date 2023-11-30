import Navbar from "@/Components/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function Desa({ auth, tahun }) {
    const [thn, setThn] = useState(0);
    const [kab, setKab] = useState([]);
    const [kec, setKec] = useState([]);
    const [des, setDes] = useState([]);
    const [desFix, setDesFix] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState({});
    const [error, setError] = useState({});
    const [notification, setNotification] = useState(false);

    const [kabId, setKabId] = useState();
    const [kecId, setKecId] = useState();
    const [desId, setDesId] = useState();
    const [newDes, setNewDes] = useState();

    const [tambah, setTambah] = useState(false);

    const getKabupaten = async (thn) => {
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

    const getDesa = async (id) => {
        setLoading(true);
        await axios
            .get(route("api-get-desa", [thn, id]))
            .then((res) => {
                setDes(res.data);
                setDesFix(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const del = async (e) => {
        e.preventDefault();
        await axios
            .post(route("api-delete-desa"), {
                desaId: desId,
                tahun: thn,
                kecId: kecId,
                auth: "$2y$12$X6nkaoEMI7yE3CsT5P28k.Gbvpg7P5tQJUUt37AA.7lEi4BjqYZUq",
            })
            .then((res) => {
                setDes(res.data);
                setDesFix(res.data);
                setConfirm(false);
                setNotification(true);
                setSuccess({ delete: "Hapus Desa berhasil!" });
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const submit = async (e) => {
        e.preventDefault();
        if (
            !thn ||
            thn == "Pilih Tahun" ||
            !kabId ||
            kabId == "Pilih Kabupaten" ||
            !kecId ||
            kecId == "Pilih Kecamatan"
        )
            return setError({ require: true });

        if (!newDes || newDes == "") return setError({ newDes: true });

        await axios
            .post(route("api-insert-desa"), {
                kecId: kecId,
                tahun: thn,
                newDesa: newDes,
            })
            .then((res) => {
                setDes(res.data);
                setDesFix(res.data);
                setTambah(false);
                setSuccess({ insert: "Berhasil menambahkan Desa!" });
                setNotification(true);
                setError({});
            })
            .catch((err) => console.log(err));
    };

    const filter = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const filtered = desFix.filter((desFix) => desFix.desa.includes(value));
        setDes(filtered);
        if (value.length < 1) setDes(desFix);
    };

    return (
        <>
            <Head title="Kelola Desa" />
            <Navbar isAdmin={auth} />
            <div className="max-w-6xl mt-10 mb-10 mx-auto shadow-md">
                {notification && success.delete ? (
                    <div
                        className="flex items-center p-4 mb-4 transition-transform duration-200 rounded-t-md text-green-800 border-t-4 border-green-300 bg-green-50"
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            {success.delete}
                        </div>
                        <button
                            type="button"
                            onClick={() => setNotification(false)}
                            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg hover:text-black transition duration-200 inline-flex items-center justify-center h-8 w-8"
                        >
                            <span className="sr-only">Dismiss</span>
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
                        </button>
                    </div>
                ) : null}
                {notification && success.insert ? (
                    <div
                        className="flex items-center p-4 mb-4 transition-transform duration-200 rounded-t-md text-green-800 border-t-4 border-green-300 bg-green-50"
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            {success.insert}
                        </div>
                        <button
                            type="button"
                            onClick={() => setNotification(false)}
                            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg hover:text-black transition duration-200 inline-flex items-center justify-center h-8 w-8"
                        >
                            <span className="sr-only">Dismiss</span>
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
                        </button>
                    </div>
                ) : null}
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
                <div className="flex mt-10 justify-between">
                    <div className="ml-5 font-semibold">Desa</div>
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
                            setKab([]);
                            setKec([]);
                            setDes([]);
                            setThn(e.target.value);
                            getKabupaten(e.target.value);
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
                                //   setNewKab(e.target.value);
                                setKec([]);
                                setDes([]);
                                setKabId(e.target.value);
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
                    <div className="w-full mx-auto px-5 mt-5 pb-5">
                        <select
                            onChange={(e) => {
                                setKecId(e.target.value);
                                getDesa(e.target.value);
                                setDes([]);
                            }}
                            className="bg-gray-50 border border-gray-200 text-gray-800 focus:border-slate-400 focus:ring-0 text-sm rounded-lg block w-full"
                        >
                            <option defaultValue="">Pilih Kecamatan</option>
                            {kec.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.kec}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                ) : null}
                <div>
                    {des.length > 0 || desFix.length > 0 ? (
                        <div className="w-1/4 ml-auto mr-5 pb-3">
                            <input
                                className="h-7 w-full focus:ring-0 focus:border-gray-500 border border-gray-300 rounded-md"
                                type="text"
                                onChange={filter}
                                placeholder="Cari.."
                            />
                        </div>
                    ) : null}
                    {des.length > 0 ? (
                        <>
                            <div className="max-w-6xl mx-auto shadow-md rounded-b-md">
                                <div>
                                    {des.map((item) => {
                                        return (
                                            <div
                                                className="px-5 py-2 transition duration-100 hover:bg-gray-200/30 flex justify-between"
                                                key={item.id}
                                            >
                                                <Link
                                                    href={route("desa", [
                                                        item.id,
                                                    ])}
                                                    className="w-[96%]"
                                                >
                                                    {item.desa}
                                                </Link>
                                                <div
                                                    className="text-xs pt-1 pl-2 pr-1 border-l border-gray-400 hover:cursor-pointer hover:text-red-800 transition duration-200"
                                                    onClick={() => {
                                                        setConfirm(true);
                                                        setDesId(item.id);
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
                                Hapus Desa
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
                                Tambah Desa
                            </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Desa
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setNewDes(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Contoh : Palasah"
                                        required={true}
                                    />
                                    {error.newDes ? (
                                        <small className="text-red-600">
                                            Nama desa dibutuhkan.
                                        </small>
                                    ) : null}
                                </div>
                                {error.require ? (
                                    <small className="text-red-600">
                                        Pilih tahun, kabupaten, kecamatan
                                        terlebih dahulu.
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
