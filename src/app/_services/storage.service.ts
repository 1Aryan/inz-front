import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable()
export class StorageService {
  public static Login : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public static LoginStream$ : Observable<any> = StorageService.Login.asObservable();
  public static logout : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public static logoutStream$ : Observable<boolean> = StorageService.logout.asObservable();

  announceLogin(arg : any) {
    StorageService.Login.next(arg);
  }

  announceLogout() {
    StorageService.logout.next(null);
    StorageService.Login.next(null);
  }
}