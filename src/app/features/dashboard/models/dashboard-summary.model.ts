export interface DashboardSummary {
  totalShops: number | [number, number] | null;
  totalFlats: number | [number, number] | null;
  totalMembers: number;
  activeMembers: number;

  totalMeetings: number;
  totalDocuments: number;
  totalNotices: number;

  consentYes: number;
  consentNo: number;
  consentPending: number;

  consentPercentage: number;
}