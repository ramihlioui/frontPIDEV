import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UserAuthService} from "../services/user-auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor
{
  constructor(private userAuth:UserAuthService,private router:Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') == 'True')
    {
      return next.handle(req.clone());

    }
    const token:any = this.userAuth.getToken();
    req  = this.addToken(req,token);


return next.handle(req).pipe(
  catchError(
    (err:HttpErrorResponse) =>
    {

      let errorMessage
      if (err.error instanceof ErrorEvent) {
        errorMessage = `Error: ${err.error.message}`;
      } else {
        errorMessage = `Error Code: ${err.error.message}`;
      }
      Swal.fire(
        'Error',
        errorMessage,
        'error'
      )
      if (err.status == 401)
      {
this.router.navigate([('/Login')]);
      }
      else if(err.status == 403)
      {
        this.router.navigate([('/forbidden')])
      }
      return throwError("Something is wrong")
    }


  )
);

  }
  private addToken(request:HttpRequest<any>,token:string)
  {
    return request.clone(
      {
        setHeaders : {
          Authorization : `Bearer ${token}`
        }
      }

    )

  }

}
