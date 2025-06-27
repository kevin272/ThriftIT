import React, { useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import PageCardLayout from '../components/PageCardLayout';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading, error } = useAuthStore();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <PageCardLayout title="Forgot Password" redirect="signup">
      {!isSubmitted ? (
        <form onSubmit={handleForgotPassword}>
          <p className='text-gray-300 mb-6 text-center'>
            Enter your email to send reset password request
          </p>

          <Input
            icon={Mail}
            type='text'
            placeholder='Enter email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className='flex items-center mb-6'>
            <Link to='/login' className='text-sm text-green-400 hover:underline'>
              Remember the password?
            </Link>
          </div>

          {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

          <Button>
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Send Reset Link"}
          </Button>
        </form>
      ) : (
        <div className='text-center'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
          >
            <Mail className='h-8 w-8 text-white' />
          </motion.div>
          <p className='text-gray-300 mb-6'>
            If an account exists for {email}, you will receive a password reset link shortly.
          </p>
        </div>
      )}
    </PageCardLayout>
  );
};

export default ForgotPasswordPage;
