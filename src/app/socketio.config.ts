import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

export const socketio_config: SocketIoConfig = {
  url: environment.socketUrl, 
  options: {}
};
