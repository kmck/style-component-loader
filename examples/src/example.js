var styleComponent = require('./test.tpl.scss');
window.styleComponent = styleComponent.insert('keithmcknight', {
    '$blog-classname': '.keithmcknight',
    '$text-color': '#ffd731',
    '$background-color': '#b23727',
});

var styleUseable = require('./test.scss');
window.styleUseable = styleUseable.use();
