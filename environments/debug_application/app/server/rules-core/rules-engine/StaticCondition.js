
class StaticCondition {

  constructor(hasDataSource) {
    this.triggersLight = this.triggers = [];
    this.isPassed = !hasDataSource;

    if (!hasDataSource) {
      this.triggers.push({
        datasource: 'static'
      });
    }
  }

  run(facts) {
    let data = {};

    if (!!facts) {
      Object.keys(facts).forEach((datasource) => {
        if (Array.isArray(facts[datasource]) && facts[datasource].length > 0
          || Object.keys(facts[datasource]).length > 0) {

          data = facts[datasource];

          if (Array.isArray(facts[datasource]) && facts[datasource].length === 1) {
            data = facts[datasource][0];
          }

          this.triggers.push({datasource, data});
        }
      });
    }

    if (this.triggers.length > 0) {
      this.isPassed = true;
    }

    return this.isPassed;
  }

}

export default StaticCondition;
