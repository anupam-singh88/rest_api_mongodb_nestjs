import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL, UserDocument } from 'src/MongooseModel/user/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createedUser = await this.userModel.create(createUserDto);

      return createedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.log(error);
        throw new BadRequestException(error.error);
      }
      throw new ServiceUnavailableException('Something went wrong');
    }
  }

  async findAll() {
    const users = await this.userModel.find();
    return users.length === 0
      ? {
          message: 'No users found!',
          status: 404,
        }
      : users;
  }
  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User Not Found!!');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true, // return the updated document rather than the original one
      },
    );

    if (!updateUser) throw new NotFoundException('User Not Found!!');

    return updateUser;
  }
  async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);

    if (!deleteUser) throw new NotFoundException('User Not Found!!');

    return {
      _id: deleteUser._id,
      message: 'User Deleted Successfully!!',
    };
  }
}
