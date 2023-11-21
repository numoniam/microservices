Feature: Use case to validate permission

    Scenario Outline: Try to validate permission with invalid detail,then it will throw error.
        Given Permission details route:"<route>",method:"<method>",employeeId:"<employeeId>" to for validating permissions
        When Try to validate permission
        Then It will throw error: "<message>" while validating permission

        Examples:
            | route    | method | employeeId              | message                             |
            |          |        |                         | '"route" is required'               |
            | employee |        |                         | '"method" is required'              |
            | employee | get    |                         | '"employeeId" is required'          |
            | employee | get    | 1dcdbc2d-c3dc-44cf-a272 | '"employeeId" must be a valid GUID' |


    Scenario Outline: Try to validate permission with valid detail,then it will successfully validate permisiion.
        Given Permission details route:"<route>",method:"<method>",employeeId:"<employeeId>" to for validating permissions
        When Try to validate permission
        Then It will validate pernmission with message: "<message>"

        Examples:
            | route    | method | employeeId                           | message                          |
            | employee | get    | e9a0e063-74ff-4ec4-a296-35f61c060f22 | validate permission successfully |
