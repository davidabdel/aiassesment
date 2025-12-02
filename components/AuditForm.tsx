import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { AuditInputs } from '../types';

interface AuditFormProps {
  onComplete: (data: AuditInputs) => void;
}

// Helper type to allow nulls during form filling
type FormState = {
  [K in keyof AuditInputs]: AuditInputs[K] | null;
};

const AuditForm: React.FC<AuditFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Initialize all fields to null (or empty string) to force user selection
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    role: null,
    teamSize: null,
    mainFocus: null,
    losingMoneyOnRepetitiveTasks: null,
    trackingSeniorTeamHours: null,
    clarityOnAiTasks: null,
    teamDeliveringLessOutput: null,
    investedInAutomationButUnderutilized: null,
    workedMoreThan50Hours: null,
    isBottleneck: null,
    canScaleWithoutHiring: null,
    confidenceInCapturingCosts: null,
    biggestObstacle: null,
    investmentTimeline: null
  });

  const [isStepValid, setIsStepValid] = useState(false);

  // Validate current step whenever formData changes
  useEffect(() => {
    let valid = false;
    switch (step) {
      case 1: // Contact & Basics
        valid = !!(
          formData.name?.trim() &&
          formData.email?.trim() &&
          formData.role &&
          formData.teamSize &&
          formData.mainFocus
        );
        break;
      case 2: // Core Business (Booleans)
        valid = (
          formData.losingMoneyOnRepetitiveTasks !== null &&
          formData.trackingSeniorTeamHours !== null &&
          formData.clarityOnAiTasks !== null &&
          formData.teamDeliveringLessOutput !== null &&
          formData.investedInAutomationButUnderutilized !== null
        );
        break;
      case 3: // Owner / CEO
        valid = (
          formData.workedMoreThan50Hours !== null &&
          formData.isBottleneck !== null &&
          formData.canScaleWithoutHiring !== null &&
          formData.confidenceInCapturingCosts !== null &&
          formData.biggestObstacle !== null
        );
        break;
      case 4: // Timeline
        valid = formData.investmentTimeline !== null;
        break;
    }
    setIsStepValid(valid);
  }, [formData, step]);

  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (isStepValid) {
      if (step < totalSteps) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      } else {
        // Cast to AuditInputs because we know everything is filled now
        onComplete(formData as AuditInputs);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateField = <K extends keyof AuditInputs>(field: K, value: AuditInputs[K] | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderBooleanGroup = (
    label: string,
    field: keyof AuditInputs,
    yesText: string = "Yes",
    noText: string = "No"
  ) => (
    <div className="mb-6 animate-fadeIn">
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        <button
          onClick={() => updateField(field, true)}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${formData[field] === true
            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
            : 'border-slate-200 hover:border-indigo-300 text-slate-600'
            }`}
        >
          {formData[field] === true ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
          {yesText}
        </button>
        <button
          onClick={() => updateField(field, false)}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${formData[field] === false
            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
            : 'border-slate-200 hover:border-indigo-300 text-slate-600'
            }`}
        >
          {formData[field] === false ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
          {noText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Answer these quick questions to calculate your Time Leak Score.
          </h1>
          <div className="mt-6 relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-right w-full">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {Math.round(progress)}% Complete
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          <div className="p-8">

            {/* Step 1: Contact & Basics */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Contact & Basics</h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">What's your name? <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">What's your business email? <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">What's your role in the business? <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Owner', 'CEO', 'Managing Director', 'Other'].map((role) => (
                      <button
                        key={role}
                        onClick={() => updateField('role', role as any)}
                        className={`py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium text-left ${formData.role === role
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                          }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">How many full-time employees do you currently have? <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-3">
                    {['5-10', '11-25', '26-50', '51+'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateField('teamSize', opt as any)}
                        className={`py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium ${formData.teamSize === opt
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Which best describes your main focus right now? <span className="text-red-500">*</span></label>
                  <div className="space-y-2">
                    {['Increasing profits', 'Reducing owner time', 'Improving team output', 'Scaling without more staff', 'Other'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateField('mainFocus', opt as any)}
                        className={`w-full text-left py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium ${formData.mainFocus === opt
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Core Business */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Core Business & Systems</h2>

                {renderBooleanGroup(
                  "Do you currently feel your business is losing money on repetitive tasks that could be automated?",
                  "losingMoneyOnRepetitiveTasks"
                )}

                {renderBooleanGroup(
                  "Are you tracking how many hours per week your senior team spends on low-value tasks?",
                  "trackingSeniorTeamHours"
                )}

                {renderBooleanGroup(
                  "Do you have clarity on which staff tasks could be handled (or augmented) by AI or automation within your business?",
                  "clarityOnAiTasks"
                )}

                {renderBooleanGroup(
                  "Would you say your team is delivering less than expected output relative to the hours they log?",
                  "teamDeliveringLessOutput"
                )}

                {renderBooleanGroup(
                  "Have you already invested in automation or AI systems, but they either haven’t delivered or are under-utilised?",
                  "investedInAutomationButUnderutilized"
                )}
              </div>
            )}

            {/* Step 3: Owner / CEO */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Owner / CEO Perspective</h2>

                {renderBooleanGroup(
                  "In the past 4 weeks, have you personally worked more than 50 hours?",
                  "workedMoreThan50Hours"
                )}

                {renderBooleanGroup(
                  "Are you the bottleneck in your business (i.e., tasks stop when you aren’t available)?",
                  "isBottleneck"
                )}

                {renderBooleanGroup(
                  "Do you believe you could scale the business by at least 20% in the next 12 months without hiring more staff?",
                  "canScaleWithoutHiring"
                )}

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    On a scale of 1-5, how confident are you that you’re capturing all the cost of manual workflows in your business? <span className="text-red-500">*</span>
                    <span className="block text-xs font-normal text-slate-500 mt-1">(1 = not confident, 5 = very confident)</span>
                  </label>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => updateField('confidenceInCapturingCosts', num)}
                        className={`flex-1 py-4 rounded-lg border-2 transition-all font-bold text-lg ${formData.confidenceInCapturingCosts === num
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">What’s the biggest obstacle blocking your business from running without you? <span className="text-red-500">*</span></label>
                  <div className="space-y-2">
                    {['lack of systems', 'team not trained', 'low automation', 'unclear roles & tasks', 'other'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateField('biggestObstacle', opt as any)}
                        className={`w-full text-left py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium capitalize ${formData.biggestObstacle === opt
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Qualification */}
            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Final Step</h2>

                <div>
                  <label className="block text-lg font-semibold text-slate-800 mb-4">
                    How soon do you plan to invest in a solution (software, coaching, automation) to free up owner time, improve profit or scale without more staff? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {['Immediately', 'Within next 3 months', 'Within 6-12 months', 'Not sure'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateField('investmentTimeline', opt as any)}
                        className={`w-full text-left py-4 px-6 rounded-xl border-2 transition-all flex items-center justify-between group ${formData.investmentTimeline === opt
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                          }`}
                      >
                        <span className="font-medium text-lg">{opt}</span>
                        {formData.investmentTimeline === opt && <CheckCircle2 className="w-6 h-6 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center text-slate-500 hover:text-slate-800 font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid}
              className={`flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${isStepValid
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
            >
              {step === totalSteps ? (
                <>➡️ See My Score</>
              ) : (
                <>Next Step <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditForm;
