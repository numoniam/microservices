Feature: Use case to get all role

    Scenario Outline: Try to get all role details,then it will successfully get all role data.
        When Try to get all role data
        Then Then It will get all role data with message: "<message>"

        Examples:
            | message                                                                                                                                                                                                           |
            | '[{"id": "00fab9aa-9ccd-4bf7-96b3-b0bf9c4b5947","company_id": "9d41afe8-f5ed-4058-a65d-fd927fd2404f","role": "visiter","permissions": {"employee": {"get": true,"create": true,"update": true,"delete": true}}}]' |
