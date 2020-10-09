import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { InstitucionService } from '../../services/institucion.service';
@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styles: [
  ]
})
export class InstitucionComponent implements OnInit {

  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private institucionService: InstitucionService,private router: Router) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.institucionService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  abrirCrear() {
    this.router.navigate(['dashboard/datos-institucion']);
  }


  abrirActualizar( fila: any ) {
    this.router.navigate(['dashboard/datos-institucion/'+fila.ID_INSTI]);
  }



  eliminar( fila: any ) {
    this.cargando = true;
    this.institucionService.eliminar( fila.ID_INSTI )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_INSTI, 'success' );
        });

  }

}
