/* This is a class for managing employees, with methods for finding, creating, updating, and deleting
employee records in a database. */
const { findAllEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../db/queries');

class Employee {
  constructor(id, first_name, last_name, role_id, manager_id) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }

  static async findAll() {
    const rows = await findAllEmployees();
    return rows.map((row) => new Employee(row.id, row.first_name, row.last_name, row.role_id, row.manager_id));
  }

  static async create(first_name, last_name, role_id, manager_id) {
    const result = await createEmployee(first_name, last_name, role_id, manager_id);
    return new Employee(result.insertId, first_name, last_name, role_id, manager_id);
  }

  static async update(id, first_name, last_name, role_id, manager_id) {
    await updateEmployee(id, first_name, last_name, role_id, manager_id);
    return new Employee(id, first_name, last_name, role_id, manager_id);
  }

  static async delete(id) {
    await deleteEmployee(id);
  }
}

module.exports = Employee;