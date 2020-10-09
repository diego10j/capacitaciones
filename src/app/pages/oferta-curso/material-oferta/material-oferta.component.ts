import { environment } from './../../../../environments/environment';
import { OfertaCursoService } from './../../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HorarioCursoService } from '../../../services/horario-curso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MaterialCursoService } from '../../../services/material-curso.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FileUploadService } from '../../../services/file-upload.service';


@Component({
  selector: 'app-material-oferta',
  templateUrl: './material-oferta.component.html',
  styles: [
  ]
})
export class MaterialOfertaComponent implements OnInit {
  public datos: any = [];
  public datosOferta: any;
  public cargando: boolean = true;
  public ofertaSeleccionado = '-1';
  public nombreArchivo: string;
  public fechaActual: Date = new Date();
  public archivoSubir: File;

  constructor(
    private fileUploadService: FileUploadService,
    private materialCursoService: MaterialCursoService,
    private ofertaCursoService: OfertaCursoService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {

    this.cargando = true;
    this.route.params.subscribe((params: Params) => this.ofertaSeleccionado = params.id);
    this.listar();

    this.ofertaCursoService.getBusquedaCodigo(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      this.datosOferta = respuest.datos;
      this.cargando = false;
    });

  }

  listar() {
    this.cargando = true;
    this.materialCursoService.listar(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.datos = respuest.datos;
        this.cargando = false;
      }
      else {
        this.datos = [];
      }
    });
  }

  eliminar(fila: any) {
    this.cargando = true;
    this.materialCursoService.eliminar(fila.ID_MATER)
      .subscribe(resp => {
        this.cargando = false;
        this.listar();
        Swal.fire('Borrado', '', 'success');
      });
  }

  descargar(fila: any) {
    const nom=fila.ARCHIVOS_MATER;
    const archivo=`${environment.api_rest}/upload/${nom}`;
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = archivo;
    a.download = nom;
    a.target='_blank';
    a.click();
  }


  guardar() {

    this.cargando = true;

    const campos = {
      ID_OFERT: this.ofertaSeleccionado,
      ARCHIVOS_MATER: this.nombreArchivo,
      FECHA_MATER: this.fechaActual.toISOString().slice(0, 10),
      NOMBRE_ORIG_MATER: this.archivoSubir.name
    }

    this.materialCursoService.crear(campos)
      .subscribe(resp => {
        this.listar();
        this.cargando = false;
        this.archivoSubir=null;
        Swal.fire('Creado', '', 'success');
      });
  }

  subirArchivo() {
    this.fileUploadService
      .subirArchivo(this.archivoSubir)
      .then(arch => {
        this.nombreArchivo = arch;
        this.guardar();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir el archivo', 'error');
      });
  }

  seleccionarArchivo(file: File) {
    this.archivoSubir = file;
  }


}
