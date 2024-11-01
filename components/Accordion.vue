<!-- components/Accordion.vue -->
<template>
    <div class="border-t border-gray-600 pt-2">
        <button @click="isOpen = !isOpen" class="w-full text-left font-semibold text-gray-300">
            Revised Prompt
            <span class="float-right">{{ isOpen ? "−" : "+" }}</span>
        </button>
        <div v-if="isOpen" class="text-gray-400 mt-2">
            <slot />
        </div>
    </div>
</template>

<script setup>
const isOpen = ref(false)
</script>
