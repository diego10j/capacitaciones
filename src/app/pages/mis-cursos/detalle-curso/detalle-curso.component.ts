import { environment } from './../../../../environments/environment';
import { OfertaCursoService } from './../../../services/oferta-curso.service';
import { InscripcionService } from './../../../services/inscripcion.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';
import { MaterialCursoService } from '../../../services/material-curso.service';
import { HorarioCursoService } from '../../../services/horario-curso.service';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styles: [
  ]
})
export class DetalleCursoComponent implements OnInit {

  public datos: any = [];
  public datosHorario: any = [];
  public datosMaterial: any = [];
  public datosOferta: any;

  public datosUsuarioInscrito: any;
  public cargando = true;
  public ofertaSeleccionado = '-1';

  constructor(
    private inscripcionService: InscripcionService,
    private ofertaCursoService: OfertaCursoService,
    private materialCursoService: MaterialCursoService,
    private horarioCursoService: HorarioCursoService,
    private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.listar();

  }

  listar() {
    this.cargando = true;
    this.route.params.subscribe((params: Params) => this.ofertaSeleccionado = params.id);

    this.ofertaCursoService.getBusquedaCodigo(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.datosOferta = respuest.datos;
      }
      else {
        this.datosOferta = [];
      }
    });

    this.inscripcionService.getUsuarioInscritoCurso(this.ofertaSeleccionado, localStorage.getItem('ID_USU')).subscribe(resp => {
      const respuest: any = resp;
      this.datosUsuarioInscrito = respuest.datos;
    });


    this.materialCursoService.listar(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.datosMaterial = respuest.datos;
        this.cargando = false;
      }
      else {
        this.datosMaterial = [];
      }
    });

    this.horarioCursoService.listar(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.datosHorario = respuest.datos;
      }
      else {
        this.datosHorario = [];
      }
      this.cargando = false;
    });

  }


  descargar(fila: any) {
    const nom=fila.ARCHIVOS_MATER;
    const archivo=`${environment.api_rest}/upload/${nom}`;
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = archivo;
    a.download = nom;
    a.target='_blank';
    a.click();
  }

}
