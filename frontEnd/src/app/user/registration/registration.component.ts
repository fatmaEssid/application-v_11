import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    //this.service.formModel.reset();
  }

 /* onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.openSnackBar('New user created!', 'Registration successful.');
         
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
              this.openSnackBar('Username is already taken','Registration failed.');
                
                break;

              default:
              this.openSnackBar(element.description,'Registration failed.');
              break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 3000,
       verticalPosition: 'bottom',
      
    
    });
 }
}
