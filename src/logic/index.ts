import { TConnect, createConnect, createHook } from 'overmind-react';
import { Overmind, TConfig } from 'overmind';
import * as effects from './effects';
import * as actions from './actions';
import state from './state';

type Config = {
  state: typeof state;
  actions: typeof actions;
  effects: typeof effects;
};

const config: Config = {
  actions,
  state,
  effects,
};

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

const app = new Overmind(config);

export type ConnectProps = TConnect<typeof app>;

export const connect = createConnect(app);
export const useOvermind = createHook(app);

export default app;
