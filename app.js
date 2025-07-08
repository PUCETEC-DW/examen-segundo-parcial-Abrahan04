import express from 'express';
import tasksRouter from './routes/taskRoutes.js';

const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

export default app;

// Solo inicia el servidor si este archivo es ejecutado directamente
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
}

