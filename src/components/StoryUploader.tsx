import { saveStory } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

const StoryUploader = ({ onUpload }: { onUpload: () => void }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      saveStory({ id: uuidv4(), image: base64, timestamp: Date.now() });
      onUpload();
    };
    reader.readAsDataURL(file);
  };

  return (
    <label className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full cursor-pointer">
      <span className="text-white text-xl font-bold">+</span>
      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </label>
  );
};

export default StoryUploader;
