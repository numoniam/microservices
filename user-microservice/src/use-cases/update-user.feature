Feature: Use case to update user

    Scenario Outline: Try to update user with invalid detail,then it will throw error.
        Given User details id:"<id>",userUpdateData:"<userUpdateData>" to update user
        When Try to update user
        Then It will throw error: "<message>" while updating user


        Examples:
            | id                                   | userUpdateData                                      | message                                                                 |
            | 4bc26ffa-37a0-4fdf-adff-493806ff3879 | '{}'                                                | '"userUpdateData" must contain at least one of [name, email, password]' |
            | 4bc26ffa-37a0-4fdf-adff              | '{"name":"manthan","email":"manthan12@gmail.com"}'  | '"id" must be a valid GUID'                                             |
            | 5d37e404-490e-4673-b8fa-af69c7b4e6cb | '{"name":"manthan","email":"manthan12@gmail.com"}'  | "User not Exist"                                                        |
            | 4bc26ffa-37a0-4fdf-adff-493806ff3879 | '{"name":"savan","email":"savanghori17@gmail.com"}' | "This mail user already exist please use unique email"                  |


    Scenario Outline: Try to update user with valid detail,then it will successfully update user.
        Given User details id:"<id>",userUpdateData:"<userUpdateData>" to update user
        When Try to update user
        Then It will update user with message: "<message>"

        Examples:
            | id                                   | userUpdateData                                     | message                        |
            | 729c40ee-a322-4731-a17b-4af567d65a76 | '{"name":"manthan","email":"manthan12@gmail.com"}' | User Data Updated successfully |


