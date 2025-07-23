import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
import { beforeEach } from "bun:test";

// Setup JSDOM environment for Bun tests
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost:3000",
  pretendToBeVisual: true,
  resources: "usable",
});

// Set up DOM globals immediately
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLInputElement = dom.window.HTMLInputElement;
global.HTMLButtonElement = dom.window.HTMLButtonElement;
global.HTMLFormElement = dom.window.HTMLFormElement;
global.Text = dom.window.Text;
global.Element = dom.window.Element;
global.Event = dom.window.Event;
global.MouseEvent = dom.window.MouseEvent;
global.KeyboardEvent = dom.window.KeyboardEvent;
global.FormData = dom.window.FormData;
global.PointerEvent = dom.window.PointerEvent;
global.getComputedStyle = dom.window.getComputedStyle;
global.MutationObserver = dom.window.MutationObserver;
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
global.requestAnimationFrame = (callback: FrameRequestCallback) =>
  setTimeout(callback, 0);
global.cancelAnimationFrame = (id: number) => clearTimeout(id);

// Patch dispatchEvent to handle Radix UI's custom event dispatching
const originalDispatchEvent = dom.window.EventTarget.prototype.dispatchEvent;
global.EventTarget.prototype.dispatchEvent = function (event: Event | unknown) {
  // If Radix UI passes something that's not an Event, wrap it
  if (!(event instanceof Event)) {
    // Create a CustomEvent if a non-Event object is passed
    const customEvent = new CustomEvent("radix-event", {
      detail: event,
      bubbles: true,
      cancelable: true,
    });
    return originalDispatchEvent.call(this, customEvent);
  }
  return originalDispatchEvent.call(this, event);
};

beforeEach(() => {
  // Clear and reset DOM for each test
  document.body.innerHTML = "";

  // Create portal root for Radix UI
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "radix-portal-root");
  document.body.appendChild(portalRoot);
});
