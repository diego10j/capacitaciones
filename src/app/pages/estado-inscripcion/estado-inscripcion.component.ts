import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EstadoInscripcionService } from '../../services/estado-inscripcion.service';
@Component({
  selector: 'app-estado-inscripcion',
  templateUrl: './estado-inscripcion.component.html',
  styles: [
  ]
})
export class EstadoInscripcionComponent implements OnInit {

  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private estadoInscripcionService: EstadoInscripcionService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.estadoInscripcionService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Estado de Inscripción',
      text: 'Ingrese el nombre del nuevo Estado de Inscripción',
      input: 'text',
      inputPlaceholder: 'Nombre del Estado de Inscripción',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      const campos = { NOMBRE_ESTINS : value};
      this.estadoInscripcionService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        });
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    this.estadoInscripcionService.actualizar( fila.ID_ESTINS, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_ESTINS, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.estadoInscripcionService.eliminar( fila.ID_ESTINS )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_ESTINS, 'success' );
        });

  }

}
