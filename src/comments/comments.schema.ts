import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @Prop({ required: true, default: 0 })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
