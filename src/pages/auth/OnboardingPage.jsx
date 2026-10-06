import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiCode, FiBriefcase, FiTarget, FiCheck } from 'react-icons/fi';

const STEPS = [
  {
    id: 'role',
    title: 'Sizning yo\'nalishingiz',
    subtitle: 'Qaysi sohada o\'rganmoqchisiz?',
    icon: FiCode,
    options: [
      { value: 'frontend', label: 'Frontend', desc: 'React, Vue, UI/UX', icon: '🎨' },
      { value: 'backend', label: 'Backend', desc: 'Node.js, Python, API', icon: '⚙️' },
      { value: 'fullstack', label: 'Full Stack', desc: 'Frontend + Backend', icon: '🚀' },
      { value: 'mobile', label: 'Mobile', desc: 'React Native, Flutter', icon: '📱' },
    ],
  },
  {
    id: 'level',
    title: 'Tajriba darajangiz',
    subtitle: 'Hozirgi bilim darajangiz qanday?',
    icon: FiTarget,
    options: [
      { value: 'beginner', label: 'Boshlang\'ich', desc: 'Endigina boshladim', icon: '🌱' },
      { value: 'elementary', label: 'Elementar', desc: 'Asoslarni bilaman', icon: '📚' },
      { value: 'intermediate', label: 'O\'rta', desc: 'Kichik loyihalar qilganman', icon: '💻' },
      { value: 'advanced', label: 'Ilg\'or', desc: 'Mustaqil ish qila olaman', icon: '⭐' },
    ],
  },
  {
    id: 'goal',
    title: 'Maqsadingiz',
    subtitle: 'DevWork orqali nimaga erishmoqchisiz?',
    icon: FiBriefcase,
    options: [
      { value: 'job', label: 'Ishga kirish', desc: 'Junior developer bo\'lish', icon: '💼' },
      { value: 'skills', label: 'Ko\'nikma oshirish', desc: 'Bilimlarni mustahkamlash', icon: '📈' },
      { value: 'portfolio', label: 'Portfolio', desc: 'Loyihalar to\'plash', icon: '🗂️' },
      { value: 'freelance', label: 'Frilanser bo\'lish', desc: 'Mustaqil ishlash', icon: '🌍' },
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleSelect = (value) => {
    setSelections(prev => ({ ...prev, [step.id]: value }));
  };

  const handleNext = () => {
    if (!selections[step.id]) return;
    if (isLastStep) {
      console.log('Onboarding complete:', selections);
      // TODO: Save to backend
      navigate('/login');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#6366f1]/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#06b6d4] rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">D</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">DevWork</span>
            </div>
            <span className="text-sm text-[#64748b]">
              {currentStep + 1} / {STEPS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <step.icon className="w-7 h-7 text-[#6366f1]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
            <p className="text-[#94a3b8]">{step.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {step.options.map((option) => {
              const isSelected = selections[step.id] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#6366f1]/10 border-[#6366f1] shadow-lg shadow-indigo-500/10'
                      : 'bg-[#1e293b]/50 border-[#334155] hover:border-[#475569] hover:bg-[#1e293b]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-[#6366f1] rounded-full flex items-center justify-center">
                      <FiCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className="text-2xl mb-3">{option.icon}</div>
                  <div className="font-semibold text-white mb-1">{option.label}</div>
                  <div className="text-sm text-[#94a3b8]">{option.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-3 text-[#94a3b8] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <FiArrowLeft className="w-5 h-5" />
              Orqaga
            </button>

            <button
              onClick={handleNext}
              disabled={!selections[step.id]}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#818cf8] hover:to-[#6366f1] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              {isLastStep ? 'Boshlash' : 'Keyingi'}
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
