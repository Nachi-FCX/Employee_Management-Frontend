<template>
    <UFormField name="gender" label="Gender" class="mt-5" >
      <USelect v-model="model" :items="['Male', 'Female', 'Other']" class="w-50"/>
    </UFormField>
</template>

<script setup lang="ts">
    const props = defineProps<{modelValue:string}>()
    const emit = defineEmits<{(e : 'updatemodelValue',v : string):void}>()

    const model = computed({
        get: () => props.modelValue,
        set : v => emit('updatemodelValue',v)
    })

</script>

