/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  category: "EDITS" | "MUSIC" | "CODE";
  thumbnail: string;
  description: string;
  year: string;
  tools: string[];
  client?: string;
  role?: string;
  stat?: string;
}

export interface EditClip {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  software: string[];
  coverUrl: string;
  description: string;
}

export interface SongItem {
  id: string;
  title: string;
  subtitle: string;
  streams: string;
  duration: string;
  bpm: number;
  key: string;
  coverUrl: string;
  audioVariant: number; // For procedural generation
}

export interface BlogArticle {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[]; // List of paragraphs/quotes for styled presentation
  coverUrl: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  content: string;
  timestamp: string;
}
