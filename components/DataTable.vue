<template>
    
        <DataTable :value="value" :tableStyle="tableStyle" v-bind="$attrs">
            <template v-for="col in columns" :key="col.field">
               <Column :field="col.field" :header="col.header">


                  <template v-if="col.field === 'actions'" #body="{ index }">
                    <slot name="actions" :index="index" />
                  </template>
            </Column>
            
              </template>
        </DataTable>
        



</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

interface ColumnDef {
  field: string
  header: string
}

defineProps<{
  value: Record<string, any>[]
  columns: ColumnDef[]
  tableStyle?: Record<string, any>
}>()
</script>

<style scoped lang="scss">
</style>