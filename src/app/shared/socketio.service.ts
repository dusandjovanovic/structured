import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

export class SocketioService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public addNode(node) {
    this.socket.emit('new-node', node);
  }

  public receiveNode = () => {
    return Observable.create((observer) => {
      this.socket.on('new-node', (node) => {
        console.log('newNode:: ', node);
        observer.next(node);
      });
    });
  }

  public addEdge(edge) {
    this.socket.emit('new-edge', edge);
  }

  public receiveEdge = () => {
    return Observable.create((observer) => {
      this.socket.on('new-edge', (edge) => {
        observer.next(edge);
      });
    });
  }

  public receiveMessage = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }
}
