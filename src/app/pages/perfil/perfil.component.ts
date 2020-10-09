import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {
    
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });

  }

  actualizarFoto( ) {

    this.cargando = true;
    const campos={
      FOTO_USU:this.usuario.img
    }
     this.usuarioService.actualizarImagen(localStorage.getItem('ID_USU'),campos)
      .subscribe(resp => {
        // Navegar
        this.cargando = false;

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
        this.cargando = false;
      });
   
  }


  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.cargando = true;
    this.fileUploadService
      .actualizarFoto( this.imagenSubir )
      .then( img => {
        this.usuario.img = img;
        this.actualizarFoto();
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

  actualizarPerfil(){
    
  }

}
