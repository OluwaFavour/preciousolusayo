export type AppId = 'contacts' | 'files' | 'health' | 'notes' | 'calendar' | 'photos' | 'settings' | 'reminders' | 'safari' | 'mail' | 'messages' | 'phone';
export type Theme = 'light' | 'dark';

export interface AppContext {
  openApp: (app: AppId, route?: string) => void;
  home: () => void;
  toast: (message: string) => void;
  getTheme: () => Theme;
  setTheme: (theme: Theme) => void;
  getReducedMotion: () => boolean;
  setReducedMotion: (reduced: boolean) => void;
}

export interface AppDefinition {
  id: AppId;
  name: string;
  subtitle: string;
  color: string;
}
