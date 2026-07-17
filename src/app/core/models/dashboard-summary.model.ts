export interface DashboardSummary {
  totalFlats: number;
  totalShops: number;

  totalMembers: number;
  activeMembers: number;

  consentYes: number;
  consentNo: number;
  consentPending: number;
  consentPercentage: number;

  totalMeetings: number;
  totalNotices: number;
  totalDocuments: number;

  currentStage: number;
  totalStages: number;
}