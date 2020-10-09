import { TipoCursoService } from './../../services/tipo-curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-curso',
  templateUrl: './tipo-curso.component.html',
  styles: [
  ]
})
export class TipoCursoComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private tipoCursoService: TipoCursoService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.tipoCursoService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Tipo de Curso',
      text: 'Ingrese el nombre del nuevo Tipo de Curso',
      input: 'text',
      inputPlaceholder: 'Nombre del Tipo de Curso',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      const campos = { NOMBRE_TIPOC : value};
      this.tipoCursoService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        })
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    this.tipoCursoService.actualizar( fila.ID_TIPOC, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_TIPOC, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.tipoCursoService.eliminar( fila.ID_TIPOC )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_TIPOC, 'success' );
        });

  }

}
