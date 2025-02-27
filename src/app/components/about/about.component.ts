import { Component, OnInit } from '@angular/core';
import { ITask } from '../tasks/itask';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../common/component.css']
})

export class AboutComponent implements OnInit {

  appName = 'InfoMann' 
  version = '07-05-23'
  about = `${this.appName}: v_${this.version}`
  info = `Create, Manage, Update, Store and Search Tasks,
          Appointments, Bills, Information, Howtos, 
          Track Realtime Portfolio Value of Fiat and Crypto Asset,
          All Enhanced with Interactive Search using Key Words`

  constructor(private taskService:TaskService) {}

  ngOnInit() {
    let noticeFrame:any = document.getElementById("about");
    let noticeFrameDoc = noticeFrame.contentWindow.document;

      let errMsg = "Failed To Load Version Information!"                
      this.taskService.loadVersionInfo('EXCLUSIVERSION').subscribe(fromDB => { 
                if(fromDB == undefined || fromDB == null || fromDB[0] == undefined || fromDB[0] == null)
                        noticeFrameDoc.body.innerHTML = errMsg
                else{
                        let data = this.format(fromDB[0].notes)
                        noticeFrameDoc.body.innerHTML = data
                }
                console.log("fromDB:", fromDB[0])
      });

  }


format(data) {
       //data= data.replace(/<br>/g, '\n'); this screws up the break lines..
       data= data.replace(/~/g, "-");
       data= data.replace(/<>/g, "/");
       return data
}

} // End AboutComponent