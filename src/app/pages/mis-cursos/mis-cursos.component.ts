import { InscripcionService } from './../../services/inscripcion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styles: [
  ]
})
export class MisCursosComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;

  constructor(private inscripcionService: InscripcionService,private router: Router) { }
  
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.inscripcionService.getMisCursos(localStorage.getItem('ID_USU')).subscribe(resp => {
      this.cargando = false;
      const respuest: any = resp;
      this.datos = respuest.datos;
    });

  }


  abrirDetalle( fila: any ) {
    this.router.navigate(['dashboard/detalle-curso/'+fila.ID_OFERT]);
  }


}
