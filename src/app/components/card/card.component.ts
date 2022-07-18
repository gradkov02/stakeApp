import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  heading!: string;
  @Input()
  value!: string;
  @Input()
  additionalInfo!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
