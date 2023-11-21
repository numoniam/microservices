Feature: Use case to revoke permission

    Scenario Outline: Try to revoke role permission with invalid details,then it will throw error.
        Given Revoke Permission Details id:"<id>" to delete permission
        When Try to Revoke Permission
        Then It will throw error: "<message>" while revoking permissions

        Examples:
            | id                                   | message                     |
            | 70f0c59a-d467-471a-9579              | '"id" must be a valid GUID' |
            | 70f0c59a-d467-471a-9579-59627972af74 | "Role no more exist"        |

    Scenario Outline: Try to revoke permission with exist ID details,then it will successfully revoke permission.
        Given Revoke Permission Details id:"<id>" to delete permission
        When Try to Revoke Permission
        Then It will revoke permission message: '<message>'

        Examples:
            | id                                   | message                         |
            | 1c2ac6fb-7440-48dc-a8d0-98526e22faf7 | Revoked permission successfully |