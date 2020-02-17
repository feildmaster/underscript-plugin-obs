import { settings } from './plugin';

export const USE_ACTIVE = 'Use Active';

export const address = settings().add({
  name: 'Socket Address',
  key: 'address',
  type: 'text',
  default: 'localhost:4444', 
});

export const password = settings().add({
  name: 'Socket Password',
  key: 'password',
  type: 'password',
});

export const scene = settings().add({
  name: 'Scene Name',
  key: 'scene',
  type: 'text',
  default: USE_ACTIVE,
});
