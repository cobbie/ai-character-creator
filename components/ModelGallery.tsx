
import React from 'react';
import { TrashIcon } from './icons';

interface ModelGalleryProps {
    models: string[];
    onSelectModel: (model: string) => void;
    onDeleteModel: (index: number) => void;
}

export const ModelGallery: React.FC<ModelGalleryProps> = ({ models, onSelectModel, onDeleteModel }) => {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-300">Model Gallery</h3>
            {models.length === 0 ? (
                <div className="text-center text-slate-500 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-6">
                    <p>Your saved models will appear here.</p>
                    <p className="text-sm">Generate an image and click "Save to Gallery" to start!</p>
                </div>
            ) : (
                <div className="relative">
                    <div className="flex space-x-3 overflow-x-auto p-2 -m-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                        {models.map((model, index) => (
                            <div key={index} className="relative group flex-shrink-0">
                                <button 
                                    onClick={() => onSelectModel(model)}
                                    className="block w-24 h-24 rounded-lg overflow-hidden border-2 border-slate-700 hover:border-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                >
                                    <img src={model} alt={`Saved model ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteModel(index);
                                    }}
                                    className="absolute top-1 right-1 bg-red-600/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 focus:opacity-100 transition-opacity"
                                    aria-label="Delete model"
                                >
                                    <TrashIcon className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
