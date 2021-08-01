module.exports = {

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/../public/scss/variables.scss";
                @import "@/../public/scss/fonts.scss";
                @import "@/../public/scss/mixins.scss";
                `
            }
        }
    }
};
