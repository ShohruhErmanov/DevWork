import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiGithub, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const passwordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(formData.password);
  const strengthLabels = ['', 'Juda zaif', 'Zaif', 'O\'rtacha', 'Kuchli', 'Juda kuchli'];
  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Ismingizni kiriting';
    if (!formData.email.trim()) {
      newErrors.email = 'Email kiriting';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email formati noto\'g\'ri';
    }
    if (!formData.password) {
      newErrors.password = 'Parol kiriting';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kamida 6 ta belgi';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parollar mos kelmaydi';
    }
    if (!agreed) newErrors.agreed = 'Shartlarni qabul qiling';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Register:', formData);
    }, 1500);
  };

  const inputClass = (field) =>
    `w-full pl-12 pr-${field === 'password' || field === 'confirmPassword' ? '12' : '4'} py-3.5 bg-[#1e293b] border ${
      errors[field] ? 'border-red-500/50 focus:border-red-500' : 'border-[#334155] focus:border-[#6366f1]'
    } rounded-xl text-white placeholder-[#64748b] outline-none transition-all duration-200 focus:ring-2 ${
      errors[field] ? 'focus:ring-red-500/20' : 'focus:ring-[#6366f1]/20'
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#06b6d4] via-[#6366f1] to-[#8b5cf6] items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-cyan-300/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <span className="text-2xl font-bold">D</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">DevWork</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            Karyerangni
            <span className="text-cyan-300"> shu yerdan </span>
            boshla
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed mb-10">
            Ro'yxatdan o'ting va haqiqiy IT kompaniyasida ishlash tajribasini orttiring.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              'Real loyihalarda amaliy tajriba',
              'Mentor va AI yordamchisi',
              'Portfolio va sertifikat',
              'Karyera yo\'llanmasi',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-cyan-400/30 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <span className="text-indigo-50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-[#0f172a]">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#06b6d4] rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">D</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DevWork</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Ro'yxatdan o'tish 🚀</h2>
            <p className="text-[#94a3b8]">Bepul hisob yarating</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl text-sm font-medium text-white transition-all duration-200 cursor-pointer hover:border-[#475569] active:scale-[0.98]">
              <FcGoogle className="w-5 h-5" />
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl text-sm font-medium text-white transition-all duration-200 cursor-pointer hover:border-[#475569] active:scale-[0.98]">
              <FiGithub className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#334155]" />
            <span className="text-sm text-[#64748b]">yoki</span>
            <div className="flex-1 h-px bg-[#334155]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#94a3b8] mb-2">To'liq ism</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input id="fullName" type="text" value={formData.fullName} onChange={handleChange('fullName')}
                  placeholder="Ism Familiya" className={inputClass('fullName')} autoComplete="name" />
              </div>
              {errors.fullName && <p className="mt-1.5 text-sm text-red-400">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="regEmail" className="block text-sm font-medium text-[#94a3b8] mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input id="regEmail" type="email" value={formData.email} onChange={handleChange('email')}
                  placeholder="email@example.com" className={inputClass('email')} autoComplete="email" />
              </div>
              {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="regPassword" className="block text-sm font-medium text-[#94a3b8] mb-2">Parol</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input id="regPassword" type={showPassword ? 'text' : 'password'} value={formData.password}
                  onChange={handleChange('password')} placeholder="Kamida 6 ta belgi"
                  className="w-full pl-12 pr-12 py-3.5 bg-[#1e293b] border border-[#334155] focus:border-[#6366f1] rounded-xl text-white placeholder-[#64748b] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#6366f1]/20"
                  autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors cursor-pointer">
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-[#334155]'}`} />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${strength <= 2 ? 'text-red-400' : strength <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#94a3b8] mb-2">Parolni tasdiqlang</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')} placeholder="Parolni qayta kiriting"
                  className="w-full pl-12 pr-12 py-3.5 bg-[#1e293b] border border-[#334155] focus:border-[#6366f1] rounded-xl text-white placeholder-[#64748b] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#6366f1]/20"
                  autoComplete="new-password" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors cursor-pointer">
                  {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer group">
              <div className="relative mt-0.5">
                <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); if (errors.agreed) setErrors(prev => ({ ...prev, agreed: '' })); }} className="sr-only peer" />
                <div className="w-5 h-5 bg-[#1e293b] border border-[#334155] rounded-md peer-checked:bg-[#6366f1] peer-checked:border-[#6366f1] transition-all duration-200 flex items-center justify-center group-hover:border-[#475569]">
                  {agreed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <span className={`text-sm ${errors.agreed ? 'text-red-400' : 'text-[#94a3b8]'}`}>
                <span className="text-[#6366f1] hover:underline cursor-pointer">Foydalanish shartlari</span> va <span className="text-[#6366f1] hover:underline cursor-pointer">Maxfiylik siyosati</span>ga roziman
              </span>
            </label>

            <button type="submit" disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#818cf8] hover:to-[#6366f1] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.98]">
              {isLoading ? (
                <><svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Yaratilmoqda...</>
              ) : (
                <>Hisob yaratish<FiArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[#94a3b8]">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-[#6366f1] hover:text-[#818cf8] font-semibold transition-colors">Kirish</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
