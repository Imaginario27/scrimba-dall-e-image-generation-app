import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const openaiApiKey = config.openaiApiKey

        const body = await readBody(event)
        const { query, format, quality, style } = body

        // Initialize OpenAI client
        const openai = new OpenAI({
            apiKey: openaiApiKey,
            dangerouslyAllowBrowser: false,
        })

        // Prepare the parameters with specific types
        const params: Partial<OpenAI.ImageGenerateParams> = {
            model: 'dall-e-3',
            prompt: query,
            size: format,
            style: style,
            response_format: "b64_json" as const, // Specify "b64_json" as a constant type
        }

        // Only add quality if it is defined
        if (quality) {
            params.quality = quality as 'hd' // Explicitly cast quality to expected type
        }

        const image = await openai.images.generate(params as OpenAI.ImageGenerateParams)

        // Extract revised prompt and base64 image
        const revisedPrompt = image.data[0].revised_prompt
        const imageB64 = image.data[0].b64_json

        return { imageB64, revisedPrompt }

    } catch (error) {
        if (error instanceof Error) {
            return { message: `Error: ${error.message}` }
        } else {
            return { message: "An unknown error occurred" }
        }
    }
})
