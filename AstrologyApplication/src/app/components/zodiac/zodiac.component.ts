import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zodiac',
  templateUrl: './zodiac.component.html',
  styleUrls: ['./zodiac.component.css']
})
export class ZodiacComponent implements OnInit {
  secondlevel: number | null = null;
  firstlevel: number | null = null;
  validNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  invalidNumber: number | null = null;


  constructor(private route: ActivatedRoute) { }
  isValid(): boolean {
    console.log(this.validNumbers.includes(this.secondlevel!));
    return this.validNumbers.includes(this.secondlevel!);
  }
  /*checkNumbers() {
      if (!this.isValidNumber(this.secondlevel!)) {
        this.invalidNumber = this.secondlevel;
      }
      console.log(this.secondlevel);
      console.log(this.invalidNumber);
    }*/
  ngOnInit() {
    // Subscribe to the route parameters to get the value
    this.route.paramMap.subscribe(params => {
      this.secondlevel = +params.get('id')!; // Use the + operator to convert the string to a number
    });
    this.route.paramMap.subscribe(params => {
      this.firstlevel = +params.get('num')!; // Use the + operator to convert the string to a number
    });
  }
}

