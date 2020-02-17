import { toast, settings } from './plugin';
import { connected, getScene } from './socket';

const BLANK_TOAST = {
  close: () => {},
};

let snipeToast = BLANK_TOAST;

// snipeScene should go here

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
    'scene-name': getScene(),
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

