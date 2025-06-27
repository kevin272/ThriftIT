import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import toast from "react-hot-toast"
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/Button';
import PageCardLayout from '../components/PageCardLayout';

const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();
	const {error,isLoading,verifyEmail}=useAuthStore();

	const handleSubmit = async(e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			navigate("/");
			toast.success("Account verified successfully!");
		} catch (error) {
			console.log(error);
		}
		}

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	}

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	//When all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

	return (
		<PageCardLayout title="Verify Email" redirect="signup">
				<form className='space-y-6' onSubmit={handleSubmit}>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
							/>
						))}
					</div>

					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<Button>
						{isLoading ? "Verifying..." : "Verify Email"}
					</Button>

				</form>
			</PageCardLayout>
	)
}

export default EmailVerificationPage