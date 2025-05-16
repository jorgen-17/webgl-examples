import * as React from "react";
import * as ReactDOM from "react-dom";
import { WebGLRenderer3d, RenderingOptions, RGBColor, Box, Vec3 } from "webgl-renderer";
import KeyboardHandler from "./input/keyboard-handler";

class App extends React.Component<{}, {}>
{
    private canvas:  HTMLCanvasElement;
    private renderer: WebGLRenderer3d;
    private keyboardHandler: KeyboardHandler;
    constructor()
    {
        super();

        this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;

        const backgroundColor: RGBColor = new RGBColor(0.1, 0.1, 0.1);
        let renderingOptions: RenderingOptions =
        {
            backgroundColor: backgroundColor,
            fullscreen: true
        };
        this.renderer = new WebGLRenderer3d(this.canvas, renderingOptions);

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
            </div>
        );
    }

    componentWillUnmount() {
        // Clean up event listener when component unmounts
        document.removeEventListener('keydown', this.keyboardHandler.handleKeyDown);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App/>, document.getElementById("main"));
}, false);
