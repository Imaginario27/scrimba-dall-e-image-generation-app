<!-- components/ExamplePromptsModal.vue -->
<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div class="bg-gray-800 p-6 rounded-lg max-w-lg w-full relative text-gray-200">
            <button @click="closeModal" class="absolute top-4 right-6 text-gray-400 hover:text-gray-200">Close</button>
            <h2 class="text-xl font-bold mb-4">Example Prompts</h2>
            <ul class="text-gray-400 italic flex flex-col gap-3">
                <li>A colorful image of an astronaut cycling on the moon, with a vibrant Earth in the background...</li>
                <li>A colorful coral reef with diverse marine life.</li>
                <li>A steampunk city with gear-driven machines...</li>
                <li>A detailed sticker of an astronaut's helmet...</li>
                <li>
                    A detailed sticker of an astronaut's helmet. 
                    The visor is reflecting Earth from space, showing continents from a distance. 
                    The helmet should appear metallic, with visible knobs, ridges, and a sense of depth, 
                    styled in black and white with high contrast against a light background.
                </li>
                <li>A steampunk city with gear-driven machines, airships docked atop buildings, and streets lit by gas lamps, set in a vast canyon</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(["close"])

const closeModal = () => emit("close")
</script>
