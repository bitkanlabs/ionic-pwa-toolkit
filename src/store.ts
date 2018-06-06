import dva, { DvaInstance } from 'dva-core';
import models from './models';

/**
 *
 * @param {{}} initialState
 * @returns {any}
 */
export default function createStore(initialState = {}): any {
  const app: DvaInstance = dva({ initialState });
  models.forEach(m => app.model(m));
  app.start();

  return app._store;
}
