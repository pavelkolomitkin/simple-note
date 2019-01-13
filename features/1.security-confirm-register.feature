Feature:
  User confirm registration by activation key

  Scenario: Activate registration by key
    Given I have an activation key with email "test@example.com"
    When I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    Then I try activate my registration by key
    Then the response status code should be 200
    Then the JSON should be equal to:
    """
    {
        "user": {
            "id": 1,
            "email": "test@example.com",
            "fullName": "Ivan Batkovich"
        }
    }
    """

  Scenario: Try to activate registration by invalid key
    Given I have an activation key with email "test@example.com"
    When I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    Then I try activate my registration by key
    Then the response status code should be 400
    Then the JSON should be equal to:
    """
    {
      "errors": {
          "key": [
              "This key is not valid"
            ]
          }
    }
    """