import { OfertaCursoService } from './../../services/oferta-curso.service';
import { InscripcionService } from './../../services/inscripcion.service';

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HorarioCursoService } from '../../services/horario-curso.service';



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styles: [
  ]
})
export class AsistenciaComponent implements OnInit {
  public datos: any = [];
  public datosOferta: any;
  public cargando: boolean = true;
  public ofertaSeleccionado = '-1';
  public seleccionado:any;
  public horasSeleccionado:any;
  public datosHorario: any = [];


  constructor(
    private inscripcionService: InscripcionService,
    private horarioCursoService: HorarioCursoService,
    private ofertaCursoService: OfertaCursoService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {

    this.cargando = true;
    this.route.params.subscribe((params: Params) => this.ofertaSeleccionado = params.id);


    this.ofertaCursoService.getBusquedaCodigo(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      this.datosOferta = respuest.datos;
    });

    this.horarioCursoService.listar(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.datosHorario = respuest.datos;
      }
      else {
        this.datosHorario = [];
      }
    });
    this.listar();

  }

  listar() {
    this.cargando = true;
    this.inscripcionService.getAlumnosCurso(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.datos = respuest.datos;
      }
      else {
        this.datos = [];
      }
      this.cargando = false;
    });
  }


}
