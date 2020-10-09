import { InstitucionService } from './../../../services/institucion.service';
import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileUploadService } from '../../../services/file-upload.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-datos-institucion',
  templateUrl: './datos-institucion.component.html',
  styles: [
  ]
})
export class DatosInstitucionComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    ID_INSTI: ['-1'],
    NOMBRE_INSTI: ['', [Validators.required]],
    TELEFONO_INSTI: ['', [Validators.required]],
    DIRECCION_INSTI: ['', [Validators.required]],
    CORREO_INSTI: ['', [Validators.required]],
    LOGO_INSTI: ['no-img.jpg', [Validators.required]],
  });
  public imagenSubir: File;
  public imgTemp: any = null;
  public cargando: boolean = false;
  public seleccionado: string = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private institucionService: InstitucionService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    if (this.seleccionado) {
      this.cargando = true;
      this.institucionService.getPorCodigo(this.seleccionado).subscribe(resp => {
        const respuest: any = resp;
        this.form.patchValue(respuest.datos);
        this.cargando = false;
      });
    }
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    this.subirImagen();
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir)
      .then(img => {
        this.form.controls.LOGO_INSTI.setValue(img);
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }


  public guardar() {
    //console.log( this.form.value );
    if (this.form.invalid) {
      return;
    }

    if (this.form.controls.ID_INSTI.value === '-1') {
      // Realizar el posteo
      this.cargando = true;
      this.institucionService.crear(this.form.value)
        .subscribe(resp => {
          // Navegar
          Swal.fire('Creado', this.form.controls.NOMBRE_INSTI.value, 'success');
          this.cargando = false;
          this.router.navigateByUrl('dashboard/institucion');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }
    else {
      this.cargando = true;
      this.institucionService.actualizar(this.seleccionado, this.form.value)
        .subscribe(resp => {
          // Navegar
          Swal.fire('Actualizado', this.form.controls.NOMBRE_INSTI.value, 'success');
          this.cargando = false;
          this.router.navigateByUrl('dashboard/institucion');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }

  }


  get imagenUrl() {
    let img = this.form.controls.LOGO_INSTI.value;
    if (!img) {
      return `${environment.api_rest}/upload/no-img.jpg`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${environment.api_rest}/upload/${img}`;
    } else {
      return `${environment.api_rest}/upload/no-img.jpg`;
    }
  }

}
