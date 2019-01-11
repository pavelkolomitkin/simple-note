Feature:
  A new user registers in system

  Scenario: User try register with errors
    When I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    When I send a "POST" request to "/security/register" with body:
    """
    {
        "email": "tes",
        "fullName": "Ivan Batkovich",
        "plainPassword":
        {
            "password": "1267",
            "passwordRepeat": "1234567"
        }
    }
    """
    Then the response status code should be 400
    Then the JSON should be equal to:
    """
    {
    "errors": {
        "email": {
            "0": "This value is not a valid email address."
            },
            "plainPassword": {
                "password": {
                    "0": "The password fields must match."
                }
            }
        }
    }
    """

    When I send a "POST" request to "/security/register" with body:
    """
        {
        "email": "test@example.com",
        "fullName": "Ivan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan BatkovichIvan Batkovich",
        "plainPassword":
        {
            "password": "1234567",
            "passwordRepeat": "1234567"
        }
    }
    """
    Then the response status code should be 400
    Then the JSON should be equal to:
    """
    {
    "errors": {
        "fullName": {
            "0": "This value is too long. It should have 255 characters or less."
          }
        }
    }
    """

  Scenario: User can register with correct input data
    When I send a "POST" request to "/security/register" with body:
    """
    {
        "email": "test@example.com",
        "fullName": "Ivan Batkovich",
        "plainPassword":
        {
            "password": "1234567",
            "passwordRepeat": "1234567"
        }
    }
    """
    Then the response status code should be 201
    Then the JSON should be equal to:
    """
    {
        "user": {
            "id": 5,
            "email": "test@example.com",
            "full_name": "Ivan Batkovich"
        }
    }
    """
