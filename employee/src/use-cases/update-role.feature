Feature: Use case to update role

    Scenario Outline: Try to update role with invalid detail,then it will throw error.
        Given Role Details id:'<id>',roleUpdateData:'<roleUpdateData>' to update role
        When Try to update role
        Then It will throw error: "<message>" while updating role

        Examples:
            | id                                   | roleUpdateData        | message                                                             |
            | 0c7117da-1138-491f-8780-5dd1746c2bbe | {}                    | '"roleUpdateData" must contain at least one of [role, permissions]' |
            | 0c7117da-1138-491f                   | {"role":"admin"}      | '"id" must be a valid GUID'                                         |
            | 00fab9aa-9ccd-4bf7-96b3-b0bf9c4b5947 | {"role": "developer"} | "Role Dose Not Exist"                                               |

    Scenario Outline: Try to update role with valid detail,then it successfully update role.
        Given Role Details id:'<id>',roleUpdateData:'<roleUpdateData>' to update role
        When Try to update role
        Then It will update role with message: "<message>"

        Examples:
            | id                                   | roleUpdateData        | message                   |
            | db0162ab-8918-4432-b16f-309b430d1d55 | {"role": "developer"} | Role Updated successfully |
