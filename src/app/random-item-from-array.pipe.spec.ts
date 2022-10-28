import { RandomItemFromArrayPipe } from './random-item-from-array.pipe';

describe('RandomItemFromArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new RandomItemFromArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
