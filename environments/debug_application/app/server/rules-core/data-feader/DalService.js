import AlertsLoader from './loaders/AlertsLoader';
import ObservationLoader from './loaders/ObservationLoader';
import LightningLoader from './loaders/LightningLoader';
import DateTimeLoader from './loaders/DateTimeLoader';
import DailyForecastLoader from './loaders/DailyForecastLoader';
import PrecipitationLoader from './loaders/PrecipitationLoader';
import DrivingConditionsLoader from './loaders/DrivingConditionsLoader';
import LinkListLoader from './loaders/LinkListLoader';
import ContentMediaLoader from './loaders/ContentMediaLoader';

import LocationLoader from './loaders/LocationLoader';
import CmsQueryLoader from './loaders/CmsQueryLoader';

class DalService {

  loadMissingData(loaderName, params = {}) {
    var loader = this.getLoader(loaderName);

    return loader.loadData(params);
  }

  getLoader(loaderName) {
    var loader;

    switch (loaderName) {
      case 'alerts': loader = AlertsLoader;
        break;
      case 'cmsQuery': loader = CmsQueryLoader;
        break;
      case 'observation': loader = ObservationLoader;
        break;
      case 'lightning': loader = LightningLoader;
        break;
      case 'location': loader = LocationLoader;
        break;
      case 'dateTime': loader = DateTimeLoader;
        break;
      case 'dailyForecast': loader = DailyForecastLoader;
        break;
      case 'precipitation': loader = PrecipitationLoader;
        break;
      case 'drivingConditions': loader = DrivingConditionsLoader;
        break;
      case 'linkList': loader = LinkListLoader;
        break;
      case 'contentMedia': loader = ContentMediaLoader;
        break;
      default:
        loader = null;
    }

    return loader;
  }
}

export default new DalService();
