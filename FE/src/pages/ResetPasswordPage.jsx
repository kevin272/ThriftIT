import { useState } from 'react'
import {motion} from "framer-motion"
import { Lock, Loader} from "lucide-react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import PageCardLayout from '../components/PageCardLayout';
import { Button } from '../components/Button';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const {resetPassword, isLoading, error, message}= useAuthStore();
  const {token} =useParams();
  const navigate = useNavigate();

  const handleLogin = async(e) => {
		e.preventDefault();
    if(password != confirmpassword){toast.error("Passwords donot match😤");
      return;
    }
    try{
    await resetPassword(token,password);
    toast.success("Password Reset Successfully!🤪 Redirecting to loginpage...");
    setTimeout(() => {
				navigate("/login");
			}, 2000);
    }
    catch(error){
      console.error(error);
			toast.error(error.message || "Error resetting password");
    }
	}

  return (
     <PageCardLayout title="Reset Password" redirect="signup">

        <form onSubmit={handleLogin}>


					<Input icon={Lock}
					type = 'password'
					placeholder= 'Enter New password'
					value={password}
					onChange = {(e) => setPassword(e.target.value)}/>

          <Input icon={Lock}
					type = 'password'
					placeholder= 'Confirm New password'
					value={confirmpassword}
					onChange = {(e) => setConfirmPassword(e.target.value)}/>

 					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

          <Button>
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/>:"Reset" }
          </Button>
         
        </form>
        </PageCardLayout>

  )
}

export default ResetPasswordPage