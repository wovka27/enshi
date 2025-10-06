<script setup lang="ts">
  import AccountFormSection from '@features/settings/ui/AccountFormSection.vue';

  interface SettingsField {
    field: Record<string, string | number | boolean> | Record<string, string | number | boolean>[];
    title: string;
    subtitle: string;
    group?: SettingsField[];
    mb?: boolean;
  }

  interface ISettingsFieldProps {
    fields: SettingsField[];
    form: Record<string, string>;
  }

  defineProps<ISettingsFieldProps>();
</script>

<template>
  <template
    v-for="(field, index) in fields"
    :key="index"
  >
    <AccountFormSection
      v-if="!field.group?.length"
      :mb="field.mb"
      :title="field.title"
      :subtitle="field.subtitle"
    >
      <template v-if="Array.isArray(field.field)">
        <div style="display: flex; flex-direction: column; gap: 24px">
          <UiInput
            v-for="item in field.field"
            :key="item.key"
            v-model="form[item.key]"
            v-bind="item"
          />
        </div>
      </template>
      <UiInput
        v-else
        v-model="form[field.field.key]"
        v-bind="field.field"
      />
    </AccountFormSection>
    <template v-else>
      <SettingsFields
        :fields="field.group"
        :form="form"
      />
    </template>
    <UiLine v-if="field.group" />
  </template>
</template>
