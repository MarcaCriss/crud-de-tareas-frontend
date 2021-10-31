import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Tarea } from '../../interfaces/tarea.interface';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea-nueva',
  templateUrl: './tarea-nueva.component.html',
  styleUrls: ['./tarea-nueva.component.css'],
})
export class TareaNuevaComponent implements OnInit {
  tarea: FormGroup;

  constructor(
    private _tareaService: TareaService,
    private _router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tarea = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      status: new FormControl(false, [Validators.required]),
    });
  }

  onSubmit() {
    this._tareaService.createTarea(this.tarea.value).subscribe(
      (data) => {
        this._router.navigate(['/tarea']);
      }
    );
  }

  get tituloNoValido() {
    return this.tarea.controls.title.invalid && this.tarea.controls.title.touched;
  }

  get contentNoValido() {
    return this.tarea.controls.content.invalid && this.tarea.controls.content.touched;
  }
}
