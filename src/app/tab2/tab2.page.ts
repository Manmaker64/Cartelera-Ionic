import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public textoBuscar: string;
  public peliculas: Pelicula[];
  public buscando: boolean;
  public sugerencias: string[];

  constructor( private moviesServices: MoviesService,
               private modalCtrl: ModalController ) {
    this.textoBuscar = '';
    this.peliculas = [];
    this.buscando = false;
    this.sugerencias = [
      'Spiderman',
      'Superman',
      'Avengers',
      'Batman',
      'El señor de los anillos',
      'La vida es bella'
    ];
  }

  buscar( evento: any ) {
    const valor: string = evento.detail.value;
    if ( valor.length === 0 ) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesServices.buscarPeliculas( valor )
                       .subscribe( resp => {
                          this.peliculas = resp.results;
                          this.buscando = false;
                       });
  }

  async detalle( id: number ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
