# dw-filter (under construction...)
A filter component for **darwinEd©** app of **Foris**.

<img src="https://github.com/daniel-llach/dw-filter/blob/master/img/dw-filter.png?raw=true">

* live example: http://daniel-llach.github.io/dw-filter/

# Index:

<a href="#1--install">1.- Install</a> </br>
<a href="#2--use">2.- Use</a> </br>
<a href="#3--api">3.- API</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#31--init">3.1.- Init</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#311--title">3.1.1.- Title</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#312--type">3.1.2.- Type</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#313--search">3.1.3.- Search</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#314--height">3.1.4.- Height</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#315--config">3.1.5.- Config</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#316--data">3.1.6.- Data</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#32--val">3.2.- Val</a> </br>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#33--destroy">3.3.- Destroy</a> </br>
<a href="#4--listeners">4.- Listeners</a> </br>
<a href="#5--demo">5.- Demo</a> </br>
<a href="#6--possible-problems">6.- Possible problems</a> </br>

# 1.- Install
1.1.- Install dependencies from bower into your project
```javascript
  bower install --save dw-filter
```
1.2.- Include dependencies in your html:
```html
<!-- dw-filter dependencies -->
<script src="./bower_components/jquery/dist/jquery.min.js"></script>
<script src="./component/dw-filter.js"></script>
<link rel="stylesheet" type="text/css" href="./component/dw-filter.css">
```

# 2.- Use
Execute the dwFilter class on a selector. It will be rendered a dw-filter element in this container inherit its position and width.
```javascript
$('#id').dwFilter();
```

# 3.- API
## 3.1.- Init
If the dwFilter() class has an object the API interprets that is a new element and create it.

The API accepts the next configurations:

### 3.1.1.- title
### 3.1.2.- type

· **checkbox**: List of checkboxes

<img src="https://github.com/daniel-llach/dw-filter/blob/master/img/checkbox.png?raw=true">

An example:
```javascript
$('#id').dwFilter({
  title: 'Origen',
  type: 'checkbox',
  search: true,
  config: {
    key_attr: 'id',
    value_attr: 'content'
  },
  data: [
    {
      id: 4522,
      content: 'Real'
    },
    {
      id: 5645,
      content: 'Proyección 1'
    },
    {
      id: 2378,
      content: 'Proyección 2'
    }
  ]
});
```
· **selectChain** List of selects

<img src="https://github.com/daniel-llach/dw-filter/blob/master/img/checkbox.png?raw=true">

An example:
```javascript
$('#sample2').dwFilter({
  title: 'title2',
  type: 'selectChain',
  search: 'outer',
  config: {
    key_attr: 'id',
    name_attr: 'name',
    value_attr: 'content',
    options_key_attr: 'id',
    options_value_attr: 'content',
    options_active_attr: 'selected'
  },
  data: [
    {
      id: 1555,
      name: 'The select',
      content: [
        {
          id: 4565,
          content: 'The option 1',
          selected: false
        },
        {
          id: 1212,
          content: 'The option 2',
          selected: true
        }
      ]
    },
    {
      id: 3434,
      name: 'Super select',
      content: [
        {
          id: 4565,
          content: 'Super option 1',
          selected: false
        },
        {
          id: 1212,
          content: 'Super option 2',
          selected: false
        }
      ]
    },
    {
      id: 2211,
      name: 'What a select',
      content: [
        {
          id: 4565,
          content: 'What option 1',
          selected: false
        },
        {
          id: 1212,
          content: 'What option 2',
          selected: true
        }
      ]
    },
    {
      id: 4535,
      name: 'Original select',
      content: [
        {
          id: 4565,
          content: 'Original option 1',
          selected: false
        },
        {
          id: 1212,
          content: 'Original option 2',
          selected: true
        }
      ]
    }
  ]
});
```

### 3.1.3.- search

The possible options are:

· **inner**: Filter the options in the dw-filter element

· **outer**: Return the string into the search input when you realize a **val** methods

· ***If is not define this attribute no show the search input on the element template***

### 3.1.4.- height

· **auto**: The element is high as its contents.

· **number + px / %**: A specific height in px or %. Example:
```javascript
height: '250px'
```

· *if you not specified the value will be 132px


### 3.1.5.- config
### 3.1.6.- data

## 3.2.- Val
```javascript
$('#id').dwFilter('val');
```
Return the follow structure:
```javascript
{
  search: '',
  data: []
}
```
the **search** is the string of the **outer** .

The **data** property is specific by **type** as follow:

· **chekbox**: Array of change ids in options
```javascript
{
  search: '',
  data: [23, 78, 44]
}
```

· **selectChain**: Array of change ids in options
```javascript
{
  search: "text",
	data: [
		{
			name: 'The select',
			content: 1212 // id sede
		},
		{
			name: 'Supe select',
			content: null // no id select
		}
	]
}
```

## 3.3.- Destroy
This methods empty the container div and remove class too.
```javascript
$('#id').dwFilter('destroy');
```

# 4.- Listeners

When change any value that affects the the filter data the selected div when w-filter has instantiated update and trigger a change events that you can listen as follow:

```javascript
$('#id').on({
  change: function(event){
    var result = $('#id').data('result');
    console.log("sample1 data: ", result);
  }
});
```

# 5.- Demo
You can view a local demo installing the component and open /bower_components/dw-filter/**index.html** in your browser (localhost/your_rute).

You must change the bower_components dependencies rutes as follow:

```html
<script src="../jquery/dist/jquery.min.js"></script>
<script src="../underscore/underscore-min.js"></script>
```

# 6.- Possible problems
### 6.1.- Don't show svg background-image:

Confirm that your server are serving well the svg files, add to your ***.htacces*** the follow:
```bash
AddType image/svg+xml .svg .svgz
```
