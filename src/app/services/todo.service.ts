import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../models/Todos'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos'
  todosLimit:string = '?_limit=5'
  constructor(private http:HttpClient) { }

  // Get todos.
  getTodos():Observable<Todo[]> {

    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Toggle completed.
  toggleCompleted(todo:Todo):Observable<any> {
    const url:string = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions)
  }

  deleteTodo(todo:Todo):Observable<any> {
    const url:string = `${this.todosUrl}/${todo.id}`
    return this.http.delete(url, httpOptions)
  }

  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
