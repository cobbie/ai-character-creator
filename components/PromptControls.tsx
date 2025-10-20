
import React, { useRef } from 'react';
import { UploadIcon, SparklesIcon, ResetIcon } from './icons';

interface PromptControlsProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    hasImage: boolean;
    onFileSelect: (file: File) => void;
    onNewCharacter: () => void;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onSubmit, isLoading, hasImage, onFileSelect, onNewCharacter }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="prompt-input" className="block text-sm font-medium text-slate-300 mb-2">
                    {hasImage ? 'Describe your modification' : 'Describe your character'}
                </label>
                <textarea
                    id="prompt-input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., in a futuristic city, cyberpunk style"
                    rows={4}
                    disabled={isLoading}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-200 placeholder-slate-500 disabled:opacity-50"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 <button
                    onClick={onSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-500 transition-colors duration-200 disabled:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>{hasImage ? 'Modify Image' : 'Generate Image'}</span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleUploadClick}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors duration-200 disabled:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500"
                    >
                        <UploadIcon className="w-5 h-5" />
                        <span>Upload</span>
                    </button>
                    <button
                        onClick={onNewCharacter}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors duration-200 disabled:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500"
                    >
                        <ResetIcon className="w-5 h-5" />
                        <span>New Character</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
