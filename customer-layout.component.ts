import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelAwayService } from '../TravelAway-services/travel/travel-away.service';
import { IUser } from '../TravelAway-interfaces/user';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit {
  userRole: string;
  first: string;
  last: string;
  user: IUser;
  constructor(private _ta: TravelAwayService, private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
  }
  logOut() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    this.router.navigate(['']);
  }
  ngOnInit(): void {
    this.get();
  }

  get() {
    this._ta.getUser(sessionStorage.getItem('userName')).subscribe(
      x => {
        this.user=x;
        this.last = x.UserLname;
        console.log(this.user.UserFname);
      }
    )
  }

}



