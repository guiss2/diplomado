import  {Router} from 'express';
import userController from '../controllers/users.controller.js';
//import { validate } from '../validators/validate.js';
import validate from '../validators/validate.js';
import { creatreUserSchema } from '../validators/user.validate.js';
import { authenticateToken } from '../middlewares/authenticate.js';
//paginacion
import { userPaginationSchema } from '../validators/user.validate.js';


const router = Router();

//Routes

// router.get('/', UserController.getUsers);
// router.post('/', UserController.createUser); 
//otra forma de haceer 
router
.route('/')
.get(userController.getUsers)
.post(validate(creatreUserSchema, 'body'), userController.createUser);
router
.route('/:id')
.get(authenticateToken, userController.getUser)
.put(authenticateToken, userController.updateUser)
.delete(authenticateToken, userController.deleteUser)
.patch(authenticateToken, userController.activateInactivate)


router.get('/:id/tasks', authenticateToken, userController.getTasks);

//paginacion
router.get('/list/pagination', validate(userPaginationSchema, 'query'), userController.getUsersPaginated);

export default router;