import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cabeceras',
  templateUrl: './cabeceras.component.html',
  styleUrls: ['./cabeceras.component.scss'],
})
export class CabecerasComponent implements OnInit {

  @Input() titulo: string;
  @Input() tituloPrincipal: string;

  constructor() { }

  ngOnInit() {}
}
