interface AvatarGroupProps {
avatars: string[]; 
max?: number;     
}

export function AvatarGroup({ avatars, max = 3 }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className="flex items-center -space-x-3">
      {visibleAvatars.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`User avatar ${index + 1}`}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
      ))}

      {remainingCount > 0 && (
        <div className="w-12 h-12 rounded-full bg-gray-button border-2 border-white flex items-center justify-center text-gray-custom font-medium text-sm">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}