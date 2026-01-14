import { motion } from 'framer-motion';
import { Cable,ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header(){
const navigate = useNavigate()

const handleSignin = () => {
  navigate('/signin')
}

    return(
        <>
        <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="container mx-auto px-6 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cable className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-800">Miny</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2"
            onClick={handleSignin}
          >
            Sign in
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>
        </>
    )
}