import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TravelAwayService } from '../TravelAway-services/travel/travel-away.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: string;
  errorMsg: string;
  msg: string;
  showDiv: boolean = false;
  constructor(private _ta: TravelAwayService, private router: Router) { }
  

  submitLoginForm(form: NgForm) {
    //console.log(form.value.email);
    this._ta.validateCredentials(form.value.email, form.value.password).subscribe(
      
      x => {
        
        this.status = x;
        console.log(this.status);
        if (this.status.toLowerCase() != "invalid credentials") {
          sessionStorage.setItem('userName', form.value.email);
          sessionStorage.setItem('userRole', this.status);
          this.router.navigate(['/home']);
        }
        else {
          this.msg = this.status + ". Try again with valid credentials.";
        }
      },
      y => {
        console.log(form.value.email + " " + form.value.password);
        this.errorMsg = y;
        console.log(this.errorMsg);
      },
      () => console.log("SubmitLoginForm method executed successfully")
    );
  }

  ngOnInit(): void {
  }

}



//import { Component, OnInit } from '@angular/core';
//import { UserService } from '../TravelAway-services/user/user.service';



//@Component({
//  selector: 'app-register',
//  templateUrl: './register.component.html',
//  styleUrls: ['./register.component.css']
//})
//export class RegisterComponent implements OnInit {

//  constructor(private _userService: UserService) { }

//  ngOnInit(): void {
//  }
//  SubmitForm(first:string,last:string,emailId: string, userPassword: string, gender: string, contact:number, dateOfBirth: Date, address: string) {

//    console.log(emailId + "  " + userPassword + "  " + gender + "  " + dateOfBirth + "  " + address);

//    this._userService.insertUserDetails(emailId, userPassword, this.roleId, gender, dateOfBirth, address).subscribe(
//      x => {
//        this.status = x;
//        console.log(this.status);
//      },
//      y => {

//        this.error = y;
//        console.log(this.error);
//      },
//      () => { console.log("success") }
//    )
//  }
//}
