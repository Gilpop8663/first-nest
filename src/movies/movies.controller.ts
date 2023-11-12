import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getMovieList() {
    return 'all Movies';
  }

  @Get('/:id')
  getMovieDetail(@Param('id') movieId: number) {
    return `아이디임 ${movieId} `;
  }

  @Post()
  createMovie(@Body() movieData) {
    return '무비 생성';
  }

  @Patch('/:id')
  updateMovie(@Param('id') movieId, @Body() movieData) {
    return '무비 생성';
  }

  @Delete('/:id')
  removeMovie(@Param('id') movieId) {
    return '영화 삭제';
  }
}
