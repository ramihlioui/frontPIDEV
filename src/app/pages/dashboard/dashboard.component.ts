import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
// core components

import {MatPaginator, PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  finish_task: any
  ongoing_task:any

  pageSize = 5;
  page = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;




  constructor() {
  }

  ngAfterViewInit(): void {

    }
  ngOnInit() {






  }


  public updateOptions() {

  }

  onPageChanged($event: PageEvent) {
    this.page =$event.pageIndex
    this.pageSize =$event.pageSize
  }
}
