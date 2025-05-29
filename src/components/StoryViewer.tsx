// src/components/StoryViewer.tsx
import React, { useEffect, useState, useCallback } from "react";
import type { Story } from "../types";
import ProgressBar from "./ProgressBar";
import { useSwipeable } from "react-swipeable";

interface StoryViewerProps {
  stories: Story[];
  onClose: () => void;
  startIndex: number;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, onClose, startIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progressKey, setProgressKey] = useState(0); // to force re-animation

  const DURATION = 3000;

  const advanceStory = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgressKey((k) => k + 1);
    } else {
      onClose(); // Close viewer if last story is done
    }
  }, [currentIndex, stories.length, onClose]);

  useEffect(() => {
    const timer = setTimeout(advanceStory, DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, advanceStory]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((i) => i + 1);
        setProgressKey((k) => k + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
        setProgressKey((k) => k + 1);
      }
    },
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50"
    >
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 w-full flex gap-1 px-4 py-2">
        {stories.map((_, i) => (
          <ProgressBar
            key={i + "-" + progressKey}
            isActive={i === currentIndex}
            duration={DURATION}
            completed={i < currentIndex}
          />
        ))}
      </div>

      {/* Story Image */}
      <img
        src={stories[currentIndex].image}
        alt="Story"
        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl bg-gray-800 px-3 py-1 rounded"
      >
        ✕
      </button>
    </div>
  );
};

export default StoryViewer;
