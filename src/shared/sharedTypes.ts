// src/shared/sharedTypes.ts
export type DirectoryError = 'ENOENT' | 'EACCESS' | 'EOTHER';

// null ≙ not yet loaded, empty array ≙ no files in folder, number ≙ invalid/unreachable dir
export type FileList = string[] | null | number | DirectoryError;

export interface Settings { // TODO: still used?
  theme: string;
  language: string;
  // TODO zoom: number;
  // TODO also a few globals
  // TODO homeDir: string;
}

export interface HostInfos {
  version: string;
  homeDir: string;
  stateDir: string; // where our state-preserving json is stored
  workspaceDir: string;
}


// State ███████████████████████████
export interface StateView {
  className: string;
  collapsed: boolean;
  props: object;
}

export interface AppState {
  views: StateView[];
}

export const defaultAppState: AppState =  {
  views: [
    {
      className: 'ViewDir',
      collapsed: false,
      props: {
        path: '~'
      }
    },
    {
      className: 'ViewTerm',
      collapsed: false,
      props: {
        path: 'C:\\depot\\some'
      }
    }
  ]
}
