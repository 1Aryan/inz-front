import {Injectable} from "@angular/core";
import { Observable} from "rxjs";
 import {Subject} from "rxjs/Subject";

@Injectable()
export class StorageService {
  

  private  subject = new Subject<any>();


  sendLoginSubject(arg : any) {
    this.subject.next(arg);
  }

  sendLogoutSubject() {
    this.subject.next(false);
    this.subject.next(null);
  }
  getLoginSubject(): Observable<any>{
  	return this.subject.asObservable();
  }
  clearLoginSubject(){
  	this.subject.next(null);
  }
}
