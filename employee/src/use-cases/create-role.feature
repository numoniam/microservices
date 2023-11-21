Feature: Use case to create role

    Scenario Outline: Try to create role with invalid detail,then it will throw error.
        Given Role details id:'<id>',role:'<role>',permissions:'<permissions>' to create new role
        When Try to create new role
        Then It will throw error: "<message>" while creating new role

        Examples:
            | id                                   | role      | permissions                                                         | message                                                                             |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f |           | {"employee":{"get":true,"create":true,"update":true,"delete":true}} | '"role" is required'                                                                |
            | 9d41afe8-f5ed-4058-a65d              | developer | {"employee":{"get":true,"create":true,"update":true,"delete":true}} | '"id" must be a valid GUID'                                                         |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {}                                                                  | '"permissions" must contain at least one of [employee, role, assign]'               |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"employee": {}}                                                    | '"permissions.employee" must contain at least one of [create, get, update, delete]' |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"employee": {"create": 10}}                                        | '"permissions.employee.create" must be a boolean'                                   |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"employee": {"make":true}}                                         | '"permissions.employee.make" is not allowed'                                        |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"role": {}}                                                        | '"permissions.role" must contain at least one of [create, get, update, delete]'     |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"role": {"make":true}}                                             | '"permissions.role.make" is not allowed'                                            |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"role": {"create": 10}}                                            | '"permissions.role.create" must be a boolean'                                       |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"assign": {}}                                                      | '"permissions.assign\" must contain at least one of [create, delete, get]'          |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"assign": {"make":true}}                                           | '"permissions.assign.make" is not allowed'                                          |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"assign": {"create": 10}}                                          | '"permissions.assign.create" must be a boolean'                                     |

    Scenario Outline: Try to create role with valid detail,then it will successfully create role.
        Given Role details id:'<id>',role:'<role>',permissions:'<permissions>' to create new role
        When Try to create new role
        Then It will create role with message: "<message>"

        Examples:
            | id                                   | role      | permissions                                                         | message                   |
            | 9d41afe8-f5ed-4058-a65d-fd927fd2404f | developer | {"employee":{"get":true,"create":true,"update":true,"delete":true}} | Role created successfully |
