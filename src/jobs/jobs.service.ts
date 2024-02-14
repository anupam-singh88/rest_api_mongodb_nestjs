import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../users/users.service';
import { CreateJobDTO, UpdateJobDTO } from './dto';
import { ACCOUNT_TYPE } from '../constants';
import { JOB_MODEL, JobDocument } from 'src/MongooseModel/job';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JOB_MODEL) private readonly jobModel: Model<JobDocument>,
    private readonly usersService: UserService,
  ) {}

  async create(createJobDto: CreateJobDTO) {
    const user = await this.usersService.findOne(createJobDto.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    } else if (user.accountType !== ACCOUNT_TYPE.EMPLOYER) {
      throw new ForbiddenException('Only employer can create job');
    }

    return this.jobModel.create({
      ...createJobDto,
      employer: createJobDto.userId,
    });
  }

  findAll() {
    return this.jobModel.find();
  }

  async findOne(id: string) {
    const job = await this.jobModel.findById(id);
    // const job = await this.jobModel.findById(id).populate('employer');

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDTO) {
    const updatedJob = await this.jobModel.findByIdAndUpdate(id, updateJobDto, {
      new: true,
    });

    if (!updatedJob) {
      throw new NotFoundException('Job not found');
    }

    return updatedJob;
  }

  async remove(id: string) {
    const deletedJob = await this.jobModel.findByIdAndDelete(id);

    if (!deletedJob) {
      throw new NotFoundException('Job not found');
    }

    return {
      _id: id,
    };
  }
}
