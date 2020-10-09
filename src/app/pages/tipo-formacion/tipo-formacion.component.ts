import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoFormacionService } from '../../services/tipo-formacion.service';
@Component({
  selector: 'app-tipo-formacion',
  templateUrl: './tipo-formacion.component.html',
  styles: [
  ]
})
export class TipoFormacionComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private tipoFormacionService: TipoFormacionService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.tipoFormacionService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Tipo de Formación',
      text: 'Ingrese el nombre del nuevo Tipo de Formación',
      input: 'text',
      inputPlaceholder: 'Nombre del Tipo de Formación',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      const campos = { NOMBRE_FORMA : value};
      this.tipoFormacionService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        })
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    this.tipoFormacionService.actualizar( fila.ID_FORMA, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_FORMA, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.tipoFormacionService.eliminar( fila.ID_FORMA )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_FORMA, 'success' );
        });

  }

}
