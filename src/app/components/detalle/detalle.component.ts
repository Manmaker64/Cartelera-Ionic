import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Actor, Genre, Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: number;

  public peliculaDetalle: PeliculaDetalle;
  public ocultarse: number;
  public actores: Actor[];
  public existe: boolean;
  public generos: Genre[];
  public favoritoGenero: any[];

  slideOptions = {
    slidesPerView: 3.2,
    freeMode: true,
  };

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private datalocalService: DataLocalService ) {
    this.ocultarse = 130;
    this.actores = [];
    this.existe = false;
    this.generos = [];
    this.favoritoGenero = [];
  }

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.existe = await this.datalocalService.existePelicula( this.id );
    this.moviesService.getDetalle( this.id )
                      .subscribe( resp => this.peliculaDetalle = resp );
    this.moviesService.getActores( this.id )
                      .subscribe( resp => this.actores = resp.cast );
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    this.existe = ( this.existe ) ? false : true;
    this.datalocalService.guardarPelicula( this.peliculaDetalle );
  }
}
