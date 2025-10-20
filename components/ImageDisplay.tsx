import React from 'react';
import { LoadingSpinner, ImageIcon, HeartIcon, DownloadIcon, UndoIcon } from './icons';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onSaveToGallery: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, onSaveToGallery, onUndo, canUndo }) => {

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-influencer-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4">
        <div className="aspect-square w-full max-w-2xl mx-auto bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden">
        {isLoading && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-4">
            <LoadingSpinner className="w-12 h-12 text-indigo-400" />
            <p className="text-slate-300 text-lg font-medium">Generating your vision...</p>
            </div>
        )}

        {imageUrl ? (
            <img
            src={imageUrl}
            alt="Generated AI influencer"
            className="w-full h-full object-contain rounded-lg transition-opacity duration-500"
            />
        ) : (
            <div className="text-center text-slate-500 flex flex-col items-center gap-4">
            <ImageIcon className="w-16 h-16" />
            <h3 className="text-xl font-semibold text-slate-400">Your Image Will Appear Here</h3>
            <p className="max-w-sm">
                Use the controls to generate your first image. The journey of your AI influencer starts now!
            </p>
            </div>
        )}
        </div>
        {imageUrl && !isLoading && (
            <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto w-full">
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="w-full flex items-center justify-center gap-2 bg-slate-600/30 text-slate-300 border border-slate-600/50 font-semibold py-3 px-4 rounded-md hover:bg-slate-600/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <UndoIcon className="w-5 h-5" />
                    <span>Undo</span>
                </button>
                <button
                    onClick={onSaveToGallery}
                    className="w-full flex items-center justify-center gap-2 bg-pink-600/20 text-pink-300 border border-pink-600/50 font-semibold py-3 px-4 rounded-md hover:bg-pink-600/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-pink-500"
                >
                    <HeartIcon className="w-5 h-5" />
                    <span>Save to Gallery</span>
                </button>
                <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 bg-sky-600/20 text-sky-300 border border-sky-600/50 font-semibold py-3 px-4 rounded-md hover:bg-sky-600/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
                >
                    <DownloadIcon className="w-5 h-5" />
                    <span>Download</span>
                </button>
            </div>
        )}
    </div>
  );
};