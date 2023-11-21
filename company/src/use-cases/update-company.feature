Feature: Use case to update company

    Scenario Outline: Try to update company with invalid detail,then it will throw error.
        Given company Details id:'<id>',updateCompanyData:'<updateCompanyData>' to update company
        When Try to update company
        Then It will throw error: "<message>" while updating company

        Examples:
            | id                                   | updateCompanyData                               | message                                                                           |
            | 218b0124-934e-43c1-a305-8af32b8e3074 | {}                                              | '"updateCompanyData" must contain at least one of [name, contact, city, address]' |
            | 218b0124-934e-43c1-a305              | {"name": "savan infotech","city": "ahemedabad"} | '"id" must be a valid GUID'                                                       |
            | a9b788ce-f6e1-4372-ba55-1ad21258afea | {"name": "savan infotech","city": "ahemedabad"} | "Company Dose Not Exist"                                                          |
            | 4bd1d59c-2bc9-43ed-adeb-a2954ea648cc | {"name": "salesmate","city": "ahemedabad"}      | "Company Name already use please take any other unique name"                      |

    Scenario Outline: Try to update company with valid detail,then it will successfully update company.
        Given company Details id:'<id>',updateCompanyData:'<updateCompanyData>' to update company
        When Try to update company
        Then Then It will update company with message: "<message>"

            | id                                   | updateCompanyData                          | message                           |
            | c517c5df-46d2-423a-8d3a-b89eb8ee21eb | {"name": "onecenter","city": "ahemedabad"} | company data updated successfully |