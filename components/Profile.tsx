import React from 'react';
import { Settings, Grid, Bookmark, User as UserIcon } from 'lucide-react';
import { User, Post } from '../types';

interface ProfileProps {
  user: User;
  posts: Post[];
}

const Profile: React.FC<ProfileProps> = ({ user, posts }) => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Profile Header */}
      <div className="p-6 pt-10">
        <div className="flex justify-between items-start mb-8">
            <div className="relative">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-secondary to-primary">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.username} 
                        className="w-full h-full rounded-full object-cover border-4 border-black"
                    />
                </div>
                <button className="absolute bottom-0 right-0 bg-zinc-800 text-white p-1.5 rounded-full border-2 border-black">
                    <Settings size={14} />
                </button>
            </div>
            
            <div className="flex-1 ml-6 flex justify-around items-center h-24">
                <div className="text-center">
                    <div className="text-xl font-bold text-white">{posts.length}</div>
                    <div className="text-xs text-zinc-400">Posts</div>
                </div>
                <div className="text-center">
                    <div className="text-xl font-bold text-white">{user.followers}</div>
                    <div className="text-xs text-zinc-400">Seguidores</div>
                </div>
                <div className="text-center">
                    <div className="text-xl font-bold text-white">{user.following}</div>
                    <div className="text-xs text-zinc-400">Seguindo</div>
                </div>
            </div>
        </div>

        <div className="space-y-1">
            <h1 className="text-lg font-bold text-white">{user.fullName}</h1>
            <p className="text-zinc-300 text-sm leading-relaxed">{user.bio}</p>
        </div>

        <div className="flex space-x-3 mt-6">
            <button className="flex-1 bg-white text-black font-semibold py-2 rounded-xl text-sm hover:bg-zinc-200 transition-colors">
                Editar Perfil
            </button>
            <button className="flex-1 bg-zinc-800 text-white font-semibold py-2 rounded-xl text-sm hover:bg-zinc-700 transition-colors">
                Compartilhar
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mt-2 sticky top-0 bg-black/80 backdrop-blur-lg z-10">
        <button className="flex-1 flex justify-center py-3 border-b-2 border-white text-white">
            <Grid size={24} />
        </button>
        <button className="flex-1 flex justify-center py-3 border-b-2 border-transparent text-zinc-600 hover:text-zinc-400">
            <Bookmark size={24} />
        </button>
        <button className="flex-1 flex justify-center py-3 border-b-2 border-transparent text-zinc-600 hover:text-zinc-400">
            <UserIcon size={24} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {posts.map((post) => (
            <div key={post.id} className="aspect-square relative group overflow-hidden bg-zinc-900 cursor-pointer">
                <img 
                    src={post.imageUrl} 
                    alt="Post" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white font-bold flex items-center">
                       <span className="text-lg">{post.likes}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;