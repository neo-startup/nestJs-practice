import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsString()
  email: string;

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    email: this.email,
    name: this.name,
  };
});
