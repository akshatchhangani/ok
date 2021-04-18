import { Component, OnInit } from '@angular/core';
import { TravelAwayService } from '../TravelAway-services/travel/travel-away.service';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _ta: TravelAwayService) { }
  roleId: number = 2;
  status: boolean;
  error: string;
  msg: string;
  ngOnInit():void {
  }
  SubmitForm(first: string, last: string, emailId: string, userPassword: string, gender: string, contact: number, dateOfBirth: Date, address: string) {
    
    this._ta.insertUserDetails(emailId, userPassword, first, last, this.roleId, gender, dateOfBirth, contact, address).subscribe(
      x => {
        this.status = x;
        console.log(emailId + " " + this.status);
        if (x) {
          this.msg = "SignUp Successfull";
        }
        else {
          this.msg = "Enter vaild details";
        }
      },
      y => {
        this.error = y;
        console.log(this.error);
      },
      () => { console.log("success") }
    )
  }

}


//import { Component, OnInit } from '@angular/core';




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
