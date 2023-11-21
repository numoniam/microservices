Feature: Use case to get all company

    Scenario Outline: Try to get all company details,then it will successfully get all company data.
        When Try to get al company data
        Then Then It will get all company data with message: "<message>"

        Examples:
            | message                                                                                                                         |
            | '[{"id": "202a7a07-f547-4225-aa75-014ab8c4bb20","name": "zxc","contact": "1234567890","city": "zxcvbn","address": "varaccha"}]' |