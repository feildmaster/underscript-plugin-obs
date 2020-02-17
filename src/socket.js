import enabled from './enabled';
import { logger, toast } from './plugin';
import { USE_ACTIVE, address, password, scene } from './socketSettings';

export let activeScene = '';
export const obs = new OBSWebSocket();

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

export function getScene() {
  if (scene.value() === USE_ACTIVE) {
    return activeScene;
  }
  return scene.value();
}

function socketError(err) {
  logger.error('Socket Error:', err);
  toast({
    title: 'Socket Error:',
    error: err,
  });
}
