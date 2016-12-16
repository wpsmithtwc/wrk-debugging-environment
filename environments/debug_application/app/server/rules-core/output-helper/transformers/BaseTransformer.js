
class BaseTransformer {

  static transform(data, trigger) {
    let transformed = {};

    if (Array.isArray(data[trigger.key])) {
      const index = data[trigger.key].indexOf(trigger.value);

      Object.keys(data).forEach((key) => {
        transformed[key] = Array.isArray(data[key]) ? data[key][index] : data[key];
      });
    } else {
      transformed = data;
    }

    return transformed;
  }
}

export default BaseTransformer;
