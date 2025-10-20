import { GoogleGenAI, Modality } from "@google/genai";
// Note: You might need to install this type definition for Vercel:
// npm install --save-dev @vercel/node
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helper to convert a base64 data URL to a Gemini Part object
const dataUrlToGeminiPart = (dataUrl: string) => {
    const parts = dataUrl.split(';base64,');
    if (parts.length !== 2) throw new Error('Invalid data URL format');
    const mimeType = parts[0].split(':')[1];
    if (!mimeType) throw new Error('Could not extract MIME type');
    return { inlineData: { mimeType, data: parts[1] } };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, baseImage } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // The API key is now securely read from environment variables on the server
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key is not configured on the server' });
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const contentParts: any[] = [];
        
        if (baseImage) {
            contentParts.push(dataUrlToGeminiPart(baseImage));
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
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                const imageUrl = `data:${mimeType};base64,${base64ImageBytes}`;
                // Send the generated image URL back to the frontend
                return res.status(200).json({ imageUrl });
            }
        }

        throw new Error("No image was generated.");

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}
