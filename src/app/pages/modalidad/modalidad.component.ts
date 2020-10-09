import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalidadService } from '../../services/modalidad.service';

@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styles: [
  ]
})
export class ModalidadComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private modalidadService: ModalidadService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.modalidadService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Modalidad',
      text: 'Ingrese el nombre de la nueva Modalidad',
      input: 'text',
      inputPlaceholder: 'Nombre de la Modalidad',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      const campos = { NOMBRE_MODAL : value};
      this.modalidadService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        });
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    this.modalidadService.actualizar( fila.ID_MODAL, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_MODAL, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.modalidadService.eliminar( fila.ID_MODAL )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_MODAL, 'success' );
        });

  }

}
