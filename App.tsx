import React, { useState, useEffect } from 'react';
import { ImageDisplay } from './components/ImageDisplay';
import { PromptControls } from './components/PromptControls';
import { generateInfluencerImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { GeminiIcon } from './components/icons';
import { ModelGallery } from './components/ModelGallery';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A beautiful Filipina-Chinese (Chinita) model, smiling, professional headshot, studio lighting, high detail');
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [history, setHistory] = useState<{ image: string | null; prompt: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [savedModels, setSavedModels] = useState<string[]>([]);

    useEffect(() => {
        try {
            const storedModels = localStorage.getItem('ai-influencer-models');
            if (storedModels) {
                setSavedModels(JSON.parse(storedModels));
            }
        } catch (e) {
            console.error("Failed to parse models from localStorage", e);
            setSavedModels([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ai-influencer-models', JSON.stringify(savedModels));
    }, [savedModels]);

    const handleGenerate = async () => {
        if (!prompt.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            // Save the current state (image and prompt) to history before generating
            setHistory([...history, { image: currentImage, prompt: prompt }]);

            const newImage = await generateInfluencerImage(prompt, currentImage);
            setCurrentImage(newImage);
            // Suggest a follow-up prompt
            setPrompt(currentImage 
                ? 'Change her outfit to a summer dress' 
                : 'Now, place her on a beach in the Philippines, sunset lighting'
            );
        } catch (e: any) {
            console.error(e);
            setError(`Failed to generate image. ${e.message || 'Please check the console for details.'}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFileSelect = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            const base64Image = await fileToBase64(file);
            setCurrentImage(base64Image);
            setHistory([]); // Reset history on new upload
        } catch (e: any) {
            console.error(e);
            setError(`Failed to read the selected file. ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewCharacter = () => {
        setCurrentImage(null);
        setPrompt('A beautiful Filipina-Chinese (Chinita) model, smiling, professional headshot, studio lighting, high detail');
        setError(null);
        setHistory([]); // Reset history for new character
    };

    const handleSaveToGallery = () => {
        if (currentImage && !savedModels.includes(currentImage)) {
            setSavedModels([currentImage, ...savedModels]);
        }
    };

    const handleDeleteModel = (index: number) => {
        setSavedModels(savedModels.filter((_, i) => i !== index));
    };

    const handleSelectModel = (model: string) => {
        setCurrentImage(model);
        setPrompt('Change her outfit to a red ball gown');
        setHistory([]); // Reset history when selecting from gallery
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setCurrentImage(previousState.image);
            setPrompt(previousState.prompt);
            setHistory(history.slice(0, -1));
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
            <header className="w-full p-4 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <GeminiIcon className="w-8 h-8 text-indigo-400" />
                        <h1 className="text-2xl font-bold tracking-tight text-white">AI Influencer Studio</h1>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                    <div>
                        <h2 className="text-xl font-semibold text-indigo-300">Create Your Character</h2>
                        <p className="text-slate-400 mt-1">
                            Generate, modify, and save your AI models. Use the gallery to revisit characters and create new scenarios for them.
                        </p>
                    </div>

                    <PromptControls
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onSubmit={handleGenerate}
                        isLoading={isLoading}
                        hasImage={!!currentImage}
                        onFileSelect={handleFileSelect}
                        onNewCharacter={handleNewCharacter}
                    />
                    
                    <ModelGallery 
                        models={savedModels}
                        onSelectModel={handleSelectModel}
                        onDeleteModel={handleDeleteModel}
                    />

                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-sm">
                            <p className="font-semibold">An error occurred:</p>
                            <p>{error}</p>
                        </div>
                    )}
                </div>
                
                <div className="w-full">
                    <ImageDisplay
                        imageUrl={currentImage}
                        isLoading={isLoading}
                        onSaveToGallery={handleSaveToGallery}
                        onUndo={handleUndo}
                        canUndo={history.length > 0}
                    />
                </div>
            </main>
        </div>
    );
};

export default App;