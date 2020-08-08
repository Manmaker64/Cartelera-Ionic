import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, PeliculaCreditos, Generos, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage: number;
  private generos: Genre[];

  constructor( private http: HttpClient ) {
    this.popularesPage = 0;
    this.generos = [];
  }

  private ejecutarQuery<T>( query: string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

    return this.http.get<T>( query );
  }

  getPopulares() {
    // Cada vez que se llame incrementa en uno la página
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.ejecutarQuery<RespuestaMDB>( query );
  }

  getCartelera() {
    const hoy = new Date();
    // Indica el día anterior al mes siguiente
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString: any;

    if ( mes < 10 ) {
      // Concateno un 0
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?&primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getDetalle( id: number ) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActores( id: number ) {
    return this.ejecutarQuery<PeliculaCreditos>(`/movie/${ id }/credits?a=1`);
  }

  buscarPeliculas( texto: string ) {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${ texto }`);
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.ejecutarQuery<Generos>('/genre/movie/list?a=1')
          .subscribe( resp => {
            this.generos = resp.genres;
            resolve( this.generos );
          });
    });
  }
}
