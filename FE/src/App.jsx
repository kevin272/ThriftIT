import {  useEffect } from 'react';
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
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LetterGlitch from './components/LetterGlitch';
import GridDistortion from './components/HeroSection';


const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
}

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();

  }, [checkAuth]);

  if (isCheckingAuth) { return <LoadingSpinner /> }
  return (
    <>
    <div className="fixed inset-0 z-0">
<GridDistortion
    imageSrc="https://picsum.photos/1920/1080?grayscale"
    grid={10}
    mouse={0.1}
    strength={0.15}
    relaxation={0.9}
    className="custom-class"
  />     </div>
      {/* Optional floating shapes in grayscale for subtle effect, also fixed */}
      <FloatingShape color="bg-white" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-white" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-white" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <div className="min-h-screen bg-black bg-opacity-50 text-white flex items-center justify-center relative z-10 overflow-hidden">        {/* Optional floating shapes in grayscale for subtle effect */}
       
        <Toaster />
        <Routes>

          <Route path="/" element={<ProtectedRoutes>
            <HomePage />
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
            <EmailVerificationPage />
          </RedirectAuthenticatedUser>} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>}/>

          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
            <ResetPasswordPage/>
                </RedirectAuthenticatedUser>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
