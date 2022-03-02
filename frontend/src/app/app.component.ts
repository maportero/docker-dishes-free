import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public date;
  public title = 'Sistema de Votación';
  public role;
  public url: string;


   constructor(){
      
      this.role = {name:""};
      this.date = new Date().getFullYear();
      this.loadRole();
      //this.url = global.url;
  }

  ngDoCheck(){
    
    this.loadRole();
    
  }

  ngOnInit(){

    console.log('WebApp Cargada');
        
  }


  loadRole(){
     
     this.role.name = localStorage.getItem('role');
     //console.log(this.role.name);

  }



}
