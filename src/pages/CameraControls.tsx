import * as React from "react";
import { WebGLRenderer3d, RenderingOptions, RGBColor, Box, Vec3 } from "webgl-renderer";
import KeyboardHandler from "../input/keyboard-handler";

class CameraControls extends React.Component<{}, {}>
{
    private canvas: HTMLCanvasElement;
    private renderer: WebGLRenderer3d;
    private keyboardHandler: KeyboardHandler;

    constructor(props: {})
    {
        super(props);
    }

    componentDidMount()
    {
        this.canvas = document.getElementById("cameraControlsCanvas") as HTMLCanvasElement;
        if (!this.canvas) return;

        const backgroundColor: RGBColor = new RGBColor(0.1, 0.1, 0.1);
        let renderingOptions: RenderingOptions =
        {
            backgroundColor: backgroundColor,
            fullscreen: true
        };
        this.renderer = new WebGLRenderer3d(this.canvas, renderingOptions);

        // Create a simple white box (from original home page)
        const startPosition = new Vec3(-0.05, -0.05, 0);
        const endPosition = new Vec3(0.05, 0.05, 0);
        const color = new RGBColor(1, 1, 1);
        const box = new Box(startPosition, endPosition, this.renderer.gl, color);
        this.renderer.addShapeToScene(box);

        // Add keydown event listener
        this.keyboardHandler = new KeyboardHandler(this.renderer);
        document.addEventListener('keydown', this.keyboardHandler.handleKeyDown);

        this.renderer.start();
    }

    render() {
        return (
            <div>
                <h1 style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
                    Camera Controls
                </h1>
                <div style={{ position: 'absolute', top: '50px', left: '10px' }}>
                    <button onClick={() => window.location.href = '/'}>
                        Back to Home
                    </button>
                </div>
                <div className="control-panel">
                    <h3>Controls:</h3>
                    <ul>
                        <li>W - Zoom In</li>
                        <li>S - Zoom Out</li>
                        <li>A - Pan Left</li>
                        <li>D - Pan Right</li>
                        <li>Space - Pan Up</li>
                        <li>Ctrl - Pan Down</li>
                    </ul>
                </div>
                <canvas id="cameraControlsCanvas" width="800" height="500"></canvas>
            </div>
        );
    }

    componentWillUnmount() {
        // Clean up event listener when component unmounts
        if (this.keyboardHandler) {
            document.removeEventListener('keydown', this.keyboardHandler.handleKeyDown);
        }
    }
}

export default CameraControls;