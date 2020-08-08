import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private peliculas: PeliculaDetalle[];

  constructor( private storage: Storage,
               private toastCtrl: ToastController ) {
    this.peliculas = [];
    this.cargarFavoritos();
  }

  async presentToast( mensaje: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {
    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Borrada de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast( mensaje );
    this.storage.set( 'peliculas', this.peliculas );
  }

  async cargarFavoritos() {
    const peliculas: PeliculaDetalle[] = await this.storage.get( 'peliculas' );
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id: number ) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );
    // Devuelve un true o un false si existe contiene datos o no
    return ( existe ) ? true : false;
  }
}
