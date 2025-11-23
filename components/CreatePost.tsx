import React, { useState, useRef } from 'react';
import { ArrowLeft, Wand2, Image as ImageIcon, Send } from 'lucide-react';
import { generateImageCaption } from '../services/geminiService';

interface CreatePostProps {
  onCancel: () => void;
  onPost: (image: string, caption: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCancel, onPost }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    // Extract base64 data (remove "data:image/jpeg;base64,")
    const base64Data = selectedImage.split(',')[1];
    const mimeType = selectedImage.split(';')[0].split(':')[1];

    const generatedText = await generateImageCaption(base64Data, mimeType);
    setCaption(generatedText);
    setIsGenerating(false);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onPost(selectedImage, caption);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={onCancel} className="text-zinc-100 p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Novo Post</h2>
        <button 
          onClick={handleSubmit} 
          disabled={!selectedImage}
          className={`text-primary font-semibold px-4 py-2 rounded-full ${!selectedImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'}`}
        >
          Compartilhar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        {/* Image Uploader */}
        <div className="mb-6">
          {!selectedImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square w-full rounded-3xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-zinc-400" size={32} />
              </div>
              <p className="text-zinc-400 font-medium">Toque para escolher uma foto</p>
              <p className="text-zinc-600 text-sm mt-2">Suporta JPG, PNG</p>
            </div>
          ) : (
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Caption Area */}
        {selectedImage && (
          <div className="space-y-4 animate-slide-up">
            <div className="relative">
                <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Escreva uma legenda..."
                className="w-full bg-zinc-900/50 text-white rounded-2xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none border border-white/5 placeholder-zinc-500"
                />
                
                {/* AI Button */}
                <button
                    onClick={handleGenerateCaption}
                    disabled={isGenerating}
                    className="absolute bottom-3 right-3 flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-wait"
                >
                    <Wand2 size={14} className={isGenerating ? "animate-spin" : ""} />
                    <span>{isGenerating ? 'Gerando...' : 'Mágica IA'}</span>
                </button>
            </div>
            
            <div className="flex items-center space-x-2 text-zinc-500 text-xs px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                <span>A IA analisa a imagem para criar uma legenda única.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;