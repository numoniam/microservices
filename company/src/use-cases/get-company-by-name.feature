Feature: Use case to get company by name

    Scenario Outline: Try to get company by name with invalid details,then it will throw error
        Given Company Details name:"<name>" to get company by name
        When Try to get company by name
        Then It will throw error: "<message>" while geting company by name

        Examples:
            | name      | message                                            |
            | sa        | '"name" length must be at least 3 characters long' |
            | salesmate | "Company data not found"                           |

    Scenario Outline: Try to get company by name details,then it will successfully get data.
        Given Company Details name:"<name>" to get company by name
        When Try to get company by name
        Then Then It will get company by name with message: "<message>"

        Examples:
            | name     | message                                                                                       |
            | rapidops | '[{"id": "710f805a-291f-4e25-9ae6-5b1786fbd81f","name": "rapidops","contact": "7621847052"}]' |