import { TestBed } from '@angular/core/testing';

import { MyapiserviceService } from './myapiservice.service';

describe('MyapiserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyapiserviceService = TestBed.get(MyapiserviceService);
    expect(service).toBeTruthy();
  });
});
