import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email kiriting';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email formati noto\'g\'ri';
    }
    if (!password) {
      newErrors.password = 'Parol kiriting';
    } else if (password.length < 6) {
      newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // TODO: Backend API call
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login:', { email, password, rememberMe });
      // Navigate to dashboard after successful login
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#4f46e5] via-[#6366f1] to-[#06b6d4] items-center justify-center p-12">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <span className="text-2xl font-bold">D</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">DevWork</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            IT ni amaliyotda 
            <span className="text-cyan-300"> o'rgan</span>
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed mb-10">
            Haqiqiy kompaniyada ishlash tajribasini orttir. Loyihalar qil, 
            ko'nikmalar oshir, karrierangni boshla.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-indigo-200 mt-1">O'quvchilar</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-indigo-200 mt-1">Loyihalar</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm text-indigo-200 mt-1">Kompaniyalar</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-indigo-100 italic leading-relaxed">
              "DevWork orqali real loyihalarda ishlab, 3 oy ichida junior developer bo'ldim."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-400 flex items-center justify-center text-sm font-bold">
                AS
              </div>
              <div>
                <div className="font-semibold text-sm">Aziz Sobirov</div>
                <div className="text-xs text-indigo-300">Frontend Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-[#0f172a]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#06b6d4] rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">D</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DevWork</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Xush kelibsiz! 👋</h2>
            <p className="text-[#94a3b8]">Hisobingizga kiring va o'rganishni davom eting</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              className="flex items-center justify-center gap-3 px-5 py-4 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl text-base font-medium text-white transition-all duration-200 cursor-pointer hover:border-[#475569] active:scale-[0.98]"
            >
              <FcGoogle className="w-6 h-6" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 px-5 py-4 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl text-base font-medium text-white transition-all duration-200 cursor-pointer hover:border-[#475569] active:scale-[0.98]"
            >
              <FiGithub className="w-6 h-6" />
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#334155]" />
            <span className="text-sm text-[#64748b]">yoki email bilan</span>
            <div className="flex-1 h-px bg-[#334155]" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#94a3b8] mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="email@example.com"
                  className={`w-full pl-5 pr-13 py-4.5 bg-[#1e293b] border text-base ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#334155] focus:border-[#6366f1]'
                  } rounded-xl text-white placeholder-[#64748b] outline-none transition-all duration-200 focus:ring-2 ${
                    errors.email ? 'focus:ring-red-500/20' : 'focus:ring-[#6366f1]/20'
                  }`}
                  autoComplete="email"
                />
                <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#64748b]" />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#94a3b8] mb-2">
                Parol
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-5 pr-13 py-4.5 bg-[#1e293b] border text-base ${
                    errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-[#334155] focus:border-[#6366f1]'
                  } rounded-xl text-white placeholder-[#64748b] outline-none transition-all duration-200 focus:ring-2 ${
                    errors.password ? 'focus:ring-red-500/20' : 'focus:ring-[#6366f1]/20'
                  }`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 bg-[#1e293b] border border-[#334155] rounded-md peer-checked:bg-[#6366f1] peer-checked:border-[#6366f1] transition-all duration-200 flex items-center justify-center group-hover:border-[#475569]">
                    {rememberMe && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-[#94a3b8]">Eslab qolish</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-[#6366f1] hover:text-[#818cf8] transition-colors font-medium"
              >
                Parolni unutdingizmi?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#818cf8] hover:to-[#6366f1] text-white text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Kirilyapti...
                </>
              ) : (
                <>
                  Kirish
                  <FiArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-10 text-center text-[#94a3b8]">
            Hisobingiz yo'qmi?{' '}
            <Link
              to="/register"
              className="text-[#6366f1] hover:text-[#818cf8] font-semibold transition-colors"
            >
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
