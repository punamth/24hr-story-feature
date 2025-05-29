import type{ Story } from "../types";

const STORAGE_KEY = "stories";

export function getStories(): Story[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const stories = JSON.parse(raw) as Story[];
  const now = Date.now();
  const validStories = stories.filter(story => now - story.timestamp < 24 * 60 * 60 * 1000);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(validStories));
  return validStories;
}

export function saveStory(story: Story) {
  const stories = getStories();
  stories.push(story);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}
