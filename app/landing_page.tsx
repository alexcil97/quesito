"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import Link from "next/link"



const landing_page = () => {

    
    return (
        <>
            <CardWrapper backButtonHref="" backButtonLabel="" headerLabel="Bienvenid@ a Netgrams">
                <div className="flex justify-center p-2">
                <p>La red social para informaticos y estudiantes de dicha materia en la cual poder desarrollarte y aprender en un entorno agradable y divertido mientras socializas y conoces gente!</p>
                </div>

                <div className="flex justify-center p-10">
                    <Link href="auth/login">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Login
                    </span>
                </button>
                    </Link>
                <Link href="/auth/register">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Registration
                    </span>
                </button>
                </Link>
                </div>
            </CardWrapper>
        </>
    )
}

export default landing_page