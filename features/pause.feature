Feature: Pause

  Scenario: User pauses so that the message will show up in time
    Given I am on page pause
    When I pause 4000
    Then I should see "This will load after a pause"

  Scenario: User does not pause so the message does not show up in time
    Given I am on page pause
    # The following step should fail because we purposefully load the content slowly
    Then I should see "This will load after a pause"
