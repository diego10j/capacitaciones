import { UsuarioService } from './../../services/usuario.service';
import { OfertaCursoService } from './../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InscripcionService } from '../../services/inscripcion.service';
import { HorarioCursoService } from '../../services/horario-curso.service';
import { Usuario } from '../../models/usuario.model';



@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styles: [
  ]
})
export class InscripcionComponent implements OnInit {

  public datos: any = [];
  public datosHorario: any = [];
  public datosOferta: any;
  public datosUsuarioInscrito: any;

  public cargando = true;
  public ofertaSeleccionado = '-1';

  public usuario: Usuario;

  public fechaActual: Date = new Date();

  


  constructor(
    private inscripcionService: InscripcionService,
    private ofertaCursoService: OfertaCursoService,
    private horarioCursoService: HorarioCursoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute) {
    this.usuario = usuarioService.usuario;
  }


  ngOnInit(): void {
this.listar();
   
  }

  listar(){
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



  guardarInscripcion() {

    this.cargando = true;
    const campos = {
      ID_USU: localStorage.getItem('ID_USU'),
      ID_ESTINS: '1',
      NOTA_INSCR: '0',
      FECHA_INSCR: this.fechaActual.toISOString().slice(0, 10),
      ESTADO_INSCR: '1',
      ID_OFERT: this.ofertaSeleccionado,
    };
    this.inscripcionService.crear(campos)
      .subscribe(resp => {
        this.listar();
        this.cargando = false;
        Swal.fire('Inscripción', 'Se guardo correctamente', 'success');
      });
  }


  cancelarInscripcion() {

    this.cargando = true;
    const campos = {
      ID_USU: localStorage.getItem('ID_USU'),
      ID_ESTINS: '1',
      NOTA_INSCR: '0',
      FECHA_INSCR: this.fechaActual.toISOString().slice(0, 10),
      ESTADO_INSCR: '1',
      ID_OFERT: this.ofertaSeleccionado,
    };
    this.inscripcionService.eliminar(this.datosUsuarioInscrito.ID_INSCR)
      .subscribe(resp => {
        this.listar();
        this.cargando = false;
        Swal.fire('Inscripción', 'Se cancelo la inscripción correctamente', 'success');
        this.datosUsuarioInscrito=resp;
      });

  }
  

}
