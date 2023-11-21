Feature: Use case to create a new company

    Scenario Outline: Try to create company with invalid detail,then it will throw error.
        Given Company details name:"<name>",contact:"<contact>",city:"<city>",address:"<address>" to create new company
        When Try to create new company
        Then It will throw error: "<message>" while creating new company

        Examples:
            | name      | contact    | city      | address | createCompanyDbFunctionCallCount | message                                                |
            |           |            |           |         | 0                                | '"name" is required'                                   |
            | sa        |            |           |         | 0                                | '"name" length must be at least 3 characters long'     |
            | salesmate |            |           |         | 0                                | '"contact" is required'                                |
            | salesmate | 12345      |           |         | 0                                | '"contact" must be larger than or equal to 1000000000' |
            | salesmate | 1234567890 |           |         | 0                                | '"city" is required'                                   |
            | salesmate | 1234567890 | A         |         | 0                                | '"city" length must be at least 2 characters long'     |
            | salesmate | 1234567890 | Ahmedabad |         | 0                                | '"address" is required'                                |
            | salesmate | 1234567890 | Ahmedabad | sola    | 0                                | '"address" length must be at least 5 characters long'  |


    Scenario Outline: Try to create new company with already registered name, then it will throw error.
        Given Company details name:"<name>",contact:"<contact>",city:"<city>",address:"<address>" to create new company
        When Try to create new company
        Then It will throw error: "<message>" while creating new company

        Examples:
            | name      | contact    | city      | address    | message                                     |
            | salesmate | 1234567890 | Ahmedabad | sola brige | "User with the same name is already exists" |


    Scenario Outline: Try to create new company with valid information.
        Given Company details name:"<name>",contact:"<contact>",city:"<city>",address:"<address>" to create new company
        When Try to create new company
        Then Then It will create new company with message: "<message>"

        Examples:
            | name     | contact    | city      | address    | message                                            |
            | rapidops | 1234567890 | Ahmedabad | sola brige | '{ "id": "c517c5df-46d2-423a-8d3a-b89eb8ee21eb" }' |
