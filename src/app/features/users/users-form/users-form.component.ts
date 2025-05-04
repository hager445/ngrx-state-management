import {  Component, effect, Input, signal } from '@angular/core';

import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';


import { strongPassword } from '../../../shared/validators/users-formvalidators';

import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/users.reducer';
import { addUser, updateUser } from '../../../store/users.actions';

import { checkEmail } from '../../../shared/validators/emailAsyncValidator';
import { UpdatemodeService } from '../../../core/services/updatemode/updatemode.service';
import { Router, RouterLink } from '@angular/router';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';
import { FormModalDirective } from '../../../shared/directives/formModal/form-modal.directive';
import { ModalService } from '../../../core/services/modal/modal.service';




@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule,FormModalDirective,RouterLink],
  templateUrl: './users-form.component.html',


  styleUrl: './users-form.component.css'
})
export class UsersFormComponent {

// ====== form role:
@Input() formRole:string='';
  formG!:FormGroup;
  messageError:string | null =null;

 
  constructor(private _Modal: ModalService,private _Router:Router,private store:Store<AppState>, private fb:FormBuilder  , private _Http:HttpClient , public _UpdateModeService:UpdatemodeService) {
    // ============ Initailize form group: 
    // ============
    this.initializeForm();
  
     effect(()=>{
  
  
    if (_UpdateModeService.userInfo().id) {
      this.showUserInfoInForm();
    }else{
    
      this.formG.reset();

    }
    this.formG.get('email')?.setAsyncValidators(checkEmail(this._Http, this._UpdateModeService.userInfo().email));
    this.formG.get('email')?.updateValueAndValidity();

}
)



  }

    
    
  
  initializeForm() {
    this.formG = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: [null, [Validators.required, strongPassword]],
      role: ['select a role', [Validators.required]],
      createdAt: [null, [Validators.required]],
    });
  }
// ========= handle user update
  
 
   showUserInfoInForm(){
    this.formG.patchValue(this._UpdateModeService.userInfo());
   }
  // getter we use it to handle update mode:
   get isUpdateMode() {
    return this._UpdateModeService.setUpdateMode(); // 
  }
  
//  =====================================

 
    submitForm(mode: 'add' | 'update') {
      if (!this.formG.valid) {
        this.messageError = 'Please fill out the empty fields!';
        console.log('Invalid form', this.formG.value);
        return;
      }
    
      
      if (mode === 'add') {
        this.store.dispatch(addUser({ user: this.formG.value }));
      } else if (mode === 'update') {
        this.store.dispatch(updateUser({ user: this.formG.value, id: this._UpdateModeService.userInfo().id }));
      }
    
      this.messageError = '';
      this.resetAll();
    
    
      if ( this.formRole === 'register') {
        this._Router.navigate(['/login']);
      }
    
      this.closeModal();
    }
    resetAll(){
      this._UpdateModeService.setAddMode() ;
      this.formG.reset({
        name: null,
        email: null,
        password: null,
        role: 'select a role',
        createdAt: null,
      });
}
// ===================== handle closing model:
closeModal(){
  this._Modal.closeModal()
  }
 
}