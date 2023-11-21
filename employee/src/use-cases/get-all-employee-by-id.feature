Feature:  Use case to get all employee by Id

    Scenario Outline: Try to get all employee by ID with invalid details,then it will throw error.
        Given Get Details id:"<id>" to get all employee by id
        When Try to get all employee by id
        Then It will throw error: "<message>" while geting all employee ny id

        Examples:
            | id                                   | message                     |
            | f36878d5-2e29-46b0-abcd              | '"id" must be a valid GUID' |
            | f36878d5-2e29-46b0-abcd-8cc5d28f7f07 | "Employees data not found"  |

    Scenario Outline: Try to get all employee by ID with valid details,then it will successfully get data.
        Given Get Details id:"<id>" to get all employee by id
        When Try to get all employee by id
        Then Then It will get all employee by id with message: "<message>"

        Examples:
            | id                                   | message                                                                                                                           |
            | 4ef50d64-6d4f-4aa7-9418-781b852a772c | '[{"id":"fbdba0e5-dcec-4b1a-a7dc-551dd682af64","name":"smit","email":"savanghori12@gmail.com","salary":"10000","role":"intern"}]' |