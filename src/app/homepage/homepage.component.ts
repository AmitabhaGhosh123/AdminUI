import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import * as _ from "lodash";
import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  allUsers: any = [];
  allUsersCopy: any = [];
  column1: string = "";
  column2: string = "";
  column3: string = "";
  datalength: number = 0;
  individualRowSelection: any = [];
  page: number = 1;
  pageSize: number = 10;
  singleCheckClick: boolean = false;
  errorMessage: string = "";
  showErrorMessage:boolean = false;

  constructor(public adminservice: AdminService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('Users')) {
      this.allUsers = JSON.parse(sessionStorage.getItem('Users') || '{}');
      this.modifyColumnNames();
    }
    else {
      this.getUsers();
    }
  }

  // method to get list of users from api
  getUsers() {
    this.adminservice.getAllUsers().subscribe(data => {
      this.allUsers = data;
      this.allUsersCopy = this.allUsers;
      this.showErrorMessage = false;
      this.allUsers.forEach((item: any) => {
        item.showInput = false;
        item.showNormal = true;
      })
      this.modifyColumnNames();
    },
      (error) => {
        this.showErrorMessage = true;
        this.allUsers = [];
        if(error.status == '404') {
          this.errorMessage = "No records found";
        }
        else {
          this.errorMessage = "Failed to load data";
        }
      })
  }

  // method to change first letter of column name to uppercase
  modifyColumnNames() {
    this.datalength = this.allUsers.length;
    this.column1 = Object.keys(this.allUsers[0])[1]; // fetch column "name"
    this.column2 = Object.keys(this.allUsers[0])[2]; // fetch column "email"
    this.column3 = Object.keys(this.allUsers[0])[3]; // fetch column "role"
    this.column1 = this.column1.charAt(0).toUpperCase() + this.column1.slice(1);
    this.column2 = this.column2.charAt(0).toUpperCase() + this.column2.slice(1);
    this.column3 = this.column3.charAt(0).toUpperCase() + this.column3.slice(1);
  }

  // method to enable inline edit feature for editing any row
  enableInlineEdit(key: any, index: number) {
    key.showInput = true;
    key.showNormal = false;
    $('#pencil' + index).addClass('d-none');
    $('#checkicon' + index).removeClass('invisible');
    $('#checkicon' + index).addClass('visible');
  }

  // method to enable or disable inline edit and save the updated values
  saveAfterEdit(key: any, index: number) {
    key.showInput = false;
    key.showNormal = true;
    $('#pencil' + index).removeClass('d-none');
    $('#checkicon' + index).removeClass('visible');
    $('#checkicon' + index).addClass('invisible');
    key.name = $('#name' + index).val();
    key.email = $('#email' + index).val();
    key.role = $('#role' + index).val();
    this.allUsers[index].name = key.name;
    this.allUsers[index].email = key.email;
    this.allUsers[index].role = key.role;
    sessionStorage.setItem('Users', JSON.stringify(this.allUsers));
  }

  // method to select/deselect multiple rows
  selectRows(event: any, index: number) {
    if (event.target.checked) {
      event.target.parentElement.parentElement.classList.add("selected");
      this.individualRowSelection.push(index);
    }
    else {
      event.target.parentElement.parentElement.classList.remove("selected");
      this.individualRowSelection.splice(index,1);
    }
  }

  // method to delete a specific row 
  deleteRow(index: number) {
    this.allUsers.splice(index, 1);
    sessionStorage.setItem('Users', JSON.stringify(this.allUsers));
  }

  // method to delete the selected rows using Delete Selected button
  deleteSelectedRows() {
    if (this.singleCheckClick == true) {
      for (var i = 0; i < this.allUsers.length; i++) {
        if (i >= ((this.page * this.pageSize) - (this.pageSize)) && i < (this.page * this.pageSize)) {
          this.individualRowSelection.push(i);
        }
      }
      this.filterUsersOnDeletion();
      $('#selectAll').prop('checked', false);
    }
    else {
      this.filterUsersOnDeletion();
    }
  }

  // method to get list of filtered users on deleting selected users  
  filterUsersOnDeletion() {
    const indexSet = new Set(this.individualRowSelection);
    this.allUsers = this.allUsers.filter((val: any) => !indexSet.has(val.id - 1));
    this.datalength = this.allUsers.length;
    this.allUsersCopy = this.allUsers;
    sessionStorage.setItem('Users', JSON.stringify(this.allUsers));
  }

  // method to select all rows
  selectAllRows(event: any) {
    if (event.target.checked) {
      this.singleCheckClick = true;
      $(':checkbox').prop('checked', true);
    }
    else {
      this.singleCheckClick = false;
      $(':checkbox').prop('checked', false);
    }
  }

  // method to search users based on name,email or role
  searchUser(value: string) {
    if (value) {
      if (this.allUsers.some((b: any) => (b['name'] != null && b['name'].includes(value))
        || (b['email'] != null && b['email'].toLowerCase().includes(value.toLowerCase()))
        || (b['role'] != null && b['role'].toLowerCase().includes(value.toLowerCase())))) {
        this.allUsers = this.allUsers.filter((b: any) => {
          return (b['name'] != null && b['name'].includes(value)) ||
            (b['email'] != null && b['email'].toLowerCase().includes(value)) ||
            (b['role'] != null && b['role'].toLowerCase().includes(value));
        })
      }
      else {
        this.allUsers = this.allUsersCopy;
      }
    }
    else {
      this.allUsers = this.allUsersCopy;
    }
    this.datalength = this.allUsers.length;
  }

}
