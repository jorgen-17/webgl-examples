import * as React from "react";
import { WebGLRenderer3d } from "webgl-renderer";

interface ControlPanelProps {
    // Add any props if needed in the future
    renderer: WebGLRenderer3d;
}

class CameraControlPanel extends React.Component<ControlPanelProps, {}>
{
    private renderer: WebGLRenderer3d;
    private showControls: boolean = true;
    private mouseIsLocked: boolean = false;

    constructor(props: ControlPanelProps) {
        super(props);
        this.renderer = props.renderer;
    }

    componentDidMount() {
        // Add keydown event listener
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        // Clean up event listener when component unmounts
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
        return (
            <div className="control-panel">
            <h3>Controls:</h3>
            <ul>
                {this.showControls && (
                    <>
                        <li>C - Hide Controls</li>
                        <li>W - Zoom In</li>
                        <li>S - Zoom Out</li>
                        <li>A - Pan Left</li>
                        <li>D - Pan Right</li>
                        <li>Space - Pan Up</li>
                        <li>Ctrl - Pan Down</li>
                        <li>Left Click - Lock Mouse</li>
                        <li>Escape - Unlock Mouse</li>
                    </>
                )}
                {!this.showControls && (
                    <li>C - Show Controls</li>
                )}
                </ul>
            </div>
        );
    }

    handleKeyDown = (event: KeyboardEvent): void => {
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
            case 'escape':
                console.log("Escape");
                document.exitPointerLock();
                this.mouseIsLocked = false;
                break;
            case 'c':
                console.log("c");
                this.showControls = !this.showControls;
                this.setState({ showControls: this.showControls });
                break;
        }
    }

    handleMouseDown = (event: MouseEvent): void => {
        console.log("Left Click");
        document.body.requestPointerLock();
        this.mouseIsLocked = true;
    }

    handleMouseMove(event: MouseEvent) {
        if (this.mouseIsLocked) {
            console.log("mouse moved:", event.movementX, event.movementY);
        }
    }

}

export default CameraControlPanel;