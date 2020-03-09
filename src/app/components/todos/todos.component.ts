import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/Todos'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[]

  constructor(private todoService:TodoService) {

   }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos
    });
  }

  deleteTodo(todo:Todo) {
    
    // Remove the todo from the ui.
    this.todos = this.todos.filter(t => t.id !== todo.id);

    // Remove the todo from the server.
    this.todoService.deleteTodo(todo).subscribe();

  }

  addTodo(todo:Todo) {
  
    console.log("ADD TODO BEING CALLED!")

    this.todoService.addTodo(todo).subscribe(todo => {
      console.log(todo);
      this.todos.push(todo);
    });
  }

}
