import { Action } from 'overmind';
import { StateImageId } from './state';
import * as mutations from './mutations';
import * as operations from './operations';
import { FileWithPreview } from 'react-dropzone';

export const removeImage: Action<StateImageId> = ({ mutate }) => mutate(mutations.removeImage);

export const addImages: Action<Array<FileWithPreview>> = ({ map }) =>
  map(operations.mapFileToStateImage).mutate(mutations.addImages);
