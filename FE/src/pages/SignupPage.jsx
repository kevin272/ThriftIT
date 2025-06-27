import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import Input from '../components/Input';
import { Loader, Lock, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import PageCardLayout from '../components/PageCardLayout';
import { Button } from '../components/Button';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageCardLayout title="Create Account" redirect="login">
      <form onSubmit={handleSignup}>
        <Input
          icon={User}
          type='text'
          placeholder='Enter full name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          icon={Mail}
          type='text'
          placeholder='Enter email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          icon={Lock}
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

        <PasswordStrengthMeter password={password} />

        <Button>
          {isLoading ? (
            <Loader className='animate-spin mx-auto' size={24} />
          ) : (
            "Signup"
          )}
        </Button>
      </form>
    </PageCardLayout>
  );
};

export default SignupPage;
