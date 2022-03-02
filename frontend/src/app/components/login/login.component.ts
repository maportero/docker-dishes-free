import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public status: string;
  public errors: any[];
  public roles: any[];
  public role;
  public display :string = "";

  constructor(
       
       private _router: Router,
       private _route: ActivatedRoute

    ) { 

      this.page_title = "";
      this.roles = [{name: 'GERENCIA'}, {name : 'COCINA'},{ name:'BODEGA'}];
      this.role = {name:""};
      

  }

  ngOnInit(): void {
        // Se ejectuta siempre la funcion logout y cierra la sesion si el parametro es 1
      this.logout();
  }


  onChangeSelect(value){
    this.role.name = value;
    //console.log('valor->' + this.role.name);
  }

  onSubmit(form){
      
     if (this.role.name !== ""){
       this.display = "display:none;";
       //console.log(this.role.name);
       localStorage.setItem('role', this.role.name);
       this._router.navigate(['inicio']);
     }
  }

  logout(){
    this._route.params.subscribe(params => {
      let logout = params['sure'];

      if (logout == 1){
        localStorage.removeItem('role');
        this.role = {name:""};
        //console.log(this.role)
      }

    });
  }

}
