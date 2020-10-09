import { OfertaCursoService } from './../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styles: [
  ]
})
export class EvaluacionComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;


  constructor(
    private ofertaCursoService: OfertaCursoService,private router: Router) {
  }


  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.cargando = true;
    this.ofertaCursoService.getCursosCapacitador(localStorage.getItem('ID_USU')).subscribe(resp => {
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

abrirAsistencia(fila){
  this.router.navigate(['dashboard/asistencia/'+fila.ID_OFERT]);
}



}
