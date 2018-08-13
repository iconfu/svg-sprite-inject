![minified size](http://img.badgesize.io/iconfu/svg-sprite-inject/master/dist/svg-sprite-inject.min.js?label=minified%20size) ![gzip size](http://img.badgesize.io/iconfu/svg-sprite-inject/master/dist/svg-sprite-inject.min.js?compression=gzip) [![npm version](https://badge.fury.io/js/%40iconfu%2Fsvg-sprite-inject.svg)](https://badge.fury.io/js/%40iconfu%2Fsvg-sprite-inject)



# SVGSpriteInject

A tiny, intuitive, robust, caching solution for injecting SVG Sprites into the DOM.

Developed and maintained by [INCORS](http://www.incors.com), the creators of [iconfu.com](https://www.iconfu.com).


## What does it do?

SVGSpriteInject loads an SVG Sprite from an external source and puts it inline at the end of the HTML document. 


## Why should I use it?

In order to apply CSS styles to SVG Sprite images, the SVG Sprite has to be inline in the DOM. With the SVG Sprite injector you can keep your SVGs as individual files, but you can still style the SVG with CSS.


## Install

### Manually

Include the SvgSpriteInject Javascript file in the `<head>` element of your HTML document

```html
<head>
  ...
  <script src="svg-sprite-inject.min.js"></script>
  ...
</head>
```

Download plain version: [svg-sprite-inject.js](https://raw.githubusercontent.com/iconfu/svg-sprite-inject/master/dist/svg-sprite-inject.js)

Download minified version: [svg-sprite-inject.min.js](https://raw.githubusercontent.com/iconfu/svg-sprite-inject/master/dist/svg-sprite-inject.min.js)

### npm

If you are using [npm](https://www.npmjs.com) do:

```console
$ npm install @iconfu/svg-sprite-inject
```

### Yarn

If you are using [Yarn](https://yarnpkg.com)

```console
$ yarn add @iconfu/svg-sprite-inject
```


## Basic Usage

1. Call `SvgSpriteInject(pathToSvg)` to inject an SVG Sprite.
2. Display the SVGs of the SVG Sprite in the HTML document with `<svg ...><use xlink:href="#..."></use></svg>`

**Example:**

```html
<html>
<head>
  <script src="svg-sprite-inject.min.js"></script>

  <script>
    // Inject the SVG Sprite
    SvgSpriteInject('path/to/svg-sprite.svg');
  </script>
</head>
<body>
  <!-- Show a Sprite SVG image --> 
  <svg width="128" height="128"><use xlink:href="#my-sprite-image"></use></svg>
</body>
</html>
```

**That's all: The SVG Sprite gets injected and the images referencing the SVG Sprite will show!!!**

:sparkles: :sparkles: :sparkles:


<hr>


## Why use SVG Sprites

* **Reduce requests**: When injecting each SVG individually there is a network request for each SVG. With SVG Sprites you can reduce the this to only one request.
* **Improve performance**: Having the same SVG multiple times in the same document (like in large tables) can impact the rendering performance if having each SVG inline. With SVG Sprites you only reference the same SVG. 
* **Reduced size**: If multiple images share the same SVG Filters the overall download size can be reduced, because the filters can be reused.


## API

### SVGSpriteInject

| Function | Description |
|----------|-------------|
| SVGSpriteInject(path, options) | Loads an SVG Sprite with the specified path and puts it in the DOM at the end of the document. The optional second parameter sets the [options](#options) for this injection. An `SVGSpriteHandler` object is returned. |

### SVGSpriteHandler

| Function | Description |
|----------|-------------|
| remove() | Remove the SVG Sprite from the document. |

### Options

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| afterInject | function(svgSprite) | `empty function` | Hook after SVG Sprite is injected. The SVG Sprite element is passed as an argument. |
| onLoadFail | function() | `empty function` | Hook after SVG load fails. |

### Full Example using Options

```html
<html>
<head>
  <script src="svg-sprite-inject.min.js"></script>

  <script>
    SVGSpriteInject('path/to/svg-sprite.svg', {
      afterInject: function(svgSprite) {
        // do something when the SVG Sprite is injected
      },
      onLoadFail: function() {
        // do some error handling
      }
    });
  </script>
</head>
<body>
  <svg style="width: 128px; height: 128px;"><use xlink:href="#svg-sprite-image-name"></use></svg>
</body>
</html>
```


## Browser support

All modern browsers, and IE11+


## License

[MIT License](https://github.com/iconfu/svg-sprite-inject/blob/master/LICENSE)