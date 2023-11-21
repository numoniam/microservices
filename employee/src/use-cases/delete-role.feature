Feature: Use case to delete role

    Scenario Outline: Try to delete role with invalid details,then it will throw error.
        Given Role Details id:"<id>" to delete role
        When Try to delete role
        Then It will throw error: "<message>" while deleting role

        Examples:
            | id                                   | message                     |
            | 51235254-6ae7-46b0-9745              | '"id" must be a valid GUID' |
            | 51235254-6ae7-46b0-9745-8726832ba215 | "Role Data dose note exist" |

    Scenario Outline: Try to delete role with valid details,then it will successfully delete role.
        Given Role Details id:"<id>" to delete role
        When Try to delete role
        Then Then It will delete role with message: "<message>"

        Examples:
            | id                                   | message                        |
            | bb8f84c8-226e-4c11-b645-ec14ae0b4f37 | Role data Deleted Successfully |