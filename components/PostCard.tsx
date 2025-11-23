import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
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
    <div className="relative mb-12 group">
        {/* Glow Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-3xl z-10 pointer-events-none" />
      
      {/* Blurred background for atmosphere */}
      <div 
        className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      ></div>

      <div className="relative bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 z-20 relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-secondary to-primary p-[2px]">
                <img 
                    src={post.user.avatarUrl} 
                    alt={post.user.username} 
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">{post.user.username}</p>
              <p className="text-xs text-zinc-400 mt-0.5">2h atrás</p>
            </div>
          </div>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950" onDoubleClick={handleLike}>
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-full object-cover"
          />
          
          {/* Heart Animation overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isAnimatingLike ? 'opacity-100' : 'opacity-0'}`}>
            <Heart size={100} className="text-white fill-white drop-shadow-lg scale-125" />
          </div>
        </div>

        {/* Actions Bar - Floating Style */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
                <button 
                    onClick={handleLike}
                    className={`p-2 rounded-full transition-all ${liked ? 'text-secondary' : 'text-white hover:bg-white/10'}`}
                >
                    <Heart size={24} className={liked ? 'fill-current' : ''} />
                </button>
                <span className="text-sm font-medium mr-2">{likeCount}</span>
                
                <div className="w-px h-6 bg-white/10 mx-1"></div>

                <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                    <MessageCircle size={24} />
                </button>
                
                <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                    <Share2 size={24} />
                </button>
            </div>

            <button className="p-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
                <Bookmark size={22} />
            </button>
        </div>
      </div>

      {/* Caption & Comments (Outside card for cleaner look) */}
      <div className="px-4 mt-4 space-y-2">
        <p className="text-zinc-100 text-sm leading-relaxed">
            <span className="font-semibold mr-2">{post.user.username}</span>
            {post.caption}
        </p>
        
        {post.comments.length > 0 && (
            <button className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                Ver todos os {post.comments.length} comentários
            </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;