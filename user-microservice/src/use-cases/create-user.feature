Feature: Use case to create a user

    Scenario Outline: Try to create user with invalid detail,then it will throw error.
        Given Company details name:"<name>",email:"<email>",password:"<password>" to create new user
        When Try to create new user
        Then It will throw error: "<message>" while creating new user

        Examples:
            | name  | email                  | password   | message                                                                                      |
            |       |                        |            | '"name" is required'                                                                         |
            | hello |                        |            | '"email" is required'                                                                        |
            | hello | savanghori12gmail.com  |            | '"email" must be a valid email'                                                              |
            | hello | savanghori12@gmail.com |            | '"password" is required'                                                                     |
            | hello | savanghori12@gmail.com | savan      | "Password must be at least 8 characters long and contain at least one letter and one number" |
            | hello | savanghori12@gmail.com | Hello@1234 | "Email Already exist"                                                                        |

    Scenario Outline: Try to create new user with valid information.
        Given Company details name:"<name>",email:"<email>",password:"<password>" to create new user
        When Try to create new user
        Then Then It will create new user with message: "<message>"

        Examples:
            | name | email            | password  | message                                         |
            | test | test12@gmail.com | Test@1234 | '{"id":"ac56a6ce-0551-4b83-b613-32ce296e28ff"}' |