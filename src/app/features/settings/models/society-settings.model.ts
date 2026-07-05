export interface SocietySettings {
  id: number;
  societyName: string;
  societyShortName?: string;

  totalFlats: number;
  totalShops: number;

  currentStage: number;
  totalStages: number;

  pmcName?: string;
  developerName?: string;

  registrationNumber?: string;
  address?: string;

  email?: string;
  phone?: string;

  logoUrl?: string;
}