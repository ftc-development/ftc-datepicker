
# ftc-datepicker
<div align="center">
  <img width="300" heigth="300" src="https://github.com/ftc-development/ftc-datepicker/blob/master/static/datepicker_screenshot.png?raw=true">
</div>

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

|Prop name|Prop&nbsp;description&nbsp;and&nbsp;details|Prop type|Default value|Example&nbsp;values|
|----|----|----|----|----|
|preventBefore|To prevent showing or selecting dates before this date. If not provided, there will be no minimum limit|Date|`null`|`new Date(2010, 2, 4)`|
|preventAfter|To prevent showing or selecting dates after this date. If not provided, there will be no maximum limit|Date|`null`|`new Date(2025, 3, 2)`|
|dateRangeStart|If `isRangePicker` is set to `true` then this will be the initial start date, if not then it will be the initial selected date|Date|`null`|`new Date(2019, 2, 9)`|
|dateRangeEnd|Only activated when `isRangePicker` is set to `true` and it represents the initial end date|Date|`null`|`new Date(2019, 5, 4)`|
|initialDate|The initial shown month|Date|`null`|`new Date()`|
|dateFormat|ِA string specifies how the selected date will be shown. As an example 8/March/2019:<ul><li>yyyy: 2019</li><li>yy: 19</li><li>mmmm: March</li><li>mmm: Mar</li><li>mm: 03</li><li>m: 3</li><li>dddd: Friday</li><li>ddd: Fri</li><li>dd: 08</li><li>d: 8</li></ul>|String|`'ddd, mmm dd yyyy'`|`'d/m/yyyy'`|
|monthTitleDateFormat|ِA string specifies how the month title will be shown. The same format pattern used in `dateFormat`|String|`'mmmm yyyy'`|`'mm-yyyy'`|
|isPopUp|A boolean determines whether it will be a popup or not. `true` by default|Boolean|`true`|`true` or `false`|
|isRangePicker|A boolean determines whether it will be a date range selector or not. `false` by default|Boolean|`false`|`true` or `false`|
|showDatePickerDetails|A boolean determines whether it will show the selected date/range details in the date picker or not. `false` by default|Boolean|`false`|`true` or `false`|
|showTitleDropDown|A boolean determines whether it will show a dropdown with a list of months in each month title or not. `false` by default|Boolean|`false`|`true` or `false`|
|propsConsoleLog|By giving it a `true` value, all props validated values provided to `<DatePicker />` will be shown in the console. Useful for debugging|Boolean|`false`|`true` or `false`|
|todayButton|Determines whether it will have a button to go to current month or not. If a String was provided then it well be the content of this button. `false` by default|String/Boolean|`false`|`true` or `false` or `'Show today'`|
|clearButton|Determines whether it will have a button to clear selection or not. If a String was provided then it well be the content of this button. `false` by default|String/Boolean|`false`|`true` or `false` or `'Clear selection'`|
|placeholder|Only activated if `isPopUp` is `true`, and it sets the placeholder text for the date picker input. Empty string by default|String|`''`|`'Click here to select date'`|
|blackList|Array of dates that you want to prevent the user from selecting them|[Date, Date, Date, ...]|`[]`|`[new Date(2019, 9, 30), new Date(2019, 11, 1), ...]`|
|specialDates|Array of specific dates that you want to give particular importance, where each date can be titled|[{date: Date, title: String}, {date: Date, title: String}, ...]|`[]`|`[{title: 'Title1', date: new Date(2019, 9, 2)}, {title: 'Title2', date: new Date(2020, 1, 1)}, ...]`|
|monthNames|Use it to provide your own month names|Array of Strings|`['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`|`['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`|
|dayNames|Use it to provide your own day names. Please note that the array should start with Monday's name|Array of Strings|`['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']`|`['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']`|
|weekEnds|An array that sets the indexes of the weekends. Monday's index is is `0` and Sunday's index is `6`|Array of Numbers|`[]`|`[5, 6]`|
|firstDayInWeekShift|A number between `0` and `6` sets the beginning of the week. `0` is for Monday and `6` is for Sunday|Number|`0`|`4`|
|numberOfShownMonths|A number sets how many months to show. `1` by default|Number|`1`|`2`|
|monthShift|A number sets the value of the months change step when the previous or next buttons are pressed|Number|`1`|`2`|
|numberOfSelectedDays|Only activated if `isRangePicker` is set to `false`. And by giving it a value more than `1` you can select more than one day in one click|Number|`1`|`3`|
|dayNameLength|A number that sets the length of day names in the month table header|Number|`3`|`9`|
|firstMonthInMonthsList|Only activated if `showTitleDropDown` is set to `true`, It sets the first month in the month title dropdown|Date|Current month|`new Date(2019, 2, 17)`|
|lastMonthInMonthsList|Only activated if `showTitleDropDown` is set to `true`, It sets the last month in the month title dropdown|Date|After 2 years from current month|`new Date(2021, 5, 21)`|
|selectCallbackFN|A callback function that will be called each time the user selects a date|Function|`null`|`(start, end) => this.setState({start, end})`|
|dayElement|To provide your own template for day tiles|Function|`null`|`(dayDate) => <div><h1>{dayDate.getDate()}</h1><p>Some text</p></div>`|

## Authors
**Mustapha Idrissi & Yaser Somaf**
<a href="mailto:m.idrissi@freetimecompany.nl">m.idrissi@freetimecompany.nl</a>
<a href="mailto:y.somaf@freetimecompany.nl">y.somaf@freetimecompany.nl</a>