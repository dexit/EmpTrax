const SequelizeCRUDTester = require('./SequelizeCRUDTester');
const { Department, Role } = require('./models');

describe('Department model', () => {
    let tester;
  
    beforeAll(async () => {
      tester = new SequelizeCRUDTester(Department);
      await tester.setup();
    });
  
    afterAll(async () => {
      await tester.teardown();
    });
  
    it('should create a new department', async () => {
      const department = { name: 'Test Department' };
      await tester.testCreate(department);
    });
  
    it('should read an existing department', async () => {
      const department = { name: 'Test Department' };
      const createdDepartment = await Department.create(department);
      await tester.testRead(createdDepartment.id);
    });
  
    it('should update an existing department', async () => {
      const department = { name: 'Test Department' };
      const createdDepartment = await Department.create(department);
      const update = { name: 'Updated Department' };
      await tester.testUpdate(createdDepartment.id, update);
    });
  
    it('should delete an existing department', async () => {
      const department = { name: 'Test Department' };
      const createdDepartment = await Department.create(department);
      await tester.testDelete(createdDepartment.id);
    });
  });

  describe('Role model', () => {
    let tester;
  
    beforeAll(async () => {
      tester = new SequelizeCRUDTester(Role);
      await tester.setup();
    });
  
    afterAll(async () => {
      await tester.teardown();
    });
  
    it('should create a new role', async () => {
      const role = { name: 'Test Role' };
      await tester.testCreate(role);
    });
  
    it('should read an existing role', async () => {
      const role = { name: 'Test Role' };
      const createdRole = await Role.create(role);
      await tester.testRead(createdRole.id);
    });
  
    it('should update an existing role', async () => {
      const role = { name: 'Test Role' };
      const createdRole = await Role.create(role);
      const update = { name: 'Updated Role' };
      await tester.testUpdate(createdRole.id, update);
    });
  
    it('should delete an existing role', async () => {
      const role = { name: 'Test Role' };
      const createdRole = await Role.create(role);
      await tester.testDelete(createdRole.id);
    });
  });