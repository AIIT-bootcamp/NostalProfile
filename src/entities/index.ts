export type ProfileField = {
  id: number;
  label: string;
  value: string | number;
  required?: boolean;
};
export interface Profile {
  id: number;
  username: string;
  profileFields: ProfileField[];
  profileImageUrl?: string;
}
