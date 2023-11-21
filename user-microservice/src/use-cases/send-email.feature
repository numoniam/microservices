Feature: Use case to send mail

    Scenario Outline: Try to send mail with invalid detail,then it will throw error.
        Given Email details email:"<email>" to send new mail
        When Try to send new mail
        Then It will throw error: "<message>" while sending email

        Examples:
            | email               | message                         |
            |                     | '"email" is required'           |
            | savanghorigmail.com | '"email" must be a valid email' |

    Scenario Outline: Try to send mail with valid detail,then it will successfully send email.
        Given Email details email:"<email>" to send new mail
        When Try to send new mail
        Then It will send mail with message: "<message>"

        Examples:
            | email             | message                   |
            | vivek12@gmail.com | Message successfully sent |

