import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/api', userRoutes);

// Configuración del servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
