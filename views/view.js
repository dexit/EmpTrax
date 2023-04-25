const inquirer = require('inquirer');
const EmployeeTracker = require('./EmployeeTracker');

const employeeTracker = new EmployeeTracker();

async function mainMenu() {
  const { choice } = await inquirer.prompt({
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Department', 'Update Role', 'Update Employee', 'Delete Department', 'Delete Role', 'Delete Employee', 'Exit'],
    name: 'choice'
  });

  switch (choice) {
    case 'View All Departments':
      await employeeTracker.displayDepartments();
      await mainMenu();
      break;
    case 'View All Roles':
      await employeeTracker.displayRoles();
      await mainMenu();
      break;
    case 'View All Employees':
      await employeeTracker.displayEmployees();
      await mainMenu();
      break;
    case 'Add Department':
      const { departmentName } = await inquirer.prompt({
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'
      });
      await employeeTracker.addDepartment(departmentName);
      await mainMenu();
      break;
    case 'Add Role':
      const departments = await employeeTracker.connection.query('SELECT * FROM departments');
      const { roleName, roleSalary, roleDepartment } = await inquirer.prompt([
        {
          type: 'input',
          message: 'What is the name of the role?',
          name: 'roleName'
        },
        {
          type: 'number',
          message: 'What is the salary of the role?',
          name: 'roleSalary'
        },
        {
          type: 'list',
          message: 'Which department does the role belong to?',
          choices: departments[0].map(department => ({ name: department.name, value: department })),
          name: 'roleDepartment'
        }
      ]);
      await employeeTracker.addRole(roleName, roleSalary, roleDepartment);
      await mainMenu();
      break;
    case 'Add Employee':
      const roles = await employeeTracker.connection.query('SELECT * FROM roles');
      const managers = await employeeTracker.connection.query('SELECT * FROM employees');
      const { employeeFirstName, employeeLastName, employeeEmail, employeeRole, employeeManager } = await inquirer.prompt([
        {
          type: 'input',
          message: 'What is the employee\'s first name?',
          name: 'employeeFirstName'
        },
        {
          type: 'input',
          message: 'What is the employee\'s last name?',
          name: 'employeeLastName'
        },
        {
          type: 'input',
          message: 'What is the employee\'s email address?',
          name: 'employeeEmail'
        },
        {
          type: 'list',
          message: 'What is the employee\'s role?',
          choices: roles[0].map(role => ({ name: role.title, value: role })),
          name: 'employeeRole'
        },
        {
          type: 'list',
          message: 'Who is the employee\'s manager?',
          choices: managers[0].map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager })),
          name: 'employeeManager'
        }
      ]);
      await employeeTracker.addEmployee(employeeFirstName, employeeLastName, employeeEmail, employeeRole, employeeManager);
      await mainMenu();
      break;
    case 'Update Department':
      const departmentRows = await employeeTracker.connection.query('SELECT * FROM departments');
      const departmentChoices = departmentRows[0].map(department => ({ name: department.name, value: department.id }));
      const { departmentIdToDelete } = await inquirer.prompt({
        type: 'list',
        message: 'Which department do you want to delete?',
        choices: departmentChoicesToDelete,
        name: 'departmentIdToDelete'
      });
      await employeeTracker.deleteDepartment(departmentIdToDelete);
      await mainMenu();
      break;
    case 'Delete Role':
      const roleRowsToDelete = await employeeTracker.connection.query('SELECT * FROM roles');
      const roleChoicesToDelete = roleRowsToDelete[0].map(role => ({ name: role.title, value: role.id }));
      const { roleIdToDelete } = await inquirer.prompt({
        type: 'list',
        message: 'Which role do you want to delete?',
        choices: roleChoicesToDelete,
        name: 'roleIdToDelete'
      });
      await employeeTracker.deleteRole(roleIdToDelete);
      await mainMenu();
      break;
    case 'Delete Employee':
      const employeeRowsToDelete = await employeeTracker.connection.query('SELECT * FROM employees');
      const employeeChoicesToDelete = employeeRowsToDelete[0].map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
      const { employeeIdToDelete } = await inquirer.prompt({
        type: 'list',
        message: 'Which employee do you want to delete?',
        choices: employeeChoicesToDelete,
        name: 'employeeIdToDelete'
      });
      await employeeTracker.deleteEmployee(employeeIdToDelete);
      await mainMenu();
      break;
    case 'Exit':
      employeeTracker.connection.end();
      process.exit();
    default:
      console.log('Invalid choice');
      await mainMenu();
    } }

    mainMenu();