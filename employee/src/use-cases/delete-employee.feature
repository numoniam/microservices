Feature: Use case to delete employee

    Scenario Outline: Try to delete employee with invalid details,then it will throw error.
        Given Employee Details id:"<id>" to delete employee
        When Try to delete employee
        Then It will throw error: "<message>" while deleting employee

        Examples:
            | id                                   | message                                       |
            | 1c2ac6fb-7440-48dc-a8d0              | '"id" must be a valid GUID'                   |
            | 1c2ac6fb-7440-48dc-a8d0-98526e22faf7 | "Employee Data dose note exist"               |
            | 164d441b-4b8c-4287-9e2e-96c028e6ca9b | "You can't able to delete default owner user" |

    Scenario Outline: Try to delete employee with exist ID details,then it will successfully delete  employee data.
        Given Employee Details id:"<id>" to delete employee
        When Try to delete employee
        Then Then It will delete employee with message: '<message>'

        Examples:
            | id                                   | message                            |
            | 202a7a07-f547-4225-aa75-014ab8c4bb20 | Employee data deleted successfully |
