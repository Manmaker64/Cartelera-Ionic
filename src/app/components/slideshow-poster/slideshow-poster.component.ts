import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[];
  @Output() load = new EventEmitter<boolean>();

  public slideOptions = {
    slidesPerView: 3.2,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController ) {
    this.peliculas = [];
  }

  ngOnInit() {}

  async verDetalle( id: number ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    // Quita la película de favoritos cuando salimos del modal
    modal.onDidDismiss().then( data => this.load.emit( true ) );
    modal.present();
  }
}
