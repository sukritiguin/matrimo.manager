import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '../../../src/lib/utils';
import googleIcon from './../../assets/googleIcon.svg';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('email');
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-3xl mx-auto backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.6 }}
          className="p-8 flex flex-col justify-center items-center bg-white w-full"
        >
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img
                src="./assets/logo2.png"
                alt="Wedding Logo"
                className="w-40"
              />
            </div>

            <h2 className="text-center text-3xl font-extrabold text-[#8B0000] font-cursive">
              {isRegistering
                ? 'Create an Account'
                : 'Welcome to the Celebration!'}
            </h2>
            <p className="text-center text-[#DAA520] text-sm font-semibold">
              {isRegistering
                ? 'Register to join the journey.'
                : 'Login to be a part of this beautiful journey.'}
            </p>

            {!isRegistering && (
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  className={cn(
                    'py-2 px-4 rounded-lg font-bold',
                    activeTab === 'email'
                      ? 'bg-[#8B0000] text-white'
                      : 'bg-gray-200'
                  )}
                  onClick={() => setActiveTab('email')}
                >
                  Email Login
                </Button>
                <Button
                  className={cn(
                    'py-2 px-4 rounded-lg font-bold',
                    activeTab === 'google'
                      ? 'bg-[#8B0000] text-white'
                      : 'bg-gray-200'
                  )}
                  onClick={() => setActiveTab('google')}
                >
                  Google Login
                </Button>
                <Button
                  className={cn(
                    'py-2 px-4 rounded-lg font-bold',
                    activeTab === 'otp'
                      ? 'bg-[#8B0000] text-white'
                      : 'bg-gray-200'
                  )}
                  onClick={() => setActiveTab('otp')}
                >
                  OTP Login
                </Button>
              </div>
            )}

            <div className="mt-6">
              {isRegistering ? (
                <div className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    className="border border-[#DAA520] shadow-md"
                  />
                  <Input
                    label="Password"
                    type="password"
                    className="border border-[#DAA520] shadow-md"
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    className="border border-[#DAA520] shadow-md"
                  />
                  <Button className="w-full bg-[#8B0000] text-white font-bold py-3 rounded-lg">
                    Register
                  </Button>
                </div>
              ) : activeTab === 'email' ? (
                <div className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    className="border border-[#DAA520] shadow-md"
                  />
                  <Input
                    label="Password"
                    type="password"
                    className="border border-[#DAA520] shadow-md"
                  />
                  <Button className="w-full bg-[#8B0000] text-white font-bold py-3 rounded-lg">
                    Login
                  </Button>
                </div>
              ) : activeTab === 'google' ? (
                <div className="text-center">
                  <Button className="w-full bg-[#8B0000] text-white font-bold py-3 rounded-lg">
                    <img
                      src={googleIcon}
                      alt="Google Icon"
                      width={36}
                      height={36}
                    />{' '}
                    Sign in with Google
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    className="border border-[#DAA520] shadow-md"
                  />
                  <Button className="w-full bg-[#8B0000] text-white font-bold py-3 rounded-lg">
                    Send OTP
                  </Button>
                </div>
              )}
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              {isRegistering ? (
                <>
                  Already have an account?{' '}
                  <span
                    className="text-[#DAA520] font-semibold hover:underline cursor-pointer"
                    onClick={() => setIsRegistering(false)}
                  >
                    Login Here
                  </span>
                </>
              ) : (
                <>
                  New to Invitaria?{' '}
                  <span
                    className="text-[#DAA520] font-semibold hover:underline cursor-pointer"
                    onClick={() => setIsRegistering(true)}
                  >
                    Register Here
                  </span>
                </>
              )}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.6 }}
          className="hidden lg:flex flex-col justify-center items-center bg-[#8B0000] text-white p-8"
        >
          <img
            src="https://png.pngtree.com/png-clipart/20231003/original/pngtree-lord-ganesha-png-image_13236682.png"
            alt="Wedding Decoration"
            className="w-80"
          />
          <h2 className="text-3xl font-cursive font-bold mt-6">
            "A Grand Celebration of Love!"
          </h2>
          <p className="text-lg text-white/90 max-w-lg text-center mt-3">
            Join us in this beautiful journey filled with joy, love, and eternal
            memories.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
