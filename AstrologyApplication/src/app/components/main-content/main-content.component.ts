import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {
  // Query selectors and arrays
  private backgrounds!: NodeListOf<HTMLDivElement>;
  private slider!: HTMLElement;
  private sliderText!: HTMLElement;
  private images!: HTMLElement[];
  private contents!: HTMLElement[];
  
  private imageIndex: number = 0;
  private contentIndex: number = 0;
  private intervalId: any; // Store interval ID for cleanup

 
  constructor(private translate: TranslateService) {
    // Set default language
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  ngOnInit(): void {
    // Initialize the slider and images
    this.backgrounds = document.querySelectorAll('.background') as NodeListOf<HTMLDivElement>;
    this.slider = document.querySelector('.slider-images') as HTMLElement;
    this.sliderText = document.querySelector('.slider-contents') as HTMLElement;
    this.images = Array.from(this.slider.children) as HTMLElement[];
    this.contents = Array.from(this.sliderText.children) as HTMLElement[];

    this.updateSlider(); // Initial update
    this.intervalId = setInterval(() => this.updateSlider(), 3000); // Set interval for updates
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval on component destroy
    }
  }

  private updateSlider(): void {
    // Remove all classes
    this.images.forEach(image => {
      image.classList.remove('active', 'previous', 'next', 'inactive');
    });
    this.contents.forEach(content => {
      content.classList.remove('active', 'previous', 'next', 'inactive');
    });

    // Set classes for current image
    this.images[this.imageIndex].classList.add('active');
    this.contents[this.contentIndex].classList.add('active');

    // Set classes for previous and next images
    this.setClass(this.images, this.imageIndex);
    this.setClass(this.contents, this.contentIndex);

    // Update background opacity
    this.backgrounds.forEach((background, index) => {
      background.style.opacity = (index === this.imageIndex) ? '1' : '0';
    });

    // Update indices
    this.imageIndex = (this.imageIndex + 1) % this.images.length;
    this.contentIndex = (this.contentIndex + 1) % this.contents.length;
  }

  private setClass(elements: HTMLElement[], index: number): void {
    // Set 'previous' class
    if (index - 1 >= 0) {
      elements[index - 1].classList.add('previous');
    } else {
      elements[elements.length - 1].classList.add('previous');
    }

    // Set 'next' class
    if (index + 1 < elements.length) {
      elements[index + 1].classList.add('next');
    } else {
      elements[0].classList.add('next');
    }

    // Set 'inactive' class
    elements.forEach((element, idx) => {
      if (idx !== index && idx !== (index - 1 + elements.length) % elements.length && idx !== (index + 1) % elements.length) {
        element.classList.add('inactive');
      }
    });
  }
}
