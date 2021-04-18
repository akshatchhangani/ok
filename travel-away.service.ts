import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { IUser} from '../../TravelAway-interfaces/user';
import { catchError } from 'rxjs/operators';
import { IPackage } from '../../TravelAway-interfaces/packages';
import { ICategory } from '../../TravelAway-interfaces/category';
import { IPackageDetail } from '../../TravelAway-interfaces/packageDetails';

@Injectable({
  providedIn: 'root'
})
export class TravelAwayService {

  constructor(private http: HttpClient) { }

  insertUserDetails(UserEmail: string, UserPass: string, UserFname: string, UserLname: string, RolesId: number, Gender: string, UserDob: Date, UserContact: number, Address: string): Observable<boolean> {
    var register: IUser;
    register = { UserEmail: UserEmail, UserPass: UserPass, UserFname: UserFname, UserLname: UserLname, RolesId: 1, Gender: Gender, UserDob: UserDob, UserContact: UserContact, Address: Address };

    return this.http.post<boolean>('http://localhost:55390/api/user/AddTravelUser', register).pipe(catchError(this.errorHandler));
  }
  

  validateCredentials(id: string, password: string): Observable<string> {
    //var userObj: IUser;
    //userObj = { UserEmail: id, UserPass: password, UserFname: null, UserLname: null, RolesId: null, Gender: null, UserDob: null, UserContact: 0, Address: null };
    //console.log(userObj);
    return this.http.post<string>('http://localhost:55390/api/user/ValidateLogin', {
      "UserEmail": id,
      "UserPass": password
    }).pipe(catchError(this.errorHandler));
  }

  getUser(emailId:string) {
    let params = "?Email=" + emailId;
    return this.http.get<IUser>('http://localhost:55390/api/user/GetUsers' + params).pipe(catchError(this.errorHandler));
  }

  getAllPackages() {
    return this.http.get<IPackage[]>('http://localhost:55390/api/user/GetPackages').pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

  getPackageDetail(pkgId:string) {
    let params = "?pkgId=" + pkgId;
    return this.http.get<IPackageDetail[]>('http://localhost:55390/api/package/GetParticularPackageDetails' + params).pipe(catchError(this.errorHandler));
  }

  getCategoriesByPackage() {
    return this.http.get<ICategory[]>('http://localhost:55390/api/package/GetPackageByCategories').pipe(catchError(this.errorHandler));
  }

}
