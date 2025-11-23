import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreVertical } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isAnimatingLike, setIsAnimatingLike] = useState(false);

  const handleLike = () => {
    setIsAnimatingLike(true);
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    onLike(post.id);
    
    setTimeout(() => setIsAnimatingLike(false), 300);
  };

  return (
    <div className="mb-10 px-2 sm:px-0 relative group">
      
      <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-2xl border border-white/5">
        
        {/* Header - Floating inside image */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between z-20 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center space-x-3 backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
            <img 
                src={post.user.avatarUrl} 
                alt={post.user.username} 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
            />
            <div>
              <p className="text-sm font-bold text-white leading-none tracking-wide">{post.user.username}</p>
            </div>
          </div>
          
          <button className="text-white/80 hover:text-white p-2 backdrop-blur-sm rounded-full hover:bg-white/10 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Main Image */}
        <div className="relative aspect-[4/5] w-full bg-zinc-900" onDoubleClick={handleLike}>
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-full object-cover"
          />
          
          {/* Heart Animation */}
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${isAnimatingLike ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-full shadow-2xl">
                <Heart size={80} className="text-secondary fill-secondary drop-shadow-lg" />
            </div>
          </div>

          {/* Floating Action Bar (Vertical Pill) */}
          <div className="absolute bottom-6 right-4 flex flex-col items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-full z-20">
            <button 
                onClick={handleLike}
                className="flex flex-col items-center gap-1 group/btn"
            >
                <div className={`p-2 rounded-full transition-all duration-300 ${liked ? 'bg-secondary/20' : 'hover:bg-white/10'}`}>
                    <Heart 
                        size={24} 
                        className={`transition-colors duration-300 ${liked ? 'fill-secondary text-secondary' : 'text-white'}`} 
                    />
                </div>
                <span className="text-[10px] font-bold text-white/90">{likeCount}</span>
            </button>

            <button className="flex flex-col items-center gap-1 group/btn">
                <div className="p-2 rounded-full hover:bg-white/10 transition-all">
                    <MessageCircle size={24} className="text-white" />
                </div>
                <span className="text-[10px] font-bold text-white/90">{post.comments.length}</span>
            </button>

            <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                <Send size={24} className="text-white" />
            </button>

            <div className="w-8 h-px bg-white/20 my-1"></div>

            <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                <Bookmark size={22} className="text-white" />
            </button>
          </div>
        </div>

        {/* Caption Section (Clean, minimal bottom area) */}
        <div className="p-5 pb-6 bg-zinc-900 relative">
            {/* Subtle colored glow at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                    <span className="text-white font-semibold mr-2">{post.user.username}</span>
                    {post.caption}
                </p>
                <p className="text-zinc-600 text-xs mt-3 uppercase tracking-wider font-medium">
                    2 horas atrás
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;