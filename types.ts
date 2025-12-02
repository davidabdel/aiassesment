export interface AuditInputs {
  // Contact & Basics
  name: string;
  email: string;
  phone: string;
  role: 'Owner' | 'CEO' | 'Managing Director' | 'Other';
  teamSize: '5-10' | '11-25' | '26-50' | '51+';
  mainFocus: 'Increasing profits' | 'Reducing owner time' | 'Improving team output' | 'Scaling without more staff' | 'Other';

  // Core business/system questions
  losingMoneyOnRepetitiveTasks: boolean;
  trackingSeniorTeamHours: boolean;
  clarityOnAiTasks: boolean;
  teamDeliveringLessOutput: boolean;
  investedInAutomationButUnderutilized: boolean;

  // Owner / CEO specific questions
  workedMoreThan50Hours: boolean;
  isBottleneck: boolean;
  canScaleWithoutHiring: boolean;
  confidenceInCapturingCosts: number; // 1-5
  biggestObstacle: 'lack of systems' | 'team not trained' | 'low automation' | 'unclear roles & tasks' | 'other';

  // Next-Step / Qualification
  investmentTimeline: 'Immediately' | 'Within next 3 months' | 'Within 6-12 months' | 'Not sure';
}

export interface AuditScore {
  points: number;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  toolSuggestion: string;
}

export interface AuditResult {
  score: number; // 0-100 Time Leak Score
  summary: string;
  totalHoursWastedPerWeek: number;
  potentialCostSavings: string;
  recommendations: Recommendation[];
}

export enum AppState {
  LANDING = 'LANDING',
  AUDIT = 'AUDIT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  BOOKING = 'BOOKING'
}
