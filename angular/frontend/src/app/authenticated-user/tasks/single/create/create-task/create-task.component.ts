import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";
import { 
  singleTaskErrorMsg, singleTaskSuccessMsg 
} from '../../state/single-task.selectors';
import { SingleTaskMessagesCleared } from '../../state/single-task.actions';

@Component({
  selector: 'app-create-task',
  standalone: false,
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  singleTaskSubmitErrMsg$: Observable<string | undefined> = of(undefined);
  singleTaskSubmitSuccessMsg$: Observable<string | undefined> = of(undefined);

  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    this.store.dispatch(new SingleTaskMessagesCleared());
    this.singleTaskSubmitErrMsg$ = this.store.pipe(
      select(singleTaskErrorMsg)
    );
    this.singleTaskSubmitSuccessMsg$ = this.store.pipe(
      select(singleTaskSuccessMsg)
    );
  }


  onClearStatusMsgs() {
    this.store.dispatch(new SingleTaskMessagesCleared());
  }
}
