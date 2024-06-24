import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from 'src/utils/utils.service';

describe('Helper functions', () => {
  let utilsService: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    utilsService = module.get<UtilsService>(UtilsService);
  });

  describe('hasNextPage', () => {
    it('should return true if there are more pages', () => {
      expect(utilsService.hasNextPage(0, 10, 20)).toBe(true);
    });

    it('should return false if there are no more pages', () => {
      expect(utilsService.hasNextPage(10, 10, 20)).toBe(false);
    });
  });

  describe('hasPreviousPage', () => {
    it('should return true if there are previous pages', () => {
      expect(utilsService.hasPreviousPage(10)).toBe(true);
    });

    it('should return false if there are no previous pages', () => {
      expect(utilsService.hasPreviousPage(0)).toBe(false);
    });
  });

  describe('generatePageInfo', () => {
    it('should generate correct page info', () => {
      const pageInfo = utilsService.generatePageInfo({
        skip: 0,
        take: 10,
        totalCount: 20,
        edges: [
          { node: { id: '1' }, cursor: '1' },
          { node: { id: '2' }, cursor: '2' },
        ],
      });

      expect(pageInfo).toEqual({
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: '1',
        endCursor: '2',
      });
    });
  });
});
