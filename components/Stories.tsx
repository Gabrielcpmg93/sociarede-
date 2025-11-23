import React from 'react';
import { Plus } from 'lucide-react';
import { Story } from '../types';

interface StoriesProps {
  stories: Story[];
}

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="w-full pt-6 pb-8 overflow-x-auto no-scrollbar z-20 relative">
      <div className="flex space-x-4 px-5">
        {/* Add Story Card - Modern Vertical Pill */}
        <div className="flex-shrink-0 relative w-20 h-32 rounded-2xl overflow-hidden cursor-pointer group">
          <div className="absolute inset-0 bg-zinc-900 border border-white/10 group-hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Plus size={18} />
            </div>
            <span className="text-[10px] font-medium text-zinc-400">Criar</span>
          </div>
          {/* Dashed border overlay */}
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-zinc-700 pointer-events-none"></div>
        </div>

        {/* Story Items - Vertical Immersive Cards */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 relative w-20 h-32 cursor-pointer group">
            {/* Image Container */}
            <div className={`w-full h-full rounded-2xl overflow-hidden relative border ${story.hasUnseen ? 'border-secondary/50' : 'border-white/5'}`}>
              <img 
                src={story.avatarUrl} 
                alt={story.username} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
            </div>

            {/* Avatar Overlay */}
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-[2px] bg-black`}>
               <div className={`w-full h-full rounded-full border-2 ${story.hasUnseen ? 'border-secondary' : 'border-zinc-600'}`}>
                    <img src={story.avatarUrl} className="w-full h-full rounded-full object-cover" alt="" />
               </div>
            </div>
            
            {/* Username */}
            <span className="absolute bottom-2 left-2 text-[10px] font-medium text-white truncate w-14 z-10 shadow-black drop-shadow-md">
                {story.username.split('_')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;