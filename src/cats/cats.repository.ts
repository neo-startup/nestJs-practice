import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string) {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CreateCatDto) {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string) {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(id: string) {
    const cat = await this.catModel.findById(id).select('-password');
    return cat;
  }

  async findAllCats() {
    const cats = await this.catModel.find();
    return cats;
  }
}
