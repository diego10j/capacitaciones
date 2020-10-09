import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    ID_USU: [''],
    ID_PER: ['3'],
    IDENTIFICACION_USU: ['', Validators.required],
    NOMBRES_USU: ['', Validators.required],
    APELLIDOS_USU: ['', Validators.required],
    FECHANAC_USU: ['', Validators.required],
    GENERO_USU: ['M', Validators.required],
    CELULAR_USU: ['', Validators.required],
    CONVENCIONAL_USU: [''],
    CORREO_USU: ['', [Validators.required, Validators.email]],
    CLAVE_USU: ['',],
    CLAVE_USU2: ['',],
    terminos: [true,],
    FOTO_USU: ['no-img.jpg'],
    ACTIVO_USU: [1],
  }, {
    validators: this.passwordsIguales('CLAVE_USU', 'CLAVE_USU2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  crearUsuario() {
    this.formSubmitted = true;
    //console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crear( this.registerForm.value )
        .subscribe( resp => {
          
          // Navegar al Dashboard
          Swal.fire( 'Creación', 'Usuario registrado exitosamente', 'success' );
          this.router.navigateByUrl('/login');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });


  }

  campoNoValido( campo: string ): boolean {
    
    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('clave_usu').value;
    const pass2 = this.registerForm.get('clave_usu2').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }


    }
  }

}
