import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public peliculasRecientes: Pelicula[];
  public peliculasPopulares: Pelicula[];
  public existePelicula: boolean;

  constructor( private moviesServices: MoviesService ) {
    this.peliculasRecientes = [];
    this.peliculasPopulares = [];
    this.existePelicula = false;
  }

  ngOnInit() {
    this.obtenerCartelera();
    this.obtenerPopulares();
  }

  cargarMas() {
    this.obtenerPopulares();
  }

  obtenerPopulares() {
    this.moviesServices.getPopulares()
                       .subscribe( resp => {
                          // Concateno el array de películasPopulares con el array de la respuesta
                          if ( resp.results ) {
                            this.existePelicula = true;
                            const arrayTemp = [ ...this.peliculasPopulares, ...resp.results ];
                            this.peliculasPopulares = arrayTemp;
                          }
                       });
  }

  obtenerCartelera() {
    this.moviesServices.getCartelera()
                       .subscribe( resp => this.peliculasRecientes = resp.results );
  }
}
