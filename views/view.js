const Department = require('../models/Department');
const Role = require('../models/Role');
const Employee = require('../models/Employee');

async function viewData() {
  console.log('Departments:');
  const departments = await Department.findAll();
  console.table(departments);

  console.log('Roles:');
  const roles = await Role.findAll();
  console.table(roles);

  console.log('Employees:');
  const employees = await Employee.findAll();
  console.table(employees);
}

async function createDepartment(name) {
  const department = await Department.create(name);
  console.log(`Created department with ID ${department.id}`);
}

async function updateDepartment(id, name) {
  const department = await Department.update(id, name);
  console.log(`Updated department with ID ${department.id}`);
}

async function deleteDepartment(id) {
  await Department.delete(id);
  console.log(`Deleted department with ID ${id}`);
}

async function createRole(title, salary, department_id) {
  const role = await Role.create(title, salary, department_id);
  console.log(`Created role with ID ${role.id}`);
}

async function updateRole(id, title, salary, department_id) {
  const role = await Role.update(id, title, salary, department_id);
  console.log(`Updated role with ID ${role.id}`);
}

async function deleteRole(id) {
  await Role.delete(id);
  console.log(`Deleted role with ID ${id}`);
}

async function createEmployee(first_name, last_name, role_id, manager_id) {
  const employee = await Employee.create(first_name, last_name, role_id, manager_id);
  console.log(`Created employee with ID ${employee.id}`);
}

async function updateEmployee(id, first_name, last_name, role_id, manager_id) {
  const employee = await Employee.update(id, first_name, last_name, role_id, manager_id);
  console.log(`Updated employee with ID ${employee.id}`);
}

async function deleteEmployee(id) {
  await Employee.delete(id);
  console.log(`Deleted employee with ID ${id}`);
}

module.exports = {
  viewData,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  createRole,
  updateRole,
  deleteRole,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};