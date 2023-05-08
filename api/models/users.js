import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
  profilePhoto: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  google:{
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    enum:['USER_ROLE', 'DBA_ROLE', 'ADMIN_ROLE', 'SUPERADIN_ROLE'], //client, admin, dba
  }
});

export const User = model('User', UserSchema)