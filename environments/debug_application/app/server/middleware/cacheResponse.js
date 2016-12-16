function retrieveDatasources(response) {
  let allResponseDatasources = {};

  response.results.forEach((result) => {
    result.triggers.forEach((trigger) => {
      allResponseDatasources[trigger.datasource] = true;
    });
  });

  return Object.keys(allResponseDatasources);
}

function convertMinutesToSeconds(maxAgeMinutes) {
  return Math.ceil(maxAgeMinutes * 60);
}

function composeMaxage(maxAgeLifetimes, datasources) {
  let minTtl = 99999;

  datasources.forEach((datasource) => {
    if (typeof maxAgeLifetimes[datasource] !== 'undefined' && minTtl > maxAgeLifetimes[datasource]) {
      minTtl = maxAgeLifetimes[datasource];
    }
  });

  return minTtl !== 99999 ? convertMinutesToSeconds(minTtl) : null;
}

export { retrieveDatasources, composeMaxage };
