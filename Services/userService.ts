import userRepository from '../repositories/userRepository';
import { User } from '../models/userModel';

async function getAllUsers(): Promise<User[]> {
  return await userRepository.getUsers();
}

async function addUser(user: Omit<User, 'id' | 'registration'>): Promise<User> {
  if (!user.name || !user.email || !user.password) {
    throw new Error('El usuario debe tener un nombre, correo electrónico y contraseña.');
  }

  const users = await userRepository.getUsers();

  const newId = users.length > 0 ? (Math.max(...users.map(u => parseInt(u.id))) + 1).toString() : '1';
  const newUser: User = {
    ...user,
    id: newId,
    registration: new Date().toISOString(),
  };

  users.push(newUser);
  await userRepository.saveUsers(users);

  return newUser;
}

async function updateUser(id: string, updatedUser: Partial<Omit<User, 'id' | 'registration'>>): Promise<User> {
  const users = await userRepository.getUsers();
  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    throw new Error('Usuario no encontrado');
  }

  users[index] = { ...users[index], ...updatedUser };

  await userRepository.saveUsers(users);
  return users[index];
}

async function deleteUser(id: string): Promise<{ message: string }> {
  const users = await userRepository.getUsers();
  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    throw new Error('Usuario no encontrado');
  }

  const filteredUsers = users.filter(user => user.id !== id);
  await userRepository.saveUsers(filteredUsers);

  return { message: 'Usuario eliminado' };
}

export default {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
