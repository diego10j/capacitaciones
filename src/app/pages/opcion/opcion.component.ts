import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OpcionService } from '../../services/opcion.service';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styles: [
  ]
})
export class OpcionComponent implements OnInit {
  public datos: any = [];
  public comboPadres: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private opcionService: OpcionService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.cargando = true;
    this.opcionService.listar().subscribe(resp => {
          const respuest: any=resp;
          this.datos = respuest.datos;
        });

        this.opcionService.getComboPadres().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.comboPadres = respuest.datos;
        });    
  }


  async abrirCrearSweetAlert() {

    let combo='<select id="OP_IDE_OPCIO" class="swal2-input">'; // 
    combo = combo + ' <option disabled" >  Selecione el Menú </option>';
    for (const item of this.comboPadres) {
      combo = combo + ' <option value="'+item.ID_OPCIO + '" >  '+ item.NOMBRE_OPCIO +' </option>';
      
    }
    combo=combo+'</select>';

    const { value: formValues } = await Swal.fire({
      title: 'Opción',
      text: 'Ingrese los datos de la Nueva Opción',
     
      html:
    '<input id="NOMBRE_OPCIO" class="swal2-input" placeholder="NOMBRE" required>' +
    '<input id="URL_OPCIO" class="swal2-input" placeholder="URL" required>' + combo
    ,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (document.getElementById('NOMBRE_OPCIO') as HTMLInputElement).value,
          (document.getElementById('URL_OPCIO') as HTMLInputElement).value,
          (document.getElementById('OP_IDE_OPCIO') as HTMLInputElement).value,
        ]
      }
    });
    
    if (formValues) {
      this.cargando = true;
      const campos = { 
        NOMBRE_OPCIO : formValues[0],
        URL_OPCIO : formValues[1],
        ORDEN_OPCIO:null,
        ICONO_OPCIO:null,
        OP_ID_OPCIO : formValues[2],
      };
      this.opcionService.crear( campos )
        .subscribe( (resp: any) => {
          this.listar();
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });
    }
  }


  actualizar( fila: any ) {
    this.cargando = true;
    this.opcionService.actualizar( fila.ID_OPCIO, fila )
        .subscribe( resp => {
          this.cargando = false;
          Swal.fire( 'Actualizado', fila.NOMBRE_OPCIO, 'success' );
        });

  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.opcionService.eliminar( fila.ID_OPCIO )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.NOMBRE_OPCIO, 'success' );
        });

  }

}
