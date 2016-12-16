import DalService from './DalService';
import DemoService from './DemoService';

class FactProvider {

  constructor(metaData, weatherData) {
    this.metaData = metaData;
    this.weatherData = weatherData || {};
    this.aliases = {};

    this.metaData.locale = this.metaData.language.replace('-', '_');
    this.extendedMetaData = Object.assign({}, this.metaData);
  }

  async setupLocation() {
    let locationData = await this.LoadLocation();

    this.extendedMetaData.location = locationData;
    this.extendedMetaData.geocode = `${locationData.lat},${locationData.long}`;
  }

  async LoadLocation() {
    let service = this.metaData.mode === 'demo' ? DemoService : DalService;
    let loadedData = await service.loadMissingData('location', this.metaData);

    return Promise.resolve(loadedData);
  }

  async getFact(dataSources) {
    let service = this.metaData.mode === 'demo' ? DemoService : DalService;
    let loadedData;
    let datasource;

    for (let i = 0; i < dataSources.length; i++) {
      datasource = dataSources[i];

      if (!this.weatherData[datasource]) {
        loadedData = await service.loadMissingData(datasource, this.extendedMetaData);

        this.weatherData[datasource] = loadedData.data === undefined ? {} : loadedData.data;
        this.aliases[datasource] = loadedData.aliases;
      }
    }

    return {
      data: this.weatherData,
      aliases: this.aliases,
      meta: this.metaData
    };
  }

  getLoadedData(dataSource) {
    return this.weatherData[dataSource];
  }

  async getStaticFact(dataSources, staticDef) {
    let service = this.metaData.mode === 'demo' ? DemoService : DalService;
    let loadedData;
    let allData = {};
    let metaData = Object.assign({}, this.extendedMetaData);
    let datasource;

    if (!!staticDef.req) {
      let language = this.metaData.language;
      let reqObj = staticDef.req;
      let localizedReq = reqObj[language] ? reqObj[language] : reqObj.base;

      metaData = Object.assign(metaData, localizedReq);
    }
    for (let i = 0; i < dataSources.length; i++) {
      datasource = dataSources[i];
      loadedData = await service.loadMissingData(datasource, metaData);

      allData[datasource] = loadedData;
    }

    return allData;
  }

}

export default FactProvider;
