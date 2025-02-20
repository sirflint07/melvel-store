"use client";

import { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { PiHandWavingFill } from "react-icons/pi";
import { MdError } from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";

const Login = () => {
  const [error, setError] = useState(""); // Store error messages
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
}); // Store login details

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Validate inputs
    if (!loginInfo.email || !loginInfo.password) {
      setError("Email and password are required.");
      setTimeout(() => setError(""), 6000); // Hide error after 6 seconds
      return;
    }

    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
        credentials: "include", // Include cookies if required
      });

      const data = await response.json();

      // Handle errors from the backend
      if (!response.ok) {
        setError(data.message || "Failed to login. Please try again.");
        setTimeout(() => setError(""), 6000);
        return;
      }

      console.log("Login successful:", data); // Log user data for testing
      alert("Login successful!"); // Display success message
      window.location.href = 'http://localhost:4000/'  // Redirect to dashboard or other page here (if required)

    } catch (err) {
      console.log(err.message)
      setError("Something went wrong. Please try again later.");
      setTimeout(() => setError(""), 6000);
    }
  };

  return (
    <section className="max-md:w-full max-md:gap-0 w-screen min-h-screen flex justify-center items-center max-lg:flex-col">
      <div className="flex max-sm:flex-col justify-between gap-[10vw]">
        <div className="max-lg:w-[85vw] lg:w-[32vw] py-10">
          <div className="w-full mx-auto">
            <p className="items-center flex text-2xl text-gray-400 font-semibold mb-4">
              Welcome back
              <span className="inline-block ml-3">
                <PiHandWavingFill size={20} color="#b69438" />
              </span>
            </p>
            <p className="w-full text-balance poppins-light">
              A brand new day to purchase for yourself an awesome and amazing
              sneakers that truly reflect your style.
            </p>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ x: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-sm bg-gray-900 bg-opacity-80 p-1 text-gray-100 max-lg:w-[80vw] lg:w-full mt-3 rounded-md flex items-center gap-2"
              >
                <span className="inline-block">
                  <MdError size={20} color="#bb0000" />
                </span>
                {error}
              </motion.p>
            )}

            <form className="mt-8 w-full" onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="block font-semibold mb-3 text-lg"
              >
                Email
              </label>
              <input
                type="text"
                className="border border-gray-300 py-2 px-3 w-full rounded-xl focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className="block font-semibold mb-3 text-lg mt-3"
              >
                Password
              </label>
              <input
                type="password"
                className="border border-gray-300 py-2 px-3 w-full rounded-xl focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                name="password"
                onChange={handleChange}
              />
              <p className="font-semibold text-[15px] mt-4 text-end">
                Forgot Password?
              </p>
              <input
                type="submit"
                value="Sign in"
                className="w-full bg-primary py-3 rounded-3xl text-slate-100 mt-8 text-lg font-medium shadow-sm"
              />

              
            </form>
            <p className="mt-4 ml-2">
              Don't have an account?{" "}
              <span className="text-base text-primary font-bold cursor-pointer inline-block pl-2">
                <a href="/signup">Sign Up</a>
              </span>
            </p>

            <div className="flex mt-8 justify-between items-center">
              <div className="flex-grow border-b border-gray-200"></div>
              <span className="px-4 text-center text-lg font-bold text-gray-600">
                Or
              </span>
              <div className="flex-grow border-b border-gray-200"></div>
            </div>
            {/*Other sign in Methods: Google and Facebook*/}
            <div className="mt-5 w-full space-y-6">
              <div className="button-login">
                <p
                  className="font-medium flex items-center justify-center"
                  onClick={() => alert("Google Sign-in not implemented")}
                >
                  Sign in with Google
                  <span className="inline-block ml-3 bg-white h-7 w-7 rounded-full place-items-center place-content-center">
                    <FcGoogle size={23} />
                  </span>
                </p>
              </div>
              <div className="button-login">
                <p
                  className="font-medium flex items-center justify-center"
                  onClick={() => alert("Facebook Sign-in not implemented")}
                >
                  Sign in with Facebook
                  <span className="inline-block ml-3">
                    <BsFacebook size={26} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[45vw] bg-blue-50 md:h-[55vh] lg:h-[85vh] flex items-center justify-center rounded-3xl max-lg:hidden lg:visible my-auto">
          <Image
            alt="shoe"
            src="/assets/images/home_shoe.png"
            width={350}
            height={350}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
