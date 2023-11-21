Feature: Use case to get user

    Scenario Outline: Try to get user with invalid details,then it will throw error.
        Given User Details id:"<id>" to get user
        When Try to get user
        Then It will throw error: "<message>" while geting user

        Examples:
            | id                                   | message                     |
            | f36878d5-2e29-46b0-abcd              | '"id" must be a valid GUID' |
            | f36878d5-2e29-46b0-abcd-8cc5d28f7f07 | "User data not found"       |

    Scenario Outline: Try to get user with exist ID details,then it will successfully get data.
        Given User Details id:"<id>" to get user
        When Try to get user
        Then Then It will get user with message: "<message>"

        Examples:
            | id                                   | message                                                                                       |
            | 6db6fa98-5489-4252-81c6-60c69337eb97 | '[{"id": "6db6fa98-5489-4252-81c6-60c69337eb97","name": "savan","email": "savan@gmail.com"}]' |
