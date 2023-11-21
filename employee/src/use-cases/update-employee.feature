Feature: Use case to update employee

    Scenario Outline: Try to update employee with invalid detail,then it will throw error.
        Given Emeployee Details id:'<id>',employeeUpdateData:'<employeeUpdateData>' to update employee
        When Try to update employee
        Then It will throw error: "<message>" while updating employee

        Examples:
            | id                                   | employeeUpdateData                                              | message                                                                         |
            | 1dcdbc2d-c3dc-44cf-a272-da22e1781e27 | {}                                                              | '"employeeUpdateData" must contain at least one of [name, email, salary, role]' |
            | 1dcdbc2d-c3dc-44cf-a272              | {"name":"kavish","email":"kavish12@gmail.com","salary":9000000} | '"id" must be a valid GUID'                                                     |
            | 07c8e364-987e-4103-a9d6-619686f13174 | {"name":"kavish","email":"kavish12@gmail.com","salary":9000000} | "Employee dose not exist"                                                       |
            | 07c8e364-987e-4103-a9d6-619686f13174 | {"name":"kavish","email":"kavish12gmail.com","salary":9000000}  | '"employeeUpdateData.email" must be a valid email'                              |

    Scenario Outline: Try to update employee with valid detail,then it will successfully update employee.
        Given Emeployee Details id:'<id>',employeeUpdateData:'<employeeUpdateData>' to update employee
        When Try to update employee
        Then Then It will update employee ewith message: "<message>"

        Examples:
            | id                                   | employeeUpdateData                                      | message                            |
            | 8c7737ac-936b-4be4-96c9-c892c571715a | {"name":"xyz","email":"xyz13@gmail.com","salary":10000} | Employee data updated successfully |
