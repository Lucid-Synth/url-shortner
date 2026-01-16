import { useState } from 'react';
import { Cable, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_url } from '../config/config';
import Loader from '../animations/loader';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [signedUp,setSignedUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field:any, value:any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {

    axios.post(Base_url+"/signup",formData)
    .then(() => {
      setSignedUp(true)
    })
    .then(() => {
      setTimeout(() => {
        navigate('/signin')
      }, 3500);
    })
  };


  const navigate = useNavigate()
  function handleSignin(){
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Cable className="w-10 h-10 text-blue-600" />
          <span className="text-3xl font-bold text-slate-800">Miny</span>
        </motion.div>

        {/* Sign Up Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h1>
          <p className="text-slate-600 mb-8">Sign up to start shortening your URLs</p>

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 transition-colors text-slate-800"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 transition-colors text-slate-800"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 transition-colors text-slate-800"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>


            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-600"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignUp}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </motion.button>

            {signedUp && (
              <div>
                <Loader /> You have signed Up.
              </div>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Or sign up with</span>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-slate-600 mt-6">
            Already have an account?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-semibold"
            onClick={handleSignin}
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}