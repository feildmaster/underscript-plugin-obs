import underscript from './underscript';

export const PLUGIN_NAME = 'OBS Hook';

export const plugin = underscript && underscript.plugin(PLUGIN_NAME) || {};

export const {
  settings,
  events: eventManager,
  logger,
  toast,
} = plugin;

export default plugin;
