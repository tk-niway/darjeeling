import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from 'src/utils/utils.service';

describe('UtilsService', () => {
  let utilsService: UtilsService;

  beforeAll(async () => {
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

  describe('generateEdges', () => {
    it('should generate correct edges', () => {
      const edges = utilsService.generateEdges([{ id: '1' }, { id: '2' }]);

      expect(edges).toEqual([
        { node: { id: '1' }, cursor: '1' },
        { node: { id: '2' }, cursor: '2' },
      ]);
    });

    it('should generate empty edges', () => {
      const edges = utilsService.generateEdges([]);

      expect(edges).toEqual([]);
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

    it('should generate empty page info', () => {
      const pageInfo = utilsService.generatePageInfo({
        skip: 0,
        take: 10,
        totalCount: 0,
        edges: [],
      });

      expect(pageInfo).toEqual({
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '',
        endCursor: '',
      });
    });
  });

  describe('generateStartCursor', () => {
    it('should return the start cursor', () => {
      const startCursor = utilsService.generateStartCursor([
        { node: { id: '1' }, cursor: '1' },
        { node: { id: '2' }, cursor: '2' },
      ]);

      expect(startCursor).toBe('1');
    });

    it('should return an empty string', () => {
      const startCursor = utilsService.generateStartCursor([]);

      expect(startCursor).toBe('');
    });
  });

  describe('generateEndCursor', () => {
    it('should return the end cursor', () => {
      const endCursor = utilsService.generateEndCursor([
        { node: { id: '1' }, cursor: '1' },
        { node: { id: '2' }, cursor: '2' },
      ]);

      expect(endCursor).toBe('2');
    });

    it('should return an empty string', () => {
      const endCursor = utilsService.generateEndCursor([]);

      expect(endCursor).toBe('');
    });
  });

  describe('splitFilename', () => {
    it('should split the filename', () => {
      const result = utilsService.splitFilename('file.txt');

      expect(result).toEqual({ name: 'file', extension: 'txt' });
    });

    it('should split the filename without an extension', () => {
      const result = utilsService.splitFilename('file');

      expect(result).toEqual({ name: 'file', extension: '' });
    });
  });

  describe('findManyArgsValidation', () => {
    it('should validate the arguments', () => {
      const result = utilsService.findManyArgsValidation({
        skip: 0,
        take: 10,
        cursor: '1',
        where: { id: '1' },
        orderBy: { id: 'asc' },
      });

      expect(result).toEqual({
        skip: 0,
        take: 10,
        cursor: '1',
        where: { id: '1' },
        orderBy: { id: 'asc' },
      });
    });

    it('should validate the arguments with defaults', () => {
      const result = utilsService.findManyArgsValidation({
        skip: 0,
        take: 10,
        cursor: null,
        where: { id: '1' },
        orderBy: null,
        distinct: null,
      });

      expect(result).toEqual({
        skip: 0,
        take: 10,
        cursor: undefined,
        where: { id: '1' },
        orderBy: undefined,
        distinct: undefined,
      });
    });
  });
});
