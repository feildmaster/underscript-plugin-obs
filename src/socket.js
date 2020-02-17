import enabled from './enabled';
import { logger, toast, settings } from './plugin';

const address = settings().add({
  name: 'Socket Address',
  key: 'address',
  type: 'text',
  default: 'localhost:4444', 
});

const password = settings().add({
  name: 'Socket Password',
  key: 'password',
  type: 'password',
});

export let activeScene = '';
const obs = new OBSWebSocket();

obs.on('error', socketError);
obs.on('SwitchScenes', (data) => {
  activeScene = data.sceneName;
});

export function connected(state = WebSocket.OPEN) {
  return obs._socket && obs._socket.readyState === state;
}

export function connect() {
  if (!enabled() || connected() || connected(WebSocket.CONNECTING)) return;

  obs.connect({
    address: address.value(),
    password: password.value() || '',
  }).then(() => {
    logger.log('Connected');
    toast({
      text: 'Connected to OBS',
      timeout: 10000,
    });

    obs.send('GetSceneList').then((data) => {
      activeScene = data.currentScene;
    }).catch(console.error);
  }).catch((err) => {
    if (err instanceof Error) {
      socketError(err);
    } else {
      toast({
        title: 'Failed to connect to OBS',
        text: err.description,
        error: true,
      });
    }
  });
}

function socketError(err) {
  logger.error('Socket Error:', err);
  toast({
    title: 'Socket Error:',
    error: err,
  });
}
