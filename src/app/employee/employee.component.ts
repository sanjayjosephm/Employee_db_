import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  EmployeeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  emp_name: string = "";
  emp_dept: string = "";
  salary: string = "";
  designation: string = "";
  dob: string = "";
  currentEmployeeID = "";

  constructor(private http: HttpClient ) 
  {
    this.getAllEmployee();
  }

  ngOnInit(): void {
  }
  
  getAllEmployee()
  { 
    this.http.get("http://localhost:8080/employee/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.EmployeeArray = resultData.data;
    });
  }
  
  register()
  {
    let bodyData = {
      "emp_name" : this.emp_name,
      "emp_dept" : this.emp_dept,
      "salary" : parseInt(this.salary),
      "designation" : this.designation,
      "dob" : this.dob
    };
    this.http.post("http://localhost:8080/employee/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllEmployee();
    });
  }
  setUpdate(data: any) 
  {
    this.emp_name = data.emp_name;
    this.emp_dept = data.emp_dept;
    this.salary = data.salary;
    this.designation = data.designation;
    this.dob = data.dob;
    this.currentEmployeeID = data.Id;
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "emp_name" : this.emp_name,
      "emp_dept" : this.emp_dept,
      "salary" : parseInt(this.salary),
      "designation" : this.designation,
      "dob" : this.dob
    };
    
    this.http.put("http://localhost:8080/employee/update"+ "/"+ this.currentEmployeeID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updated")
        this.getAllEmployee();
      
    });
  }
 
  save()
  {
    if(this.currentEmployeeID == '')
    {
      this.register();
    }
    else
    {
      this.UpdateRecords();
    }
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8080/employee/delete"+ "/"+ data.Id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Deleted")
        this.getAllEmployee();
    });
  }
}
