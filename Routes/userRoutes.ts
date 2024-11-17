import express from 'express';
import { check, validationResult } from 'express-validator';
import userService from '../services/userService';
import { User } from '../models/userModel';

const router = express.Router();

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un usuario
router.post(
  '/users',
  [
    check('name').notEmpty().withMessage('El nombre es requerido'),
    check('email').isEmail().withMessage('El correo debe ser válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('phone').isNumeric().withMessage('El teléfono debe ser numérico'),
    check('type').notEmpty().withMessage('El tipo de usuario es requerido'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, phone, type, age, city } = req.body;
      const newUser: Omit<User, 'id' | 'registration'> = { name, email, password, phone, type, age, city };
      const addedUser = await userService.addUser(newUser);

      res.status(201).json(addedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Actualizar un usuario
router.put(
  '/users/:id',
  [
    check('email').optional().isEmail().withMessage('El correo debe ser válido'),
    check('phone').optional().isNumeric().withMessage('El teléfono debe ser numérico'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
