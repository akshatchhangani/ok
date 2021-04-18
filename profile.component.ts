import { Component, OnInit } from '@angular/core';
import { IUser } from '../TravelAway-interfaces/user';
import { TravelAwayService } from '../TravelAway-services/travel/travel-away.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errorMsg: string;

  constructor(private _ta: TravelAwayService) { }
  user: IUser;
  Fname: string;
  
  email: string;
  
  ngOnInit(): void {
    
    this.email = sessionStorage.getItem('userName');
    this._ta.getUser(this.email).subscribe(
      x => {
        
        this.user = x;
        
        console.log(this.user.UserFname);

      },
      y => {
        console.log(y);
      },
      () => { console.log("success") }
    )
    
  }
  
}
