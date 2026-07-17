export interface Consent {

  consentId: number;

  memberId: number;

  memberName: string;

  flatNumber: string;

  consentStatus: number;

  consentDate?: string;

  remarks?: string;

  documentId?: number;

  isActive: boolean;

}