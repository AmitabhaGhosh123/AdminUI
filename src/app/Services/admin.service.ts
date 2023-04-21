import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminEndPointUrl: string = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem";
  constructor(private http: HttpClient) { }

  // api call to fetch list of users
  getAllUsers() {
    return this.http.get(this.adminEndPointUrl + "/members.json");
  }

}
