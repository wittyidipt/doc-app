import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent  {

  @Input()
  Heading: string = 'Lorem ipsum'
  @Input()
  SubHeading: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lorem, malesuada in metus vitae, scelerisque accumsan ipsum.'
  constructor() { }

  ngOnInit(): void {
  }

}
