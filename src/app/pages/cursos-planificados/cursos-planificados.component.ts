import { OfertaCursoService } from './../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cursos-planificados',
  templateUrl: './cursos-planificados.component.html',
  styles: [
  ]
})
export class CursosPlanificadosComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;

  constructor(private ofertaCursoService: OfertaCursoService,private router: Router) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.ofertaCursoService.getCursosProgramados().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


 

  abrirInscripcion( fila: any ) {
    this.router.navigate(['dashboard/inscripcion/'+fila.ID_OFERT]);
  }


 
 

}
