import { Component, OnInit } from '@angular/core';
import { single } from 'rxjs/operators';

import { SingleTaskModel } from 'src/app/models/single-task.model';
import { SingleTaskService } from '../../tasks/single/service/single-task.service';

@Component({
  selector: 'app-uncompleted-tasks',
  standalone: false,
  templateUrl: './uncompleted-tasks.component.html',
  styleUrl: './uncompleted-tasks.component.css'
})
export class UncompletedTasksComponent implements OnInit {

  constructor(
    private singleTaskService: SingleTaskService
  ) {}

  uncompletedTasks: SingleTaskModel[] = [];

  ngOnInit(): void {
    this.fetchUncompletedTasks();
  }

  fetchUncompletedTasks() {
    this.singleTaskService
    .fetchUncompletedSingleTasks().pipe(
      single()
    ).subscribe(
      res => { 
        this.uncompletedTasks = res;
        console.log(res)
       }
    );
  }

  onConfirmTaskCompletionAndRemove(id: number) {
    this.singleTaskService
      .confirmTaskCompletion(
          id).pipe(single()
        ).subscribe(res => {
          this.uncompletedTasks = this.uncompletedTasks.filter(
            (res) => res.id !== id
          );
        }
      );
  }

}
