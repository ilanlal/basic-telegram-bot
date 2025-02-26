class AspResources {
    static get Resources() {
        return Resources;
    }

    static get DEFAULT_LANGUAGE_CODE() {
        return 'en';
    }

    static getResource({ language_code }) {
        if (language_code && this.Resources?.[language_code]) {
            return this.Resources[language_code];
        }

        return this.Resources[this.DEFAULT_LANGUAGE_CODE];
    }

    static getBotInfo({ language_code }) {
        
        return this.getResource({ language_code })?.bot;
    }

    static getAction({ message, language_code }) {
        return this.getResource({ language_code })?.actions?.find((a) => a.message === message);
    }
}