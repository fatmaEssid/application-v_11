import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor( public snackBar: MatSnackBar,private service: UserService, private router: Router, private toastr: ToastrService, private user:UserService) { }

  ngOnInit() {
    console.log('hit');
  }

  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
  	var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
  	
  	if(username == 'admin' && password == 'admin') {
      this.user.setUserLoggedIn();
  		this.router.navigate(['/page-accuiel']);
    }else
    this.openSnackBar('error','connection');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 3000,
       verticalPosition: 'bottom',
      
    
    });
 }
}
