import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

export class ToDoComponent implements OnInit {
  mainTitle: string = "Todo With Angular";
  today = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  userInput!: string;
  dateInput!: string;
  formattedDate?: string;
  todos: { id: number; title: string; date: string, complated: boolean }[] = [
    { id: 1, title: 'Study Angular', date: '2022-09-29', complated: false },
    { id: 2, title: 'Add one element', date: '2022-09-03', complated: false },
    { id: 3, title: 'Correct typo', date: '2022-09-30', complated: false },
    { id: 4, title: 'Add dates', date: '2022-09-10', complated: false },
  ];

  passed: { id: number; title: string; date: string, complated: boolean }[] = [
    { id: 5, title: 'make todo app with Angular', date: '2022-09-08', complated: false },
    { id: 6, title: 'it passed task', date: '2022-09-10', complated: false },

  ];
  done: { id: number; title: string; date: string, complated: boolean }[] = [
    { id: 7, title: 'done making Angular', date: '2022-09-26', complated: false },
    { id: 8, title: 'DONE element', date: '2022-09-19', complated: false },
    { id: 9, title: 'Correct Responsiveness', date: '2022-09-30', complated: false },
  ];

  constructor() { }

  ngOnInit(): void {
    this.isDatePassed(this.todos);
  }

  addTodo(form: NgForm): void {
    this.todos = this.todos.concat({
      id: Math.random(),
      title: form.form.value.userInput,
      date: form.form.value.date,
      complated: false,
    });
  }

  onDelete(id: number) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }

  drop(event: CdkDragDrop<{ id: number; title: string; date: string, complated: boolean }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  isDatePassed(todos: { id: number; title: string; date: string, complated: boolean }[]): void {

    todos.forEach(todo => {
      if (Date.parse(this.today) > Date.parse(todo.date)) {
        this.passed.push(todo);
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      }
    });
  }

  formatDate(): string {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    this.formattedDate = yyyy + "-" + mm + "-" + dd;

    return this.formattedDate;

  }
}
