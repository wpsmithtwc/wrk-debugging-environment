# TWC Rules Runner

Rules runner engine for providing user with data depending on user's location, time and individual preferences.

# Setting up dev environment
Please make sure your default NPM repo is set to web-decoupling-npm at Artifactory server. See details here [Artifactory NPM Registry](https://github.com/TheWeatherCompany/web-dev-standards/blob/master/artifactory-npm.md)

run '$ npm install' in order to install all dependencies

## Contents

* [1. Models] (#1-models)
  * [1.1 Weather] (#weather)
* [2. Data feaders] (#data-feaders)
  * [2.1 DalService] (#dal-service)
  * [2.2 FactProvider] (#fact-provider)
  * [2.3 Loaders for data feeders] (#loaders-for-data-feeders)
    * [2.3.1 Alerts loader]
    * [2.3.2 Base loader]
    * [2.3.3 Observation loader]
* [3. Definition services] (#definition-services)
  * [3.1 Rules Provider] (#rules-provider)
  * [3.2 Rules Storage] (#rules-storage)
  * [3.3 Loaders for definition services] (#loaders-for-definition-services)
    * [3.3.1 Base loader]
    * [3.3.2 Custom loader]
    * [3.3.3 Local loader]
    * [3.3.4 S3 loader]
* [4. Rules engine] (#rules-engine)
  * [4.1 Condition] (#condition)
  * [4.2 ConditionSet] (#condition-set)
  * [4.3 Engine] (#engine)
  * [4.4 Rule] (#Rule)
  * [4.5 Actions] (#actions)
    * [4.5.1 Base Action] (#base-action)
    * [4.5.2 Numeric Action] (#numeric-action)
* [5. Runner Service] (#runner-service)
  * [5.1 Run Rules Job] (#run-rules-job)

## 1. Models

### 1.1 Weather
Public methods:

evaluateRules
This method accepts object with user specific metadata such as location, region etc and returns array of messages.

In order to get those list of messages RunRulesJob is called with method's input parameters

## 2. Data feaders

### 2.1 DalService
The purpose of this service is to get the data from DAL

### 2.2 FactProvider
The purpose of this service is to get some data from UI, get some data from DAL if needed, transform received data
in some way and get the data back to the UI

### 2.3 Loaders for data feeders
The purpose of these loaders is to connect to some specific model from DAL and retrieve the data

## 3. Definition services

## 4. Rules engine

## 5. Runner Service
