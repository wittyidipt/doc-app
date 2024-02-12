import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './app-question.component.html',
  styleUrls: ['./app-question.component.css']
})
export class AppQuestionComponent implements OnInit {

  @Input()
  Answer: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus.'
  @Input()
  Question: string = 'What types of cars do you sell?'

  constructor() { }

  ngOnInit(): void {
  }

}
