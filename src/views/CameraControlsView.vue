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
      const startPosition = new Vec3(-0.05, 0.05, 0)
      const endPosition = new Vec3(-0.15, 0.15, 0)
      const box1color = new RGBColor(1, 1, 1)
      const box1 = new Box(startPosition, endPosition, renderer.value.gl, box1color)
      renderer.value.addShapeToScene(box1)

      const startPosition2 = new Vec3(0.05, 0.05, 0)
      const endPosition2 = new Vec3(0.15, 0.15, 0)
      const box2color = new RGBColor(0.25, 0.75, 0.50)
      const box2 = new Box(startPosition2, endPosition2, renderer.value.gl, box2color)
      renderer.value.addShapeToScene(box2)

      const eyePosition = new Vec3(0.25, 0.25, 0.25)
      const upPosition = new Vec3(eyePosition.x, eyePosition.y + 1, eyePosition.z)
      const lookAtPoint = new Vec3(0, 0, 0)
      renderer.value.camera.eyePosition = eyePosition
      renderer.value.camera.upPosition = upPosition
      renderer.value.camera.lookAtPoint = lookAtPoint

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