import React from 'react';
import { Story } from '../types';

interface StoriesProps {
  stories: Story[];
}

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="w-full pt-4 pb-6 overflow-x-auto no-scrollbar">
      <div className="flex space-x-4 px-4">
        {/* Add Story Button */}
        <div className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer group">
          <div className="w-[70px] h-[70px] rounded-full p-[2px] bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center relative group-hover:border-zinc-400 transition-colors">
            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center">
               <span className="text-2xl text-zinc-400">+</span>
            </div>
          </div>
          <span className="text-xs text-zinc-400 truncate w-16 text-center">Seu story</span>
        </div>

        {/* Stories List */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer">
            <div className={`w-[70px] h-[70px] rounded-full p-[3px] ${story.hasUnseen ? 'bg-gradient-to-tr from-yellow-400 via-secondary to-primary' : 'bg-zinc-700'}`}>
              <div className="w-full h-full rounded-full border-2 border-black overflow-hidden">
                <img 
                  src={story.avatarUrl} 
                  alt={story.username} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" 
                />
              </div>
            </div>
            <span className="text-xs text-zinc-300 truncate w-16 text-center">{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;