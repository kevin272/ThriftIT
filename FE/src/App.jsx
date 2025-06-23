import React, { useState, useRef, useEffect, Children } from 'react';
import FloatingShape from './components/FloatingShape';
import { HackedText } from './components/GlitchText';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailVerificationPage from './pages/EmailVerificationPage';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';


const ProtectedRoutes = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>;
  }

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace/>;
  }
  return children;
}

const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if (isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
      return children;
}

function App() {

  const {isCheckingAuth, checkAuth, isAuthenticated, user}=useAuthStore();
  useEffect(()=>{
    checkAuth();

  },[checkAuth]);

  if(isCheckingAuth){return <LoadingSpinner/>}
    return (
    <>
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
		>

      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
        {/* <HackedText text="THRIFTIT" /> */}
      <Toaster/>
      <Routes>

        <Route path="/" element={<ProtectedRoutes>
          <HomePage/>
        </ProtectedRoutes>} />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <SignupPage />
          </RedirectAuthenticatedUser>
          } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
          <LoginPage />
          </RedirectAuthenticatedUser>

          } />
        <Route path="/verify-email" element={<RedirectAuthenticatedUser>
          <EmailVerificationPage/>
        </RedirectAuthenticatedUser>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
