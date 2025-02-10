import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../src/lib/utils';

const loginSchema = z.object({
email: z.string().email('Invalid email'),
password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
const [loading, setLoading] = useState(false);
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
});

const onSubmit = async (data: any) => {
  setLoading(true);
  setTimeout(() => {
    console.log("Login Success:", data);
    setLoading(false);
  }, 2000);
};

return (
  <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
    <div className="grid grid-cols-1 lg:grid-cols-2 w-3xl mx-auto backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden">
      
      {/* Left Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.6 }}
        className="p-8 flex flex-col justify-center items-center bg-white"
      >
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img src="./logo2.png" alt="Wedding Logo" className="w-60 h-60 mt-0 pt-0" />
          </div>

          <h2 className="text-center text-3xl font-extrabold text-[#8B0000] font-cursive">
            Welcome to the Celebration!
          </h2>
          <p className="text-center text-[#DAA520] text-sm font-semibold">
            Login to be a part of this beautiful journey.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <Input
              label="Email Address"
              type="email"
              className="border border-[#DAA520] shadow-md"
              {...register("email")}
              error={errors.email?.message as string}
            />
            <Input
              label="Password"
              type="password"
              className="border border-[#DAA520] shadow-md"
              {...register("password")}
              error={errors.password?.message as string}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded-md focus:ring-primary" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#8B0000] font-bold hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className={cn(
                "w-full py-3 bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all",
                loading && "opacity-50"
              )}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Login"}
            </Button>
          </form>

          {/* Register Option */}
          <p className="text-center text-sm text-gray-600 mt-4">
            New to the wedding?{" "}
            <Link to="/register" className="text-[#DAA520] font-semibold hover:underline">
              Register Here
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Wedding-Themed Content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.6 }}
        className="hidden lg:flex flex-col justify-center items-center bg-[#8B0000] text-white p-8"
      >
        <img src="https://png.pngtree.com/png-clipart/20231003/original/pngtree-lord-ganesha-png-image_13236682.png" alt="Wedding Decoration" className="w-80 my-0 py-0" />
        <h2 className="text-3xl font-cursive font-bold mt-6">"A Grand Celebration of Love!"</h2>
        <p className="text-lg text-white/90 max-w-lg text-center mt-3">
          Join us in this beautiful journey filled with joy, love, and eternal memories.
        </p>
      </motion.div>
    </div>
  </div>
);
}
