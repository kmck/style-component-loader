var extend = require('lodash/extend');
var loaderUtils = require('loader-utils');
var path = require('path');
module.exports = function() {};
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    if (this.cacheable) {
        this.cacheable();
    }

    var addStylesOptions = extend({
        singleton: true,
    }, loaderUtils.parseQuery(this.query));

    var valuesPath = loaderUtils.stringifyRequest(this, require.resolve('lodash/values'));
    var replaceTokensPath = loaderUtils.stringifyRequest(this, path.join(__dirname, 'replace-tokens'));
    var addStylesPath = loaderUtils.stringifyRequest(this, '!' + require.resolve('style-loader/addStyles'))
    var contentPath = loaderUtils.stringifyRequest(this, "!!" + remainingRequest);

    return [
        "var styles = {};",
        "var updater;",
        // Utils
        "var values = require(" + valuesPath + ");",
        "var replaceTokens = require(" + replaceTokensPath + ");",
        "var addStyles = require(" + addStylesPath + ");",
        // Stylesheet template
        "var styleTemplate = require(" + contentPath + ");",
        "if (typeof styleTemplate === 'string') styleTemplate = [[module.id, styleTemplate, '']];",
        // Update the inject styles on the page
        "function update() {",
        "    var list = Array.prototype.concat.apply([], values(styles));",
        "    if (list.length && updater) {",
        "        updater(list, " + JSON.stringify(addStylesOptions) + ");",
        "    } else if (list.length) {",
        "        updater = addStyles(list, " + JSON.stringify(addStylesOptions) + ");",
        "    } else if (updater) {",
        "        updater();",
        "        updater = null;",
        "    }",
        "    return exports;",
        "}",
        // Add styles to the page for a specific ID
        "function insert(id, tokens) {",
        "    styles[id] = replaceTokens(styleTemplate, tokens);",
        "    return update();",
        "}",
        // Remove styles from the page for a specific ID
        "function remove(id) {",
        "    delete styles[id];",
        "    return update();",
        "}",
        "exports.update = update;",
        "exports.insert = insert;",
        "exports.remove = remove;",
        "exports.styles = styles;",
        // @TODO: Hot module reloading
        ""
    ].join('\n');
};
