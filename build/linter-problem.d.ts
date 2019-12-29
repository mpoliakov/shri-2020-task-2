import { Location } from './utils';
export interface LinterProblem {
    code: string;
    error: string;
    location: Location;
}
