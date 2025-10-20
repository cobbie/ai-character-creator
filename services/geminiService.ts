import { GoogleGenAI, Modality } from "@google/genai";

// Helper to convert a base64 data URL to a Gemini Part object
const dataUrlToGeminiPart = (dataUrl: string) => {
    // Expected format: "data:image/jpeg;base64,LzlqLzRBQ..."
    const parts = dataUrl.split(';base64,');
    if (parts.length !== 2) {
        throw new Error('Invalid data URL format');
    }
    const mimeType = parts[0].split(':')[1];
    if (!mimeType) {
        throw new Error('Could not extract MIME type from data URL');
    }
    return {
        inlineData: {
            mimeType,
            data: parts[1]
        }
    };
};

export const generateInfluencerImage = async (prompt: string, baseImage: string | null): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const contentParts: any[] = [];
    
    if (baseImage) {
        contentParts.push(dataUrlToGeminiPart(baseImage));
        // This enhanced prompt provides a much stronger directive to the model, forcing it to prioritize the text prompt for style.
        // It explicitly tells the model to extract features but discard the original art style.
        const instruction = `CRITICAL INSTRUCTION: Analyze the provided image to understand the character's core features (like face shape, hair style and color, eye color). Your primary task is to completely transform the artistic style of this character based *only* on the text prompt. You MUST IGNORE the original art style of the image (e.g., 2D, anime, cartoon). Re-imagine the character in the new style described in the text. Text prompt: ${prompt}`;
        contentParts.push({ text: instruction });
    } else {
        contentParts.push({ text: prompt });
    }
    

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: contentParts },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });
    
    // Extract the first image from the response
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const mimeType = part.inlineData.mimeType;
            return `data:${mimeType};base64,${base64ImageBytes}`;
        }
    }

    throw new Error("No image was generated in the API response.");
};