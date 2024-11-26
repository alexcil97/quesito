"use client"

import { useState } from 'react';

export function ProfileCard() {
    const [profileImage, setProfileImage] = useState('/images/erin-lindford.jpg');
    const [isHovering, setIsHovering] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

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
                            src={profileImage} 
                            alt="Profile image" 
                        />
                        {isHovering && (
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white bg-black bg-opacity-50 rounded-full">
                                Editar imagen
                            </span>
                        )}
                    </label>
                    <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">nombre</h5>
                    <span className="text-sm text-white dark:text-gray-400">Visual Designer</span>
                    <div className="flex mt-4 md:mt-6">
                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">settings</a>
                        <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                    </div>
                </div>
            </div>
        </>
    );
}
