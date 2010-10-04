Feature: Clicking jQuery event handlers

  Scenario: User visits page event_handler
    Given I am on page event_handler
    When I click the "Add something" div
    Then I should see "the handler was clicked"

