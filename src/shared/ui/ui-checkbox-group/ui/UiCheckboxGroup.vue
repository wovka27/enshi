<script setup lang="ts">
  interface Option {
    label: string;
    value: string;
  }

  interface Props {
    options: Option[];
  }

  defineProps<Props>();
  const emit = defineEmits<{
    (e: 'change', value: string[]): void;
  }>();

  const model = defineModel<string[]>({
    default: [],
    set: (val) => {
      emit('change', val);
      return val;
    },
  });

  const toggle = (value: string) => {
    const next = [...model.value];
    const index = next.indexOf(value);

    if (index > -1) next.splice(index, 1);
    else next.push(value);

    model.value = next;
  };

  const isChecked = (value: string) => model.value.includes(value);
</script>

<template>
  <UICheckbox
    v-for="opt in options"
    :key="opt.value"
    :label="opt.label"
    :value="opt.value"
    :model-value="isChecked(opt.value)"
    @update:model-value="toggle(opt.value)"
  />
</template>
