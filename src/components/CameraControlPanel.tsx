import * as React from "react";
import { WebGLRenderer3d } from "webgl-renderer";
import { KeyboardHandler } from "../input/keyboard-handler";
import { MouseHandler } from "../input/mouse-handler";

interface ControlPanelProps {
    // Add any props if needed in the future
    renderer: WebGLRenderer3d;
}

class CameraControlPanel extends React.Component<ControlPanelProps, {}>
{
    private renderer: WebGLRenderer3d;
    private keyboardHandler: KeyboardHandler;
    private mouseHandler: MouseHandler;
    private showControls: boolean = true;

    constructor(props: ControlPanelProps) {
        super(props);
        this.renderer = props.renderer;
    }

    componentDidMount() {
        // Add keydown event listener
        this.keyboardHandler = new KeyboardHandler(this.renderer);
        document.addEventListener('keydown', this.keyboardHandler.handleKeyDown);

        this.mouseHandler = new MouseHandler(this.renderer);
        document.addEventListener('mousedown', this.mouseHandler.handleMouseDown);
        document.addEventListener('keydown', this.mouseHandler.handleEscapeKey);
        document.addEventListener('mousemove', this.mouseHandler.handleMouseMove);
    }

    componentWillUnmount() {
        // Clean up event listener when component unmounts
        if (this.keyboardHandler) {
            document.removeEventListener('keydown', this.keyboardHandler.handleKeyDown);
        }
        if (this.mouseHandler) {
            document.removeEventListener('mousedown', this.mouseHandler.handleMouseDown);
            document.removeEventListener('keydown', this.mouseHandler.handleEscapeKey);
        }
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
}

export default CameraControlPanel;