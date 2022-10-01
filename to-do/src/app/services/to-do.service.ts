import { TypeofExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as Bucket from '@spica-devkit/bucket'
import { RealtimeConnection } from '@spica-devkit/bucket';
import { from, Observable } from 'rxjs';
import { ToDo } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }


  getTodos(): RealtimeConnection<ToDo[]> {
    Bucket.initialize({ apikey: "dfv2d18l8o719ud", publicUrl: "https://master.spicaengine.com/api" })
    return Bucket.data.realtime.getAll("63369e83ef7bcb002cb95956") as RealtimeConnection<ToDo[]>;
  }

  async addTodo(todo: ToDo) {
    await Bucket.data.insert("63369e83ef7bcb002cb95956", {
      "title": todo.title,
      "expiration_date": todo.expiration_date
    });
  }

  async changeStatus(todo: ToDo) {
    Bucket.initialize({ apikey: "dfv2d18l8o719ud", publicUrl: "https://master.spicaengine.com/api" })

    let response = await Bucket.data.update("63369e83ef7bcb002cb95956", todo._id, {
      "title": todo.title,
      "expiration_date": todo.expiration_date,
      "completed": todo.completed
    });
    console.log("Status changed successfully", response);
  }

  async updateTodo(todo: ToDo) {
    let response = await Bucket.data.update("63369e83ef7bcb002cb95956", todo._id, {
      "title": todo.title,
      "expiration_date": todo.expiration_date,
      "completed": todo.completed
    });
    console.log("Updated successfully", response);
  }

  async deleteTodo(todo: ToDo) {
    let response = await Bucket.data.remove("63369e83ef7bcb002cb95956", todo._id);
    console.log("Deleted successfully", response);
  }

}
