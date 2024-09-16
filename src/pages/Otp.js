import React, { useEffect, useState, useRef } from "react";
import g from "../images/g.webp";
import f from "../images/f.webp";
import bg from "../assets/bg.svg";
import OtpInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";

export const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const otpRef = useRef(null);

  const [currentCorrectOtp, setCurrentCorrectOtp] = useState(
    location.state?.correctOtp
  );
  const email = location.state?.email;
  const username = location.state?.username;

  const resetOtp = () => {
    setOtp(["", "", "", ""]);
    if (otpRef.current) {
      otpRef.current.focus();
    }
  };

  const verifyOTP = () => {
    if (otp.join("") === currentCorrectOtp.toString().trim()) {
      navigate("/password", {
        state: {
          email: email,
          username: username,
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong OTP. Please enter the correct OTP again.",
        confirmButtonText: "Try Again",
        didClose: resetOtp,
      });
    }
  };

  const [counter, setCounter] = useState(9);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleResendOtp = async () => {
    setCounter(9);
    try {
      console.log("Email for OTP resend:", email);

      const response = await axios.post(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/sendOTP",
        { email }
      );
      if (response.status === 200 && response.data?.otp) {
        console.log("Resent OTP successfully:", response.data.otp);
        setCurrentCorrectOtp(response.data.otp);
        Swal.fire({
          icon: "success",
          title: "OTP Resent",
          confirmButtonText: "Okay",
        });
        // Update the correctOtp with the new OTP
        setOtp(["", "", "", ""]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Resend Failed",
          text: "Failed to resend OTP. Please try again.",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to resend OTP. Please try again.",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <>
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
        {/* Search Bar */}
        <div
          style={{ padding: "20px", textAlign: "center" }}
          className="border-b border-white border-opacity-35 "
        >
          <input
            type="text"
            placeholder="Search for games..."
            className="w-8/12 py-2 pl-6 border  rounded-md text-[16px] bg-transparent px-2"
          />
        </div>
        {/* Header Image */}
        <div
          className={`flex flex-col   items-center justify-center flex-1`}
          style={{
            width: "100%",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-white  text-[30px] flex justify-center items-center">
            OTP Verification
          </h1>
          <p className="text-gray-500 pb-9 pt-0">
            Enter the verification code we just sent on your email address
          </p>

          {/* {counter === 0 && (
            <input
              type="text"
              placeholder="Example@email.com"
              value={reemail}
              onChange={(e) => setReemail(e.target.value)}
              className="w-100 mt-3 p-2  border border-gray-300 rounded-md placeholder-gray-500 bg-zinc-800 mb-4"
            />
          )} */}

          <div className="flex-col justify-center items-center text-white">
            <OtpInput
              value={otp.join("")}
              onChange={(value) => setOtp(value.split(""))}
              numInputs={6}
              isInputNum
              inputStyle={{
                width: "2.8rem",
                height: "2.8rem",
                margin: "0 0.2rem",
                fontSize: "1.5rem",
                borderRadius: "4px",
                border: "1px solid #ced4da",
                color: "black",
                background: " rgba(86, 88, 90, 1)",
              }}
              renderInput={(inputProps, index) => (
                <input {...inputProps} key={index} />
              )}
            />

            <button
              onClick={verifyOTP}
              className="bg-blue-950 w-full mt-4 p-2  rounded-md text-white "
            >
              Verify OTP
            </button>
            <div className="flex">
              <p className="mt-5 text-gray-500">Don't recieve code?</p>
              <span className="text-blue-700 mt-5">
                Resend OTP in{" "}
                <span className="text-green font-bold">00:{counter}</span>
              </span>
            </div>

            {counter === 0 && (
              <button
                className="bg-blue-500 rounded-lg w-37 pl-2 pr-2 h-10 mt-4"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
