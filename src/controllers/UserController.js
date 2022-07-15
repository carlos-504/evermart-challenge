import writeXlsxFile from 'write-excel-file/node';
import Users from '../models/Users';
import Utils from '../utils';

export default class GateKepperController {
  constructor() {}

  async getUsers(req, res) {
    try {
      let users = await Users.find().lean();

      const usersRet = users.map((user) => {
        const { created_at } = user;

        user.created_at = Utils.formatDate(created_at, 'numeric');

        return user;
      });

      return res.send(usersRet);
    } catch (err) {
      return res.status(400).send({ ...err, error_message: err.message });
    }
  }

  async generateXLS(req, res) {
    try {
      const HEADER_ROW = [
        {
          value: 'Nome',
          fontWeight: 'bold',
        },
        {
          value: 'Email',
          fontWeight: 'bold',
        },
        {
          value: 'Data de criação',
          fontWeight: 'bold',
        },
      ];

      let users = await Users.find().lean();

      users = users.map((user) => {
        const { name, email, created_at, taxdocument, skills } = user;

        return {
          name,
          email,
          created_at,
          rg: taxdocument.rg,
          cpf: taxdocument.cpf,
          skills: skills.join(', '),
        };
      });

      const schema = [
        {
          column: 'Name',
          type: String,
          value: (user) => user.name,
        },
        {
          column: 'Email',
          type: String,
          value: (user) => user.email,
        },
        {
          column: 'RG',
          type: String,
          value: (user) => user.rg,
        },
        {
          column: 'CPF',
          type: String,
          value: (user) => user.cpf,
        },
        {
          column: 'Habilidades',
          type: String,
          value: (user) => user.skills,
        },
        {
          column: 'Data de Criação',
          type: Date,
          format: 'dd/mm/yyyy',
          value: (user) => user.created_at,
        },
      ];

      const response = await writeXlsxFile(users, {
        schema,
        filePath: `user.xlsx`,
      });

      return res.send(response);
    } catch (err) {
      return res.status(400).send({ ...err, error_message: err.message });
    }
  }
}
