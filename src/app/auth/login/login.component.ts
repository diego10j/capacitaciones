import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { SeguridadService } from '../../services/seguridad.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    identificacion: [localStorage.getItem('identificacion') || '', [Validators.required]],
    clave: ['', Validators.required],
    recordar: [false]
  });

  constructor(private router: Router,
    private fb: FormBuilder, private seguridadService: SeguridadService,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }


  login() {

    this.seguridadService.validarLogin(this.loginForm.value)
      .subscribe(resp => {
  
          if (this.loginForm.get('recordar').value) {
            localStorage.setItem('identificacion', this.loginForm.get('identificacion').value);
          } else {
            localStorage.removeItem('identificacion');
          }
          // Navegar al Dashboard
          this.router.navigateByUrl('/');

       
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.mensaje, 'error');
      });

  }





  attachSignin(element) {


  }

}
