import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.css']
})
export class HoroscopeComponent implements OnInit {
  /*goToTarget(itemId: number) {
    this.router.navigate(['/zodiac', itemId]);
  }*/
    firstlevel: number | null = null;

    constructor(private route: ActivatedRoute) { }
    ngOnInit() {
      // Subscribe to the route parameters to get the value
      this.route.paramMap.subscribe(params => {
        this.firstlevel = +params.get('num')!; // Use the + operator to convert the string to a number
      });
      //console.log(this.firstlevel);
  }
}
