import { App } from "@capacitor/app";

export function registerCapacitorListeners() {
  App.addListener("appStateChange", ({ isActive }) => {
    console.log(`[Capacitor] App is now ${isActive ? "active" : "inactive"}`);
    // You can refresh state or re-sync data here
  });
}
