import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-cards',
  templateUrl: './gallery-cards.component.html',
  styleUrls: ['./gallery-cards.component.css']
})
export class GalleryCardsComponent implements OnInit {

  @Input()
  image_alt: string = 'image'
  @Input()
  rootClassName: string = ''
  @Input()
  image_src: string =
    'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fG1pbmltYWxpc20lMjBjb3VjaHxlbnwwfHx8fDE2MjY0NDg1NTk&ixlib=rb-1.2.1&w=1500'

  constructor() { }

  ngOnInit(): void {
  }

}
