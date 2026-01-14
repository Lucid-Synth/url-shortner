import  { useState } from 'react';
import { Cable, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    console.log('Sign in:', { email, password });
  };

  const navigate = useNavigate()
  function handleSignup(){
    navigate('/signup')
  }

  return (
    <>
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
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

        {/* Sign In Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-600 mb-8">Sign in to your account to continue</p>

          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignIn}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </motion.button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-600 mt-6">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-semibold"
            onClick={handleSignup}>
              Sign up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
}