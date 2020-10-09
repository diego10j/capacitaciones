import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CursosService } from '../../services/cursos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: [
  ]
})
export class CursosComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private cursosService: CursosService,private router: Router) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.cursosService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  abrirCrear() {
    this.router.navigate(['dashboard/datos-curso']);
  }


  abrirActualizar( fila: any ) {
    this.router.navigate(['dashboard/datos-curso/'+fila.ID_CURSO]);
  }



  eliminar( fila: any ) {
    this.cargando = true;
    this.cursosService.eliminar( fila.ID_CURSO )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_CURSO, 'success' );
        });

  }

}
