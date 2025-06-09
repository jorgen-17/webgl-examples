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
        <li>R - Reset Camera</li>
      </template>
      <template v-else>
        <li>C - Show Controls</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WebGLRenderer3d, Vec3 } from 'webgl-renderer'

export default defineComponent({
  name: 'CameraControlPanel',
  props: {
    renderer: {
      type: WebGLRenderer3d,
      required: true
    },
    canvas: {
      type: HTMLCanvasElement,
      required: true
    }
  },
  setup(props) {
    const showControls = ref(true)

    const handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key.toLowerCase()) {
        case 'w':
          console.log("w")
          props.renderer.camera.moveForward()
          break
        case 'a':
          console.log("a")
          props.renderer.camera.moveLeft()
          break
        case 's':
          console.log("s")
          props.renderer.camera.moveBackward()
          break
        case 'd':
          console.log("d")
          props.renderer.camera.moveRight()
          break
        case ' ':
          console.log("space")
          props.renderer.camera.moveUp()
          break
        case 'control':
          console.log("control")
          props.renderer.camera.moveDown()
          break
        case 'c':
          console.log("c")
          showControls.value = !showControls.value
          break
        case 'r':
          console.log("r")
          props.renderer.camera.reset()
          break
      }
    }

    const handleCanvasMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        console.log("Canvas Left Click")
        document.body.requestPointerLock()
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement) {
        console.log("mouse moved:", event.movementX, event.movementY)

        props.renderer.camera.rotatePitch(-event.movementY)
        props.renderer.camera.rotateYaw(-event.movementX)
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousemove', handleMouseMove)

      // Add the mousedown listener to the canvas that was passed as a prop
      if (props.canvas) {
        props.canvas.addEventListener('mousedown', handleCanvasMouseDown)
      }
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousemove', handleMouseMove)

      // Clean up the canvas-specific event listener
      if (props.canvas) {
        props.canvas.removeEventListener('mousedown', handleCanvasMouseDown)
      }
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