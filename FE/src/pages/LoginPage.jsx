import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import PageCardLayout from '../components/PageCardLayout';
import { Button } from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <PageCardLayout title="Login" redirect="signup">
      <form onSubmit={handleLogin}>
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

        <div className='flex items-center mb-6'>
          <Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
            Forgot password?
          </Link>
        </div>

        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

        <Button>
          {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
        </Button>
      </form>
    </PageCardLayout>
  );
};

export default LoginPage;
