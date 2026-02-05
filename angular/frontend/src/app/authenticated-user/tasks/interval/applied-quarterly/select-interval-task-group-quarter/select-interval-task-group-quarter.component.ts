import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { quarterlyOptions } from 'src/app/models/quarterly-options.data';

@Component({
  selector: 'app-select-interval-task-group-quarter',
  standalone: false,
  templateUrl: './select-interval-task-group-quarter.component.html',
  styleUrl: './select-interval-task-group-quarter.component.css'
})
export class SelectIntervalTaskGroupQuarterComponent implements OnInit{

  years: number[];

  readonly quarterlyOptions = quarterlyOptions;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.years = this.generateYearsOptions();
  }

  generateYearsOptions() {
    const nextYear = new Date().getFullYear() + 2;
    const firstYear = 2024;
    const years = []
    for (let i = firstYear; i < nextYear; i++) {
      years.push(i)
    }
    return years;
  }

  onQuarterYearNav(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const quarter = form.value.quarter;
    const year = form.value.year;
    this.router.navigate(
      ['/', 'authenticated-user', 'interval', 'applied-quarterly', quarter, year],
    );

  }
}
