import { toast, settings } from './plugin';
import { connected, activeScene, obs } from './socket';

const USE_ACTIVE = 'Use Active';
const BLANK_TOAST = {
  close: () => {},
};

let snipeToast = BLANK_TOAST;

const scene = settings().add({
  name: 'Snipe Scene',
  key: 'sniperScene',
  type: 'text',
  default: USE_ACTIVE,
});

const snipeSource = settings().add({
  name: 'Snipe Source',
  key: 'sniperSource',
  type: 'text',
  default: 'Image',
});

export default function snipeShield(render = false) {
  if (!connected()) return;

  obs.send('SetSourceRender', {
    render,
    'scene-name': scene.value() === USE_ACTIVE ? activeScene : scene.value(),
    source: snipeSource.value(),
  }).then(() => {
    if (render) snipeToast = toast('Snipe Shield on') || BLANK_TOAST; // If it ever fails?
    else snipeToast.close();
  }).catch((err) => {
    toast({
      title: 'Snipe Shield failed',
      text: err.description,
      error: true,
    });
  });
}

