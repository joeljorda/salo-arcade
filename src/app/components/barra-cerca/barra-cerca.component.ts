import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-cerca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barra-cerca.component.html',
  styleUrl: './barra-cerca.component.scss'
})
export class BarraCercaComponent {
  searchText: string = '';
  
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(): void { 
    this.searchEvent.emit(this.searchText);
  }

  onReset(): void{
    this.searchText = '';
    this.searchEvent.emit(this.searchText);
  }
}
