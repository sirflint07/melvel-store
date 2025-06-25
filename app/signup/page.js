'use client';
import React, { useState, useContext } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { IoWarning } from "react-icons/io5";
import {motion} from 'framer-motion'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PasswordMeter from '@/components/PasswordMeter';
import { AuthContext } from '@/components/contexts/AuthContext';

const SignUpForm = () => {
  const { signup, error, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    state: '',
    address: '',
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState({
    name: '',
    username: '',
    state: '',
    address: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setTimeout(() => {setFormError({})}, 5000);

  
  const newErrors = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (!value.trim()) {
      newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
  });

  
  if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  if (Object.keys(newErrors).length > 0) {
    setFormError(newErrors);
    setIsLoading(false);
    return;
  }

  // Add to validation checks
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(formData.email)) {
  newErrors.email = 'Invalid email format';
}

  try {
    const result = await signup(formData);
    
    if (result?.error) {
      
      toast.error(result.error);
    } else if (result?.fieldErrors) {
      
      setFormError(result.fieldErrors);
    } else {
  setFormData({
    name: '',
    username: '',
    state: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
      toast.success('Verification email sent! Check your inbox');
      router.push('/verify-email');
    }
  } catch (error) {
    console.error('Signup error:', error);
    toast.error(error.message || 'An unexpected error occurred');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg px-8 pb-4 pt-3 lg:w-[40vw] md:w-[50vw] max-md:w-[85vw]">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
            <FaUserPlus size={24} className='animate-pulse'/>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Join us to enjoy exclusive sneaker deals!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', name: 'name', type: 'text' },
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'State', name: 'state', type: 'text' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  focus:outline focus:outline-primary sm:text-sm"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
             
             
              { 
                formError[field.name] && (
                <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration:2}}
                className="text-red-500 text-sm flex items-center pt-1">
                <span 
                className='inline-block'>
                <IoWarning size={15}/>
                </span>
                <span 
                className='inline-block ml-1 mt-[2px]'>
                {formError[field.name]}
                </span></motion.p>
              )
              }
            </div>
          ))}
          <PasswordMeter password={formData.password} />

          <button
            type="submit"
            disabled={isLoading}
            className="signup-btn"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              'Sign Up'
            )}
          </button>

          {error && (<div className='text-red-500'>{error.message}</div>)}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-primary hover:text-opacity-80 pl-2 text-lg max-md:text-sm"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
