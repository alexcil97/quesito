"use client"

import { FaGithub } from "react-icons/fa"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"

export const Social = () => {

    return (

        <div className="w-full">
            <div className="flex items-center gap-4 py-2">

            </div>
            <div>
                <Button
                    size="lg"
                    className="w-full hover:bg-slate-700 hover:text-white bg-white"
                    variant="link"
                >
                    <FaGithub className="h-5 w-5" />
                    Continuar con GitHub
                </Button>
                <Button
                    size="lg"
                    className="w-full hover:bg-slate-700 hover:text-white bg-white"
                    variant="link"
                >
                    <FcGoogle className="h-5 w-5" />
                    Continuar con Google
                </Button>
            </div>
        </div>

    )
}