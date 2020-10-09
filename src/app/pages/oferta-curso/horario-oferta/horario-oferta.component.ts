import { OfertaCursoService } from './../../../services/oferta-curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HorarioCursoService } from '../../../services/horario-curso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-horario-oferta',
  templateUrl: './horario-oferta.component.html',
  styles: [
  ]
})
export class HorarioOfertaComponent implements OnInit {
  public datos: any = [];
  public datosOferta: any;
  public cargando: boolean = true;
  public ofertaSeleccionado = '-1';

  public fechaActual: Date = new Date();
  public es: any;

  displayModal: boolean;

  public form: FormGroup = this.fb.group({
    ID_HORAR: ['-1'],
    ID_OFERT: ['', [Validators.required]],
    FECHAC_HORAR: ['', [Validators.required]],
    HORARIOI_HORAR: ['', [Validators.required]],
    HORARIOF_HORAR: ['', [Validators.required]],
  });

  showModalDialog() {
    this.displayModal = true;
  }

  constructor(private fb: FormBuilder,
    private horarioCursoService: HorarioCursoService,
    private ofertaCursoService: OfertaCursoService, private route: ActivatedRoute) {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }


  ngOnInit(): void {

    this.cargando = true;
    this.route.params.subscribe((params: Params) => this.ofertaSeleccionado = params.id);
    this.listar();
    this.form.controls.ID_OFERT.setValue(this.ofertaSeleccionado);

  
      this.ofertaCursoService.getBusquedaCodigo(this.ofertaSeleccionado).subscribe(resp => {
        const respuest: any = resp;
        this.datosOferta = respuest.datos;
        this.cargando = false;
      });
    
    
  }

  listar() {
    this.cargando = true;
    this.horarioCursoService.listar(this.ofertaSeleccionado).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.datos = respuest.datos;
      }
      else {
        this.datos = [];

      }
      this.cargando = false;
    });
  }

  eliminar(fila: any) {
    this.cargando = true;
    this.horarioCursoService.eliminar(fila.ID_HORAR)
      .subscribe(resp => {
        this.cargando = false;
        this.listar();
        Swal.fire('Borrado', '', 'success');
      });
  }



  actualizar(fila: any) {
    this.cargando = true;
    fila.FECHAC_HORAR = fila.FECHAC_HORAR.toISOString().slice(0, 10);
    this.horarioCursoService.actualizar(fila.ID_HORAR, fila)
      .subscribe(resp => {
        this.cargando = false;
        Swal.fire('Actualizado', '', 'success');
      });

  }

  guardarHorario() {
    this.displayModal = false;
    this.cargando = true;
    this.form.controls.FECHAC_HORAR.setValue(this.form.controls.FECHAC_HORAR.value.toISOString().slice(0, 10));
    this.horarioCursoService.crear(this.form.value)
      .subscribe(resp => {
        this.listar();
        this.cargando = false;
        Swal.fire('Creado', '', 'success');

      });


  }

}
