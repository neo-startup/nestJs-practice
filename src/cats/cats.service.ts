import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CreateCatDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('이미 존재하는 고양이입니다.');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const Cat = await this.catsRepository.create({
        email,
        name,
        password: hashedPassword,
      });

      return Cat.readOnlyData;
    }
  }

  async getAllCat() {
    const cats = await this.catsRepository.findAllCats();
    const readOnlyCats = cats.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
