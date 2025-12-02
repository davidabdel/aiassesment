import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuditForm from './components/AuditForm';
import ResultsPage from './components/ResultsPage';
import BookingPage from './components/BookingPage';
import { AppState, AuditInputs, AuditResult } from './types';
import { generateAuditAnalysis } from './services/geminiService';
import { sendToWebhook } from './services/webhookService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [inputs, setInputs] = useState<AuditInputs | null>(null);
  const [results, setResults] = useState<AuditResult | null>(null);

  const getVariantName = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('variant') || 'default';
  };

  const handleStartAudit = () => {
    setAppState(AppState.AUDIT);

    // Track assessment_started
    if ((window as any).gtag) {
      (window as any).gtag('event', 'assessment_started', {
        variant_name: getVariantName()
      });
    }
  };

  const handleAuditComplete = async (data: AuditInputs) => {
    setInputs(data);
    setAppState(AppState.ANALYZING);

    try {
      // Send to webhook in the background (fire and forget, or await if critical)
      // We don't await it to block the UI, but we want to ensure it triggers.
      sendToWebhook(data);

      // Fire Facebook Pixel Event
      const variantName = getVariantName();

      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          funnel_step: 'assessment_complete',
          variant_name: variantName
        });
      }

      // Simulate a minimum loading time for UX (so the user feels "processing" weight)
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
      const analysisPromise = generateAuditAnalysis(data);

      const [_, analysisResult] = await Promise.all([minLoadTime, analysisPromise]);

      setResults(analysisResult);
      setAppState(AppState.RESULTS);

      // Track assessment_completed in GA4
      if ((window as any).gtag) {
        let readinessBand = 'high'; // Default/Critical
        if (analysisResult.score < 30) readinessBand = 'low';
        else if (analysisResult.score < 60) readinessBand = 'medium';

        (window as any).gtag('event', 'assessment_completed', {
          variant_name: variantName,
          score: analysisResult.score,
          readiness_band: readinessBand
        });
      }

    } catch (error) {
      console.error("Failed to generate results", error);
      // In a real app, handle error state here
      setAppState(AppState.LANDING);
    }
  };

  const handleRestart = () => {
    setAppState(AppState.LANDING);
    setInputs(null);
    setResults(null);
  };

  const handleBookCall = () => {
    setAppState(AppState.BOOKING);
  };

  const handleBackToResults = () => {
    setAppState(AppState.RESULTS);
  };

  return (
    <div className="font-sans text-slate-900">
      {appState === AppState.LANDING && (
        <LandingPage onStart={handleStartAudit} />
      )}

      {appState === AppState.AUDIT && (
        <AuditForm onComplete={handleAuditComplete} />
      )}

      {appState === AppState.ANALYZING && (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-500 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Analyzing Your Operations...</h2>
          <p className="text-slate-400 text-center max-w-md">
            Our AI is identifying time leaks and calculating your potential savings.
          </p>
        </div>
      )}

      {appState === AppState.RESULTS && inputs && results && (
        <ResultsPage
          inputs={inputs}
          results={results}
          onRestart={handleRestart}
          onBookCall={handleBookCall}
        />
      )}

      {appState === AppState.BOOKING && (
        <BookingPage onBack={handleBackToResults} />
      )}
    </div>
  );
};

export default App;
