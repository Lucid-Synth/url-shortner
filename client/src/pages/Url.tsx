import  { useState } from 'react';
import { Cable, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Base_url } from '../config/config';

export default function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async() => {
    // Reset previous error
    setError('');
    
    // Validate URL length
    if (url.length < 8) {
      setError('URL must be at least 8 characters long');
      return;
    }
    
    // Optional: Additional URL format validation
    try {
      new URL(url); // This will throw an error if URL is invalid
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(Base_url + "/shorten", {url},
        {
          headers:{
            Authorization: token,
            "Content-Type":"application/json"
          }
        }
      );

      const { shorturl } = res.data;
      
      if(!shorturl){
        throw new Error("Short URL has not been recieved from server");
      }

      setShortUrl(shorturl);
    } catch(error:any) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  // Validate URL as user types (optional)
  const handleUrlChange = (e:any) => {
    const value = e.target.value;
    setUrl(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="w-[30%] max-w-2xl">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <Cable className="w-10 h-10 text-blue-600" />
          <span className="text-3xl font-bold text-slate-800">Miny</span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">
            Shorten Your URL
          </h1>
          <p className="text-slate-600 mb-8 text-center">
            Paste your long URL below and get a short link instantly
          </p>

          {/* Input */}
          <div className="space-y-4">
            <div>
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com/your-long-url-here"
                className={`w-full px-4 py-4 border-2 rounded-xl outline-none focus:border-blue-600 transition-colors text-slate-800 ${
                  error ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-600 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: url.length >= 8 ? 1.02 : 1 }}
              whileTap={{ scale: url.length >= 8 ? 0.98 : 1 }}
              onClick={handleShorten}
              disabled={loading || url.length < 8}
              className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors ${
                url.length >= 8 && !loading
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Shortening...
                </div>
              ) : (
                'Shorten URL'
              )}
            </motion.button>
            
            {/* URL length hint */}
            <div className="text-sm text-slate-500 text-right">
              {url.length > 0 && (
                <span className={url.length < 8 ? 'text-red-500' : 'text-green-500'}>
                  {url.length} / 8 characters minimum
                </span>
              )}
            </div>
          </div>

          {/* Result */}
          {shortUrl && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8 p-4 bg-slate-50 rounded-xl"
            >
              <p className="text-sm text-slate-600 mb-2">Your shortened URL:</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-white rounded-lg border border-slate-200 text-blue-600 font-medium truncate">
                  {shortUrl}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Open link"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}