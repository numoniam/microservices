Feature: Use case to get assign role

    Scenario Outline: Try to get assign role with invalid details,then it will throw error.
        Given Role Details id:"<id>" to get assign role
        When Try to get assign role
        Then It will throw error: "<message>" while geting assign role

        Examples:
            | id                                   | message                      |
            | f36878d5-2e29-46b0-abcd              | '"id" must be a valid GUID'  |
            | f36878d5-2e29-46b0-abcd-8cc5d28f7f07 | "Assign role data not found" |

    Scenario Outline: Try to get assign role with valid details,then it will get successfull data.
        Given Role Details id:"<id>" to get assign role
        When Try to get assign role
        Then Then It will get assign role data with message: "<message>"

        Examples:
            | id                                   | message                                                                                                                                                    |
            | 653ff526-17ef-4a71-9a1a-94227d9e43df | '[{"id": "894764f3-d5f0-46ef-9e88-61471aec0656","role_id": "c669428a-cbc2-4a14-b67a-bcede9d9b118","employee_id": "653ff526-17ef-4a71-9a1a-94227d9e43df"}]' |