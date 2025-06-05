'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';


export default function LoginPage() {
  const [show, setShow] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isOtpVisible, setIsOtpVisible] = useState(true)
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

  const handleSignup = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!data.email || !data.password || !data.fullname || !data.username) {
      console.error("All fields are required for signup");
      return;
    }
    try {
      const res = fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      res.then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        console.log('Signup successful:', data);
        setIsOtpVisible(true);
      }).catch(error => { 
        console.error('There was a problem with the fetch operation:', error);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      console.error("Email and password are required for login");
      return;
    }
    try {
      const res = fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      res.then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        console.log('Signup successful:', data);
      }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    } catch (error) {
      console.error(error);
    }
  }


  const handleOtp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!otp) {
      console.error("OTP is required");
      return;
    }
    try {
      const res = fetch('/api/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, otp }),
      });
      res.then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        console.log('OTP verification successful:', data);
      }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    } catch (error) {
      console.error(error);
    }
  }

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
                onClick={handleLogin}
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
                onClick={handleSignup}
                type="submit"
                className="w-full p-3 bg-green-600 hover:bg-green-700 transition-all rounded text-white font-semibold"
              >
                Sign Up
              </button>
            </form>
          )}
          {
          isOtpVisible &&  <div className='mt-5 flex flex-col gap-4'>
              <input
                type="text"
                placeholder="OTP"
                className="w-full  p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleOtp}
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
