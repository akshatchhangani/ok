import { Component, OnInit } from '@angular/core';
import { IPackageDetail } from '../TravelAway-interfaces/packageDetails';
import { TravelAwayService } from '../TravelAway-services/travel/travel-away.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pakage-detail',
  templateUrl: './pakage-detail.component.html',
  styleUrls: ['./pakage-detail.component.css']
})
export class PakageDetailComponent implements OnInit {
  packageId: string;
  packageName: string;
  packageDetails: IPackageDetail[];
  showMsgDiv: boolean = false;
  errMsg: string;
  userRole: string;

  constructor(private _ta: TravelAwayService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole != "Customer") {
      this.router.navigate(['/login']);
    }

    this.packageId = this.route.snapshot.params['packageId'];
    this.packageName = this.route.snapshot.params['packageName'];
    this.getPackageDetails(this.packageId);
    if (this.packageDetails == null) {
      this.showMsgDiv = true;
    }

  }
  getPackageDetails(packageId: string) {
    this._ta.getPackageDetail(packageId).subscribe(
      x => {
        this.packageDetails = x;
        console.log(x);
        this.showMsgDiv = false;
      },
      y => {
        this.packageDetails = null;
        this.errMsg = y;
        console.log(this.errMsg);
      },
      () => console.log("GetPackageDetails method excuted successfully")
    );
    
  }

}
