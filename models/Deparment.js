const { findAllDepartments, createDepartment, updateDepartment, deleteDepartment } = require('../db/queries');

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async findAll() {
    const rows = await findAllDepartments();
    return rows.map((row) => new Department(row.id, row.name));
  }

  static async create(name) {
    const result = await createDepartment(name);
    return new Department(result.insertId, name);
  }

  static async update(id, name) {
    await updateDepartment(id, name);
    return new Department(id, name);
  }

  static async delete(id) {
    await deleteDepartment(id);
  }
}

module.exports = Department;