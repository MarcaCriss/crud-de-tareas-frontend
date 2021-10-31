import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';

import { Tarea } from '../../interfaces/tarea.interface';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent implements OnInit {
  tareas$: Observable<[Tarea[], Tarea[]]>;
  tareasComplete$: Tarea[];
  tareasIncomplete$: Tarea[];
  loading = true;

  constructor(private _tareaService: TareaService) {}

  ngOnInit(): void {
    this.getAllTareas();
  }

  getAllTareas(): void {
    this.tareas$ = this._tareaService.getAllTareas();
    this.tareas$.subscribe(() => (this.loading = false));
  }

  change(id) {
    this._tareaService.getTareaAndUpdateStatus(id).subscribe(() => {
      this.getAllTareas();
      this.loading = false;
    });
  }

  deleteTarea(id: string) {
    this._tareaService.deleteTarea(id).subscribe(
      (data) => this.getAllTareas()
    );
  }
}
