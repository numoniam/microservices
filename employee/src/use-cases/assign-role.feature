Feature: Use case to assign role

    Scenario Outline: Try to assign role invalid detail,then it will throw error.
        Given role details employeeId:"<employeeId>",roleId:"<roleId>" to assign role
        When Try to assign new role to employee
        Then It will throw error: "<message>" while assigning new role to employee

        Examples:
            | employeeId                           | roleId                  | message                             |
            |                                      |                         | '"employeeId" is required'          |
            | 70f0c59a-d467-471a-9579              |                         | '"employeeId" must be a valid GUID' |
            | 70f0c59a-d467-471a-9579-59627972af74 |                         | '"roleId" is required'              |
            | 70f0c59a-d467-471a-9579-59627972af74 | bb8f84c8-226e-4c11-b645 | '"roleId" must be a valid GUID'     |

    Scenario Outline: Try to assign role valid detail,then it will successfully assign role
        Given role details employeeId:"<employeeId>",roleId:"<roleId>" to assign role
        When Try to assign new role to employee
        Then Then It will assign role with message: "<message>"

        Examples:
            | employeeId                           | roleId                               | message                    |
            | 70f0c59a-d467-471a-9579-59627972af74 | bb8f84c8-226e-4c11-b645-ec14ae0b4f37 | Role assigend successfully |