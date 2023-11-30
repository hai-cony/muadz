import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function DesaTps({ auth, data }) {
    const [tambah, setTambah] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [desa, setDesa] = useState(data.desa);
    const [tps, setTps] = useState(data.tps);
    const [tpsUid, setTpsUid] = useState();
    const [error, setError] = useState({});
    const [newTps, setNewTps] = useState();
    const [newTpsName, setNewTpsName] = useState();

    const del = async (e) => {
        await axios
            .post(route("delete-tps"), { uid: tpsUid, desaId: desa[0].id })
            .then((res) => {
                setTps(res.data);
                setConfirm(false);
            })
            .catch((err) => console.log(res));
    };

    const submit = async () => {
        let name = newTpsName;
        let val = newTps;

        if ((!newTps || newTps == 0) && (newTpsName == "" || newTpsName != ""))
            return;

        if ((newTps > 1 && newTpsName != "") || (newTps > 1 && !newTpsName))
            name = null;

        const last = tps[tps.length - 1];
        const lastName = last.kotak_tps.split(" ");
        const split = Number(lastName[1]);
        const num = split + 1;

        if (newTps == 1 && (newTpsName == "" || !newTpsName))
            name = "TPS " + num;

        console.log(name || num);
        console.log(val);

        await axios
            .post(route("add-tps"), {
                name: name || num,
                val: val,
                desaId: desa[0].id,
            })
            .then((res) => {
                setTps(res.data);
                setTambah(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Head title="Desa detail" />
            <Navbar isAdmin={auth} />
            <div className="max-w-6xl mt-10 mb-10 mx-auto shadow-md">
                <div className="ml-5 pt-2 flex">
                    <Link href={route("kelola-database-desa")}>
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
                    <div className="ml-10">
                        {desa.map((item, i) => {
                            return <div key={i}> Desa {item.desa}</div>;
                        })}
                    </div>
                    <div
                        className="ml-auto mr-2 text-sm mt-2 border-l px-3 border-l-gray-300 hover:bg-gray-300 transition duration-200 hover:cursor-pointer"
                        onClick={() => setTambah(true)}
                    >
                        Tambah
                    </div>
                </div>
                <div>
                    <table className="table-auto mt-5 w-full">
                        <thead>
                            <tr>
                                <th className="bg-gray-100/50">No. TPS</th>
                                <th className="bg-gray-100/50">Suara</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tps.map((item, i) => {
                                return (
                                    <tr
                                        className="hover:bg-gray-100 text-gray-700"
                                        key={i}
                                    >
                                        <td className="text-center">
                                            {item.kotak_tps}
                                        </td>
                                        <td className="text-center relative">
                                            {item.suara}{" "}
                                            <span
                                                className="absolute right-0 text-sm px-2 mt-1 mr-2 border-l border-l-gray-300 hover:text-red-500 hover:cursor-pointer transition duration-200"
                                                onClick={() => {
                                                    setTpsUid(item.uid);
                                                    setConfirm(true);
                                                }}
                                            >
                                                Hapus
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {tps.length == 0 ? (
                        <div className="py-5 text-center text-gray-500">
                            Tidak ditemukan data.
                        </div>
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
                                Hapus TPS?
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
                                Tambah TPS
                            </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Nama TPS
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setNewTpsName(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Contoh : TPS 1"
                                        disabled={newTps > 1 ? true : false}
                                    />
                                    {newTps > 1 ? (
                                        <small className="text-red-600">
                                            Nama TPS akan di atur secara berurut
                                            menurut urutan yang paling besar.
                                        </small>
                                    ) : (
                                        <small className="text-blue-600">
                                            Anda dapat mengatur nama TPS.
                                            Kosongkan untuk nama otomatis.
                                        </small>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Jumlah TPS
                                    </label>
                                    <input
                                        type="number"
                                        onChange={(e) =>
                                            setNewTps(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
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
        </>
    );
}
