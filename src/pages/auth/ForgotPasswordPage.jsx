import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email kiriting');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email formati noto\'g\'ri');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#06b6d4] rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold text-white">D</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DevWork</span>
        </div>

        <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-[#334155] rounded-2xl p-8">
          {!isSent ? (
            <>
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiMail className="w-8 h-8 text-[#6366f1]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Parolni tiklash</h2>
                <p className="text-[#94a3b8] text-sm">Emailingizni kiriting, biz sizga parolni tiklash havolasini yuboramiz</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="resetEmail" className="block text-sm font-medium text-[#94a3b8] mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                    <input
                      id="resetEmail"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                      placeholder="email@example.com"
                      className={`w-full pl-12 pr-4 py-3.5 bg-[#0f172a] border ${error ? 'border-red-500/50' : 'border-[#334155] focus:border-[#6366f1]'} rounded-xl text-white placeholder-[#64748b] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#6366f1]/20`}
                      autoComplete="email"
                    />
                  </div>
                  {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#818cf8] hover:to-[#6366f1] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.98] mb-4">
                  {isLoading ? (
                    <><svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Yuborilmoqda...</>
                  ) : (
                    <>Yuborish<FiArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Email yuborildi!</h2>
              <p className="text-[#94a3b8] text-sm mb-6">
                <span className="text-white font-medium">{email}</span> manziliga parolni tiklash havolasi yuborildi. Emailingizni tekshiring.
              </p>
              <button onClick={() => { setIsSent(false); setEmail(''); }}
                className="text-[#6366f1] hover:text-[#818cf8] text-sm font-medium transition-colors cursor-pointer">
                Boshqa email yuborish
              </button>
            </div>
          )}

          <Link to="/login" className="flex items-center justify-center gap-2 mt-6 text-sm text-[#94a3b8] hover:text-white transition-colors">
            <FiArrowLeft className="w-4 h-4" />
            Kirishga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
