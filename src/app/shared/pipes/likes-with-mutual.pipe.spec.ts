import { LikesWithMutualPipe } from './likes-with-mutual.pipe';

describe('LikesWithMutualPipe', () => {
  it('create an instance', () => {
    const pipe = new LikesWithMutualPipe();
    expect(pipe).toBeTruthy();
  });
});
