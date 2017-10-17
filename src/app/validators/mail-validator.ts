import { FormControl } from '@angular/forms';

export function mailValidator(c: FormControl){
  let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (c.value != "" && (c.value.length <= 5 || !EMAIL_REGEXP.test(c.value))) ? { "Provide a valid email": true } : null ;
}
