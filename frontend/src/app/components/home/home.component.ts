import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public role;
  public title = 'Página de Inicio';
  constructor() { 
    

  }

  ngOnInit(): void {
    //console.log('test');
  }

}
