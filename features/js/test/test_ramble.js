$(document).ready(function(){

    var d = '';
    d = d + "\n" + 'Feature: First';
    d = d + "\n" + '  In order to value';
    d = d + "\n" + '  As a role';
    d = d + "\n" + '  I want feature';
    d = d + "\n" + '';

    var sc1 = '';
    sc1 = sc1 + "\n" + '  Scenario: User paints the sky blue';
    sc1 = sc1 + "\n" + '    Given I am on the homepage';
    sc1 = sc1 + "\n" + '    When I make the heading "blue"';
    sc1 = sc1 + "\n" + '    #Step doesn\'t exist for this so will show example:';
    sc1 = sc1 + "\n" + '    Then the heading should be "blue"';

    var sc2 = '';
    sc2 = sc2 + "\n" + '  Scenario: John signs up';
    sc2 = sc2 + "\n" + '    Given I am on the homepage';
    sc2 = sc2 + "\n" + '    When I make the heading "blue"';
    sc2 = sc2 + "\n" + '    Then the heading should be "blue"';

    var file = "";

    module("Parsing");

    test("scenario one", function() {

      ramble.reset();
      ramble._parseFeatureFile(d + sc1, file);

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

    test("scenario two", function() {

      ramble.reset();
      ramble._parseFeatureFile(d + sc2, file);

      equals( ramble._queue.length, 5, "right number of items in queue" );
      equals( ramble._queue[0].type, "feature", "first is feature" );
      equals( ramble._queue[1].type, "scenario", "second is scenario" );
      equals( ramble._queue[2].type, "step", "third is step" );
      equals( ramble._queue[3].type, "step", "fourth is step" );

    });

    test("both scenarios", function() {

      ramble.reset();
      ramble._parseFeatureFile(d + sc1 + sc2, file);

      equals( ramble._queue.length, 10, "right number of items in queue" );

    });

    module("Filtering Scenarios");

    test("filter scenarios - #1 matches", function() {

      ramble.reset();
      ramble.filter_scenarios("paints the sky");
      ramble._parseFeatureFile(d + sc1 + sc2, file);

      equals( ramble._queue.length, 6, "right number of items in queue" );

    });

    test("filter scenarios - #2 matches", function() {

      ramble.reset();
      ramble.filter_scenarios("John signs up");
      ramble._parseFeatureFile(d + sc1 + sc2, file);

      equals( ramble._queue.length, 5, "right number of items in queue" );

    });

    test("filter scenarios - all match", function() {

      ramble.reset();
      ramble.filter_scenarios("paints,John signs up");
      ramble._parseFeatureFile(d + sc1 + sc2, file);

      equals( ramble._queue.length, 10, "right number of items in queue" );

    });

});
