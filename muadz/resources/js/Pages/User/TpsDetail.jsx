import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function TpsDetail({ auth, data }) {
    const [thisData, setThisData] = useState(data);
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState({});
    const [newSuara, setNewSuara] = useState();

    const submit = async () => {
        await axios
            .post(route("ubah-suara"), {
                newSuara: newSuara,
                user: auth.user.id,
                uid: data[0].uid,
            })
            .then((res) => {
                setThisData(res.data);
                setToggle(false);
            })
            .catch((err) => console.log(err));
        console.log("submit");
    };
    return (
        <>
            <Head title="Desa detail" />
            <Navbar isAdmin={auth} />
            <div className="max-w-6xl mt-10 mb-10 mx-auto shadow-md p-5">
                {thisData.map((item, i) => {
                    return (
                        <div key={i} className="md:flex w-full">
                            <div className="md:w-1/2 my-5 space-y-5">
                                <div>
                                    Kabupaten &emsp;&emsp;&emsp; : {item.kab}
                                </div>
                                <div>
                                    Kecamatan &emsp;&emsp;&emsp;: {item.kec}
                                </div>
                                <div>
                                    Desa
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp; :{" "}
                                    {item.desa}
                                </div>
                                <div>
                                    Tahun &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; :{" "}
                                    {item.thn}
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex flex-wrap">
                                    <div className="w-full p-3 sm:w-1/2">
                                        <div className="text-center border bg-green-200/70 rounded-md h-44">
                                            <div className="rounded-t-md bg-amber-50/50">
                                                Nomor TPS
                                            </div>
                                            <div className="h-[86%] flex items-center justify-center text-3xl rounded-b-md">
                                                {item.kotak_tps}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full p-3 sm:w-1/2">
                                        <div className="text-center border rounded-md h-44">
                                            <div className="bg-gray-300/50 rounded-t-md">
                                                Suara
                                            </div>
                                            <div className="h-[86%] bg-blue-100/50 flex items-center justify-center text-3xl rounded-b-md">
                                                {item.suara}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div
                    className="bg-blue-500 mx-3 rounded-md text-gray-100 text-center hover:cursor-pointer hover:bg-blue-600 transition duration-200 md:w-[48%] md:ml-auto"
                    onClick={() => setToggle(true)}
                >
                    Ubah suara
                </div>
            </div>
            {/* MODAL */}
            <div
                className={`fixed top-0 left-0 right-0 bg-black/30 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                    toggle ? "" : "hidden"
                }`}
            >
                <div className="relative mx-auto translate-y-full w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-gray-200 rounded-lg shadow">
                        <button
                            onClick={() => {
                                setToggle(false);
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
                                Ubah Suara
                            </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Jumlah Suara
                                    </label>
                                    <input
                                        type="number"
                                        onChange={(e) =>
                                            setNewSuara(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Number"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    onClick={submit}
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Ubah
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
