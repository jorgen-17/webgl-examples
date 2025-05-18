<template>
  <div class="control-panel">
    <h3>Controls:</h3>
    <ul>
      <template v-if="showControls">
        <li>C - Hide Controls</li>
        <li>W - Zoom In</li>
        <li>S - Zoom Out</li>
        <li>A - Pan Left</li>
        <li>D - Pan Right</li>
        <li>Space - Pan Up</li>
        <li>Ctrl - Pan Down</li>
        <li>Left Click - Lock Mouse</li>
        <li>Escape - Unlock Mouse</li>
      </template>
      <template v-else>
        <li>C - Show Controls</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WebGLRenderer3d } from 'webgl-renderer'

export default defineComponent({
  name: 'CameraControlPanel',
  props: {
    renderer: {
      type: Object as () => WebGLRenderer3d,
      required: true
    }
  },
  setup(props) {
    const showControls = ref(true)
    const mouseIsLocked = ref(false)

    const handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key.toLowerCase()) {
        case 'w':
          console.log("w")
          props.renderer.camera.zoomIn(0.1)
          break
        case 'a':
          console.log("a")
          props.renderer.camera.panX(-0.1)
          break
        case 's':
          console.log("s")
          props.renderer.camera.zoomOut(0.1)
          break
        case 'd':
          console.log("d")
          props.renderer.camera.panX(0.1)
          break
        case ' ':
          console.log("space")
          props.renderer.camera.panY(0.1)
          break
        case 'control':
          console.log("control")
          props.renderer.camera.panY(-0.1)
          break
        case 'escape':
          console.log("Escape")
          document.exitPointerLock()
          mouseIsLocked.value = false
          break
        case 'c':
          console.log("c")
          showControls.value = !showControls.value
          break
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      console.log("Left Click")
      document.body.requestPointerLock()
      mouseIsLocked.value = true
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (mouseIsLocked.value) {
        console.log("mouse moved:", event.movementX, event.movementY)
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mousemove', handleMouseMove)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
    })

    return {
      showControls
    }
  }
})
</script>

<style scoped>
.control-panel {
  position: absolute;
  top: 100px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 5px;
  z-index: 10;
  width: 200px;
}

h3 {
  margin-top: 0;
  color: #4CAF50;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
}
</style>