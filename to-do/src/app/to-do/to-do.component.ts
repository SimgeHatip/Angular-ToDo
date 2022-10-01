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
  today = new Date();
  todoList: ToDo[] = [];
  uncompletedList: ToDo[] = [];
  doneList: ToDo[] = [];
  expiredList: ToDo[] = [];


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

  filterTodos(todos: ToDo[]) {
    todos.forEach(todo => {
      if (todo.expiration_date < this.today) {
        this.expiredList.push(todo);
      }
      else if (todo.completed) {
        this.doneList.push(todo);
      }
      else {
        this.uncompletedList.push(todo);
      }
    });
  }
  addTodo(form: NgForm): void {
    this.todoService.addTodo(form.value);
  }

  changeStasus(todo: ToDo) {
    todo.completed = !todo.completed;
    this.todoService.changeStatus(todo);
  }

  updateTodo(todo: ToDo) {
    this.todoService.updateTodo(todo);
  }

  onDelete(todo: ToDo) {
    this.todoService.deleteTodo(todo);
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

}
