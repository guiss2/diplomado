 import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import { Status } from '../constants/index.js';
import { encriptar } from "../common/bcrypt.js"; 
//paginacion
import { Op } from 'sequelize'; 

async function getUsers(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'password', 'status'],
      order: [['id', 'DESC']],
      where: {
        status: Status.ACTIVE,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
    l
  }
}

async function createUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    })
    res.json(user)

  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ['username', 'password', 'status'],
      where: {
        id,
      },
    });
    if (!user) res.status(404).json({ message: 'User not Found' })
    res.json(user);
  } catch (error) {
    next(error);
  }
}
async function updateUser(req, res, next) {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    if (!username && !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }
  const passwordEncriptado = await encriptar(password);
  const user = await User.update({
      username,
      password: passwordEncriptado,
    },
      {
        where: { 
          id,
         },
      }
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function activateInactivate(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!status) res.status(400).json({ message: 'Status is required' });
      const user = await User.findByPk(id);
      if (!user) res.status(404).json({ message: 'User not found' });
    if (user.status ===status)
      res.status(409).json({ message: `same status` });
    user.status = status;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function getTasks(req, res, next) {
  console.log('entrooo');
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ['username'],
      include: [{
        model: Task,
        attributes: ['name', 'done'],
        where: {
          done: false
        },
      }],
      where: {
        id
      }
    })
    res.json(user);
  } catch (error) {
    next(error);
  }
}

//paginacion
async function getUsersPaginated(req, res, next) {
  try {
    // Extraemos los valores validados de req.query
    const { page, limit, search, orderBy, orderDir } = req.query;

    // Calculamos desde qué registro empezar (offset)
    const offset = (page - 1) * limit;

    // Si hay búsqueda, usamos ILIKE en username, si no buscamos todos
    const whereCondition = search
      ? { username: { [Op.iLike]: `%${search}%` } }
      : {};

    // Contamos el total de usuarios que cumplen la condición
    const total = await User.count({ where: whereCondition });

    // Buscamos los usuarios paginados y ordenados
    const users = await User.findAll({
      where: whereCondition,
      order: [[orderBy, orderDir]],
      limit,
      offset
    });

    // Calculamos cuántas páginas hay en total
    const pages = Math.ceil(total / limit);

    // Devolvemos los datos con formato limpio
    res.json({
      total,       // cantidad total de registros encontrados
      page,        // página actual
      pages,       // total de páginas
      data: users.map(user => ({
        id: user.id,
        username: user.username,
        status: user.status
      }))
    });

  } catch (error) {
    next(error); // pasamos el error al middleware de manejo
  }
}


export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  activateInactivate,
  getTasks,
  getUsersPaginated
};