import type { Story } from "../types";

type StoryListProps = {
  stories: Story[];
  onStoryClick: (index: number) => void;
};

const StoryList = ({ stories, onStoryClick }: StoryListProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="w-16 h-16 border-2 border-blue-500 rounded-full overflow-hidden cursor-pointer"
          onClick={() => onStoryClick(index)}
        >
          <img
            src={story.image}
            alt="Story"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default StoryList;
