import { Component, OnInit } from '@angular/core';
import {SocketioService} from '../shared/socketio.service';
import {log} from 'util';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  messages = [];
  replyMessage = '';

  constructor(private socketioService: SocketioService) { }

  sendMessage() {
    this.socketioService.sendMessage(this.replyMessage);
    this.replyMessage = '';
  }

  ngOnInit() {
    this.socketioService
      .receiveMessage()
      .subscribe((message: object) => {
        console.log('message:: ', message);
        this.messages.push({
          text: message,
          self: false,
          time: new Date()
        });
      });
  }

  reply(){
    this.messages.push({
      text: this.replyMessage,
      self: true,
      time: new Date()
    })
    this.sendMessage();
  }

}
