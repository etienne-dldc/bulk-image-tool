import { useState, useChildren, createElement, useCallback } from 'democrat';
import { useShallowMemo } from './useShallowMemo';
import { SettingsStore } from './SettingsStore';
import { v4 as uuid } from 'uuid';
import { ImageTools } from '../utils/ImageTools';

export type StateImageId = string;

export type StateImage = {
  id: StateImageId;
  expanded: boolean;
  input: File;
};

export const AppStore = () => {
  const [files, setFiles] = useState<Array<StateImage>>([]);
  const [running, setRunning] = useState(false);
  const settings = useChildren(createElement(SettingsStore));

  const processAndDowloadZip = useCallback(async () => {
    setRunning(true);
    await ImageTools.downloadZip(files, settings);
    setRunning(false);
  }, [files, settings]);

  const addImage = useCallback((images: Array<File>) => {
    const stateFiles = images.map(
      (inputFile): StateImage => ({
        id: uuid(),
        input: inputFile,
        expanded: false
      })
    );
    setFiles(prev => [...prev, ...stateFiles]);
  }, []);

  const removeImage = useCallback((imageId: string) => {
    setFiles(files => {
      return files.filter(f => f.id !== imageId);
    });
  }, []);

  return useShallowMemo({
    files,
    settings,
    running,
    processAndDowloadZip,
    addImage,
    removeImage
  });
};
