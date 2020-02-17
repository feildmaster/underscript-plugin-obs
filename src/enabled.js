import underscript from './underscript';
import { settings } from './plugin';

const ALWAYS = 'Always';
const STREAMER_MODE = 'Streamer Mode only';

const setting = settings().add({
  name: 'Connect to OBS',
  key: 'enable',
  options: ['Never', ALWAYS, STREAMER_MODE],
});

export default function enabled() {
  return setting.value() === ALWAYS || setting.value() === STREAMER_MODE && underscript.streamerMode();
}

