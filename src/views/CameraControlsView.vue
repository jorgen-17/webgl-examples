<template>
  <div>
    <h1 class="title">Camera Controls</h1>
    <div class="back-button">
      <button @click="navigateToHome">Back to Home</button>
    </div>
    <camera-control-panel v-if="renderer && canvasRef" :renderer="renderer" :canvas="canvasRef" />
    <canvas ref="canvasRef" id="cameraControlsCanvas" width="800" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { WebGLRenderer3d, RenderingOptions, RGBColor, Box, Vec3 } from 'webgl-renderer'
import CameraControlPanel from '@/components/CameraControlPanel.vue'

export default defineComponent({
  name: 'CameraControlsView',
  components: {
    CameraControlPanel
  },
  setup() {
    const router = useRouter()
    const renderer = ref<WebGLRenderer3d | null>(null)
    const canvasRef = ref<HTMLCanvasElement | null>(null)

    const navigateToHome = () => {
      router.push('/')
    }

    onMounted(() => {
      if (!canvasRef.value) return

      const backgroundColor: RGBColor = new RGBColor(0.1, 0.1, 0.1)
      const renderingOptions: RenderingOptions = {
        backgroundColor: backgroundColor,
        fullscreen: true
      }

      renderer.value = new WebGLRenderer3d(canvasRef.value, renderingOptions)

      // Create a simple white box
      const startPosition = new Vec3(-0.05, -0.05, 0)
      const endPosition = new Vec3(0.05, 0.05, 0)
      const color = new RGBColor(1, 1, 1)
      const box = new Box(startPosition, endPosition, renderer.value.gl, color)
      renderer.value.addShapeToScene(box)

      renderer.value.start()
    })

    return {
      renderer,
      canvasRef,
      navigateToHome
    }
  }
})
</script>

<style scoped>
.title {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
}

.back-button {
  position: absolute;
  top: 50px;
  left: 10px;
}

canvas {
  display: block;
  width: 100%;
  height: 100vh;
}
</style>