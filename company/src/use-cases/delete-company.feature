Feature: Use case to delete company

    Scenario Outline: Try to delete company with invalid details,then it will throw error.
        Given Company Details id:"<id>" to delete company
        When Try to delete company
        Then It will throw error: "<message>" while deleting company

        Examples:
            | id                                   | message                        |
            | f36878d5-2e29-46b0-abcd              | '"id" must be a valid GUID'    |
            | f36878d5-2e29-46b0-abcd-8cc5d28f7f07 | "Company Data dose note exist" |


    Scenario Outline: Try to delete company with exist ID details,then it will successfully delete data.
        Given Company Details id:"<id>" to delete company
        When Try to delete company
        Then Then It will delete company with message: "<message>"

        Examples:
            | id                                   | message                           |
            | 202a7a07-f547-4225-aa75-014ab8c4bb20 | company data deleted successfully |
