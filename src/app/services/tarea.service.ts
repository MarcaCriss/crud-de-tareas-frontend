import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tarea } from '../interfaces/tarea.interface';
import { environment } from 'src/environments/environment';
import { Observable, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private _http: HttpClient) {}

  getAllTareasComplete(): Observable<Tarea[]> {
    return this._http.get<Tarea[]>(`${environment.url}tarea/complete`);
  }

  getAllTareasIncomplete(): Observable<Tarea[]> {
    return this._http.get<Tarea[]>(`${environment.url}tarea/incomplete`);
  }

  getAllTareas(): Observable<[Tarea[], Tarea[]]> {
    return zip(
      this.getAllTareasIncomplete(),
      this.getAllTareasComplete()
    )
  }

  getTarea(id: string): Observable<Tarea> {
    return this._http.get<Tarea>(`${environment.url}tarea/${id}`);
  }

  createTarea(tarea: Tarea) {
    return this._http.post(`${environment.url}tarea/create`, tarea);
  }

  updateTarea(id: string, tarea) {
    return this._http.put(`${environment.url}tarea/${id}`, tarea);
  }

  deleteTarea(id: string) {
    return this._http.delete(`${environment.url}tarea/${id}`);
  }

  getTareaAndUpdateStatus(id: string) {
    return this.getTarea(id).pipe(
      switchMap( (tarea: Tarea) => {
        return this.updateTarea(tarea._id, { status: !tarea.status });
      })
    );
  }
}
