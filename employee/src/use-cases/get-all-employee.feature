Feature: Use case to get all employee

    Scenario Outline: Try to get all employee details,then it will successfully get all employee data.
        When Try to get all employee data
        Then Then It will get all employee data with message: "<message>"

        Examples:
            | message                                                                                                                                                |
            | '[{"id": "164d441b-4b8c-4287-9e2e-96c028e6ca9b","company_id": "2a6b513c-eeef-4ee3-92d6-596291070d33","email": "defaultUser@gmail.com","role": "owner"}]' |