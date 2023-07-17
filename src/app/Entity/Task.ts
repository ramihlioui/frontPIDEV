import {DatePipe} from "@angular/common";

export class Task{

  taskId:string|undefined;
  taskName:string|undefined;
  status:string|undefined;
creationTime:DatePipe|undefined;
priority:string|undefined;

  taskAssignee:string|undefined;
}
