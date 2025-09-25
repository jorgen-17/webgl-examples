import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-example-card',
  templateUrl: './example-card.component.html',
  styleUrls: ['./example-card.component.css'],
  standalone: true
})
export class ExampleCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Output() cardClick = new EventEmitter<void>();

  onClick(): void {
    this.cardClick.emit();
  }
}