"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

interface CountryOption {
    label: string;
    value: string;
}

interface TagOption {
    name: string;
}

interface CreatePostFormProps {
    onPostCreated?: () => void;
}

// Just for testing more countries will follow
const countries: CountryOption[] = [
    {label: "Afghanistan", value: "AF"},
    {label: "Albania", value: "AL"},
    {label: "Algeria", value: "DZ"},
    {label: "Australia", value: "AU"},
    {label: "Brazil", value: "BR"},
    {label: "Canada", value: "CA"},
    {label: "United States", value: "US"},
];

const tags: TagOption[] = [
    {name: "Fun"},
    {name: "Adventure"},
    {name: "Travel"},
    {name: "StudyAbroad"},
    {name: "StudentLife"},
    {name: "InternationalStudents"},
    {name: "CampusVibes"},
    {name: "CultureShock"},
    {name: "ExpatLife"},
    {name: "NewExperiences"},
    {name: "Explore"},
    {name: "Friendship"},
    {name: "Events"},
    {name: "DiverseCultures"},
    {name: "StudyTips"},
    {name: "LanguageExchange"},
    {name: "GlobalCommunity"},
    {name: "Foodie"},
    {name: "LocalGuides"},
    {name: "WeekendGetaways"},
    {name: "InternationalEvents"},
    {name: "UniversityTips"},
    {name: "StudentBudget"},
    {name: "Networking"},
    {name: "InternationalTravel"},
    {name: "CulturalExchange"},
    {name: "FreshStart"},
    {name: "MakingMemories"},
    {name: "LanguageLearning"},
];

export default function CreatePostCard({onPostCreated}: CreatePostFormProps) {
    const [description, setDescription] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [errors, setErrors] = useState({
        description: false,
        selectedTag: false,
        selectedCountry: false,
        image: false,
    });

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDescription(value);

        if (errors.description && value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: false,
            }));
        }
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCountry(value);

        if (errors.selectedCountry && value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedCountry: false,
            }));
        }
    };

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedTag(value);

        if (errors.selectedTag && value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedTag: false,
            }));
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setImageName(file.name);

            if (errors.image) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: false,
                }));
            }
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImageName(null);
    };

    const handleToggleComments = () => {
        setCommentsEnabled((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        const newErrors = {
            description: !description.trim(),
            selectedTag: !selectedTag,
            selectedCountry: !selectedCountry,
            image: !image,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            return; // Do not submit if there are errors
        }


        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("userId", "1"); // Replace with actual user ID
            formData.append("content", description.trim());
            formData.append("tag", selectedTag);
            formData.append("country", selectedCountry);
            formData.append("commentsEnabled", String(commentsEnabled));
            if (image) {
                formData.append("image", image);
            }

            const formDataEntries: Record<string, any> = {};
            formData.forEach((value, key) => {
                formDataEntries[key] = value instanceof File ? value.name : value;
            });

            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create post");
            }

            alert("Post created successfully!");
            resetForm();
            onPostCreated?.();
            router.push("/user-posts");
        } catch (error) {
            alert(error instanceof Error ? error.message : "Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };


    const resetForm = () => {
        setDescription("");
        setSelectedCountry("");
        setSelectedTag("");
        setCommentsEnabled(false);
        setImage(null);
        setImageName(null);
        setCommentsEnabled(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg">
                    <div className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg pt-3 pb-3">
                        <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36 12L12 36M12 12L36 36" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <h1 className="text-[20px] ml-[-150px] pl-3 font-poppins font-bold text-[rgba(255,107,0,1)]">Create
                            Post</h1>
                        <button type="submit" className="underline pr-3 text-[rgba(255,107,0,1)]">Post</button>
                    </div>
                    <div className="flex flex-col items-start space-y-4 pl-3 pr-3">
                        <input
                            value={description}
                            onChange={handleDescriptionChange}
                            maxLength={100}
                            disabled={isSubmitting}
                            placeholder="Add a description..."
                            className={`pl-3 border-0 p-2 rounded focus:outline-none w-80 ${
                                errors.description ? "border-red-500" : ""
                            }`}
                        />
                        {errors.description && <p className="text-red-500 text-sm pl-3">Description is required.</p>}
                        <div className="relative w-full max-w-[450px] h-[1px] bg-[#A3A3A380] mt-3"></div>
                        <select
                            value={selectedTag}
                            onChange={handleTagChange}
                            className={`pl-3 border-0 p-2 rounded focus:outline-none w-80 ${
                                errors.selectedTag ? "border-red-500" : ""
                            }`}
                        >
                            <option value="" disabled>Select a tag</option>
                            {tags.map((tag) => (
                                <option key={tag.name} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                        {errors.selectedTag && <p className="text-red-500 text-sm pl-3">Tag is required.</p>}
                        <div className="relative w-full max-w-[450px] h-[1px] bg-[#A3A3A380] mt-3"></div>
                        <select
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            className={`pl-3 border-0 p-2 rounded focus:outline-none w-80 ${
                                errors.selectedCountry ? "border-red-500" : ""
                            }`}
                        >
                            <option value="" disabled>Select a country</option>
                            {countries.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        {errors.selectedCountry && <p className="text-red-500 text-sm pl-3">Country is required.</p>}
                        <div className="relative w-full max-w-[450px] h-[1px] bg-[#A3A3A380] mt-3"></div>
                    </div>
                    <div className="flex items-center space-x-4 p-4">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex items-center justify-center w-12 h-12 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                        >
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.5">
                                    <path
                                        d="M42 30V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V30M34 16L24 6M24 6L14 16M24 6V30"
                                        stroke="#1E1E1E"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className={`hidden pl-3 border-0 p-2 rounded focus:outline-none w-80 ${
                                    errors.image ? "border-red-500" : ""
                                }`}
                                onChange={handleImageUpload}
                            />
                        </label>
                        {errors.image && <p className="text-red-500 text-sm">image is required.</p>}


                        {imageName && (
                            <div className="flex items-center space-x-2">
                                <span
                                    className="text-gray-700 text-sm bg-gray-100 border-2 rounded-2xl">{imageName}</span>
                                <button
                                    onClick={handleRemoveImage}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="relative w-full max-w-[450px] h-[1px] bg-[#A3A3A380] mt-3"></div>
                    <div className="pl-3 pb-3 flex items-start justify-between">
                        <div>
                            <h2 className="mb-[-15px] font-poppins font-semibold text-[17px] leading-[36px] tracking-[-0.095em] text-black">
                                Comments
                            </h2>
                            <p className="font-poppins font-normal text-[15px] leading-[30px] tracking-[-0.095em] text-[rgba(163,163,163,0.8)]">
                                Enabling comment will allow comments
                            </p>
                        </div>
                        <div
                            className="flex items-center space-x-3 cursor-pointer mt-5 pr-3"
                            onClick={handleToggleComments}
                        >
                            <div
                                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                                    commentsEnabled ? "bg-[rgba(255,107,0,1)]" : "bg-gray-300"
                                } transition duration-300`}
                            >
                                <div
                                    className={`w-4 h-4 bg-white rounded-full shadow-md transform ${
                                        commentsEnabled ? "translate-x-6" : "translate-x-0"
                                    } transition duration-300`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
