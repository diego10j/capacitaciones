import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  public datos: any = [];
  public cargando: boolean = true;
  public busqueda:string='';
  constructor(private usuarioService: UsuarioService,private router: Router,) { }
  ngOnInit(): void {
    this.listar();
  }

  listar() {

    this.cargando = true;
    this.usuarioService.listar().subscribe(resp => {
          this.cargando = false;
          const respuest: any=resp;
          this.datos = respuest.datos;
        })

  }


  abrirCrear() {
    this.router.navigate(['dashboard/datos-usuario']);
  }


  abrirActualizar( fila: any ) {
    this.router.navigate(['dashboard/datos-usuario/'+fila.ID_USU]);
  }

  eliminar( fila: any ) {
    this.cargando = true;
    this.usuarioService.eliminar( fila.ID_USU )
        .subscribe( resp => {
          this.cargando = false;
          this.listar();
          Swal.fire( 'Borrado', fila.APELLIDOS_USU + ' '+ fila.NOMBRES_USU, 'success' );
        });

  }

}
