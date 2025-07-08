class TaskModel {
  constructor() {
    this.tasks = [];
  }

  getAll() {
    return this.tasks;
  }

  getById(id) {
    return this.tasks.find(task => task.id === id);
  }

  add(task) {
    // Validaciones de campos obligatorios y tipos
    if (
      typeof task.id === 'undefined' ||
      typeof task.title !== 'string' ||
      typeof task.description !== 'string' ||
      typeof task.completed !== 'boolean' ||
      typeof task.priority !== 'number'
    ) {
      throw new Error('Datos incompletos o inválidos');
    }
    // Validación de prioridad
    if (task.priority < 1 || task.priority > 5) {
      throw new Error('La prioridad debe estar entre 1 y 5');
    }
    // Validación de ID único
    if (this.getById(task.id)) {
      throw new Error('ID duplicado');
    }
    this.tasks.push(task);
    return task;
  }

  update(id, data) {
    const task = this.getById(id);
    if (!task) return null;
    // Solo se permite actualizar el estado completed
    if (typeof data.completed !== 'boolean') {
      throw new Error('El campo completed debe ser booleano');
    }
    task.completed = data.completed;
    return task;
  }

  delete(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  getSummary() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = this.tasks.filter(t => !t.completed);
    const averagePriority = pending.length
      ? pending.reduce((sum, t) => sum + t.priority, 0) / pending.length
      : 0;
    return { total, completed, averagePriority };
  }
}

export default new TaskModel();
