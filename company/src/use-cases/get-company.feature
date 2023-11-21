Feature: Use case to get company

    Scenario Outline: Try to get company with invalid details,then it will throw error.
        Given Company Details id:"<id>" to get company
        When Try to get company
        Then It will throw error: "<message>" while geting company

        Examples:
            | id                                   | message                     |
            | f36878d5-2e29-46b0-abcd              | '"id" must be a valid GUID' |
            | f36878d5-2e29-46b0-abcd-8cc5d28f7f07 | "Company data not found"    |

    Scenario Outline: Try to get company with exist ID details,then it will successfully get data.
        Given Company Details id:"<id>" to get company
        When Try to get company
        Then Then It will get company with message: "<message>"
        
        Examples:
            | id                                   | message                                                                                                                                                                                                            |
            | e093a1a9-2118-4aa6-a053-a3efb46802a8 | '{"companyDetail": [{"id": "e093a1a9-2118-4aa6-a053-a3efb46802a8","name": "ghori infotech","employee": [{"id": "811864a1-3dbd-40c8-a401-0fba16c2675f","name": "defaultUser","email": "defaultUser@gmail.com"}]}]}' |
