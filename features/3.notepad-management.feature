Feature:
  User manages their own notepads

  Scenario: User add a new notepad
    Given I authorize with email "test@example.com" and password "1234567"
    Given I send http request with method "POST" on relative url "/notepad" with content:
    """
    {
        "title":"Home test"
    }
    """

    Then the response status code should be 201
    Then the JSON node "notePad.title" should be equal to the string "Home test"


  Scenario: User exit an existing notepad
    Given I authorize with email "test@example.com" and password "1234567"
    Given I send http request with method "PUT" on relative url "/notepad/1" with content:
    """
    {
        "title":"Home test-edited"
    }
    """

    Then the response status code should be 200
    Then the JSON node "notePad.title" should be equal to the string "Home test-edited"


  Scenario: User remove their own notepad
    Given I authorize with email "test@example.com" and password "1234567"
    Given I send http request with method "GET" on relative url "/notepad/1" with content:
    """
    """

    Then the response status code should be 200
    Then the JSON node "notePad.title" should be equal to the string "Home test-edited"

    Given I send http request with method "DELETE" on relative url "/notepad/1" with content:
    """
    """

    Then the response status code should be 200
    And the response should be empty

    Given I send http request with method "GET" on relative url "/notepad/1" with content:
    """
    """
    Then the response status code should be 404


  Scenario: User manage list of notepads
    Given I authorize with email "test@example.com" and password "1234567"

    Given I send http request with method "POST" on relative url "/notepad" with content:
    """
    {
        "title":"Home test"
    }
    """

    Then the response status code should be 201
    Then the JSON node "notePad.title" should be equal to the string "Home test"

    Given I send http request with method "POST" on relative url "/notepad" with content:
    """
    {
        "title":"Home test2"
    }
    """

    Then the response status code should be 201
    Then the JSON node "notePad.title" should be equal to the string "Home test2"

    Given I send http request with method "POST" on relative url "/notepad" with content:
    """
    {
        "title":"Home test3"
    }
    """

    Then the response status code should be 201
    Then the JSON node "notePad.title" should be equal to the string "Home test3"

    Given I send http request with method "GET" on relative url "/notepad/list" with content:
    """
    """
    Then the response status code should be 200
    And the JSON node "notePads[0].notePad.title" should be equal to "Home test3"
    And the JSON node "notePads[1].notePad.title" should be equal to "Home test2"
    And the JSON node "notePads[2].notePad.title" should be equal to "Home test"
    And the JSON node "total" should be equal to "3"


