/* eslint-disable no-alert */
/* eslint-disable no-console */
import io from 'socket.io-client';
import axios from 'axios';
import SocketState from '../states/SocketState';

const WebSocketService = () => {
  this.status = 'idle';
  const connect = (meterId) => {
    SocketState.set('status', 'pending');
    axios.get(`https://mybuzzn-backend.buzzn.net/live?meter_id=${meterId}`, { withCredentials: true }).then(() => {
      // eslint-disable-next-line no-var
      window.socket = io('https://mybuzzn-backend.buzzn.net/live', {
        autoConnect: false,
        query: {
          meter_id: meterId,
        },
      });
      window.socket.open();

      window.socket.on('connect', () => {
        window.socket.emit('my_event', { data: 'connected' });
        SocketState.set('status', 'connected');
      });

      window.socket.on('live_data', (message) => {
        if (message.data.startsWith('Connected')) {
          return;
        }
        const data = JSON.parse(message.data);
        let groupConsumption = 0;
        data.group_users.forEach((a) => {
          groupConsumption += a.power;
        });
        SocketState.set('group_consumption', groupConsumption);
        SocketState.set('group_production', data.group_production);
        SocketState.set('group_users', data.group_users);
      });

      window.socket.on('disconnect', () => {
        window.socket.emit('my_event', { data: 'disconnected' });
        window.socket.disconnect();
      });
    });
  };
  return {
    connect,
  };
};

export default WebSocketService();

// curl 'http://mybuzzn-backend.buzzn.net/socket.io/?meter_id=52d7c87f8c26433dbd095048ad30c8cf&EIO=3&transport=polling&t=N154NgW' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Accept: */*' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36' -H 'Referer: http://localhost:8088/' -H 'Accept-Language: de-DE,de;q=0.9,en-DE;q=0.8,en;q=0.7,en-US;q=0.6' -H 'Cookie: io=cb88045e433a432c97858ef0c1ec7113; access_token_cookie=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODE2OTYyNjcsIm5iZiI6MTU4MTY5NjI2NywianRpIjoiM2E2OTZlNDctMTI4YS00MDBjLWIxZWYtNmQxYTk4ZGEzNWMwIiwiZXhwIjoxNTgxNjk3MTY3LCJpZGVudGl0eSI6MywiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwiY3NyZiI6IjU4N2NhZDNlLTA3MTMtNGQ5YS05ZWQ4LTFkYmIzYzMwZmU1MCJ9.kr4x75pMbYw1eNOAR2IBWIJ6wYk02ZnzdrvcVNDIScg; csrf_access_token=587cad3e-0713-4d9a-9ed8-1dbb3c30fe50; session=eyJtZXRlcl9pZCI6IiJ9.XkbtFQ.HV7zYJf76YHhJfj4jNxoOV-ToXg' --compressed
