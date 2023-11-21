Feature: Use case to delete user

    Scenario Outline: Try to delete user with invalid details,then it will throw error.
        Given User Details id:"<id>" to delete user
        When Try to delete user
        Then It will throw error: "<message>" while deleting user

        Examples:
            | id                                   | message                     |
            | f36878d5-2e29-46b0-abcd              | '"id" must be a valid GUID' |
            | f36878d5-2e29-46b0-abcd-8cc5d28f7f07 | "User Data dose note exist" |

    Scenario Outline: Try to delete user with exist ID details,then it will successfully delete data.
        Given User Details id:"<id>" to delete user
        When Try to delete user
        Then Then It will delete user with message: "<message>"

        Examples:
            | id                                   | message                        |
            | 202a7a07-f547-4225-aa75-014ab8c4bb20 | User data deleted successfully |
