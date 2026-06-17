// Project type definitions

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}
