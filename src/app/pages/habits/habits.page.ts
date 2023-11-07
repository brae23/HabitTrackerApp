import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
})
export class HabitsPage implements OnInit {
  title: string;

  constructor() {}

  ngOnInit() {
    this.title = 'Habits & Stacks';
  }
}
