import { FormControl } from '@angular/forms';

export function phoneValidator(c: FormControl){
  let PHONE_REGEXP = /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})$/;
  return (c.value != "" && !PHONE_REGEXP.test(c.value)) ? { "Provide a valid phone number": true } : null ;
}