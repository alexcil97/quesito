"use client"

import { useState } from 'react';
interface CardUserProps {
    nombre: string;
    apellido: string;
    email: string;
    profile_picture: string;
}

export function ProfileCard({ nombre, apellido, email, profile_picture }: CardUserProps) {
    const [profileImage, setProfileImage] = useState('/images/erin-lindford.jpg');
    const [isHovering, setIsHovering] = useState(false);


    return (
        <>
            <div className="w-full max-w-2xl justify-self-center bg-gray-600 border border-white border-solid rounded-lg shadow">
                <div className="flex justify-end px-4 pt-8">
                </div>
                <div className="flex flex-col items-center pb-10">
                    <label
                        htmlFor="profileImageInput"
                        className="relative cursor-pointer"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src={profile_picture}
                            alt="Profile image"
                        />
                        {isHovering && (
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white bg-black bg-opacity-50 rounded-full">
                                Editar imagen
                            </span>
                        )}
                    </label>

                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{nombre}</h5>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{apellido}</h5>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{email}</h5>
                    <span className="text-sm text-white dark:text-gray-400">Visual Designer</span>
                </div>
            </div>
        </>
    );
}
