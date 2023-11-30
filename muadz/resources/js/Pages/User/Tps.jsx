import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function Tps({ auth, all }) {
    const [querybtn, setQuerybtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAll, setIsAll] = useState(false);
    const [data, setData] = useState(all);
    const [dataFix, setDataFix] = useState(all);
    // FILTER DATA
    const [filterThn, setFilterThn] = useState();
    const [filterKab, setFilterKab] = useState();
    const [filterKec, setFilterKec] = useState();
    const [tahun, setTahun] = useState([]);
    const [kabupaten, setKabupaten] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    console.log(all);
    const openFilterModal = () => {
        setQuerybtn(true);
        axios
            .get(route("get-all-data"))
            .then((res) => {
                setTahun(res.data.tahun);
                setKabupaten(res.data.kabupaten);
                setKecamatan(res.data.kecamatan);
            })
            .catch((err) => console.log(err));
    };

    const filter = (e) => {
        e.preventDefault();
        const value = e.target.value;
        // console.log(value);
        const filtered = dataFix.filter((dataFix) =>
            dataFix.desa.includes(value)
        );
        setData(filtered);
        if (value.length < 1) setData(dataFix);
    };

    // Get data and filter
    const getData = async () => {
        setLoading(true);

        const thn = filterThn == "Pilih Tahun" ? null : filterThn;
        const kab = filterKab == "Pilih Kabupaten" ? null : filterKab;
        const kec = filterKec == "Pilih Kecamatan" ? null : filterKec;
        const len = dataFix.length;
        await axios
            .post(route("query-user-tps"), {
                last: len,
                tahun: thn,
                kab: kab,
                kec: kec,
            })
            .then((res) => {
                const last = res.data;
                if (res.data.length < 1) {
                    setIsAll(true);
                    setLoading(false);
                    return;
                }
                if (last[last.length - 1].id == data[data.length - 1].id) {
                    setIsAll(true);
                    setLoading(false);
                    return;
                }
                const merge = [...data, ...res.data];
                setData(merge);
                console.log(last[last.length - 1].id);
                setDataFix(merge);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const submit = () => {
        const tahun = filterThn == "Pilih Tahun" ? null : filterThn;
        const kab = filterKab == "Pilih Kabupaten" ? null : filterKab;
        const kec = filterKec == "Pilih Kecamatan" ? null : filterKec;
        if (!tahun && !kab && !kec) return;
        axios
            .post(
                route("search-tps"),
                {
                    tahun: tahun,
                    kab: kab,
                    kec: kec,
                },
                { withCredentials: true }
            )
            .then((res) => {
                setData(res.data);
                setDataFix(res.data);
                setQuerybtn(false);
                setIsAll(false);
            })
            .catch((err) => console.log(err));
    };

    const go = (uid) => {
        // return console.log(
        //     window.location.origin + window.location.pathname + "/" + uid
        // );
        window.location.href =
            window.location.origin + window.location.pathname + "/" + uid;
    };

    return (
        <>
            <Head title="Kelola TPS" />
            <Navbar isAdmin={auth} />
            <div className="max-w-6xl mt-10 mx-auto shadow-md">
                <div className="ml-5 pt-2 w-full flex">
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

                    {/* {flash.message && (
                    <div className="alert my-5 px-5 bg-green-500/30">
                        {flash.message}
                    </div>
                )} */}
                    <div className="flex justify-between w-full mr-3">
                        <div className="w-full sm:w-1/4 ml-auto pb-3">
                            <div className="flex items-center">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        onChange={filter}
                                        className="bg-gray-50 border h-7 focus:ring-0 focus:border-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Cari desa..."
                                        required=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="font-semibold mx-5 flex h-7">
                            <div onClick={openFilterModal}>
                                <svg
                                    width="24"
                                    height="24"
                                    className="text-gray-500 hover:text-black transition duration-200 hover:cursor-pointer"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.09668 6.99707H7.17358L4.17358 3.99707L1.17358 6.99707H3.09668V17.0031H1.15881L4.15881 20.0031L7.15881 17.0031H5.09668V6.99707Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M22.8412 7H8.84119V5H22.8412V7Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M22.8412 11H8.84119V9H22.8412V11Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M8.84119 15H22.8412V13H8.84119V15Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M22.8412 19H8.84119V17H22.8412V19Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Kabupaten</th>
                            <th>Kecamatan</th>
                            <th>Desa</th>
                            <th>TPS</th>
                            <th>Tahun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => {
                            return (
                                <tr
                                    className="hover:bg-gray-100 text-gray-700"
                                    key={i}
                                    onClick={() => go(item.uid)}
                                >
                                    <td className="text-center">{item.kab}</td>
                                    <td className="text-center">{item.kec}</td>
                                    <td className="text-center">{item.desa}</td>
                                    <td className="text-center">
                                        {item.kotak_tps}
                                    </td>
                                    <td className="text-center">{item.thn}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {data.length == 0 ? (
                    <div className="py-5 text-center text-gray-500">
                        Tidak ditemukan data.
                    </div>
                ) : null}
            </div>
            {!isAll ? (
                <div
                    className="text-center mb-10 mt-5 text-gray-500 hover:cursor-pointer hover:text-gray-800"
                    onClick={getData}
                >
                    Lainnya..
                </div>
            ) : (
                <div className="text-center mb-10 mt-5 text-gray-500">
                    Semua data telah tercapai.
                </div>
            )}
            {loading && (
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
            )}
            {/* MODAL */}
            <div
                className={`fixed top-0 left-0 right-0 bg-black/30 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                    querybtn ? "" : "hidden"
                }`}
            >
                <div className="relative mx-auto translate-y-full w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-gray-200 rounded-lg shadow">
                        <button
                            onClick={() => setQuerybtn(false)}
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
                                Filter
                            </h3>
                            <div className="w-full mx-auto px-5 mt-5 pb-5">
                                <select
                                    onChange={(e) => {
                                        setFilterThn(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-200 text-gray-800 focus:border-slate-400 focus:ring-0 text-sm rounded-lg block w-full"
                                >
                                    <option defaultValue="">Pilih Tahun</option>
                                    {tahun.map((item, i) => {
                                        return (
                                            <option key={i} value={item.thn}>
                                                {item.thn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="w-full mx-auto px-5 mt-5 pb-5">
                                <select
                                    onChange={(e) => {
                                        setFilterKab(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-200 text-gray-800 focus:border-slate-400 focus:ring-0 text-sm rounded-lg block w-full"
                                >
                                    <option defaultValue="">
                                        Pilih Kabupaten
                                    </option>
                                    {kabupaten.map((item, i) => {
                                        return (
                                            <option key={i} value={item.kab}>
                                                {item.kab}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="w-full mx-auto px-5 mt-5 pb-5">
                                <select
                                    onChange={(e) => {
                                        setFilterKec(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-200 text-gray-800 focus:border-slate-400 focus:ring-0 text-sm rounded-lg block w-full"
                                >
                                    <option defaultValue="">
                                        Pilih Kecamatan
                                    </option>
                                    {kecamatan.map((item, i) => {
                                        return (
                                            <option key={i} value={item.kec}>
                                                {item.kec}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer"
                                onClick={submit}
                            >
                                Filter
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}
