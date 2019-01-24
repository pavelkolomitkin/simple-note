Feature:
  User manages their own notes

  Scenario: User create a new note in existing notepad
    Given I authorize with email "test@example.com" and password "1234567"
    Given I upload a note attachment "file_1" on server

    Then the response status code should be 201
    And the JSON node "attachment.id" should exist
    And the JSON node "attachment.sources" should exist

    Given I create a new note with text "Simple new note", notepad id "2" and uploaded attachments

    Then the response status code should be 201
    And the JSON node "note.notePad.id" should be equal to the string "2"
    And the JSON node "note.content" should be equal to the string "Simple new note"
    And the JSON node "note.id" should exist
    And the JSON node "note.id" should be equal to the string "1"
    And the JSON node "note.attachments" should exist

    Given I send http request with method "GET" on relative url "/note/1" with content:
    """
    """
    Then the response status code should be 200
