import BaseLoader from './BaseLoader';

var debug = require('debug')('twc:DemoLoader');

class DemoLoader extends BaseLoader {

  loadDefinition(priority) {
    debug(priority);

    return Promise.resolve([{
      id: 'rtln',
      limits: {
        languages: ['en-US', 'es-US']
      },
      conditions: [
        [{
          fact: 'distance',
          operator: 'lessThan',
          value: {'e': 5, 'm': 8}
        },
        {
          fact: 'strikeTime',
          operator: 'propExists'
        }]
      ],
      datasources: ['lightning']
    },
    {
      id: 'ssmg',
      conditions: [
        [{
          fact: 'today.sunset',
          operator: 'timePassed'
        },
        {
          fact: 'tomorrow.sunrise',
          operator: 'timeInFuture'
        }],
        [{
          fact: 'today.sunrise',
          operator: 'timePassedAfterHour',
          value: 11
        },
        {
          fact: 'today.sunset',
          operator: 'timeInFuture'
        }]
      ],
      datasources: ['dailyForecast', 'dateTime']
    },
    {
      id: 'prcpacc',
      conditions: [
        [{
          fact: 'today.day.snowRange',
          operator: 'propExists'
        }],
        [{
          fact: 'today.day.precipAmt',
          operator: 'greaterThan',
          value: {'e': 0.5, 'm': 1.2}
        }],
        [{
          fact: 'today.night.snowRange',
          operator: 'propExists'
        }],
        [{
          fact: 'today.night.precipAmt',
          operator: 'greaterThan',
          value: {'e': 0.5, 'm': 1.2}
        }]
      ],
      datasources: ['dailyForecast']
    },
    {
      id: 'cpcp',
      conditions: [
        [{
          fact: 'tomorrow.day.precipPct',
          operator: 'greaterThanOrEqualTo',
          value: 60
        }]
      ],
      datasources: ['dailyForecast']
    },
    {
      id: 'wkndfc',
      conditions: [
        [{
          fact: 'datetime',
          operator: 'isDayOneOf',
          value: ['Wed', 'Thu', 'Fri']
        }]
      ],
      datasources: ['dateTime']
    },
    {
      id: 'road',
      conditions: [
        [{
          fact: 'drivingDifficultyIndex',
          operator: 'isOneOf',
          value: [1, 2, 3, 4, 5, 6]
        }]
      ],
      datasources: ['drivingConditions']
    },
    {
      id: 'tstorm',
      conditions: [
        [{
          fact: 'day.thunderEnum',
          operator: 'isOneOf',
          value: [3, 4, 5]
        }],
        [{
          fact: 'night.thunderEnum',
          operator: 'isOneOf',
          value: [3, 4, 5]
        }]
      ],
      datasources: ['dailyForecast'],
      entriesToCheck: 3
    },
    {
      id: 'prcptf',
      conditions: [
        [{
          fact: 'eventType',
          operator: 'isOneOf',
          value: [1, 2, 3, 4]
        }]
      ],
      datasources: ['precipitation']
    },
    {
      id: 'topvid1',
      limits: {
        languages: ['en-US', 'es-US', 'de-DE', 'en-GB']
      },
      static: {
        req: {
          query: {
            'collection': null,
            'keywords': [
              'affiliatevideo'
            ],
            'dma': {
              'enabled': true,
              'override': false,
              'source': 'page'
            },
            'limit': '1',
            'start_index': 0,
            'type': [
              'video'
            ],
            'sort_param': 'sort_recent',
            'use_teaser_title': false,
            'show_provider': true,
            'query_type': 'cms_query'
          }
        }
      },
      datasources: ['cmsQuery']
    },
    {
      id: 'topvid',
      limits: {
        languages: ['en-US', 'es-US', 'de-DE', 'en-GB']
      },
      static: {
        req: {
          base: {
            assetId: '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
          },
          'en-US': {
            assetId: '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
          },
          'es-US': {
            assetId: '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
          },
          'de-DE': {
            assetId: '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
          },
          'en-GB': {
            assetId: '00aa76eb-feac-4ff2-a271-3a7d961d9a29'
          }
        }
      },
      datasources: ['contentMedia']
    }
    ]);
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
      'responseLimit': 10
    }]);
  }

}

export default new DemoLoader();
