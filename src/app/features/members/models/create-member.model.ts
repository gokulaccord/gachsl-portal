export interface CreateMember {
  flatNumber: string;
  fullName: string;
  phone?: string;
  email?: string;
  isOwner: boolean;
  isActive: boolean;
}