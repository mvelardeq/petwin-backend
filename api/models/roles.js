import {Schema,model} from 'mongoose'

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true,'Role is required']
    }
})

export const Role = model('Role', RoleSchema)