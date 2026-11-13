export interface ProgramCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  companiesCount?: number;
  level?: string;
  priceText?: string;
  status?: "available" | "ongoing" | "completed";
}

export interface WorkTaskDetail {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "not_started" | "locked";
  dueText?: string;
  isLocked?: boolean;
}

export interface WorkStageDetail {
  id: number;
  name: string;
  status: "completed" | "in_progress" | "not_started";
  description?: string;
  tasksCompleted?: number;
  totalTasks?: number;
  tasks: WorkTaskDetail[];
}

export interface StageItem {
  id: number;
  name: string;
  status: "completed" | "current" | "upcoming";
}

export interface CurrentTask {
  title: string;
  description: string;
  dueText?: string;
  detailsUrl?: string;
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
}

export interface TeamUpdateItem {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  timeAgo: string;
  message: string;
}

export interface WorkExperienceState {
  title: string;
  companyName: string;
  industryName: string;
  isActive: boolean;
  currentStageNumber: number;
  totalStages: number;
  progressPercentage: number;
  points: number;
  streakDays: number;
  stages: StageItem[];
  currentTask?: CurrentTask | null;
  currentStageDetails?: {
    title: string;
    description: string;
  } | null;
  recentActivity: ActivityFeedItem[];
  teamUpdates: TeamUpdateItem[];
}
