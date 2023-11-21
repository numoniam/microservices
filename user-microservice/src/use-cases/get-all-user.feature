Feature: Use case to get all user

    Scenario Outline: Try to get all user details,then it will successfully get all user data.
        When Try to get all user data
        Then Then It will get all user data with message: "<message>"

        Examples:
            | message                                                                                                                                                                        |
            | '[{"id": "4bc26ffa-37a0-4fdf-adff-493806ff3879","name": "manthan","email": "manthan12@gmail.com","password": "$2b$10$iyDCdeL47YI8vwHP2FoqF.C756QNsvCw0Er9vHWT757GPQ0FUGamC"}]' |