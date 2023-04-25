const { Sequelize } = require('sequelize');
const { dbConfig } = require('./db/connections');
const seed = require('./db/seed');

class SequelizeCRUDTester {
  constructor(model) {
    this.model = model;
    this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      dialect: 'mysql',
      host: dbConfig.host,
      port: dbConfig.port,
      logging: false,
    });
  }

  async setup() {
    await seed(this.sequelize);
    await this.model.init(this.sequelize);
  }

  async teardown() {
    await this.sequelize.drop();
    await this.sequelize.close();
  }

  async testCreate(record) {
    const createdRecord = await this.model.create(record);
    expect(createdRecord.toJSON()).toMatchObject(record);
  }

  async testRead(id) {
    const record = await this.model.findByPk(id);
    expect(record).not.toBeNull();
  }

  async testUpdate(id, update) {
    const record = await this.model.findByPk(id);
    expect(record).not.toBeNull();
    await record.update(update);
    const updatedRecord = await this.model.findByPk(id);
    expect(updatedRecord.toJSON()).toMatchObject({ ...record.toJSON(), ...update });
  }

  async testDelete(id) {
    const record = await this.model.findByPk(id);
    expect(record).not.toBeNull();
    await record.destroy();
    const deletedRecord = await this.model.findByPk(id);
    expect(deletedRecord).toBeNull();
  }
}

module.exports = SequelizeCRUDTester;