<template>
  <div class="home">
    <h1>WebGL Examples</h1>
    <div class="examples-container">
      <example-card
        title="Camera Controls"
        description="Example demonstrating WASD camera controls with a simple white box."
        @click="navigateTo('camera-controls')"
      />
      <!-- Add more example cards here as you create them -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ExampleCard from '@/components/ExampleCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ExampleCard
  },
  setup() {
    const router = useRouter()

    const navigateTo = (page: string) => {
      router.push(`/${page}`)
    }

    return {
      navigateTo
    }
  }
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 40px;
}

.examples-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
}
</style>