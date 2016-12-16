import BaseTransformer from './transformers/BaseTransformer';

class DataTransformer {

  constructor(factProvider, dataSource, ruleTrigger) {
    this.factProvider = factProvider;
    this.dataSource = dataSource;
    this.ruleTrigger = ruleTrigger;
  }

  narrowData() {
    let result;
    let data = this.factProvider.getLoadedData(this.dataSource);

    switch (this.dataSource) {
      case 'lightning':
        result = BaseTransformer.transform(data, this.ruleTrigger);
        break;
      default:
        result = data;
        break;
    }

    return result;
  }
}

export default DataTransformer;
