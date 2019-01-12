import { State as SecurityState } from './security/data/reducer';
import { State as CoreState } from './core/data/reducer';

export default interface State
{
  security: SecurityState,
  core: CoreState
}
