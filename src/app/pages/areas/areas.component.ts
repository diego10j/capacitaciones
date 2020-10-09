import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../services/areas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styles: [
  ]
})
export class AreasComponent implements OnInit {

  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';

  constructor(private areaService:AreasService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.areaService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Área',
      text: 'Ingrese el nombre de la nueva área',
      input: 'text',
      inputPlaceholder: 'Nombre del área',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      const campos = { NOMBRE_AREA : value};
      this.areaService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        })
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    this.areaService.actualizar( fila.ID_AREA, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_AREA, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.areaService.eliminar( fila.ID_AREA )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_AREA, 'success' );
        });

  }

}
