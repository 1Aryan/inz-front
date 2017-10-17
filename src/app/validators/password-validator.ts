import { AbstractControl } from '@angular/forms';

export function passwordValidator(c: AbstractControl){
  return c.get('password').value === c.get('password2').value ? null : {'Passwords no match' : true}  
} 