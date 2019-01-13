Feature:
  Checking user authorization

  Scenario: User can not authorize because of wrong credentials
    When I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    When I send a "POST" request to "/security/login_check" with body:
    """
    {
        "username": "",
        "password": ""
    }
    """
    Then the response status code should be 401
    When I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    When I send a "POST" request to "/security/login_check" with body:
    """
    {
        "username": "weqweqw",
        "password": "23231"
    }
    """
    Then the response status code should be 401

  Scenario: User authorizes successful
    When I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"

    When I send a "POST" request to "/security/login_check" with body:
    """
    {
        "username": "test@example.com",
        "password": "1234567"
    }
    """
    Then the response status code should be 200
    And the JSON node "token" should exist
    And I hold the authorize token from response