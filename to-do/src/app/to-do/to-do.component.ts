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
  isVisible: boolean = false;
  today = new Date();
  todoList: ToDo[] = [];


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
    this.todoService.addTodo(form.value);
  }

  changeStasus(todo: ToDo) {
    todo.completed = !todo.completed;
    this.todoService.changeStatus(todo);
  }

  updateTodo(form: NgForm, todo: ToDo) {
    console.log(form.value)

    form.value._id = todo._id;
    if (form.value.expiration_date == '') {
      form.value.expiration_date = todo.expiration_date;
    }
    this.todoService.updateTodo(form.value);
  }

  onDelete(todo: ToDo) {
    this.todoService.deleteTodo(todo);
  }
  isExpired(todo: ToDo): boolean {
    todo.expiration_date = new Date(todo.expiration_date);
    return (todo.expiration_date.getTime() < this.today.getTime());

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

  openSnackBar(task: string) {
    this._snackBar.open("Successfull for " + task, "", {
      duration: 2000,
      panelClass: ["custom-style"]
    });
  }
  showUpdateForm() {
    this.isVisible = !this.isVisible;
  }

}
