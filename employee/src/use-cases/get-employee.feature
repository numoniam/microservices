Feature: Use case to get employee

    Scenario Outline: Try to get employee with invalid details,then it will throw error.
        Given Employee Details id:"<id>" to get employee
        When Try to get employee
        Then It will throw error: "<message>" while geting employee

        Examples:
            | id                                   | message                     |
            | f36878d5-2e29-46b0-abcd              | '"id" must be a valid GUID' |
            | f36878d5-2e29-46b0-abcd-8cc5d28f7f07 | "Employee data not found"   |

    Scenario Outline: Try to get employee with valid details,then it will successfullly get data.
        Given Employee Details id:"<id>" to get employee
        When Try to get employee
        Then Then It will get employee data with message: "<message>"

        Examples:
            | id                                   | message                                                                                                                                                                                                                                                                |
            | 07c8e364-987e-4103-a9d6-619686f13174 | '[{"id":"07c8e364-987e-4103-a9d6-619686f13174","email":"savanghori12@gmail.com","role":"intern","companyDetail":{"name":"salesmate","city":"ahmedabad","employee":[{"id":"07c8e364-987e-4103-a9d6-619686f13174","email":"savanghori12@gmail.com","role":"intern"}]}}]' |

