"use client"

import storyPfp from "frontend/src/app/images/Flag_of_Morocco.png"
import openedImage from "frontend/src/app/images/international-students.png"
import Image from "next/image";
import React, {useState} from "react";
import CreatePostCard from "@/app/components/create-post-card/create-post-card";
import CreateStoryCard from "@/app/components/create-story-card/create-story-card";

export default function Stories() {

    const [activeIndex, setActiveIndex] = useState(null);

    const storiesFromUsers = [storyPfp, storyPfp, storyPfp, storyPfp]; // Replace later with user u follow pfp

    const closePopup = () => {
        setActiveIndex(null);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility
    return (
        <div className="flex justify-center mt-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 max-w-full">
                {/* Own story */}
                <div className="relative flex-shrink-0 snap-center">
                    <Image
                        className="object-cover w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full transition-all hover:border-4 hover:border-black"
                        src={storyPfp}
                        alt="logo"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-[#FF6B00] text-white rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-xs md:text-sm font-bold">+</span>
                    </div>
                </div>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={() => setIsModalOpen(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setIsModalOpen(false);
                        }}
                        tabIndex={0}>
                        <div
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CreateStoryCard/>
                        </div>
                    </div>
                )}

                {/* Other users story */}
                {storiesFromUsers.map((story, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`relative flex-shrink-0 snap-center cursor-pointer transition-all duration-300
          ${
                            activeIndex === index
                                ? "border-4 border-black"
                                : "hover:border-4 hover:border-orange-500"
                        }`}
                    >
                        <Image
                            className="object-cover w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full"
                            src={story}
                            alt={`story-${index}`}
                        />
                    </div>
                ))}

                {activeIndex !== null && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                        onClick={closePopup}
                    >
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <Image
                                src={openedImage}
                                alt="Opened Image"
                                width={300}
                                height={300}
                                className="rounded-lg shadow-lg md:w-[400px] md:h-[400px]"
                            />
                            <button
                                onClick={closePopup}
                                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-red-500 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center shadow-lg"
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
