import underscript from './underscript';
import { eventManager, PLUGIN_NAME } from './plugin';
import snipeShield from './snipeShield';
import { connect } from './socket';

// UnderScript is required
if (underscript) {
  setup();
} else {
  warn();
}

function setup() {
  underscript.onPage('Game', () => {
    connect();

    eventManager.on('getShowMulligan', () => {
      snipeShield(true);
      window.mulliganDialog.options.onhidden = () => {
        snipeShield(false);
      };
    });
  });
}

function warn() {
  console.error(`${PLUGIN_NAME}: UnderScript required`);

  const key = `${PLUGIN_NAME}.alerted`;
  if (localStorage.getItem(key)) return;

  let alerted = true;
  
  if (window.SimpleToast) {
    new SimpleToast({
      title: 'Missing Requirements',
      text: 'UnderScript is required for this script to work',
      footer: PLUGIN_NAME,
    });
  } else if (window.BootstrapDialog) {
    BootstrapDialog.show({
      title: 'Oh No!',
      type: BootstrapDialog.TYPE_WARNING,
      message: 'UnderScript required',
      buttons: [{
        label: 'Proceed',
        cssClass: 'btn-primary',
        action(dialog) {
          dialog.close();
        },
      }],
    });
  } else {
    alerted = false;
  }

  if (alerted) localStorage.setItem(key, '1');
}
