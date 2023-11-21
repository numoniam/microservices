Feature: Use case to create employee

    Scenario Outline: Try to create employee with invalid detail,then it will throw error.
        Given Employee details companyName:"<companyName>",companyId:"<companyId>",name:"<name>",email:"<email>",salary:"<salary>",role:"<role>" to create new employee
        When Try to create new employee
        Then It will throw error: "<message>" while creating new employee

        Examples:
            | companyName | companyId          | name  | email                  | salary | role   | message                              |
            |             |                    |       |                        |        |        | '"name" is required'                 |
            |             |                    | savan |                        |        |        | '"email" is required'                |
            |             |                    | savan | savanghori12gmail.com  |        |        | '"email" must be a valid email'      |
            |             |                    | savan | savanghori12@gmail.com |        |        | '"salary" is required'               |
            |             |                    | savan | savanghori12@gmail.com | -10000 |        | '"salary" must be a positive number' |
            |             |                    | savan | savanghori12@gmail.com | 10000  |        | '"role" is required'                 |
            |             | fbcdfba8-6be4-4038 | savan | savanghori12@gmail.com | 10000  | intern | '"companyId" must be a valid GUID'   |

    Scenario Outline: Try to create employee with valid detail,then it will successfully create employee.
        Given Employee details companyName:"<companyName>",companyId:"<companyId>",name:"<name>",email:"<email>",salary:"<salary>",role:"<role>" to create new employee
        When Try to create new employee
        Then It will create employee with message: "<message>"

        Examples:
            | companyName | companyId                            | name  | email                  | salary | role   | message                            |
            |             | fbcdfba8-6be4-4038-988e-a9ddb8b7d89d | savan | savanghori12@gmail.com | 10000  | intern | Employee data created successfully |
            | salesmate   |                                      | savan | savanghori12@gmail.com | 10000  | intern | Employee data created successfully |
