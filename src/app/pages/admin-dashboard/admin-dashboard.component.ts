import { Component } from "@angular/core";
import { User } from "src/app/Entity/UserModel";
import { UserServiceService } from "src/app/services/user-service.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent {
  users: User[];

  constructor(private user: UserServiceService) {}

  ngOnInit() {
    this.user.getAllUsers().then((res) => {
      this.users = res.data;
      console.log(this.users)
    });
  }
}
