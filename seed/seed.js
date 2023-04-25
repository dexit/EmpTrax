const sequelize = require('./config/connection');
const { Department, Role, Employee } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  await Department.bulkCreate([
    { name: 'IT' },
    { name: 'Finance' },
    { name: 'Social Media' },
    { name: 'HR' },
    { name: 'Facilities' },
  ]);

  await Role.bulkCreate([
    { title: 'Senior Web Developer', salary: 45000, department_id: 1 },
    { title: 'Junior DevOp', salary: 40000, department_id: 1 },
    { title: 'HR Manager', salary: 23000, department_id: 4 },
    { title: 'HR Assistant', salary: 18750, department_id: 4 },
    { title: 'Accountant', salary: 30000, department_id: 2 },
    { title: 'CFO', salary: 75000, department_id: 2 },
    { title: 'Brand Designer', salary: 27500, department_id: 3 },
    { title: 'Marketing Apprentice', salary: 9250, department_id: 3 },
    { title: 'Facilities Admin', salary: 17850, department_id: 5 },
    { title: 'Facilities Supervisor', salary: 23500, department_id: 5 },
    { title: 'Director', salary: 75000, department_id: 1 },
  ]);

  await Employee.bulkCreate([
    { first_name: 'Lorraine', last_name: 'Hogs', role_id: 3, manager_id: 5 },
    { first_name: 'Rihards', last_name: 'Man', role_id: 1, manager_id: 5 },
    { first_name: 'Tom', last_name: 'Giles', role_id: 2, manager_id: 1 },
    { first_name: 'Natalie', last_name: 'Smith', role_id: 5, manager_id: 5 },
    { first_name: 'Malcolm', last_name: 'Manfree', role_id: 11, manager_id: null },
    { first_name: 'Hanna', last_name: 'Barbara', role_id: 4, manager_id: 1 },
    { first_name: 'Irina', last_name: 'Carol', role_id: 7, manager_id: 3 },
    { first_name: 'Jasmine', last_name: 'Tche', role_id: 9, manager_id: 9 },
    { first_name: 'Tom', last_name: 'Mahoney', role_id: 10, manager_id: null },
    { first_name: 'Alex', last_name: 'Simkson', role_id: 6, manager_id: 4 },
  ]);
}

seed()
  .then(() => console.log('Database seeded'))
  .catch((err) => console.error(err))
  .finally(() => sequelize.close());