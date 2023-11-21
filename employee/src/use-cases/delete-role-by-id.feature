Feature: Use case to delete role by Id

    Scenario Outline: Try to delete role by id with invalid details,then it will throw error.
        Given Role Details id:"<id>" to delete role by id
        When Try to delte role by id
        Then It will throw error: "<message>" while deleting role by id

        Examples:
            | id                      | message                     |
            | 51235254-6ae7-46b0-9745 | '"id" must be a valid GUID' |

    Scenario Outline: Try to delete role by id with valid details,then it will successfully delete role by id.
        Given Role Details id:"<id>" to delete role by id
        When Try to delte role by id
        Then It will delete role by id  with message: '<message>'


        Examples:
            | id                                   | message                                 |
            | 70f0c59a-d467-471a-9579-59627972af74 | Employee role data deleted successfully |
