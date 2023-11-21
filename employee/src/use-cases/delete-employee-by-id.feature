Feature: Use case to delete employee by Id

    Scenario Outline: Try to delete employee by id with invalid details,then it will throw error.
        Given Employee Details id:"<id>" to delete employee by id
        When Try to delete employee by id
        Then It will throw error: "<message>" while deleting employee by id

        Examples:
            | id                      | message                     |
            | 1c2ac6fb-7440-48dc-a8d0 | '"id" must be a valid GUID' |

    Scenario Outline: Try to delete employee by id with valid details,then it will successfully delete employee by id.
        Given Employee Details id:"<id>" to delete employee by id
        When Try to delete employee by id
        Then It will delete employee by ID with message: '<message>'

        Examples:
            | id                                   | message                            |
            | 164d441b-4b8c-4287-9e2e-96c028e6ca9b | Employee data Deleted Successfully |
