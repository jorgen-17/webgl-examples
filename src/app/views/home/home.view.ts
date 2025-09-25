import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { WebGLRenderer3d, RenderingOptions, RGBColor, Box, Vec3, Camera } from 'webgl-renderer';
import { ControlsService } from '../../services/controls-service';
import { CameraControlPanelComponent } from '../../components/camera-control-panel/camera-control-panel.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css'],
  standalone: true,
  imports: [CameraControlPanelComponent],
})
export class HomeView {
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;
  renderer: WebGLRenderer3d | null = null;
  controlsService: ControlsService | null = null;
  constructor(private router: Router) {}

  navigateTo(page: string): void {
    this.router.navigate([page]);
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas) return;

    const backgroundColor: RGBColor = new RGBColor(0.1, 0.1, 0.1);
    const renderingOptions: RenderingOptions = {
      backgroundColor: backgroundColor,
      fullscreen: true
    };

    this.renderer = new WebGLRenderer3d(canvas, renderingOptions);

    // Create a simple white box
    const startPosition = new Vec3(-0.05, 0.05, 0);
    const endPosition = new Vec3(-0.15, 0.15, 0);
    const box1color = new RGBColor(1, 1, 1);
    const box1 = new Box(startPosition, endPosition, this.renderer.gl, box1color);
    this.renderer.addShapeToScene(box1);

    const startPosition2 = new Vec3(0.05, 0.05, 0);
    const endPosition2 = new Vec3(0.15, 0.15, 0);
    const box2color = new RGBColor(0.25, 0.75, 0.50);
    const box2 = new Box(startPosition2, endPosition2, this.renderer.gl, box2color);
    this.renderer.addShapeToScene(box2);

    const eyePosition = new Vec3(0.25, 0.25, 0.25);
    const lookAtPoint = new Vec3(0, 0, 0);
    this.renderer.camera.eyePosition = eyePosition;
    this.renderer.camera.lookAtPoint = lookAtPoint;

    this.renderer.start();

    this.controlsService = new ControlsService(this.renderer);

    document.addEventListener('keydown', this.controlsService.handleKeyDown)
    document.addEventListener('mousemove', this.controlsService.handleMouseMove)

    // Add the mousedown listener to the canvas that was passed as a prop
    if (canvas) {
      canvas.addEventListener('mousedown', this.controlsService.handleCanvasMouseDown)
    }
  }

  ngOnDestroy(): void {
    const canvas = this.canvasRef.nativeElement;

    if (this.renderer) {
      this.renderer.stop();
    }

    document.removeEventListener('keydown', this.controlsService.handleKeyDown)
    document.removeEventListener('mousemove', this.controlsService.handleMouseMove)

    // Clean up the canvas-specific event listener
    if (canvas) {
      canvas.removeEventListener('mousedown', this.controlsService.handleCanvasMouseDown)
    }
  }
}