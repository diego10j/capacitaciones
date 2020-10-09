import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LugarService } from '../../services/lugar.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styles: [
  ]
})
export class LugarComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;
  public busqueda: string = '';
  constructor(private lugarService: LugarService) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.lugarService.listar().subscribe(resp => {
      this.cargando = false;
      const respuest: any = resp;
      this.datos = respuest.datos;
    })

  }


  async abrirCrearSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Lugar de Capacitación',
      text: 'Ingrese el nombre del nuevo Lugar',
      input: 'text',
      inputPlaceholder: 'Nombre del Lugar',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      const campos = { NOMBRE_LUGAR: value };
      this.lugarService.crear(campos)
        .subscribe((resp: any) => {
          this.listar();
        })
    }
  }


  actualizar(fila: any) {
    this.cargando = true;
    this.lugarService.actualizar(fila.ID_LUGAR, fila)
      .subscribe(resp => {
        this.cargando = false;
        Swal.fire('Actualizado', fila.NOMBRE_LUGAR, 'success');
      });

  }

  eliminar(fila: any) {
    this.cargando = true;
    this.lugarService.eliminar(fila.ID_LUGAR)
      .subscribe(resp => {
        this.cargando = false;
        this.listar();
        Swal.fire('Borrado', fila.NOMBRE_LUGAR, 'success');
      });

  }

}
