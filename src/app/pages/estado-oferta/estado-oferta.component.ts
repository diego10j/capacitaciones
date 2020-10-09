import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EstadoOfertaService } from '../../services/estado-oferta.service';

@Component({
  selector: 'app-estado-oferta',
  templateUrl: './estado-oferta.component.html',
  styles: [
  ]
})
export class EstadoOfertaComponent implements OnInit {

  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private estadoOfertaService: EstadoOfertaService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.estadoOfertaService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        });

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Estado Oferta Curso',
      text: 'Ingrese el nombre del nueva Estado Oferta Curso',
      input: 'text',
      inputPlaceholder: 'Nombre del Estado de Oferta Curso',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      const campos = { NOMBRE_ESTOFE : value};
      this.estadoOfertaService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        });
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    this.estadoOfertaService.actualizar( fila.ID_ESTOFE, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_ESTOFE, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.estadoOfertaService.eliminar( fila.ID_ESTOFE )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_ESTOFE, 'success' );
        });

  }

}
