import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates a creative caption for an image.
 * @param base64Image The image data in base64 format (without the data:image/... prefix)
 * @param mimeType The mime type of the image
 */
export const generateImageCaption = async (base64Image: string, mimeType: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Chave de API não configurada.";

  try {
    // Using gemini-2.0-flash as it is more stable in this region/environment to avoid 404 errors
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: "Escreva uma legenda curta, criativa e moderna para esta foto do Instagram em Português do Brasil. Use emojis. Não use hashtags.",
          },
        ],
      },
    });

    return response.text || "Não foi possível gerar a legenda.";
  } catch (error) {
    console.error("Erro ao gerar legenda:", error);
    return "Erro ao conectar com a IA. Tente novamente mais tarde.";
  }
};