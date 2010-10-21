$(document).ready(function(){

    var f1 = '';
    f1 = f1 + "\n" + 'Feature: First';
    f1 = f1 + "\n" + '  In order to value';
    f1 = f1 + "\n" + '  As a role';
    f1 = f1 + "\n" + '  I want feature';
    f1 = f1 + "\n" + '';

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

    var f2 = '';
    f2 = f2 + "\n" + 'Feature: Second';
    f2 = f2 + "\n" + '  In order to value';
    f2 = f2 + "\n" + '  As a role';
    f2 = f2 + "\n" + '  I want feature';
    f2 = f2 + "\n" + '';

    var file = "";

    module("Parsing");

    test("scenario one", function() {

      ramble.reset();
      ramble._parseFeatureFile(f1 + sc1, file);

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
      ramble._parseFeatureFile(f1 + sc2, file);

      equals( ramble._queue.length, 5, "right number of items in queue" );
      equals( ramble._queue[0].type, "feature", "first is feature" );
      equals( ramble._queue[1].type, "scenario", "second is scenario" );
      equals( ramble._queue[2].type, "step", "third is step" );
      equals( ramble._queue[3].type, "step", "fourth is step" );

    });

    test("both scenarios", function() {

      ramble.reset();
      ramble._parseFeatureFile(f1 + sc1 + sc2, file);

      equals( ramble._queue.length, 10, "right number of items in queue" );

    });

    module("Filtering Features");

    test("filter features - no filter", function() {

      ramble.reset();
      ramble._parseFeatureFile(f1 + sc1 + sc2, "user_interface.feature");
      ramble._parseFeatureFile(f2 + sc1, "photo_form.feature");

      equals( ramble._queue.length, 16, "right number of items in queue for no filter" );

    });

    test("filter features - first feature matches", function() {

      ramble.reset();
      ramble.filter_features("inter", true);
      ramble._parseFeatureFile(f1 + sc1 + sc2, "user_interface.feature");
      ramble._parseFeatureFile(f2 + sc1, "photo_form.feature");

      equals( ramble._queue.length, 10, "right number of items in queue for first filtered feature" );

    });

    test("filter features - second feature matches", function() {

      ramble.reset();
      ramble.filter_features("photo", true);
      ramble._parseFeatureFile(f1 + sc1 + sc2, "user_interface.feature");
      ramble._parseFeatureFile(f2 + sc2, "photo_form.feature");

      equals( ramble._queue.length, 5, "right number of items in queue for second filtered feature" );

    });

    module("Filtering Scenarios");

    test("filter scenarios - #1 matches", function() {

      ramble.reset();
      ramble.filter_scenarios("paints the sky");
      ramble._parseFeatureFile(f1 + sc1 + sc2, file);

      equals( ramble._queue.length, 6, "right number of items in queue" );

    });

    test("filter scenarios - #2 matches", function() {

      ramble.reset();
      ramble.filter_scenarios("John signs up");
      ramble._parseFeatureFile(f1 + sc1 + sc2, file);

      equals( ramble._queue.length, 5, "right number of items in queue" );

    });

    test("filter scenarios - all match", function() {

      ramble.reset();
      ramble.filter_scenarios("paints,John signs up");
      ramble._parseFeatureFile(f1 + sc1 + sc2, file);

      equals( ramble._queue.length, 10, "right number of items in queue" );

    });

});
