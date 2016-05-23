function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function replaceContentTokens(content, tokens) {
    var regExp = new RegExp('(' + Object.keys(tokens).map(escapeRegExp).join('|') + ')', 'g');
    return content.replace(regExp, function(key) {
        return tokens[key];
    });
}

function replaceTokens(list, tokens) {
    return list.map(function(item) {
        item = item.slice(0);
        item[1] = replaceContentTokens(item[1], tokens);
        return item;
    });
}

module.exports = replaceTokens;
