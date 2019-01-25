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
    And I hold last note

    Given I try download image of the last note attachment with size "original" without secure token
    Then the response status code should be 401

    Given I try download image of the last note attachment with size "previewDetails" without secure token
    Then the response status code should be 401

    Given I try download image of the last note attachment with size "previewMiddle" without secure token
    Then the response status code should be 401

    Given I try download image of the last note attachment with size "previewNormal" without secure token
    Then the response status code should be 401

    Given I try download image of the last note attachment with size "previewSmall" without secure token
    Then the response status code should be 401

    Given I try download image of the last note attachment with size "original" with secure token
    Then the response status code should be 200

    Given I try download image of the last note attachment with size "previewDetails" with secure token
    Then the response status code should be 200

    Given I try download image of the last note attachment with size "previewMiddle" with secure token
    Then the response status code should be 200

    Given I try download image of the last note attachment with size "previewNormal" with secure token
    Then the response status code should be 200

    Given I try download image of the last note attachment with size "previewSmall" with secure token
    Then the response status code should be 200

  Scenario: User edit an existing note
    Given I authorize with email "test@example.com" and password "1234567"
    Given I send http request with method "PUT" on relative url "/note/1" with content:
    """
    {
      "notePad": 3,
      "content": "Simple new note(updated)"
    }
    """
    Then the response status code should be 200
    And the JSON node "note.notePad.id" should be equal to the string "3"
    And the JSON node "note.content" should be equal to the string "Simple new note(updated)"


  Scenario: User remove an existing note
    Given I authorize with email "test@example.com" and password "1234567"
    Given I send http request with method "DELETE" on relative url "/note/1" with content:
    """
    """
    Then the response status code should be 200

    Given I send http request with method "GET" on relative url "/note/1" with content:
    """
    """
    Then the response status code should be 404


  Scenario: User manages their note list
    Given I authorize with email "test@example.com" and password "1234567"

    Given I create a new note with text "Simple new note1", notepad id "2" and uploaded attachments
    Then the response status code should be 201

    Given I create a new note with text "Simple new note2", notepad id "2" and uploaded attachments
    Then the response status code should be 201

    Given I create a new note with text "Simple new note3", notepad id "2" and uploaded attachments
    Then the response status code should be 201

    Given I send http request with method "GET" on relative url "/note/list" with content:
    """
    """
    Then the response status code should be 200

    And the JSON node "notes[0].notePad.id" should be equal to "2"
    And the JSON node "notes[1].notePad.id" should be equal to "2"
    And the JSON node "notes[2].notePad.id" should be equal to "2"
    And the JSON node "total" should be equal to "3"

    And the JSON node "notes[0].content" should be equal to "Simple new note3"
    And the JSON node "notes[1].content" should be equal to "Simple new note2"
    And the JSON node "notes[2].content" should be equal to "Simple new note1"