class Test_Logic {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        QUnit.helpers(this);
        this.module("Resources & Logics test module");
        this.runTests();
    }

    runTests() {
        this.test_Resources();
    }

    test_Resources() {
        const lang_test_codes = ['en', 'es', 'ar', '', null, NaN, undefined];

        lang_test_codes.forEach((lang_code) => {
            this.test(`test get "start" resource lang:${lang_code}`, function (assert) {
                let resource = getResource(lang_code);
                assert.ok(resource.start.text, "Response text to /start command lang_code=" + lang_code);
                assert.ok(resource.start.reply_markup, "Response keyboard to /start command lang_code=" + lang_code);
            });
        });
    }
}