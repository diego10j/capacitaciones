import { InscripcionService } from './../../../services/inscripcion.service';
import { OfertaCursoService } from './../../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-inscritos-oferta',
  templateUrl: './inscritos-oferta.component.html',
  styles: [
  ]
})
export class InscritosOfertaComponent implements OnInit {
  public datos: any = [];
  public datosOferta: any;
  public cargando: boolean = true;
  public ofertaSeleccionado = '-1';



  constructor(
    private inscripcionService: InscripcionService,
    private ofertaCursoService: OfertaCursoService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {

    this.cargando = true;
    this.route.params.subscribe((params: Params) => this.ofertaSeleccionado = params.id);
    this.listar();

    this.ofertaCursoService.getBusquedaCodigo(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      this.datosOferta = respuest.datos;
      this.cargando = false;
    });


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
