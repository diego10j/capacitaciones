import { OfertaCursoService } from './../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../services/areas.service';
import { TipoFormacionService } from '../../services/tipo-formacion.service';
import { ModalidadService } from '../../services/modalidad.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-busqueda-cursos',
  templateUrl: './busqueda-cursos.component.html',
  styleUrls: [ ]
})
export class BusquedaCursosComponent implements OnInit {

  public datos: any = [];
  public cargando: boolean = true;
  public comboAreas: any = [];
  public comboFormacion: any = [];
  public comboModalidad: any = [];

  public areaSeleccionada: any;
  public formacionSeleccionada: any;
  public modalidadSeleccionada: any;


  constructor(private ofertaCursoService: OfertaCursoService,
    private areasService: AreasService,
    private tipoFormacionService: TipoFormacionService,
    private modalidadService: ModalidadService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    const campos :any={};
    if(this.modalidadSeleccionada){
      if(this.modalidadSeleccionada.join()){
        campos.ID_MODAL= this.modalidadSeleccionada.join();
      }
     
    }
    if(this.areaSeleccionada){
      if(this.areaSeleccionada.join()){
        campos.D_FORMA=this.areaSeleccionada.join();
      }
     
    }
    if(this.formacionSeleccionada){
      if(this.formacionSeleccionada.join()){
        campos.ID_AREA= this.formacionSeleccionada.join();
      }
      
    }

    this.cargando = true;
    this.ofertaCursoService.listarFiltro(campos).subscribe(resp => {
      const respuest: any = resp;
      this.datos = respuest.datos;
    });

    this.modalidadService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboModalidad = respuest.datos;
    });

    this.tipoFormacionService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboFormacion = respuest.datos;
    });
    this.areasService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboAreas = respuest.datos;
      this.cargando = false;
    });

  }

  abrirInscripcion( fila: any ) {
    this.router.navigate(['dashboard/inscripcion/'+fila.ID_OFERT]);
  }



}
