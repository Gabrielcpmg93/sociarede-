import React, { useState, useEffect } from 'react';
import { Home, Search, Plus, Heart, User as UserIcon, Zap } from 'lucide-react';
import { Post, User, Story, ViewState } from './types';
import PostCard from './components/PostCard';
import Stories from './components/Stories';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';

// Mock Data Generators
const MOCK_USER: User = {
  id: 'u1',
  username: 'lumina.design',
  fullName: 'Lumina Vision',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  bio: 'Curating the future of interface design.\nDigital Art • AI • Aesthetics',
  followers: 14200,
  following: 342
};

const INITIAL_STORIES: Story[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `s${i}`,
  userId: `u${i + 2}`,
  username: `user_${i}`,
  avatarUrl: `https://picsum.photos/200/300?random=${i}`,
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
  caption: i % 2 === 0 ? "Exploring neon lights in Tokyo 🌃 #cyberpunk" : "Minimalism is the key to true elegance. 🤍",
  likes: Math.floor(Math.random() * 500 + 100),
  comments: [],
  timestamp: new Date(),
  likedByMe: false
}));

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.FEED);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    switch (view) {
      case ViewState.FEED: document.title = 'Lumina Social'; break;
      case ViewState.CREATE: document.title = 'New Post'; break;
      case ViewState.PROFILE: document.title = 'My Profile'; break;
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
          <div className="flex flex-col min-h-screen max-w-lg mx-auto w-full relative z-10">
            {/* Modern Header */}
            <header className="flex items-center justify-between px-6 py-6 sticky top-0 z-40">
                {/* Glass blur background for header when scrolling would go here */}
               <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-[-1] mask-gradient-b"></div>

              <div className="flex items-center gap-2">
                 <div className="bg-gradient-to-tr from-primary to-secondary w-8 h-8 rounded-xl flex items-center justify-center">
                    <Zap size={18} className="text-white fill-white" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-wide">Lumina</h1>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="relative cursor-pointer group">
                    <Heart className="text-white group-hover:text-secondary transition-colors" size={24} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
                 </div>
              </div>
            </header>
            
            <Stories stories={INITIAL_STORIES} />
            
            <div className="mt-2">
              {posts.map(post => (
                <PostCard key={post.id} post={post} onLike={handleLike} />
              ))}
            </div>
            
            {/* Bottom spacer for dock */}
            <div className="h-32"></div>
          </div>
        );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-secondary/30 relative overflow-hidden">
      
      {/* Ambient Background Effects (Aurora) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/15 blur-[100px] animate-pulse-slow delay-1000"></div>
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-accent/10 blur-[90px] animate-float"></div>
      </div>

      {renderContent()}

      {/* Floating Dock Navigation */}
      {view !== ViewState.CREATE && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[350px] px-4">
           <nav className="glass-panel rounded-[2rem] p-2 shadow-2xl border border-white/10 flex items-center justify-between relative">
             
              <button 
                  onClick={() => setView(ViewState.FEED)}
                  className={`p-3.5 rounded-full transition-all duration-300 relative group ${view === ViewState.FEED ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Home size={24} strokeWidth={view === ViewState.FEED ? 2.5 : 2} />
                {view === ViewState.FEED && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>}
              </button>
              
              <button 
                  onClick={() => setView(ViewState.EXPLORE)}
                  className={`p-3.5 rounded-full transition-all duration-300 relative ${view === ViewState.EXPLORE ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Search size={24} strokeWidth={view === ViewState.EXPLORE ? 2.5 : 2} />
              </button>

              {/* Center Action Button */}
              <button 
                  onClick={() => setView(ViewState.CREATE)}
                  className="bg-white text-black p-4 rounded-full -mt-12 shadow-lg shadow-white/20 hover:scale-110 transition-transform border-4 border-black"
              >
                <Plus size={28} strokeWidth={3} />
              </button>

              <button 
                  className={`p-3.5 rounded-full transition-all duration-300 text-zinc-500 hover:text-zinc-300`}
              >
                <Heart size={24} />
              </button>

              <button 
                  onClick={() => setView(ViewState.PROFILE)}
                  className={`p-1 rounded-full border-2 transition-all duration-300 ${view === ViewState.PROFILE ? 'border-white scale-110' : 'border-transparent'}`}
              >
                 <img src={MOCK_USER.avatarUrl} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
              </button>
           </nav>
        </div>
      )}
    </div>
  );
};

export default App;