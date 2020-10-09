import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilService } from '../../../services/perfil.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styles: [
  ]
})
export class DatosUsuarioComponent implements OnInit {


  public formSubmitted = false;
  public cargando: boolean = false;
  public comboPerfiles: any = [];

  public seleccionado: string = null;

  public registerForm = this.fb.group({
    ID_USU: ['-1'],
    ID_PER: [''],
    IDENTIFICACION_USU: ['', Validators.required],
    NOMBRES_USU: ['', Validators.required],
    APELLIDOS_USU: ['', Validators.required],
    FECHANAC_USU: ['', Validators.required],
    GENERO_USU: ['M', Validators.required],
    CELULAR_USU: ['', Validators.required],
    CONVENCIONAL_USU: ['', Validators.required],
    CORREO_USU: ['', [Validators.required, Validators.email]],
    CLAVE_USU: ['',],
    FOTO_USU: ['no-img.jpg'],
    ACTIVO_USU: [true],
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService, private route: ActivatedRoute,
    private router: Router, private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.cargando = true;


    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    if (this.seleccionado) {

      this.usuarioService.getPorCodigo(this.seleccionado).subscribe(resp => {
        const respuest: any = resp;
        this.registerForm.patchValue(respuest.datos);
      });

    }

    this.perfilService.listar().subscribe(resp => {
      const respuest: any = resp;
      this.comboPerfiles = respuest.datos;
      this.cargando = false;
    });

  }


  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public guardarUsuario() {
    this.formSubmitted = true;
    //console.log( this.registerForm.value );
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.controls.ID_USU.value === '-1' ) {
      this.registerForm.controls.ACTIVO_USU.setValue(1);
      //LA CLAVE la primera vez es la cedula
      this.registerForm.controls.CLAVE_USU.setValue(this.registerForm.controls.IDENTIFICACION_USU.value);
      // Realizar el posteo
      this.cargando = true;
      this.usuarioService.crear(this.registerForm.value)
        .subscribe(resp => {
          // Navegar
          this.cargando = false;
          this.router.navigateByUrl('dashboard/usuario');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }
    else {
      this.cargando = true;
      this.registerForm.controls.ACTIVO_USU.setValue(this.registerForm.controls.ACTIVO_USU.value === true ? 1 : 0);
      this.usuarioService.actualizar(this.seleccionado, this.registerForm.value)
        .subscribe(resp => {
          // Navegar
          this.cargando = false;
          this.router.navigateByUrl('dashboard/usuario');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }

  }

}
