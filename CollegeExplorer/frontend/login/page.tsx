"use client";

import SubmitButton from "@/app/components/submit-button/submit-button";
import InputField from "@/app/components/account-input-fields/account-input-fields";
import logo from "@/app/images/college-explorer-logo.png";

import {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import AccountModal from "@/app/components/account-modal/account-modal";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const validatePassword = (value: string) => value.length >= 8;

    const submitLoginForm = async () => {
        setUsernameError(false);
        setPasswordError(false);

        if (validatePassword(password)) {
            try {
                const response = await fetch("http://localhost:8080/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.token) {
                        Cookies.set("sessionToken", data.token, { expires: 1, sameSite: "Strict", secure: true });
                        router.replace("/feed");
                        location.reload();
                    }
                } else {
                    const errorData = await response.text();
                    if (errorData === "Username or password is incorrect") {
                        alert("Username and password do not match!");
                        setUsernameError(true);
                        setPasswordError(true);
                    }
                }
            } catch (error) {
                console.error("Error logging in:", error);
            }
        } else {
            setPasswordError(true);
        }
    };


    return (
        <AccountModal maxWidth="max-w-[500px] max-h-[520px]">
            <div className="p-8 w-full">
                <div className="mb-6 text-center">
                    <Image src={logo} alt="Logo" className="w-10 h-10 inline-block mr-2"/>
                    <p className="text-[#FF6B00] text-[24px] font-bold leading-[36px] inline-block">
                        CollegeExplorer
                    </p>
                </div>
                <p className="text-center text-[20px] text-gray-800 font-bold mb-4">
                    Welcome Back 👋
                </p>
                <InputField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError(false);
                    }}
                    isValid={true}
                    isTaken={usernameError}
                />
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
                    }}
                    isValid={validatePassword(password)}
                    errorMessage={
                        !validatePassword(password) && password
                            ? "Password must be at least 8 characters long."
                            : ""
                    }
                    isTaken={passwordError}
                />
                <div className="flex justify-center mt-6">
                    <SubmitButton label="Login" onClick={submitLoginForm}/>
                </div>
                <div className="relative w-full max-w-[457px] h-[1px] bg-[#A3A3A380] mt-3"></div>
                <p className="text-gray-500 text-sm mt-3 text-center">
                    Don't have an account?{" "}
                    <a href="/register" className="text-orange-600 font-semibold">
                        Sign up →
                    </a>
                </p>
                <p className="text-gray-500 text-sm mt-5 text-center">
                    Forgot your password?{" "}
                    <a href="/forget-password" className="text-orange-600 font-semibold">
                        Forget-password
                    </a>
                </p>
            </div>
        </AccountModal>
    );
}
