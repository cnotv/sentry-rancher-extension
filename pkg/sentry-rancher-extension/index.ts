import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import { sentryInit } from './config/sentry';
import extensionRouting from './routing/extension-routing';

// Init the package
export default function(plugin: IPlugin, globals: any): void {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  // Load a product
  sentryInit(globals.vueApp, globals.store.$router);

  // Load a product
  plugin.addProduct(require('./product'));
  
  // Add Vue Routes
  plugin.addRoutes(extensionRouting);
}
