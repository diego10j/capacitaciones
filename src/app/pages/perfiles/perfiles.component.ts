import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PerfilService } from '../../services/perfil.service';
@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styles: [
  ]
})
export class PerfilesComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private perfilService: PerfilService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.perfilService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Perfil',
      text: 'Ingrese el nombre del nuevo Perfil',
      input: 'text',
      inputPlaceholder: 'Nombre del Perfil',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      const campos = { NOMBRE_PER : value, ACTIVO_PER: 1};
      this.perfilService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        })
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    if(fila.ACTIVO_PER){
      fila.ACTIVO_PER=1;
    }
    else{
      fila.ACTIVO_PER=0;
    }
    this.perfilService.actualizar( fila.ID_PER, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_PER, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.perfilService.eliminar( fila.ID_PER )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_PER, 'success' );
        });

  }

}
