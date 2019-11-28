
# ftc-datepicker

* Ultimate calendar for your React app.
* Supports range selection

## tl;dr
* Install by executing 
`npm install ftc-datepicker`
or
`yarn add ftc-datepicker`
* Import by adding
`import DatePicker from 'ftc-datepicker';`
* Use by adding
`<DatePicker />`
* For getting selected date/range use this prop:
`selectCallbackFN`

## Getting started

### Installation

Add **ftc-datepicker** to your project by executing
```
npm install ftc-datepicker
```
or
```
yarn add ftc-datepicker
```

### Usage

Here's an example of basic usage:

```js
import React, { Component } from 'react';
import DatePicker from 'ftc-datepicker';

class MyApp extends Component {
  constructor() {
    super();
    this.state = {
      dateRangeStart: new Date(2019, 1, 1),
      dateRangeEnd: new Date(2019, 5, 4)
    }
  }
  
  selectCallbackFN = (start, end) => this.setState({
    selectedDate: start,
    dateRangeEnd: end
  });

  render() {
    return (
      <div>
        <DatePicker
          dateRangeStart={this.state.dateRangeStart}
          dateRangeEnd={this.state.dateRangeEnd}
          selectCallbackFN={this.selectCallbackFN}
        />
      </div>
    );
  }
}
```

## User guide

### Props

|Prop name|Description|Prop type|Default value|Example values|
|----|----|----|----|----|
|preventBefore||Date|`null`|`new Date(2010, 2, 4)`|
|preventAfter||Date|`null`|`new Date(2025, 3, 2)`|
|dateRangeStart||Date|`null`|`new Date(2019, 2, 9)`|
|dateRangeEnd||Date|`null`|`new Date(2019, 5, 4)`|
|initialDate||Date|`null`|`new Date()`|
|dateFormat||String|`'ddd, mmm dd yyyy'`|`'d/m/yyyy'`|
|monthTitleDateFormat||String|`'mmmm yyyy'`|`'mm-yyyy'`|
|isPopUp||Boolean|`true`|`true` or `false`|
|isRangePicker||Boolean|`false`|`true` or `false`|
|showDatePickerDetails||Boolean|`false`|`true` or `false`|
|showTitleDropDown||Boolean|`false`|`true` or `false`|
|propsConsoleLog||Boolean|`false`|`true` or `false`|
|todayButton||String/Boolean|`false`|`true` or `false` or `'Show today'`|
|clearButton||String/Boolean|`false`|`true` or `false` or `'Clear selection'`|
|placeholder||String|`''`|`'Click here to select date'`|
|blackList||[Date, Date, Date, ...]|`[]`|`[new Date(2019, 9, 30), new Date(2019, 11, 1), ...]`|
|specialDates||[{date: Date, title: String}, {date: Date, title: String}, ...]|`[]`|`[{title: 'Title1', date: new Date(2019, 9, 2)}, {title: 'Title2', date: new Date(2020, 1, 1)}, ...]`|
|monthNames||Array of Strings|`['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`|`['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`|
|dayNames||Array of Strings|`['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']`|`['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']`|
|weekEnds||Array of Numbers|`[]`|`[5, 6]`|
|firstDayInWeekShift||Number|`0`|`4`|
|numberOfShownMonths||Number|`1`|`2`|
|monthShift||Number|`1`|`2`|
|numberOfSelectedDays||Number|`1`|`4`|
|dayNameLength||Number|`3`|`9`|
|previousMonthsInMonthsList||Number|`12`|`24`|
|nextMonthsInMonthsList||Number|`12`|`24`|
|selectCallbackFN||Function|`null`|`(start, end) => this.setState({start, end})`|
|dayElement||Function|`null`|`(dayDate) => <div><h1>{dayDate.getDate()}</h1><p>Some text</p></div>`|

## Authors
**Mustapha Idrissi & Yaser Somaf**
<a href="mailto:m.idrissi@freetimecompany.nl">m.idrissi@freetimecompany.nl</a>
<a href="mailto:y.somaf@freetimecompany.nl">y.somaf@freetimecompany.nl</a>