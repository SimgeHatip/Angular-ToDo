import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToDoService } from '../services/to-do.service';
import { ToDo } from '../models/todo';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

export class ToDoComponent implements OnInit {
  mainTitle: string = "TO DO WITH ANGULAR";
  today = new Date;
  userInput!: string;
  dateInput!: string;
  formattedDate?: string;
  todoList: ToDo[] = [];
  // todos: { id: number; title: string; date: string, completed: boolean }[] = [
  //   { id: 1, title: 'Study Angular', date: '2022-09-29, 12:00:00 AM', completed: false },
  //   { id: 2, title: 'Add one element', date: '2022-09-03, 12:00:00 AM', completed: false },
  //   { id: 3, title: 'Correct typo', date: '2022-09-30, 11:30:00 AM', completed: false },
  //   { id: 4, title: 'Add dates', date: '2022-09-10, 02:00:00 PM', completed: false },
  // ];

  // passed: { id: number; title: string; date: string, completed: boolean }[] = [
  //   { id: 5, title: 'Make todo app with Angular', date: '2022-09-08, 12:00:00 AM', completed: false },
  //   { id: 6, title: 'It passed task', date: '2022-09-10, 10:00:00 AM', completed: false },

  // ];
  // done: { id: number; title: string; date: string, completed: boolean }[] = [
  //   { id: 7, title: 'Done making Angular', date: '2022-09-26, 05:00:00 AM', completed: false },
  //   { id: 8, title: 'Element of To Do', date: '2022-09-19, 06:10:00 AM', completed: false },
  //   { id: 9, title: 'Correct Responsiveness', date: '2022-09-30, 04:20:00 AM', completed: false },
  // ];

  constructor(private todoService: ToDoService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos: ToDo[]) => {
        this.todoList = todos;
      }
    })
  }

  addTodo(form: NgForm): void {
    console.log(form.value);
    this.todoService.addTodo(form.value);
    window.location.reload();
    // var formatedDateTodo = new Date(form.form.value.date).toLocaleString();
    // this.todos = this.todos.concat({
    //   id: Math.random(),
    //   title: form.form.value.userInput,
    //   date: formatedDateTodo,
    //   completed: false,
    // });
  }

  onDelete(todo: ToDo) {
    //   this.todos = this.todos.filter((item) => item.id !== todo.id);
    //   this.passed = this.passed.filter((item) => item.id !== todo.id);
    //   this.done = this.done.filter((item) => item.id !== todo.id);
  }

  drop(event: CdkDragDrop<{ id: number; title: string; date: string, completed: boolean }[]>) {
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

  // isDatePassed(todos: { id: number; title: string; date: string, completed: boolean }[]): void {

  //   todos.forEach(todo => {
  //     if (Date.parse(this.today) > Date.parse(todo.date)) {
  //       this.passed.push(todo);
  //       const index = this.todos.indexOf(todo);
  //       this.todos.splice(index, 1);
  //     }
  //   });
  // }

  formatDate(): string {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    this.formattedDate = yyyy + "-" + mm + "-" + dd;

    return this.formattedDate;

  }
  updateTodo(todo: ToDo) {
    console.log("before",todo);

    this.todoService.changeStatus(todo);
    console.log(todo);
  }
  // changeStatus(todo: { id: number; title: string; date: string, completed: boolean }) {
  //   this.openSnackBar(todo.title);
  //   if (this.done.includes(todo)) {
  //     if (!todo.completed) {
  //       this.todos.push(todo);
  //       const index = this.done.indexOf(todo);
  //       this.done.splice(index, 1);
  //     }
  //   }
  //   else {
  //     if (!todo.completed) {
  //       this.done.push(todo);
  //       const index = this.todos.indexOf(todo);
  //       this.todos.splice(index, 1);
  //     }
  //   }
  // }
  openSnackBar(task: string) {
    this._snackBar.open("Successfull for " + task, "", {
      duration: 2000,
      panelClass: ["custom-style"]
    });
  }

}
