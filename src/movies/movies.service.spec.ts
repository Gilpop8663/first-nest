import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  const MOCK_MOVIE_INFO = {
    title: '공포의 밤',
    year: 2005,
    ganre: ['공포', '스릴러'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('영화 관련 함수를 테스트 한다.', () => {
    test('영화 목록은 배열 형태로 온다.', () => {
      const result = service.getMovieList();

      expect(result).toBeInstanceOf(Array);
    });

    test('영화를 생성한다.', () => {
      service.createMovie(MOCK_MOVIE_INFO);

      const result = service.getMovieDetail(1);

      expect(result.title).toEqaul(MOCK_MOVIE_INFO);
    });
  });

  describe('영화를 생성한 후 조회, 수정, 삭제를 테스트 한다.', () => {
    service.createMovie(MOCK_MOVIE_INFO);

    test('영화 상세 내역을 조회한다.', () => {
      const result = service.getMovieDetail(1);

      expect(result).toEqual(MOCK_MOVIE_INFO);
    });

    test('영화를 업데이트 한다. ', () => {
      service.updateMovie(1, { title: '나귀의 밤' });

      const result = service.getMovieDetail(1);

      expect(result.title).toBe('나귀의 밤');
    });

    test('영화를 삭제한다.', () => {
      service.removeMovie(1);

      const result = service.getMovieList();

      expect(result.length).toBe(0);
    });
  });

  describe('영화를 생성/수정할 때 잘못된 데이터가 온다면 에러 처리를 한다.', () => {
    test('영화 생성 시 잘못된 데이터로 생성한다면 404 에러를 보여준다.', () => {
      const result = service.createMovie({ hack: '해커임' });

      expect(result).toThrow();
    });

    test('영화 수정 시 잘못된 데이터로 생성한다면 404 에러를 보여준다.', () => {
      service.createMovie(MOCK_MOVIE_INFO);
      const result = service.updateMovie({ hack: '해커임' });

      expect(result).toThrow();
    });
  });
});
