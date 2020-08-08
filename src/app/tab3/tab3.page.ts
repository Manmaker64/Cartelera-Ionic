import { Component } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public peliculas: PeliculaDetalle[];
  public generos: Genre[];
  public favoritoGenero: any[];

  constructor( private datalocalService: DataLocalService,
               private moviesService: MoviesService ) {
    this.peliculas = [];
    this.generos = [];
    this.favoritoGenero = [];
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.peliculas = await this.datalocalService.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.peliculasPorGenero( this.generos, this.peliculas );
  }

  peliculasPorGenero( generos: Genre[], peliculas: PeliculaDetalle[] ) {
    this.favoritoGenero = [];

    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id );
        })
      });
    });
  }
}
