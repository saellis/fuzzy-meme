# TTR

 - [Trello](https://trello.com/b/zg6ir2t1/ttr)


## Testing
Before running tests the first time, you may need to update your meteor environment:

`$ meteor npm install`

Using mocha with Meteor allows us to deploy a testing application that automatically re-runs all tests whenever a file changes. To deploy the testing application, execute:

`$ meteor test --driver-package=practicalmeteor:mocha --port=3100`

And visit localhost:3100 in your browser to see the live-updated test results.


For code coverage test 

`$ meteor test --driver-package=practicalmeteor:mocha --port=3100 --settings settings.coverage.json`
 
Need to create your own settings.coverage.json file in your root directory

{
    "coverage": {
        "coverage_app_folder": "/Users/name/path/to/meteor-app/",
        "is_coverage_active": true,
        "verbose": false
    }
}

https://atmospherejs.com/lmieulet/meteor-coverage for more info