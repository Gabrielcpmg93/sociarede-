import React, { useState, useEffect } from 'react';
import { Home, Search, PlusSquare, Heart, User as UserIcon } from 'lucide-react';
import { Post, User, Story, ViewState } from './types';
import PostCard from './components/PostCard';
import Stories from './components/Stories';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';

// Mock Data Generators
const MOCK_USER: User = {
  id: 'u1',
  username: 'design_lumina',
  fullName: 'Lumina Studio',
  avatarUrl: 'https://picsum.photos/200?random=100',
  bio: 'Explorando a estética digital 🌌\nVisual Diary & AI Art',
  followers: 12500,
  following: 432
};

const INITIAL_STORIES: Story[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `s${i}`,
  userId: `u${i + 2}`,
  username: `user_${i}`,
  avatarUrl: `https://picsum.photos/200?random=${i}`,
  hasUnseen: Math.random() > 0.3
}));

const INITIAL_POSTS: Post[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `p${i}`,
  userId: `u${i + 5}`,
  user: {
    id: `u${i + 5}`,
    username: `creator_${i}`,
    fullName: `Creator ${i}`,
    avatarUrl: `https://picsum.photos/200?random=${i + 20}`,
    followers: 0,
    following: 0
  },
  imageUrl: `https://picsum.photos/800/1000?random=${i + 50}`,
  caption: i % 2 === 0 ? "Momentos capturados no tempo. ✨ #vibes" : "A luz define a forma. 📸",
  likes: Math.floor(Math.random() * 500),
  comments: [],
  timestamp: new Date(),
  likedByMe: false
}));

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.FEED);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  // Simple "router" effect for tab title
  useEffect(() => {
    switch (view) {
      case ViewState.FEED: document.title = 'Lumina - Feed'; break;
      case ViewState.CREATE: document.title = 'Lumina - Novo Post'; break;
      case ViewState.PROFILE: document.title = 'Lumina - Perfil'; break;
    }
  }, [view]);

  const handleCreatePost = (image: string, caption: string) => {
    const newPost: Post = {
      id: `new_${Date.now()}`,
      userId: MOCK_USER.id,
      user: MOCK_USER,
      imageUrl: image,
      caption: caption,
      likes: 0,
      comments: [],
      timestamp: new Date(),
      likedByMe: false
    };

    setPosts([newPost, ...posts]);
    setMyPosts([newPost, ...myPosts]);
    setView(ViewState.FEED);
  };

  const handleLike = (postId: string) => {
    // In a real app, this would be an API call
    setPosts(currentPosts => 
        currentPosts.map(p => 
            p.id === postId ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe } : p
        )
    );
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.CREATE:
        return <CreatePost onCancel={() => setView(ViewState.FEED)} onPost={handleCreatePost} />;
      case ViewState.PROFILE:
        return <Profile user={MOCK_USER} posts={myPosts} />;
      case ViewState.FEED:
      default:
        return (
          <div className="flex flex-col min-h-screen pb-20 max-w-lg mx-auto w-full">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent tracking-tight">Lumina</h1>
              <div className="flex items-center space-x-4">
                 <Heart className="text-white hover:text-secondary transition-colors cursor-pointer" />
              </div>
            </header>
            
            <Stories stories={INITIAL_STORIES} />
            
            <div className="px-4 mt-2">
              {posts.map(post => (
                <PostCard key={post.id} post={post} onLike={handleLike} />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-primary/30">
      {renderContent()}

      {/* Navigation Bar (Mobile Style for consistency) */}
      {view !== ViewState.CREATE && (
        <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 z-50">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <button 
                onClick={() => setView(ViewState.FEED)}
                className={`p-2 rounded-2xl transition-all duration-300 ${view === ViewState.FEED ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Home size={26} strokeWidth={view === ViewState.FEED ? 2.5 : 2} />
            </button>
            
            <button 
                onClick={() => setView(ViewState.EXPLORE)} // Placeholder
                className={`p-2 rounded-2xl transition-all duration-300 ${view === ViewState.EXPLORE ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Search size={26} strokeWidth={view === ViewState.EXPLORE ? 2.5 : 2} />
            </button>

            {/* Floating Create Button */}
            <button 
                onClick={() => setView(ViewState.CREATE)}
                className="bg-gradient-to-tr from-primary to-secondary p-4 rounded-full -mt-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform border-4 border-black"
            >
              <PlusSquare size={28} className="text-white" />
            </button>

            <button 
                className={`p-2 rounded-2xl transition-all duration-300 text-zinc-500 hover:text-zinc-300`}
            >
              <Heart size={26} />
            </button>

            <button 
                onClick={() => setView(ViewState.PROFILE)}
                className={`p-1 rounded-full border-2 transition-all duration-300 ${view === ViewState.PROFILE ? 'border-white' : 'border-transparent'}`}
            >
               <img src={MOCK_USER.avatarUrl} className="w-7 h-7 rounded-full" alt="Profile" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;