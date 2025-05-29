interface ProgressBarProps {
  isActive: boolean;
  duration: number; // in ms
  completed: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isActive, duration, completed }) => {
  return (
    <div className="flex-1 h-1 bg-gray-700 rounded overflow-hidden">
      <div
        className={`h-1 bg-white transition-[width] ${completed ? 'w-full' : isActive ? 'w-full' : 'w-0'}`}
        style={{ transitionDuration: `${duration}ms` }}
      />
    </div>
  );
};

export default ProgressBar;
