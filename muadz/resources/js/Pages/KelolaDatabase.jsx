import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import Tahun from "./KelolaDatabase/Tahun";
import { useEffect, useState } from "react";

export default function KelolaDatabase({ auth }) {
    return (
        <>
            <Head title="Kelola Database"></Head>
            <Navbar isAdmin={auth} />
            <div className="max-w-6xl mt-10 mx-auto shadow-md">
                <div className="font-semibold mx-4 py-5">
                    Pengelola Database
                </div>
                <Link
                    href={route("kelola-database-tahun")}
                    onClick={() => setTahun(true)}
                    className="text-sm w-full py-5 px-5 flex hover:bg-gray-200/50 transition duration-200 hover:cursor-pointer"
                >
                    Tahun
                </Link>
                <Link
                    href={route("kelola-database-kabupaten")}
                    className="text-sm w-full py-5 px-5 flex hover:bg-gray-200/50 transition duration-200 hover:cursor-pointer"
                >
                    Kabupaten
                </Link>
                <Link
                    href={route("kelola-database-kecamatan")}
                    className="text-sm w-full py-5 px-5 flex hover:bg-gray-200/50 transition duration-200 hover:cursor-pointer"
                >
                    Kecamatan
                </Link>
                <Link
                    href={route("kelola-database-desa")}
                    className="text-sm w-full py-5 px-5 flex hover:bg-gray-200/50 transition duration-200 hover:cursor-pointer"
                >
                    Desa & TPS
                </Link>
            </div>
        </>
    );
}
