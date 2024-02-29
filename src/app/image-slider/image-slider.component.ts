import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ImageSliderComponent implements OnInit {
  images: string[] = [
    'assets/depositphotos_179052444-stock-photo-spain-valdovino-starry-sky-milky.jpg',
    'assets/pexels-james-wheeler-414612.jpg',
    'assets/tree-1866602_640.jpg',
  ];
  currentIndex: number = 0;
  currentImage: string = 'assets/depositphotos_179052444-stock-photo-spain-valdovino-starry-sky-milky.jpg';
  slideshowPlaying: boolean = false;
  slideshowInterval: any;

  constructor() {}

  ngOnInit() {
    this.startSlider();
  }

  startSlider() {
    this.slideshowInterval = setInterval(() => {
      this.currentImage = this.images[this.currentIndex];
      this.currentIndex =
        this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    }, 3000);
  }

  stopSlider() {
    clearInterval(this.slideshowInterval);
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }

  playSlideshow() {
    this.startSlider();
    this.slideshowPlaying = true;
  }

  stopSlideshow() {
    this.stopSlider();
    this.slideshowPlaying = false;
  }
}
