import { App, createApp } from "vue";
import type { Router } from "vue-router";
import * as Sentry from "@sentry/vue";

export const sentryInit = (vueApp: ReturnType<typeof createApp>, router: Router) => {
  if (!vueApp || !router) { return; }

  const app: App<Element> = createApp({});
  app.config.errorHandler = vueApp.config.errorHandler;
  
  Sentry.init({
    app,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration({
        unblock: [".sentry-unblock, [data-sentry-unblock]"],
        unmask: [".sentry-unmask, [data-sentry-unmask]"],
      })
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
    tracePropagationTargets: ["localhost", process.env.VUE_APP_SENTRY_TARGET ?? ''],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
};
