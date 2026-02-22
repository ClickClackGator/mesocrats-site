// src/lib/plausible.ts
//
// Plausible Analytics custom event helper.
// Use trackEvent() to fire custom goals in Plausible.
//
// Usage:
//   trackEvent("Form Submission", { form: "join" })
//   trackEvent("PDF Download", { paper: "the-12-5-percent-plan" })

type PlausibleArgs = [string, { props: Record<string, string> }];

declare global {
  interface Window {
    plausible?: (...args: PlausibleArgs) => void;
  }
}

export function trackEvent(
  eventName: string,
  props?: Record<string, string>
): void {
  if (typeof window === "undefined") return;
  if (window.plausible) {
    window.plausible(eventName, { props: props ?? {} });
  }
}
