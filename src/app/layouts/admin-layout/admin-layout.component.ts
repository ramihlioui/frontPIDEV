import { Component } from "@angular/core";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
/*implements AfterViewInit*/
export class AdminLayoutComponent {
  public hideUI = false;

  constructor(/*private route: ActivatedRoute*/) {}

  // ngAfterViewInit() {
  //   this.route.firstChild.firstChild.data.subscribe(v=>{
  //     console.log(v);
  //     if(v.hideUI) this.hideUI = true
  //   })
  // }
}
