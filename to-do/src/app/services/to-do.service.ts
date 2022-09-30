import { Injectable } from '@angular/core';
import * as Bucket from '@spica-devkit/bucket'
import { from, Observable } from 'rxjs';
import { ToDo } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }


  getTodos(): Observable<ToDo[]> {
    Bucket.initialize({ apikey: "dfv2d18l8o719ud", publicUrl: "https://master.spicaengine.com/api" })

    return from(Bucket.data.getAll("63369e83ef7bcb002cb95956")) as Observable<ToDo[]>

  }

  async addTodo(toDo: ToDo) {
    await Bucket.data.insert("63369e83ef7bcb002cb95956", {
      "title": toDo.title,
      "expiration_date": toDo.expiration_date
    });
  }

  async changeStatus(toDo: ToDo) {
    Bucket.initialize({ apikey: "dfv2d18l8o719ud", publicUrl: "https://master.spicaengine.com/api" })

    let response = await Bucket.data.update("63369e83ef7bcb002cb95956", "633705e1ef7bcb002cb962bf", {
      "title": toDo.title
    });
    console.log("Updated successfully", response);
  }
}
