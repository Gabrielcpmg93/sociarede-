import React from 'react';
import { Settings, Grid, Bookmark, Film } from 'lucide-react';
import { User, Post } from '../types';

interface ProfileProps {
  user: User;
  posts: Post[];
}

const Profile: React.FC<ProfileProps> = ({ user, posts }) => {
  return (
    <div className="flex flex-col min-h-screen pb-24 bg-black">
      {/* Atmospheric Header Background */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
            src={user.avatarUrl} 
            alt="Cover" 
            className="w-full h-full object-cover blur-3xl opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
        <div className="absolute top-4 right-4 z-10">
             <button className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white border border-white/10 hover:bg-white/10 transition">
                <Settings size={20} />
            </button>
        </div>
      </div>

      {/* Profile Info Card - Shifted up */}
      <div className="px-4 -mt-20 relative z-10">
        <div className="flex flex-col items-center">
            {/* Avatar with animated ring */}
            <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-tr from-secondary via-primary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>
                <div className="relative w-28 h-28 rounded-full p-1 bg-black">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.username} 
                        className="w-full h-full rounded-full object-cover border-2 border-zinc-800"
                    />
                </div>
            </div>

            <h1 className="text-2xl font-bold text-white mt-4 tracking-tight">{user.fullName}</h1>
            <p className="text-zinc-400 text-sm font-medium">@{user.username}</p>
            
            <p className="text-zinc-300 text-sm text-center mt-3 max-w-xs leading-relaxed">
                {user.bio}
            </p>

            {/* Glass Stats Pill */}
            <div className="flex items-center justify-around w-full max-w-xs mt-6 glass rounded-2xl py-3 px-2 border border-white/5">
                <div className="text-center px-4">
                    <div className="text-lg font-bold text-white">{posts.length}</div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Posts</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center px-4">
                    <div className="text-lg font-bold text-white">{user.followers}</div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Fãs</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center px-4">
                    <div className="text-lg font-bold text-white">{user.following}</div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Seguindo</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6 w-full max-w-xs">
                <button className="flex-1 bg-white text-black font-bold py-2.5 rounded-xl text-sm hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95">
                    Editar
                </button>
                <button className="flex-1 glass text-white font-bold py-2.5 rounded-xl text-sm hover:bg-white/10 transition-transform hover:scale-105 active:scale-95 border border-white/10">
                    Compartilhar
                </button>
            </div>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="mt-8 mb-2 px-4">
          <div className="flex bg-zinc-900/50 rounded-xl p-1">
            <button className="flex-1 flex justify-center py-2.5 rounded-lg bg-zinc-800 text-white shadow-lg">
                <Grid size={20} />
            </button>
            <button className="flex-1 flex justify-center py-2.5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                <Film size={20} />
            </button>
            <button className="flex-1 flex justify-center py-2.5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                <Bookmark size={20} />
            </button>
          </div>
      </div>

      {/* Masonry-style Grid (simulated with standard grid but with rounded corners) */}
      <div className="grid grid-cols-3 gap-1 px-1 pb-20">
        {posts.map((post, index) => (
            <div key={post.id} className={`aspect-square relative group overflow-hidden bg-zinc-900 cursor-pointer ${index === 0 ? 'col-span-2 row-span-2 rounded-2xl' : 'rounded-xl'}`}>
                <img 
                    src={post.imageUrl} 
                    alt="Post" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white font-bold flex items-center gap-1">
                       <span className="text-lg">{post.likes}</span>
                       <Heart size={16} fill="white" />
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

function Heart(props: any) {
    return (
        <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5 4.5-2 4.5-2-1.5-3-3-3-5.5A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
    )
}

export default Profile;