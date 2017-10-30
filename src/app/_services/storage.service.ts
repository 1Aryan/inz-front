import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
@Injectable()
export class StorageService {
  
  public static Login : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public static LoginStream$ : Observable<any> = StorageService.Login.asObservable();

 announceLogin(arg : any) {
    StorageService.Login.next(arg);
  }

  announceLogout() {
    StorageService.Login.next(null);
  }
}
