import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MyapiService } from '../services/myapi.service';
import { UserModel } from './dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  userModelObj:UserModel=new UserModel();
  userData:any=[];
  constructor(private formbuilder: FormBuilder,private api:MyapiService) { }
  getUser(){
    this.api.getUser().subscribe(res=>{
      this.userData=res;
      console.log(this.userData)
    })
  }
  deleteUser(user:any){
    this.api.deleteUser(user.id).subscribe(res=>{
      this.getUser()
      alert("user Deleted")
    })
  }
  postUserDetails(){
    this.userModelObj.FirstName=this.formValue.value.FirstName;
    this.userModelObj.LastName=this.formValue.value.LastName;
    this.userModelObj.Email=this.formValue.value.Email;
    this.userModelObj.City=this.formValue.value.City;
    this.userModelObj.State=this.formValue.value.State;
    this.userModelObj.Zip=this.formValue.value.Zip;
    this.userModelObj.Phone=this.formValue.value.Phone;

    this.api.postUser(this.userModelObj).subscribe(res=>{
      console.log(res);
      alert("Done");
      this.formValue.reset();
      let canc=document.getElementById("cancel");
      canc?.click();
      this.getUser();
    },
    err=>{
      alert("Error Detected")
    })
  }
  postData(user:any){
    this.userModelObj.id=user.id;
    this.formValue.controls['FirstName'].setValue(user.FirstName)
    this.formValue.controls['LastName'].setValue(user.LastName)
    this.formValue.controls['Email'].setValue(user.Email)
    this.formValue.controls['City'].setValue(user.City)
    this.formValue.controls['State'].setValue(user.State)
    this.formValue.controls['Zip'].setValue(user.Zip)
    this.formValue.controls['Phone'].setValue(user.Phone)
  }
  updateUserDetails(){
    this.userModelObj.FirstName=this.formValue.value.FirstName;
    this.userModelObj.LastName=this.formValue.value.LastName;
    this.userModelObj.Email=this.formValue.value.Email;
    this.userModelObj.City=this.formValue.value.City;
    this.userModelObj.State=this.formValue.value.State;
    this.userModelObj.Zip=this.formValue.value.Zip;
    this.userModelObj.Phone=this.formValue.value.Phone;
    this.api.updateUser(this.userModelObj,this.userModelObj.id).subscribe(res=>{
      alert("user updated");
      let canc=document.getElementById("cancel");
      canc?.click()
      this.getUser();
    })
  }
  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      FirstName:[''],
      LastName:[''],
      Email:[''],
      City:[''],
      State:[''],
      Zip:[''],
      Phone:['']
    })
    this.getUser();
  }

}
