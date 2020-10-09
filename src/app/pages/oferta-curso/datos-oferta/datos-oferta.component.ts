import { UsuarioService } from './../../../services/usuario.service';
import { CursosService } from './../../../services/cursos.service';
import { TipoCursoService } from './../../../services/tipo-curso.service';
import { OfertaCursoService } from './../../../services/oferta-curso.service';
import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LugarService } from '../../../services/lugar.service';
import { ModalidadService } from '../../../services/modalidad.service';
import { EstadoOfertaService } from '../../../services/estado-oferta.service';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-datos-oferta',
  templateUrl: './datos-oferta.component.html',
  styles: [
  ],
  providers: [DatePipe]
})
export class DatosOfertaComponent implements OnInit {

  
  public form: FormGroup = this.fb.group({
    ID_OFERT: ['-1'],
    ID_TIPOC: ['', [Validators.required]],
    ID_LUGAR: ['', [Validators.required]],
    ID_MODAL: ['', [Validators.required]],
    ID_ESTOFE: ['', [Validators.required]],
    ID_CURSO: ['', [Validators.required]],
    ID_USU: ['', [Validators.required]],
    FECHAI_OFERT: ['', [Validators.required]],
    FECHAF_OFERT: ['', [Validators.required]],
    CUPOS_OFERT: ['', [Validators.required]],
    FECHA_MAX_OFERT: ['', [Validators.required]],
    NUMEROH_OFERT: ['', [Validators.required]],
    URL_OFERT: [''],
  });

  public cargando: boolean = false;
  public seleccionado: string = null;

  public comboTipoCurso: SelectItem[];
  public comboLugar:  SelectItem[];
  public comboModalidad: SelectItem[];
  public comboEstadoOferta: SelectItem[];
  public comboCurso: SelectItem[];
  public comboUsuario: SelectItem[];

  public fechaActual: Date= new Date();
  public es: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private ofertaCursoService: OfertaCursoService,
    private tipoCursoService: TipoCursoService,
    private lugarService: LugarService,
    private modalidadService: ModalidadService,
    private estadoOfertaService: EstadoOfertaService,
    private cursosService: CursosService,
    private usuarioService: UsuarioService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }
  //let date2 = new Date().toISOString().slice(0,10); 
  //console.log(date2);
    this.cargando = true;
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    if (this.seleccionado) {
      this.ofertaCursoService.getPorCodigo(this.seleccionado).subscribe(resp => {
        const respuest: any = resp;
        this.form.patchValue(respuest.datos);
        this.cargando = false;
      });
    }

    //combos
    this.cargando = true;
    this.tipoCursoService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboTipoCurso = respuest.datos;
    });

    this.lugarService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboLugar = respuest.datos;
    });

    this.modalidadService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboModalidad = respuest.datos;
    });

    this.estadoOfertaService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboEstadoOferta = respuest.datos;
    });

    this.cursosService.getCombo().subscribe(resp => {
      const respuest: any = resp;
      this.comboCurso = respuest.datos;
    });

    this.usuarioService.getComboCapacitadores().subscribe(resp => {
      const respuest: any = resp;
      this.comboUsuario = respuest.datos;
      this.cargando = false;
    });


  }





  public guardar() {
    //console.log( this.form.value );
    if (this.form.invalid) {
      return;
    }

    if (this.form.controls.ID_OFERT.value === '-1') {
      // Realizar el posteo

      this.form.controls.FECHAI_OFERT.setValue(this.form.controls.FECHAI_OFERT.value.toISOString().slice(0,10));
      this.form.controls.FECHAF_OFERT.setValue(this.form.controls.FECHAF_OFERT.value.toISOString().slice(0,10));
      this.form.controls.FECHA_MAX_OFERT.setValue(this.form.controls.FECHA_MAX_OFERT.value.toISOString().slice(0,10));
      this.cargando = true;
      this.ofertaCursoService.crear(this.form.value)
        .subscribe(resp => {
          // Navegar
          Swal.fire('Creado', '', 'success');
          this.cargando = false;
          this.router.navigateByUrl('dashboard/oferta-curso');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }
    else {
      this.cargando = true;
      this.ofertaCursoService.actualizar(this.seleccionado, this.form.value)
        .subscribe(resp => {
          // Navegar
          Swal.fire('Actualizado', '', 'success');
          this.cargando = false;
          this.router.navigateByUrl('dashboard/oferta-curso');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          this.cargando = false;
        });
    }

  }


}
















