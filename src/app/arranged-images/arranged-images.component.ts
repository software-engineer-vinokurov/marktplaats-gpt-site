import { Component, ElementRef, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-arranged-images',
  standalone: true,
  imports: [],
  templateUrl: './arranged-images.component.html',
  styleUrl: './arranged-images.component.css'
})
export class ArrangedImagesComponent {

  static DEFAULT_CENTRAL_IMG_STYLE = `
    left: 100px;
    padding-top: 5vh;
    padding-left: 16vw;
  `;

  @Input("debug") debug: string = "no";

  @Input("left-img-src") leftImgSrc!: string;
  @Input("left-img-alt") leftImgAlt!: string;

  @Input("central-img-src") centralImgSrc?: string;
  @Input("central-img-alt") centralImgAlt?: string;
  @Input("central-img-style") centralImgStyle: string = ArrangedImagesComponent.DEFAULT_CENTRAL_IMG_STYLE;

  @ViewChild('imageContainerId', { static: true }) imageContainerRef!: ElementRef;
  @ViewChild('imageSpacerContainerId', { static: true }) imageSpacerContainerRef!: ElementRef;
  @ViewChild('imageSpacerId', { static: true }) imageSpacerRef!: ElementRef;

  ngOnInit() {
    const imageSpacerContainer = this.imageSpacerContainerRef.nativeElement as HTMLElement;
    const imageContainer = this.imageContainerRef.nativeElement as HTMLElement;
    const imageSpacer = this.imageSpacerRef.nativeElement as HTMLElement;
    imageSpacer.onload = function () {
      translateImages(imageSpacerContainer, imageContainer);
    }

    if (this.debug !== "no") {
      imageSpacerContainer.style.opacity = '0.5';
    }
  }

}

const translateImages = (imageSpacerContainer: HTMLElement, imageContainer: HTMLElement) => {
  // We translate the image-container to the height of the image-spacer-container up
  imageContainer.style.transform = `translateY(-${imageSpacerContainer.offsetHeight}px)`;
}