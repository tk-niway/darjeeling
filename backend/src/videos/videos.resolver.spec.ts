import { Test, TestingModule } from '@nestjs/testing';
import { VideosResolver } from './videos.resolver';

describe('VideosResolver', () => {
  let resolver: VideosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosResolver],
    }).compile();

    resolver = module.get<VideosResolver>(VideosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
