import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform( peliculas: PeliculaDetalle[] ): PeliculaDetalle[] {
    // Filtra las películas que tienen imágenes
    return peliculas.filter( peli => peli.backdrop_path );
  }
}
