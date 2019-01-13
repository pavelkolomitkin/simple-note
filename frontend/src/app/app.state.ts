import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';

export interface State
{
  security: securityReducer.State,
  core: coreReducer.State
}
