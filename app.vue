<template>
    <div
        class="min-h-screen bg-cover bg-center relative bg-[url('/assets/images/background.jpg')]"
    >
        <!-- Overlay with blur effect -->
        <div
            class="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        ></div>

        <!-- Fancy Title -->
        <div
            class="relative z-10 flex flex-col items-center justify-center min-h-[15dvh] md:min-h-[20dvh]"
        >
            <h1
                class="text-4xl font-extrabold text-gray-100 text-center drop-shadow-lg"
            >
                DALL-E Image Generation
            </h1>
        </div>

        <div class="relative z-10 flex flex-col items-center p-4">
            <ExamplePromptsModal
                :isOpen="isModalOpen"
                @close="isModalOpen = false"
            />

            <div class="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-2xl">
                <!-- Example Prompts Trigger -->
                <button
                    @click="isModalOpen = true"
                    class="text-purple-400 hover:underline mb-4"
                >
                    View Example Prompts
                </button>

                <!-- Form -->
                <form @submit.prevent="generateImageWithDallE">
                    <!-- Textarea for Prompt -->
                    <textarea
                        v-model="query"
                        placeholder="Enter your query here..."
                        class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="4"
                        required
                    ></textarea>

                    <!-- Settings Section -->
                    <div class="bg-gray-700 p-4 rounded-lg mb-4">
                        <h2 class="font-semibold text-gray-300 mb-2">
                            Settings
                        </h2>

                        <!-- Image Format Select -->
                        <label class="block mb-2 text-gray-400"
                            >Image Size</label
                        >
                        <select
                            v-model="selectedFormat"
                            class="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg mb-4 text-gray-100"
                        >
                            <option value="1024x1024">
                                Square (1024x1024)
                            </option>
                            <option value="1024x1792">
                                Portrait (1024x1792)
                            </option>
                            <option value="1792x1024">
                                Landscape (1792x1024)
                            </option>
                        </select>

                        <!-- HD Quality Checkbox -->
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                v-model="isHdEnabled"
                                id="hd-quality"
                                class="mr-2 bg-gray-600 border-gray-500 text-blue-500 focus:ring-0"
                            />
                            <label
                                for="hd-quality"
                                class="text-gray-400"
                                >HD Quality</label
                            >
                        </div>

                        <!-- Style Select -->
                        <label class="block mb-2 text-gray-400">Style</label>
                        <select
                            v-model="selectedStyle"
                            class="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-gray-100"
                        >
                            <option value="vivid">Vivid</option>
                            <option value="natural">Natural</option>
                        </select>
                    </div>

                    <!-- Generate Button -->
                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-purple-700 transition duration-200 disabled:opacity-50"
                    >
                        <div
                            v-if="loading"
                            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                        ></div>
                        <span>{{
                            loading ? "Generating..." : "Generate image"
                        }}</span>
                    </button>
                </form>

                <!-- Error Message -->
                <p
                    v-if="error"
                    class="mt-4 text-red-400 text-center"
                >
                    {{ error }}
                </p>

                <!-- Image Display and Download Button -->
                <div
                    v-if="dalleImageB64Data"
                    class="mt-6 mb-6 flex flex-col items-center justify-center rounded-lg overflow-hidden"
                >
                    <img
                        :src="`data:image/png;base64,${dalleImageB64Data}`"
                        alt="Generated image"
                        class="w-full h-auto object-cover"
                    />

                    <!-- Download Button -->
                    <button
                        @click="downloadImage"
                        class="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Download Image
                    </button>
                </div>

                <!-- Revised Prompt Accordion -->
                <Accordion v-if="imageRevisedPrompt">{{
                    imageRevisedPrompt
                }}</Accordion>
            </div>
        </div>
    </div>
</template>

<script setup>
import ExamplePromptsModal from "./components/ExamplePromptsModal.vue"
import Accordion from "./components/Accordion.vue"

const query = ref("")
const loading = ref(false)
const error = ref(null)
const dalleImageUrl = ref(null)
const imageRevisedPrompt = ref(null)
const dalleImageB64Data = ref(null)
const selectedFormat = ref("1024x1024")
const isHdEnabled = ref(false)
const selectedStyle = ref("vivid")
const isModalOpen = ref(false)

const generateImageWithDallE = async () => {
    loading.value = true
    error.value = null
    dalleImageB64Data.value = null
    imageRevisedPrompt.value = null

    // Prepare the request payload
    const payload = {
        query: query.value,
        format: selectedFormat.value,
        style: selectedStyle.value,
    }

    // Only add the quality parameter if HD is enabled
    if (isHdEnabled.value) {
        payload.quality = "hd"
    }

    try {
        const response = await $fetch("/api/bot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        dalleImageB64Data.value = response.imageB64
        imageRevisedPrompt.value = response.revisedPrompt
    } catch (err) {
        error.value =
            "An error occurred while generating the image. Please try again."
    } finally {
        loading.value = false
        query.value = ""
    }
}

const downloadImage = () => {
    const link = document.createElement("a")
    link.href = `data:image/png;base64,${dalleImageB64Data.value}`
    link.download = "generated-image.png"
    link.click()
}
</script>
