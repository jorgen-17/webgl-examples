import { WebGLRenderer3d } from "webgl-renderer";

export class KeyboardHandler {
    private renderer: WebGLRenderer3d;
    constructor(renderer: WebGLRenderer3d) {
        this.renderer = renderer;
    }

    public handleKeyDown = (event: KeyboardEvent): void => {
        switch(event.key.toLowerCase()) {
            case 'w':
                console.log("w");
                this.renderer.camera.zoomIn(0.1);
                break;
            case 'a':
                console.log("a");
                this.renderer.camera.panX(-0.1);
                break;
            case 's':
                console.log("s");
                this.renderer.camera.zoomOut(0.1);
                break;
            case 'd':
                console.log("d");
                this.renderer.camera.panX(0.1);
                break;
            case ' ':
                console.log("space");
                this.renderer.camera.panY(0.1);
                break;
            case 'control':
                console.log("control");
                this.renderer.camera.panY(-0.1);
                break;
        }
    }
}

export default KeyboardHandler;