import { Component, OnInit } from '@angular/core';
import { IPackage } from '../TravelAway-interfaces/packages';
import { TravelAwayService } from '../TravelAway-services/travel/travel-away.service';
import { ICategory } from '../TravelAway-interfaces/category';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {
  package: IPackage[];
  filteredPackages: IPackage[];
  category: ICategory[];
  userRole: string;
  userName: string;
  showMsg: boolean;
  errorMsg: any;
  constructor(private _ta: TravelAwayService, private router: Router, private route: ActivatedRoute) {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName')
  }

  ngOnInit(): void {
    this.getPackages();
    this.getCategories();

    if (this.package == null) {
      this.showMsg = true;
    }
    this.filteredPackages = this.package;
  }

  getPackages() {
    this._ta.getAllPackages().subscribe(
      x => {
        this.showMsg = false;
        this.package = x;
        this.filteredPackages = x;
        console.log(x);
      },
      y => {
        this.showMsg = true;
        this.package = null;
        this.errorMsg = y;
        console.log(y);
      },
      () => { console.log("success") }
    )
  }
  getCategories() {
    this._ta.getCategoriesByPackage().subscribe(x => {
      this.category = x;
      console.log(x);
    },
      y => {
        this.category = null;
      }
        );
  }

  searchPackageByCategory(categoryId: string) {
    this.filteredPackages = this.package;
    if (categoryId == "100") {
      this.filteredPackages = this.package;
    }
    else {
      this.filteredPackages = this.filteredPackages.filter(x => x.pkgCategoryId.toString() == categoryId);
    }
  }
  viewPackageDetails(packageId: string,packageName:string) {
    console.log(packageId)
    this.router.navigate(['viewPackageDetails', packageId,packageName]);
  }

}
