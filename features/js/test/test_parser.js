$(document).ready(function(){

    module("Parsing Features");

    test("feature", function() {

      var d = '';
      d = d + "\n" + 'Feature: First';
      d = d + "\n" + '  In order to value';
      d = d + "\n" + '  As a role';
      d = d + "\n" + '  I want feature';
      d = d + "\n" + '';
      d = d + "\n" + '  Scenario: User paints the sky blue';
      d = d + "\n" + '    Given I am on the homepage';
      d = d + "\n" + '    When I make the heading "blue"';
      d = d + "\n" + '    #Step doesn\'t exist for this so will show example:';
      d = d + "\n" + '    Then the heading should be "blue"';

      var file = "";

      ramble._parseFeatureFile(d, file);

      equals( ramble._queue.length, 6, "right number of items in queue" );
      equals( ramble._queue[0].type, "feature", "first is feature" );
      equals( ramble._queue[1].type, "scenario", "second is scenario" );
      equals( ramble._queue[2].type, "step", "third is step" );
      equals( ramble._queue[3].type, "step", "fourth is step" );
      equals( ramble._queue[3].comment, false, "fourth is not a comment" );
      equals( ramble._queue[4].type, "step", "fifth is step" );
      equals( ramble._queue[4].comment, true, "fifth is a comment" );
      equals( ramble._queue[5].type, "step", "sixth is step" );

    });

});
