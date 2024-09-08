import { FormGroup, FormControl } from '@angular/forms';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

export interface IProfile {
  id: number;
  uuid: string;
  identify: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  telephone: string;
  website: string;
  birthday: string;
  language: string;
}
