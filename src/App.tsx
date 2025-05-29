import { useEffect, useState } from "react";
import StoryList from "./components/StoryList";
import StoryUploader from "./components/StoryUploader";
import StoryViewer from "./components/StoryViewer";
import { getStories } from "./utils/storage";
import type { Story } from "./types";

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  useEffect(() => {
    // Remove expired stories (older than 24 hrs)
    const now = Date.now();
    const freshStories = getStories().filter(
      (story) => now - story.timestamp < 24 * 60 * 60 * 1000
    );
    setStories(freshStories);
    localStorage.setItem("stories", JSON.stringify(freshStories));
  }, []);

  const handleUpload = () => {
    const updated = getStories();
    setStories(updated);
  };

  const handleStoryClick = (index: number) => {
    setViewerIndex(index);
  };

  const closeViewer = () => {
    setViewerIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center gap-4 p-4">
        <StoryUploader onUpload={handleUpload} />
        <StoryList stories={stories} onStoryClick={handleStoryClick} />
      </div>

      {viewerIndex !== null && (
        <StoryViewer
          stories={stories}
          startIndex={viewerIndex}
          onClose={closeViewer}
        />
      )}
    </div>
  );
}

export default App;
