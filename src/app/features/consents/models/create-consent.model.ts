export interface CreateConsent {

  memberId: number;

  consentStatus: number;

  consentDate?: string;

  remarks?: string;

  documentId?: number;

}