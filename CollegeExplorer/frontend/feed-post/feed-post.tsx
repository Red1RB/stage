import feedDummyImage from "frontend/src/app/images/merzouga.svg";
import Image from "next/image";
import userPfp from "frontend/src/app/images/Flag_of_Morocco.png";

export default function FeedPost() {
    return (
        <div className="flex justify-center items-start mt-4 mb-4">
            <div className="relative w-full h-full max-w-[828px] h-[464px] group">
                <Image
                    className="rounded-[50px] object-cover w-full h-full"
                    src={feedDummyImage}
                    alt="logo"
                    width={500}
                    height={300}
                />

                <div
                    className="pl-10 absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-[50px] w-full">
                    <div className="flex items-center gap-4 mb-2">
                        <Image
                            className="object-cover rounded-full w-[60px] h-[60px]"
                            src={userPfp}
                            alt="pfp"
                        />
                        <div>
                            <p className="font-normal drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[36px] leading-[54px]">
                                Red1_49
                            </p>
                            <p className="text-sm text-[rgba(255,255,255,0.5)]">
                                Today at 8:14 PM
                            </p>
                        </div>
                    </div>
                    <p className="text-1xl pl-2 mt-1">
                        Saw the dunes today at Merzouga in Morocco!!! #dimamaghrib
                    </p>
                </div>

                <div className="absolute top-4 left-4 flex flex-col gap-8 pl-4 sm:pl-6 md:pl-8 pt-3 text-white">
                    <span className="text-lg sm:text-xl md:text-2xl text-center rounded-[87px] pt-3 font-medium w-32 sm:w-36 md:w-40 h-12 sm:h-14 bg-[rgba(217,217,217,0.6)]">
                        📍 MOR
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl text-center rounded-[87px] pt-3 font-medium w-32 sm:w-36 md:w-40 h-12 sm:h-14 bg-[rgba(217,217,217,0.6)]">
                        🏖️ Travel
                    </span>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-4 transition-transform">
                    <div className="relative opacity-0 transform translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col gap-20">
                        <svg className="absolute bottom-[-60px] right-[-16px] z-[-10]" width="112" height="318"
                             viewBox="0 0 112 318" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect y="16" width="112" height="286" rx="30" fill="#D9D9D9" fillOpacity="0.4"/>
                            <path
                                d="M111.936 313.35C111.936 298.272 111.936 291.793 111.936 274C110 292.5 96 301 84 302.014C84 302.014 73.8645 302.014 93.9612 302.014C114.058 302.014 111.936 328.428 111.936 313.35Z"
                                fill="#D9D9D9" fillOpacity="0.4"/>
                            <path
                                d="M111.935 4.6501C111.935 19.7279 111.935 26.2069 111.935 44C109.971 25.5 95.7673 17 83.5928 15.9865C83.5928 15.9865 73.31 15.9865 93.6989 15.9865C114.088 15.9865 111.935 -10.4277 111.935 4.6501Z"
                                fill="#D9D9D9" fillOpacity="0.4"/>
                            <rect x="5" y="126" width="5" height="55" rx="2.5" fill="white" fillOpacity="0.4"/>
                        </svg>
                        <button
                            className="w-16 h-16 p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition">
                            ❤️49
                        </button>
                        <button
                            className="w-16 h-16 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition">
                            💬
                        </button>
                        {/*<button*/}
                        {/*    className="p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition">*/}
                        {/*    📤*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
