import { CreateUserDto } from './create-user.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserDto, ['accountType', 'metadata']),
) {}
