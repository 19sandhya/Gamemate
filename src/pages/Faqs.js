import React, { useState } from "react";
import bg from "../assets/bg.svg";
import { FaGem, FaSearch, FaChevronDown } from "react-icons/fa";
import boy from "../images/boy.png";

const Faqs = () => {
  const [language, setLanguage] = useState("ENG");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "black",
          color: "white",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ padding: "20px", textAlign: "center" }}
          className="flex items-center justify-between p-4 border-b border-white border-opacity-35  ml-9"
        >
          <input
            type="text"
            placeholder="Search for games..."
            className="w-8/12 py-2 pl-6 border  rounded-md text-[16px] bg-transparent px-2"
          />

          <div className="flex items-center space-x-6 ">
            <div className="flex items-center mr-4">
              <div className="flex justify-center items-center bg-gray-800 rounded-full w-8 h-8">
                <FaGem className="text-white" />
              </div>
              <div className="ml-0 flex flex-col text-white">
                <span className="text-xs font-light">Coins</span>
                <span className="text-sm font-bold">00</span>
              </div>
            </div>

            <div className="relative ml-6">
              <button
                className="flex items-center bg-gray-800 text-white py-1 px-3 rounded-full"
                onClick={toggleDropdown}
              >
                {language} <FaChevronDown className="ml-1" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg">
                  <button
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleLanguageChange("ENG")}
                  >
                    English
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleLanguageChange("HIN")}
                  >
                    Hindi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col justify-center items-center   pl-10 flex-1`}
          style={{
            width: "100%",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col p-4">
            <h1 className=" flex justify-center text-xl font-bold  text-white p-2 pl-8 mb-4">
              Game Matching
            </h1>
            <div className="flex   p-2 pl-8 mb-4">
              <div className="flex flex-col  border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9 ">
                <div className="flex justify-center items-center">
                  <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
                </div>
                <div className="flex flex-col justify-center items-center p-5">
                  <span className="text-2xl font-bold  ">Sandhya Gupta</span>
                  <span className="text-gray-500 pt-0">BIO/AIR</span>
                </div>
                <div className="flex items-center justify-center mr-4 pt-0">
                  <div className="flex justify-center items-center border-2 border-gray-300  bg-gray-800 rounded-full w-7 h-7 mr-1">
                    <FaGem size={13} className="text-white" />
                  </div>
                  <div className="ml-0.0 flex flex-col text-white">
                    <span className="text-xs font-light mb-0 pb-0">Coins</span>
                    <span className="text-sm font-bold">00</span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button className="bg-orange-500 w-20 h-10 rounded-lg mt-4">
                    STAKES
                  </button>
                </div>
              </div>
              <div className="flex justify-center ">
                <span className="text-5xl  mt-20 -ml-10 text-red-600 font-rubik">
                  V
                </span>
                <span className="text-7xl -ml-2 mt-20 text-red-600 font-rubik">
                  /
                </span>
                <span className="text-5xl mt-28 -ml-2 text-red-600 font-rubik">
                  S
                </span>
              </div>
              <div className="flex flex-col  border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9 -ml-5">
                <div className="flex justify-center items-center">
                  <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
                </div>
                <div className="flex flex-col justify-center items-center p-5">
                  <span className="text-2xl font-bold  ">Sandhya Gupta</span>
                  <span className="text-gray-500 pt-0">BIO/AIR</span>
                </div>
                <div className="flex items-center justify-center mr-4 pt-0">
                  <div className="flex justify-center items-center border-2 border-gray-300  bg-gray-800 rounded-full w-7 h-7 mr-1">
                    <FaGem size={13} className="text-white" />
                  </div>
                  <div className="ml-0.0 flex flex-col text-white">
                    <span className="text-xs font-light mb-0 pb-0">Coins</span>
                    <span className="text-sm font-bold">00</span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button className="bg-orange-500 w-20 h-10 rounded-lg mt-4">
                    STAKES
                  </button>
                </div>
              </div>
            </div>
            <div className="flex  justify-center items-center">
              <button className="bg-green-500 w-30 h-10 rounded-full pl-4 pr-4">
                Let's Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Faqs;
