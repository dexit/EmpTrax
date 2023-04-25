const { findAllRoles, createRole, updateRole, deleteRole } = require('../db/queries');

class Role {
  constructor(id, title, salary, department_id) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }

  static async findAll() {
    const rows = await findAllRoles();
    return rows.map((row) => new Role(row.id, row.title, row.salary, row.department_id));
  }

  static async create(title, salary, department_id) {
    const result = await createRole(title, salary, department_id);
    return new Role(result.insertId, title, salary, department_id);
  }

  static async update(id, title, salary, department_id) {
    await updateRole(id, title, salary, department_id);
    return new Role(id, title, salary, department_id);
  }

  static async delete(id) {
    await deleteRole(id);
  }
}

module.exports = Role;