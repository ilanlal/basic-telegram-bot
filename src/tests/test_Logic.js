function test_logic_run() {
    // Imports the following functions:
    // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
    // notStrictEqual, throws, module, test, asyncTest, expect
    QUnit.helpers(this);

    module("logic module");

    test("test getResource", 1, function () {
        ok(true);
    });
}