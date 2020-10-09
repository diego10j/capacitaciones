import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CursosService } from '../../../services/cursos.service';
import { AreasService } from '../../../services/areas.service';
import { TipoFormacionService } from '../../../services/tipo-formacion.service';
import { FileUploadService } from '../../../services/file-upload.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-datos-curso',
  templateUrl: './datos-curso.component.html',
  styles: [
  ]
})
export class DatosCursoComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    ID_CURSO: ['-1'],
    ID_FORMA: ['', [Validators.required]],
    ID_AREA: ['', [Validators.required]],
    NOMBRE_CURSO: ['', [Validators.required]],
    DESCRIPCION_CURSO: ['', [Validators.required]],
    FOTO_CURSO: ['no-img.jpg', [Validators.required]],
    ACTIVO_CURSO: ['1'],
  });
  public imagenSubir: File;
  public imgTemp: any = null;
  public cargando: boolean = false;
  public comboAreas: any = [];
  public comboFormacion: any = [];
  public seleccionado: string = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private cursosService: CursosService,
    private areasService: AreasService,
    private tipoFormacionService: TipoFormacionService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    if (this.seleccionado) {
      this.cursosService.getPorCodigo(this.seleccionado).subscribe(resp => {
        const respuest: any = resp;
        this.form.patchValue(respuest.datos);
      });
    }

    this.tipoFormacionService.listar().subscribe(resp => {
      const respuest: any = resp;
      this.comboFormacion = respuest.datos;
    });
    this.areasService.listar().subscribe(resp => {
      const respuest: any = resp;
      this.comboAreas = respuest.datos;
      this.cargando = false;
    });
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
        this.form.controls.FOTO_CURSO.setValue(img);
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

    if (this.form.controls.ID_CURSO.value === '-1') {
      // Realizar el posteo
      this.cargando = true;
      this.cursosService.crear(this.form.value)
        .subscribe(resp => {
          // Navegar
          Swal.fire( 'Creado', this.form.controls.NOMBRE_CURSO.value, 'success' );
          this.cargando = false;
          this.router.navigateByUrl('dashboard/cursos');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }
    else {
      this.cargando = true;
      this.cursosService.actualizar(this.seleccionado, this.form.value)
        .subscribe(resp => {
          // Navegar
          Swal.fire( 'Actualizado', this.form.controls.NOMBRE_CURSO.value, 'success' );
          this.cargando = false;
          this.router.navigateByUrl('dashboard/cursos');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }

  }


  get imagenUrl() {
    let img = this.form.controls.FOTO_CURSO.value;
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
