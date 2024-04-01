// src/shared/fileTypes.ts

export type DirectoryError = 'ENOENT' | 'EACCESS' | 'EOTHER';

// null ≙ not yet loaded, empty array ≙ no files in folder, number ≙ invalid/unreachable dir
export type FileList = string[] | null | number | DirectoryError;

export interface Settings {
  theme: string;
  language: string;
  // TODO zoom: number;
  // TODO also a few globals
  // TODO homeDir: string;
}
