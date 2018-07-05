# SVGSpriteInject


## What does is do

SVGSpriteInject puts an SVG sprite inline in the document body of an HTML document.


## Why should I use it?

In order to apply CSS styles to SVG sprite images, the SVG sprite has to be inline in the DOM. With the SVG sprite injector you can keep your SVGs as individual files, but you can still style the SVG with CSS.

## Install

### Manually 

Include the SvgInject javascript file in the head of your HTML document

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

#### Yarn

```
$ yarn add @iconfu/svg-sprite-inject
```

## Usage

call SvgSpriteInject('path/to/svg-sprite.svg') to inject an SVG sprite

svg can be references now anywher in the document

```
<svg width="128" height="128"><use xlink:href="#image-name"></use></svg>
```


## How does it work?

The SVG sprite injector loads the SVG sprite and puts it inline into the HTML `body` tag.



## What are the advantages?

Works on all browsers that support SVG. Yes, including Internet Explorer 9!
* Intuitive usage. Insert the SVG images into your HTML code just as PNG images, with only one additional instruction.
* Behaves like a normal <img> element if file not found or not available.
* Native fallback for no Javascript



## What are the Limitations?

Attributes ismap, usemap, srcset, x and y of the <img> element will be ignored
No caching on older browsers and on [shift]-reload
Does not work locally on Chrome (due to same origin policy)

## 