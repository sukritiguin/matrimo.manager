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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Login Success:', data);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B0000] to-[#FFD700]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('/wedding-pattern.webp')] bg-cover bg-center opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border-4 border-[#FFD700] ring-4 ring-[#8B0000]"
      >
        {/* Wedding Logo */}
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/premium-vector/happy-wedding-invitation-calligraphy-logo-with-indian-bride-groom-illustration_428817-1983.jpg"
            alt="Wedding Logo"
            className="w-20 h-20"
          />
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
            {...register('email')}
            error={errors.email?.message as string}
          />
          <Input
            label="Password"
            type="password"
            className="border border-[#DAA520] shadow-md"
            {...register('password')}
            error={errors.password?.message as string}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-700">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded-md focus:ring-primary"
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-[#8B0000] font-bold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className={cn(
              'w-full py-3 bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all',
              loading && 'opacity-50'
            )}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Login'}
          </Button>
        </form>

        {/* Register Option */}
        <p className="text-center text-sm text-gray-600 mt-4">
          New to the wedding?{' '}
          <Link
            to="/register"
            className="text-[#DAA520] font-semibold hover:underline"
          >
            Register Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
