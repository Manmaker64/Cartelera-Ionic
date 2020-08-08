import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[];
  @Input() existePelicula: boolean;
  @Output() cargarMas = new EventEmitter();

  public slideOptions = {
    slidesPerView: 3.2,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController) {
    this.peliculas = [];
  }

  ngOnInit() { }

  onClick() {
    this.cargarMas.emit();
  }

  async verDetalle( id: number ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
