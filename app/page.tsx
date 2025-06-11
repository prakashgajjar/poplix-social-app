
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { handleSignup } from '@/actions/signup';
import { handleLogin } from '@/actions/login';
import { handleOtp } from '@/actions/otpverification';
import { checkAuth } from '@/actions/auth';


export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isOtpVisible, setIsOtpVisible] = useState(false)
  const [otp, setOtp] = useState('')
  const [data, setData] = useState({
    email: '',
    password: '',
    fullname: '',
    username: ''
  })

  useEffect(() => {
    setShow(true)
  }, [])

  useEffect(() => {
    async function verifyAuth() {
      const response = await checkAuth();
      if (response) {
        const hasReloaded = localStorage.getItem("hasReloaded");

        if (!hasReloaded) {
          localStorage.setItem("hasReloaded", "true");
          router.replace("/home");
          window.location.reload();
        }
      }
    }
    verifyAuth();
  }, [router]);


  const onSubmit = async (e) => {
    const success = await handleSignup(e, data);
    if (success) {
      setIsOtpVisible(true);
    }
  };
  const onSubmitLogin = async (e) => {
    const success = await handleLogin(e, data);
    if (success) {
      router.push('/home');
    }
  };

  const onOtpverification = async (e) => {
    handleOtp(e, data, otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Animated image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="hidden md:block"
        >
          <Image
            src="/images/login.png"
            alt="App preview"
            className="rounded-xl mx-auto shadow-lg"
            layout="responsive"
            width={700}
            height={420}
          />
        </motion.div>

        {/* Right: Login / Signup form */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-zinc-900 rounded-xl p-8 w-full max-w-md mx-auto shadow-xl"
        >
          <h2 className="text-3xl font-bold font-sans text-center mb-6">
            {isLogin ? 'Log In to Poplix' : 'Sign Up for Poplix'}
          </h2>

          {isLogin ? (
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Email or username"
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <button
                onClick={onSubmitLogin}
                type="submit"
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 transition-all rounded text-white font-semibold"
              >
                Log In
              </button >
            </form>
          ) : (
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Full Name"
                value={data.fullname}
                onChange={(e) => setData({ ...data, fullname: e.target.value })}
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                onClick={onSubmit}
                type="submit"
                className="w-full p-3 bg-green-600 hover:bg-green-700 transition-all rounded text-white font-semibold"
              >
                Sign Up
              </button>
            </form>
          )}
          {
            isOtpVisible && <div className='mt-5 flex flex-col gap-4'>
              <input
                type="text"
                placeholder="OTP"
                className="w-full  p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={onOtpverification}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 transition-all rounded text-white font-semibold"
              >
                Verify OTP
              </button>
            </div>
          }


          <div className="text-center text-sm text-zinc-400 mt-6">
            {isLogin ? (
              <>
                Don&#39;t have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-green-400 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setIsOtpVisible(false);
                    setTimeout(() => {
                      window.location.reload();
                    }, 10)
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>

  )
}


