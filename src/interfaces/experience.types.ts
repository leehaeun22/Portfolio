// Experience type definitions

export type ExperienceType = 'education' | 'activity' | 'award';

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  period: string;
  organization: string;
  role: string;
  description: string;
  tags: string[];
}
