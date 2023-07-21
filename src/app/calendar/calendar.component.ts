
import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { AppointmentService } from '../services/appointments-service.service';
import { Appointment } from '../Entity/Appointment';
import * as moment from 'moment';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  sortedDays:any[]=[]

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;
  @ViewChild('modalIntervention', { static: true })
  modalIntervention!: TemplateRef<any>;
  @ViewChild('detailBackdrop')
detailView!: any;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  displayModal=false;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();


  activeDayIsOpen: boolean = true;
  btn: boolean = false;
  selectedMonthViewDay!: CalendarMonthViewDay;

  selectedDayViewDate!: Date;


  selectedDays: any[] = [];




 

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];


  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors.red },
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors.yellow },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];


  constructor(private modal: NgbModal,private appointmentService:AppointmentService) {}
  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe((res) => {
      //  console.log(res)
      res!.forEach((element: Appointment) => {
        this.events.push({
          id: element.id,
          start: startOfDay(
            new Date(
              moment(element.dateDebut).format('yyyy-MM-DD')
            )
          ),
          end: endOfDay(
            new Date(
              moment(element.dateFin).format('yyyy-MM-DD')
            )
          ),

          title: "RDV immo",
          color: colors.yellow,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        });
        this.viewDate = new Date();

        // console.log(this.events)
      });
    }),
      () => {
        //   console.log(errors)
      };  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
   
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  clickedDay(day: CalendarMonthViewDay): void {
    if (this.btn == true) {
      this.selectedMonthViewDay = day;
      console.log(this.selectedMonthViewDay);
      const selectedDateTime = this.selectedMonthViewDay.date.getTime();
      const dateIndex = this.selectedDays.findIndex(
        (selectedDay: any) => selectedDay.date.getTime() === selectedDateTime
      );
      if (dateIndex > -1) {
        delete this.selectedMonthViewDay.cssClass;
        this.selectedDays.splice(dateIndex, 1);
      } else {
        this.selectedDays.push(this.selectedMonthViewDay);
        day.cssClass = 'cal-day-selected';
        console.log(this.selectedDays);
        this.selectedMonthViewDay = day;

  this.sortedDays=this.selectedDays.sort((a,b)=>moment(a.date,'yyyy-MM-DD' ).diff(moment(b.date,'yyyy-MM-DD') ))
    /*  console.log(this.sortedDays)
      console.log(moment(this.sortedDays[0].date).format('DD-MM-yyyy'))
      console.log(moment(this.sortedDays[this.sortedDays.length-1].date).format('DD-MM-yyyy'))*/
      }
    }
  }
  changeStatus() {
    return (this.btn = true);
  }
  clear() {
    this.btn = false;
    this.selectedDays = [];
  //  delete this.selectedMonthViewDay.cssClass;
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


  /*****intervention */
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(JSON.stringify(items));
  }

}
