$(document).ready(function(){

    module("Misc");

    test("a basic test example", function() {
      ok( true, "this test is fine" );
      var value = "hello";
      equals( "hello", value, "We expect value to be hello" );
      });

    test("first test within module", function() {
      ok( true, "all pass" );
      });

    test("second test within module", function() {
      ok( true, "all pass" );
      });

    test("some other test", function() {
      expect(2);
      equals( true, false, "failing test" );
      equals( true, true, "passing test" );
      });

});
