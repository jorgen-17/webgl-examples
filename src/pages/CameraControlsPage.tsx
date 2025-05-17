import * as React from "react";
import { WebGLRenderer3d, RenderingOptions, RGBColor, Box, Vec3 } from "webgl-renderer";
import CameraControlPanel from "../components/CameraControlPanel";

class CameraControlsPage extends React.Component<{}, {}>
{
    private canvas: HTMLCanvasElement;
    private renderer: WebGLRenderer3d;
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

        this.renderer.start();

        this.setState({ renderer: this.renderer });
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
                {this.renderer && <CameraControlPanel renderer={this.renderer} />}
                <canvas id="cameraControlsCanvas" width="800" height="500"></canvas>
            </div>
        );
    }

}

export default CameraControlsPage;