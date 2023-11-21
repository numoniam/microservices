Feature: Use case to get role

    Scenario Outline: Try to get role with invalid details,then it will throw error.
        Given Role Details id:"<id>" to get role
        When Try to get role
        Then It will throw error: "<message>" while geting role

        Examples:
            | id                                   | message                     |
            | 1c2ac6fb-7440-48dc-a8d0              | '"id" must be a valid GUID' |
            | 1c2ac6fb-7440-48dc-a8d0-98526e22faf7 | "Role data not found"       |

    Scenario Outline: Try to get role with exist ID details,then it will successfully get role data.
        Given Role Details id:"<id>" to get role
        When Try to get role
        Then Then It will get role with message: "<message>"

        Examples:
            | id                                   | message                                                                                                                                                                                              |
            | 0c7117da-1138-491f-8780-5dd1746c2bbe | '[{"id":"0c7117da-1138-491f-8780-5dd1746c2bbe","company_id":"9d41afe8-f5ed-4058-a65d-fd927fd2404f","role":"dev","permissions":{"employee":{"get":true,"create":true,"update":true,"delete":true}}}]' |

