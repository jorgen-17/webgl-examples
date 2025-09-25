import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera-control-panel',
  templateUrl: './camera-control-panel.component.html',
  styleUrls: ['./camera-control-panel.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CameraControlPanelComponent implements OnInit, OnDestroy {
  showControls = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  toggleView(): void {
    this.showControls = !this.showControls;
  }
}