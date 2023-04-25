const inquirer = require('inquirer');
const chalk = require('chalk');
const viewData = require('./views/view');
const {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  createRole,
  updateRole,
  deleteRole,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('./views/view');

async function promptUser() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View data',
        'Create department',
        'Update department',
        'Delete department',
        'Create role',
        'Update role',
        'Delete role',
        'Create employee',
        'Update employee',
        'Delete employee',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View data':
      await viewData();
      break;
    case 'Create department':
      await promptCreateDepartment();
      break;
    case 'Update department':
      await promptUpdateDepartment();
      break;
    case 'Delete department':
      await promptDeleteDepartment();
      break;
    case 'Create role':
      await promptCreateRole();
      break;
    case 'Update role':
      await promptUpdateRole();
      break;
    case 'Delete role':
      await promptDeleteRole();
      break;
    case 'Create employee':
      await promptCreateEmployee();
      break;
    case 'Update employee':
      await promptUpdateEmployee();
      break;
    case 'Delete employee':
      await promptDeleteEmployee();
      break;
    case 'Exit':
      console.log(chalk.green('Goodbye!'));
      process.exit(0);
    default:
      console.log(chalk.red('Invalid action'));
  }

  promptUser();
}

async function promptCreateDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
    },
  ]);

  await createDepartment(name);
}

async function promptUpdateDepartment() {
  const { id, name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the department to update:',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter the new name for the department:',
    },
  ]);

  await updateDepartment(id, name);
}

async function promptDeleteDepartment() {
  const { id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the department to delete:',
    },
  ]);

  await deleteDepartment(id);
}

async function promptCreateRole() {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the ID of the department for the new role:',
    },
  ]);

  await createRole(title, salary, department_id);
}

async function promptUpdateRole() {
  const { id, title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the role to update:',
    },
    {
      type: 'input',
      name: 'title',
      message: 'Enter the new title for the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the new salary for the role:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the new department ID for the role:',
    },
  ]);

  await updateRole(id, title, salary, department_id);
}

async function promptDeleteRole() {
  const { id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the role to delete:',
    },
  ]);

  await deleteRole(id);
}

async function promptCreateEmployee() {
    const roles = await Role.findAll();
    const roleChoices = roles.map((role) => ({ name: role.title, value: role.id }));
  
    const managers = await Employee.findAll({
      where: { manager_id: null },
    });
    const managerChoices = managers.map((manager) => ({
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.id,
    }));
  
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the new employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the new employee:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role for the new employee:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the manager for the new employee:',
        choices: [
          ...managerChoices,
          { name: 'No manager', value: null },
        ],
      },
    ]);
  
    await createEmployee(first_name, last_name, role_id, manager_id);
  }
async function promptUpdateEmployee() {
    const employees = await Employee.findAll();
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
  
    const roles = await Role.findAll();
    const roleChoices = roles.map((role) => ({ name: role.title, value: role.id }));
  
    const managers = await Employee.findAll({
      where: { manager_id: null },
    });
    const managerChoices = managers.map((manager) => ({
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.id,
    }));
  
    const { id, first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select the employee to update:',
        choices: employeeChoices,
      },
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the new first name for the employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the new last name for the employee:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the new role for the employee:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the new manager for the employee:',
        choices: [
          ...managerChoices,
          { name: 'No manager', value: null },
        ],
      },
    ]);
  
    await updateEmployee(id, first_name, last_name, role_id, manager_id);
  }
  
async function promptDeleteEmployee() {
  const { id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the employee to delete:',
    },
  ]);

  await deleteEmployee(id);
}

promptUser();