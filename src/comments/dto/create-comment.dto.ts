import { PickType } from '@nestjs/mapped-types';
import { Comment } from '../comments.schema';

export class CreateCommentDto extends PickType(Comment, [
  'author',
  'contents',
] as const) {}
