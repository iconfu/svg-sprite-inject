# SVGSpriteInject


## What does is do

SVGSpriteInject puts an SVG sprite inline in the document body of an HTML document.


## Why should I use it?

In order to apply CSS styles to SVG sprite images, the SVG sprite has to be inline in the DOM. With the SVG sprite injector you can keep your SVGs as individual files, but you can still style the SVG with CSS.

## Install

### Manually 

Include the SvgInject javascript file in your HTML document

```html
<head>
  ...
  <script src="svg-sprite-inject.min.js">
  ...
</head>
```

plain version: <a href="https://raw.githubusercontent.com/iconfu/svg-sprite-inject/master/dist/svg-sprite-inject.js" download>svg-sprite-inject.js</a>

minified version: <a href="https://raw.githubusercontent.com/iconfu/svg-sprite-inject/master/dist/svg-sprite-inject.min.js" download>svg-sprite-inject.min.js</a>

### npm

```
$ npm install @iconfu/svg-sprite-inject
```

### Yarn

```
$ yarn add @iconfu/svg-sprite-inject
```

## Usage

Call SvgSpriteInject(pathToSvg) to inject an SVG sprite.


```
SvgSpriteInject('path/to/svg-sprite.svg')

```


You can display SVGs included in the SVG sprite anywhere in your document. 


```
<svg width="128" height="128"><use xlink:href="#svg-sprite-image-name"></use></svg>
```

# Advanced Topics

## How does it work?

The SVG sprite injector loads the SVG sprite and puts it inline into the HTML `body` tag.
