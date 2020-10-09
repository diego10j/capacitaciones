import { OfertaCursoService } from './../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';


@Component({
  selector: 'app-oferta-curso',
  templateUrl: './oferta-curso.component.html',
  styles: [
  ]
})
export class OfertaCursoComponent implements OnInit {

  public datos: any = [];
  public cargando: boolean = true;

  constructor(private ofertaCursoService: OfertaCursoService,private router: Router) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.ofertaCursoService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  abrirCrear() {
    this.router.navigate(['dashboard/datos-oferta']);
  }


  abrirActualizar( fila: any ) {
    this.router.navigate(['dashboard/datos-oferta/'+fila.ID_OFERT]);
  }

  abrirHorario( fila: any ) {
    this.router.navigate(['dashboard/horario-oferta/'+fila.ID_OFERT]);
  }
  
  abrirMaterial( fila: any ) {
    this.router.navigate(['dashboard/material-oferta/'+fila.ID_OFERT]);
  }


  abrirInscritos( fila: any ) {
    this.router.navigate(['dashboard/inscritos-oferta/'+fila.ID_OFERT]);
  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.ofertaCursoService.eliminar( fila.ID_OFERT )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_INSTI, 'success' );
        });

  }

}
