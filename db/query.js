const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employees_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function displayDepartments() {
  const [rows] = await connection.query('SELECT * FROM departments');
  console.table(rows);
}

async function displayRoles() {
  const [rows] = await connection.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id');
  console.table(rows);
}

async function displayEmployees() {
  const [rows] = await connection.query(`SELECT e.id, e.first_name, e.last_name, e.email, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                                          FROM employees e
                                          JOIN roles r ON e.role_id = r.id
                                          JOIN departments d ON r.department_id = d.id
                                          LEFT JOIN employees m ON e.manager_id = m.id`);
  console.table(rows);
}

async function addDepartment(name) {
  const [rows] = await connection.query('INSERT INTO departments (name) VALUES (?)', [name]);
  console.log(`Added ${rows.affectedRows} department.`);
}

async function updateDepartment(id, name) {
  const [rows] = await connection.query('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
  console.log(`Updated ${rows.changedRows} department.`);
}

async function deleteDepartment(id) {
  const [rows] = await connection.query('DELETE FROM departments WHERE id = ?', [id]);
  console.log(`Deleted ${rows.affectedRows} department.`);
}

async function addRole(title, salary, department) {
  const [rows] = await connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department.id]);
  console.log(`Added ${rows.affectedRows} role.`);
}

async function updateRole(id, title, salary, department) {
  const [rows] = await connection.query('UPDATE roles SET title = ?, salary = ?, department_id = ? WHERE id = ?', [title, salary, department.id, id]);
  console.log(`Updated ${rows.changedRows} role.`);
}

async function deleteRole(id) {
  const [rows] = await connection.query('DELETE FROM roles WHERE id = ?', [id]);
  console.log(`Deleted ${rows.affectedRows} role.`);
}

async function addEmployee(firstName, lastName, email, role, manager) {
  const [rows] = await connection.query('INSERT INTO employees (first_name, last_name, email, role_id, manager_id) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, email, role.id, manager ? manager.id : null]);
  console.log(`Added ${rows.affectedRows} employee.`);
}

async function updateEmployee(id, firstName, lastName, email, role, manager) {
  const [rows] = await connection.query('UPDATE employees SET first_name = ?, last_name = ?, email = ?, role_id = ?, manager_id = ? WHERE id = ?', [firstName, lastName, email, role.id, manager ? manager.id : null, id]);
  console.log(`Updated ${rows.changedRows} employee.`);
}

async function deleteEmployee(id) {
  const [rows] = await connection.query('DELETE FROM employees WHERE id = ?', [id]);
  console.log(`Deleted ${rows.affectedRows} employee.`);
}

module.exports = {
  displayDepartments,
  displayRoles,
  displayEmployees,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  addRole,
  updateRole,
  deleteRole,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
