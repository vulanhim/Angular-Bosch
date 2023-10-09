import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.scss']
})
export class EmployeesAddComponent implements OnInit{
  empForm: FormGroup;

  // Only Integer Numbers
  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
  };

    constructor(
      private formBuilder: FormBuilder,
      private empService: EmployeeService,
      private dialogRef: MatDialogRef<EmployeesAddComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private coreService: CoreService
      ){
      this.empForm = this.formBuilder.group({
        name: ['',Validators.required],
        dept: ['', Validators.required],
        age: ['', Validators.required,]
      })
    };

    ngOnInit(): void {
      
      this.empForm.patchValue(this.data);
    }

    onFormSubmit(){
      if(this.empForm.valid){
        if(this.data){
          this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Employee detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          })
        }
        else{
          this.empService.addEmployee(this.empForm.value).subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Employee added successfully');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          })
        }
      }
    };
}
