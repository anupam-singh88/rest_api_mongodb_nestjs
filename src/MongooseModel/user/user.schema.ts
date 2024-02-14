import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from 'src/constants';
import { Address, AddressSchema } from '../common';
import { compare, hash } from 'bcrypt';

@Schema({
  timestamps: true,
  // toJSON: {
  //   transform: function (doc, ret) {
  //     delete ret.password;
  //     return ret;
  //   },
  // },
  // toObject: {
  //   transform: function (doc, ret) {
  //     delete ret.password;
  //     return ret;
  //   },
  // },
  // methods: {
  //   async isValidPassword(this: UserDocument, password: string) {
  //     const user = this;
  //     const isMatched = await compare(password, user.password);
  //     return isMatched;
  //   },
  // },
})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,

    //  select: false
  })
  password: string;

  @Prop()
  age?: number;

  @Prop()
  phone?: string;

  @Prop({
    type: String,
    enum: Object.keys(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.ACTIVE,
  })
  status?: ACCOUNT_TYPE;

  @Prop({
    type: String,
    enum: Object.keys(ACCOUNT_TYPE),
    immutable: true,
    required: true,
  })
  accountType: ACCOUNT_TYPE;

  @Prop({
    default: [],
  })
  social?: string[];

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({
    type: AddressSchema,
    required: true,
  })
  address: Address;

  @Prop(
    raw({
      reference: { type: String },
      beta: { type: Boolean },
    }),
  )
  metadata: Record<string, any> | any;

  // isValidPassword :(password: string) => Promise<boolean>;
}

export type UserDocument = User & Document;

export const USER_MODEL = User.name;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    const user = this;
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// UserSchema.method('isValidPassword', async function (password: string) {
//   const user = this;
//   const isMatched = await compare(password, user.password);
//   return isMatched;
// });
