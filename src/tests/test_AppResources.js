class Test_AppResources {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        // QUnit.helpers(this);
        QUnit.module("AppResources");
        this.DEFAULT_LANGUAGE_CODE = 'en';
        this.runTests();
    }

    runTests() {
        this.test_getResource();
        this.test_getResourceLimit();
        this.test_getBotInfo();
        this.test_getAction();
    }

    test_getResourceLimit() {
        QUnit.test("test get 'undefined' resource", function (assert) {
            const resource = AppResources.getResource({ language_code: undefined });
            assert.ok(resource?.bot, `bot resource exist lang_code=undefined`);
            assert.ok(resource?.actions, `messages=start, lang_code=undefined`);
        });

        QUnit.test("test 'en' not same as 'es' resource", function (assert) {
            let resource_en = AppResources.getResource({ language_code: 'en' });
            let resource_es = AppResources.getResource({ language_code: 'es' });
            assert.notDeepEqual(resource_en, resource_es, `resource not same`);
        });
    }

    test_getResource() {
        const langCodeTests = ['en', 'es'];
        const messageTests = ['start', 'help', 'about'];
        langCodeTests.forEach((language_code) => {
            QUnit.test(`test get resource lang:${language_code}`, function (assert) {
                const resource = AppResources.getResource({ language_code });
                assert.ok(resource?.bot, `bot resource exist lang_code=${language_code}`);
                messageTests.forEach((message) => {
                    const action = AppResources.getAction({ message, language_code });
                    assert.ok(action?.message, `messages=${message}, lang_code=${language_code}`);
                });
            });
        });
    }

    test_getBotInfo() {
        QUnit.test("test getBotInfo for 'start' action.", function (assert) {
            const botInfo = AppResources.getBotInfo({ language_code: this.DEFAULT_LANGUAGE_CODE });
            assert.ok(botInfo?.name, "Bot info");
        });
    }

    test_getAction() {
        QUnit.test("test getAction for 'start' action.", function (assert) {
            const action = AppResources.getAction({
                message: 'start',
                language_code: this.DEFAULT_LANGUAGE_CODE
            });
            assert.ok(action?.message, "Action info");
        });
    }
}