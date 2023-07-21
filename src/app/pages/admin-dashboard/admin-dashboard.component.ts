import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { saveAs } from "file-saver";
import { User } from "src/app/Entity/UserModel";
import { UserAuthService } from "src/app/services/user-auth.service";
import { UserServiceService } from "src/app/services/user-service.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent {
  users: User[];

  constructor(private user: UserServiceService,private auth:UserAuthService,private router:Router) {}

  ngOnInit() {

    if(!this.auth.isLoggedIn){
      this.router.navigate(["/login"]);
    }

    this.user.getAllUsers().then((res) => {
      this.users = res.data;
      console.log(this.users)
    });
  }

  exportDataAsTable(): void {
    if (this.users.length === 0) {
      console.error("Data array is empty. Nothing to export.");
      return;
    }

    const headers = Object.keys(this.users[0]);
    const headerRow = headers.join("\t");
    const rows = this.users.map((item) => headers.map((header) => item[header]).join("\t"));
    const table = [headerRow, ...rows].join("\n");

    const blob = new Blob([table], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "data.txt");
  }
}
