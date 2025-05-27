import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../global/header/header.component';
import { FooterComponent } from '../../global/footer/footer.component';

@Component({
  selector: 'app-gallery',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  modalOpen: boolean = false;
  modals: string[][] = [
    [
      'shot del mundo de abju',
      '"el mundo de abju" fue un videojuego desarrollado en 2014 para el concurso nacional del prototipos de la Secretaría de Educación Pública',
      '/images/archive/abju_shot.jfif',
    ],
    [
      'animación cuadro por cuadro',
      'animación realizada en adobe flash',
      '/images/archive/me_gif.webp',
    ],
    [
      'en vivo y en directo',
      'fotografía tomada durante un concierto en vivo',
      '/images/archive/DSC_0719.jpg',
    ],
    [
      'aperturando el concierto',
      'fotografía tomada durante un concierto que tuve la oportunidad de aperturar',
      '/images/archive/DSC_0758.jpg',
    ],
    [
      'entre la maleza',
      'una de las fotografías tomadas durante el rodaje del video "porno" del album "Jesús Arían" de Dari Alecio',
      '/images/archive/IMG_9031.JPG',
    ],
    [
      'diseño de fuente tipográfica',
      'fuente tipográfica diseñada para un proyecto cancelado',
      '/images/archive/font-des.jpg',
    ],
    [
      'mirando al horizonte',
      'una de las fotografías tomadas durante el rodaje del video "porno" del album "Jesús Arían" de Dari Alecio',
      '/images/archive/me.JPG',
    ],
    [
      'un par de amigos',
      'diseño de personajes para un proyecto de animación',
      '/images/archive/adellupov.jpg',
    ],
    [
      'cuadricartoon',
      'cuadricartoon fue un proyecto de animación realizado de 2011 a 2015 y contaba con una página web que me encargué de diseñar y programar',
      '/images/archive/cuadricartoon.png',
    ],
    [
      'a todo pulmón',
      'fotorgrafía tomada durante un concierto',
      '/images/archive/DSC_0754.jpg',
    ],
    [
      'en el gusaneo',
      'fotografía tomada durante un concierto realizado a inicios de 2025',
      '/images/archive/gusaneo_0.png',
    ],
    [
      'animación de personaje',
      'screenshot de una animación de personaje para un corto de cuadricartoon',
      '/images/archive/animation.png',
    ],
  ];
  current_modal: string[] = ['', '', ''];

  ngOnInit(): void {
    console.log(this.modalOpen);
  }

  openModal(indice: number): void {
    this.modalOpen = true;
    this.current_modal = this.modals[indice];
    console.log(this.modals[indice]);
  }

  closeModal(): void {
    this.modalOpen = false;
  }
}
