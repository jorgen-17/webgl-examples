import { WebGLRenderer3d } from "webgl-renderer"

export class ControlsService {
    private renderer: WebGLRenderer3d;

    constructor(renderer: WebGLRenderer3d) {
        this.renderer = renderer;
    }

    public handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key.toLowerCase()) {
        case 'w':
          console.log("w")
          this.renderer.camera.moveForward()
          break
        case 'a':
          console.log("a")
          this.renderer.camera.moveLeft()
          break
        case 's':
          console.log("s")
          this.renderer.camera.moveBackward()
          break
        case 'd':
          console.log("d")
          this.renderer.camera.moveRight()
          break
        case ' ':
          console.log("space")
          this.renderer.camera.moveUp()
          break
        case 'control':
          console.log("control")
          this.renderer.camera.moveDown()
          break
       case 'r':
          console.log("r")
          this.renderer.camera.reset()
          break
      }
    }

    public handleCanvasMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        console.log("Canvas Left Click")
        document.body.requestPointerLock()
      }
    }

    public handleMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement) {
        console.log("mouse moved:", event.movementX, event.movementY)

        this.renderer.camera.rotatePitch(-event.movementY)
        this.renderer.camera.rotateYaw(-event.movementX)
      }
    }
}