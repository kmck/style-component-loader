# style-component-loader

This loader allows you to load a stylesheet and replace tokens on-the-fly via JavaScript.

It's similar to the [reference-counted API](https://github.com/webpack/style-loader#reference-counted-api) of the [style-loader](https://github.com/webpack/style-loader), except that instead of inserting and removing a single stylesheet, you're insert copies of the same stylesheet with different variables.

## Usage

Create a stylesheet:

```scss
#{'$custom-classname'} {
  color: #{'$token-to-replace'};
}
```

Load it with `style-component-loader` and friends:

```js
// Load the styles as a component
var styleComponent = require('style-component!css!sass!./style-template.scss');
// Insert a `<style>` tag and append the style template with the variable replacements applied
styleComponent.insert('red', {
    '$custom-classname': '.red-text',
    '$token-to-replace': '#ff0000',
});
// Insert more styles
styleComponent.insert('green', {
    '$custom-classname': '.green-text',
    '$token-to-replace': '#00ff00',
});
// Remove styles by key
syleComponent.remove('red');
```
