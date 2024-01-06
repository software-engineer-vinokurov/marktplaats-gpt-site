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
    top: 0px;
    left: 100px;
    padding-top: 5vh;
    padding-left: 16vw;
  `;

  @Input("debug") debug: string = "no";

  @Input("left-img-src") leftImgSrc!: string;
  @Input("left-img-alt") leftImgAlt!: string;

  @Input("central-img-src") centralImgSrc!: string;
  @Input("central-img-alt") centralImgAlt!: string;
  @Input("central-img-style") centralImgStyle: string = ArrangedImagesComponent.DEFAULT_CENTRAL_IMG_STYLE;

  @ViewChild('imageContainerId', { static: true }) imageContainerRef!: ElementRef;
  @ViewChild('imageSpacerContainerId', { static: true }) imageSpacerContainerRef!: ElementRef;
  @ViewChild('imageSpacerId', { static: true }) imageSpacerRef!: ElementRef;
  @ViewChild('centralImgId', { static: true }) centralImgRef!: ElementRef;

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

  ngAfterViewInit() {
    this.makeDraggable();
  }

  makeDraggable() {
    if (this.centralImgRef) {
      const draggableImage = this.centralImgRef.nativeElement as HTMLElement;
      let isDragging = false;
      let offsetX: number, offsetY: number;
      let originalOffsetXpx: string = draggableImage.style.left
      let originalOffsetYpx: string = draggableImage.style.top;

      let originalOffsetX: number = parseFloat(originalOffsetXpx);
      let originalOffsetY: number = parseFloat(originalOffsetYpx);

      console.log("originalOffsetX", originalOffsetX);
      console.log("originalOffsetY", originalOffsetY);

      // Event listeners to handle drag
      draggableImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX;
        offsetY = e.clientY;
        draggableImage.style.cursor = 'grabbing'; // Change cursor to 'grabbing' when dragging
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        draggableImage.style.left = (originalOffsetX + x) + 'px';
        draggableImage.style.top = (originalOffsetY + y) + 'px';
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        draggableImage.style.cursor = 'grab'; // Change cursor back to 'grab' when not dragging

        draggableImage.style.left = originalOffsetXpx;
        draggableImage.style.top = originalOffsetYpx;
      });

      // Prevent text selection while dragging
      draggableImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
    }
  }

}

const translateImages = (imageSpacerContainer: HTMLElement, imageContainer: HTMLElement) => {
  // We translate the image-container to the height of the image-spacer-container up
  imageContainer.style.transform = `translateY(-${imageSpacerContainer.offsetHeight}px)`;
}