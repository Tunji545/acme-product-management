import { TestBed } from '@angular/core/testing';

import { SelectiveStrategyGuard } from './selective-strategy.guard';

describe('SelectiveStrategyGuard', () => {
  let guard: SelectiveStrategyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectiveStrategyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
