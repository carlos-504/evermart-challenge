import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    taxdocument: {
      cpf: {
        type: String,
      },
      rg: {
        type: String,
      },
    },
    skills: [
      {
        type: String,
      },
    ],
  },
  { collection: 'Users' }
);

const Users = mongoose.model('Users', UsersSchema);

export default Users;
