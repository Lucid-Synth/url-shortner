import  { useState } from 'react';
import { Cable, Copy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = () => {
    if (url) {
      setShortUrl('mi-ny.onrender.com/xyzz');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
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
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/your-long-url-here"
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 transition-colors text-slate-800"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShorten}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Shorten URL
            </motion.button>
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
                <div className="flex-1 px-4 py-3 bg-white rounded-lg border border-slate-200 text-blue-600 font-medium">
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
                  href={`https://${shortUrl}`}
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