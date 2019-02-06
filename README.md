# stories.js
[![Stories.JS demo](url gif)](url project)

# Getting started
Stories JS is born because my team needs for an extensible yet easy-to-use stories solution. We use [zuck.js](https://github.com/ramon82/zuck.js/) but he wasn't easy to custom for we need.

## Installation
Intall the `stories.js` package in your project.

```
yarn add stories
# or with npm
# npm install --save stories
```

Add on your code the component initialization.

```
const stories = new StoriesJS(null, opt);
```

## Configurations

### Constructor
This constructor receives two properties:

| Param                     | Description                                      | Default  | Required |
| :---------------------------- | :--------------------------------------------- | :------: || :------: |
| selector | A API se encontra na plataforma do backstage   |   document.body   | false |
| opt                 | Options with stories and callbacks            |        |true|

### Options
Options for initialize Stories.

```
const opt = {...}
```
Below the properties that can be passed to the options:
#### stories
Array from your data. The structure is:

```
[
    {
      "title": "Title history one",
      "preview": "<LINK FOR PREVIEW HISTORY ONE>.jpg",
      "slides": [{
          "title": "Title slide one",
          "src": "<LINK FOR SLIDE ONE>.jpg"
        },
        {
          "title": "Title slide two",
          "src": "<LINK FOR SLIDE TWO>.jpg"
        }
      ]
    },
    {
      "title": "Title history two",
      "preview": "<LINK FOR PREVIEW HISTORY TWO>.jpg",
      "slides": [
        {
          "type": "video",
          "preview": "<LINK FOR PREVIEW VIDEO>.jpg",
          "title": "Title slide one",
          "src": "<LINK FOR VIDEO>.mp4"
        },
        {
          "title": "Title slide two",
          "src": "<LINK FOR SLIDE TWO>.jpg"
        }
      ]
    }
  ]
```

#### callbacks
Functions to be called after running your events.

| Callback                     | Description                                      | Args  |
| :---------------------------- | :--------------------------------------------- | :------: |
| openStory | A API se encontra na plataforma do backstage   |   document.body   |
| onSlideEnd                 | Options with stories and callbacks            |        |
| onLinkClick                 | Options with stories and callbacks            |        |
| onClose | Options with stories and callbacks            |        |
| nextSlide | Options with stories and callbacks            |        |
| prevSlide | Options with stories and callbacks            |        |
| nextStory | Options with stories and callbacks            |        |
| prevStory | Options with stories and callbacks            |        |
| onTouchStartActiveSlide | Options with stories and callbacks            |        |
| onTouchEndActiveSlide | Options with stories and callbacks            |        |
| onStoryEnd | Options with stories and callbacks            |        |
