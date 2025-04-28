import { AbstractControl } from "@angular/forms";

export function strongPassword(control:AbstractControl):{[key:string]:boolean}|null{
    const value = control.value;
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;
if (!value || !pattern.test(value)){

    return {'weakPassword':true};
} 
return null ;
}