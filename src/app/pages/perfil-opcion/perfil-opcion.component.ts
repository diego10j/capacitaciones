import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OpcionService } from '../../services/opcion.service';
import { PerfilService } from '../../services/perfil.service';


@Component({
  selector: 'app-perfil-opcion',
  templateUrl: './perfil-opcion.component.html',
  styles: [
  ]
})
export class PerfilOpcionComponent implements OnInit {
  public datos: any = [];
  public comboPerfiles: any = [];
  public comboOpciones: any = [];
  public cargando: boolean = true;
  public busqueda: string = '';
  public perfilSeleccionado = '-1';

  constructor(private opcionService: OpcionService, private perfilService: PerfilService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.cargando = true;

    this.perfilService.getOpcionesPerfil(this.perfilSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if(respuest.datos){
        this.datos = respuest.datos;
      }
      else{
        this.datos = [];
      }  
    });


    this.opcionService.listar().subscribe(resp => {
      const respuest: any = resp;
      this.comboOpciones = respuest.datos;
    });

    this.perfilService.listar().subscribe(resp => {
      this.cargando = false;
      const respuest: any = resp;
      this.comboPerfiles = respuest.datos;
    });

  }


  async abrirCrearSweetAlert() {

    let combo = '<select id="ID_OPCIO" class="swal2-input">'; // 
    combo = combo + ' <option disabled" >  Selecione la Opción </option>';
    for (const item of this.comboOpciones) {
      combo = combo + ' <option value="' + item.ID_OPCIO + '" >  ' + item.NOMBRE_OPCIO + ' </option>';

    }
    combo = combo + '</select>';

    const { value: formValues } = await Swal.fire({
      title: 'Asignar Opción al Perfil',
      text: 'Seleccione la Nueva Opción',

      html: combo
      ,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (document.getElementById('ID_OPCIO') as HTMLInputElement).value
        ];
      }
    });

    if (formValues) {
      this.cargando = true;
      const campos = {
        ID_OPCIO: formValues[0],
        ID_PER: this.perfilSeleccionado,
        ACTIVO_PEROPC: 1
      };
      this.perfilService.crearPermiso(campos)
        .subscribe((resp: any) => {
          this.listar();
        });
    }
  }




  eliminar(fila: any) {
    this.cargando = true;
    this.perfilService.eliminarPermiso(fila.ID_PEROPC)
      .subscribe(resp => {
        this.cargando = false;
        this.listar();
        Swal.fire('Borrado', fila.NOMBRE_OPCIO, 'success');
      });
  }

  seleccionarPerfil() {
    this.cargando = true;
    this.perfilService.getOpcionesPerfil(this.perfilSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if(respuest.datos){
        this.datos = respuest.datos;
      }
      else{
        this.datos = [];
      }   
      this.cargando = false;
    });
  }

}
