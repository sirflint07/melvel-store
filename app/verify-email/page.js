'use client'
import { useState, useRef, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '@/components/contexts/AuthContext';

const EmailVerificationUI = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef([]);
    const { verifyEmail } = useContext(AuthContext);

   
    useEffect(() => {
        const code = otp.join('');
        if (code.length === 6 && !isSubmitting) {
            handleSubmit();
        }
    }, [otp]);

    const handleChange = (index, value) => {
        const newCode = [...otp];
        const numericValue = value.replace(/\D/g, '');

        if (value.length > 1) { 
            const pastedCode = numericValue.slice(0, 6).split("");
            pastedCode.forEach((digit, i) => {
                if (i < 6) newCode[i] = digit;
            });
            setOtp(newCode);
        } else {             newCode[index] = numericValue;
            setOtp(newCode);
            
            
            if (numericValue && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const verificationCode = otp.join("");
        
        if (verificationCode.length !== 6) return;

        setIsSubmitting(true);
        try {
            const result = await verifyEmail(verificationCode);
            if (result?.error) {
                
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            toast.error(error.message || 'Verification failed');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

   
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Verify Your Email
                    </h2>
                    <p className="text-gray-600">
                        Enter the 6-digit code sent to your email address
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className="flex justify-between gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength="6"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl font-semibold 
                                          border-2 border-gray-300 rounded-lg
                                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                          transition-all duration-200"
                                disabled={isSubmitting}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500
                                 text-white font-semibold rounded-lg shadow-md
                                 hover:from-blue-700 hover:to-cyan-600
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                 transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailVerificationUI;