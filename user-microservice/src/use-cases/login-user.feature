Feature: Use case to login user

    Scenario Outline: Try to login user with invalid detail,then it will throw error.
        Given User details email:"<email>",password:"<password>" to login user
        When Try to login with user
        Then It will throw error: "<message>" while login with user

        Examples:
            | email                  | password   | message                                                                                      |
            |                        |            | '"email" is required'                                                                        |
            | savanghorigmail.com    |            | '"email" must be a valid email'                                                              |
            | savanghori13@gmail.com |            | '"password" is required'                                                                     |
            | savanghori13@gmail.com | Savan      | "Password must be at least 8 characters long and contain at least one letter and one number" |
            | xyz12@gmail.com        | Savan@1234 | "Invalid Email Address"                                                                      |


    Scenario Outline: Try to login with user with valid information.
        Given User details email:"<email>",password:"<password>" to login user
        When Try to login with user
        Then Then It will login with user and message: "<message>"

        Examples:
            | email                  | password   | message                     |
            | savanghori45@gmail.com | Savan@1234 | User Logged in successfully |