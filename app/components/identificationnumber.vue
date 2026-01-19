<template>
    <UFormField name="identification_number" label="Identification Number" class="mt-5">
      <UInput type="type" placeholder="Enter Identification Number" v-model="model" />
    </UFormField>
</template>

<script setup lang ="ts">
    const props = defineProps<{modelValue?: string}>()
    const emit = defineEmits<{(e: "update:modelValue",v:string): void}>()


    const model = computed({
        get: () => props.modelValue ?? '',
        set : v => emit('update:modelValue',v)
    })



</script>