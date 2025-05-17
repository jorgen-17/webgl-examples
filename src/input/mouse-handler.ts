import { WebGLRenderer3d } from "webgl-renderer";

export class MouseHandler {
    private renderer: WebGLRenderer3d;

    private isLocked: boolean = false;

    constructor(renderer: WebGLRenderer3d) {
        this.renderer = renderer;
    }

    handleMouseMove(event: MouseEvent) {
        if (this.isLocked) {
            console.log("mouse moved:", event.movementX, event.movementY);
        }
    }

    handleMouseDown(event: MouseEvent) {
        console.log("Locking Mouse down");
        document.body.requestPointerLock();
        this.isLocked = true;
    }

    handleEscapeKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            console.log("Unlocking Mouse");
            document.exitPointerLock();
            this.isLocked = false;
        }
    }
}