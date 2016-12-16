import BaseLoader from './BaseLoader';

var debug = require('debug')('twc:LocalLoader');


class LocalLoader extends BaseLoader {

  loadDefinition(priority) {
    debug(priority);

    return Promise.resolve(
      [{
        'id': 'rtln',
        'limits': {
          'languages': ['en-US']
        },
        'conditions': [
          [{
            'fact': 'distance',
            'operator': 'lessThan',
            'value': {'e': 5, 'm': 8}
          },
          {
            'fact': 'strikeTime',
            'operator': 'propExists'
          }]
        ],
        'datasources': ['lightning']
      },
      {
        'id': 'ssmg',
        'conditions': [
          [{
            'fact': 'today.sunset',
            'operator': 'timePassed'
          },
          {
            'fact': 'tomorrow.sunrise',
            'operator': 'timeInFuture'
          }],
          [{
            'fact': 'today.sunrise',
            'operator': 'timePassedAfterHour',
            'value': 11
          },
          {
            'fact': 'today.sunset',
            'operator': 'timeInFuture'
          }]
        ],
        'datasources': ['dailyForecast', 'dateTime']
      },
      {
        'id': 'prcpacc',
        'conditions': [
          [{
            'fact': 'today.day.snowRange',
            'operator': 'propExists'
          }],
          [{
            'fact': 'today.day.precipAmt',
            'operator': 'greaterThan',
            'value': {'e': 0.5, 'm': 1.2}
          }],
          [{
            'fact': 'today.night.snowRange',
            'operator': 'propExists'
          }],
          [{
            'fact': 'today.night.precipAmt',
            'operator': 'greaterThan',
            'value': {'e': 0.5, 'm': 1.2}
          }]
        ],
        'datasources': ['dailyForecast']
      },
      {
        'id': 'cpcp',
        'conditions': [
          [{
            'fact': 'tomorrow.day.precipPct',
            'operator': 'greaterThanOrEqualTo',
            'value': 60
          }]
        ],
        'datasources': ['dailyForecast']
      },
      {
        'id': 'tstorm',
        'conditions': [
          [{
            'fact': 'day.thunderEnum',
            'operator': 'isOneOf',
            'value': [3, 4, 5]
          }],
          [{
            'fact': 'night.thunderEnum',
            'operator': 'isOneOf',
            'value': [3, 4, 5]
          }]
        ],
        'datasources': ['dailyForecast'],
        'entriesToCheck': 3
      },
      {
        'id': 'wkndfc',
        'conditions': [
          [{
            'fact': 'datetime',
            'operator': 'isDayOneOf',
            'value': ['Wed', 'Thu', 'Fri']
          }]
        ],
        'datasources': ['dateTime']
      },
      {
        'id': 'road',
        'conditions': [
          [{
            'fact': 'drivingDifficultyIndex',
            'operator': 'isOneOf',
            'value': [1, 2, 3, 4, 5, 6]
          }]
        ],
        'datasources': ['drivingConditions']
      },
      {
        'id': 'prcptf',
        'conditions': [
          [{
            'fact': 'eventType',
            'operator': 'isOneOf',
            'value': [1, 2, 3, 4]
          }]
        ],
        'datasources': ['precipitation']
      },
      {
        'id': 'topvid',
        'limits': {
          'languages': ['en-US', 'es-US', 'de-DE', 'en-GB']
        },
        'static': {
          'req': {
            'base': {
              'assetId': '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
            },
            'en-US': {
              'assetId': '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
            },
            'es-US': {
              'assetId': '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
            },
            'de-DE': {
              'assetId': '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
            },
            'en-GB': {
              'assetId': '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
            }
          }
        },
        datasources: ['contentMedia']
      }
      ]
      /* [{
       id: 'rtln',
       limits: {
       languages: ['en-US']
       },
       conditions: [
       [{
       fact: 'distance',
       operator: 'lessThan',
       value: 5
       },
       {
       fact: 'strikeTime',
       operator: 'propExists'
       }]
       ],
       datasources: ['lightning']
       }, {
       id: 'rtln_1',
       conditions: [
       [{
       fact: 'feelsLike',
       operator: 'greaterThan',
       value: 1
       }]
       ],
       datasources: ['observation', 'dailyForecast']
       },
       {
       id: 'rtln_2',
       conditions: [
       [{
       fact: 'phenomenaSignificance',
       operator: 'anyOfKeysWithValue',
       value: ['BZ', 'WS', 'LE', 'IS', 'EC', 'WC', 'GL'],
       param2: 'W'
       },
       {
       fact: 'phenomenaEffectiveTime',
       operator: 'timeFromNow',
       value: '12h'
       }]
       ],
       datasources: ['alerts', 'dateTime']
       },
       {
       id: 'rtln_3',
       conditions: [
       [{
       fact: 'phenomenaSignificance',
       operator: 'anyOfKeysWithValues',
       value: ['BZ', 'WS', 'LE', 'IS', 'EC', 'WC', 'GL'],
       param2: ['A', 'W']
       },
       {
       fact: 'phenomenaEffectiveTime',
       operator: 'timeFromNow',
       value: '12h'
       }]
       ],
       datasources: ['alerts', 'dateTime']
       }
       ]*/);
  }

  loadPriorities(params = {}) {
    debug(params);

    return Promise.resolve([{
      'priority': [
        'rtln',
        'ssmg',
        'prcpacc',
        'cpcp',
        'tstorm',
        'wkndfc',
        'road',
        'prcptf',
        'topvid'
      ],
      'responseLimit': 3
    }]);
  }

}

export default new LocalLoader();
