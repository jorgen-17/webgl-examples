<template>
  <div class="example-card" @click="$emit('click')">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExampleCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  emits: ['click']
})
</script>

<style scoped>
.example-card {
  background-color: #333;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #444;
  transition: transform 0.2s, box-shadow 0.2s;
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  margin: 0 0 10px 0;
  color: #4CAF50;
}

p {
  margin: 0;
  color: #ccc;
}
</style>