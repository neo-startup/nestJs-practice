import { AuthService } from './../auth/auth.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/commons/decorators/user.decorator';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly AuthService: AuthService,
  ) {}

  @Post()
  async signUp(@Body() body: CreateCatDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  logIn(@Body() body: LoginRequestDto) {
    return this.AuthService.jwtLogin(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
