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
      startDate: new Date(2020, 5, 1),
      endDate: new Date(2020, 6, 4)
    }
  }
  
  onSelect = ({startDate, endDate}) => this.setState({
    startDate: startDate,
    endDate: endDate
  });

  render() {
    return (
      <div>
        <div>{this.state.startDate} - {this.state.endDate}</div>
        <DatePicker
          startDate={new Date(2020, 5, 1)}
          endDate={new Date(2020, 6, 4)}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
```

## User guide

### Props

|Prop name|Prop&nbsp;description|Prop type|Default value|Example&nbsp;values|
|----|----|----|----|----|
|isPopUp|A boolean determines whether it will be a popup or not|Boolean|`false`|`true` or `false`|
|isRangePicker|A boolean determines whether it will be a date range selector or not (It cannot be used in combination with `isFlexibleDate`)|Boolean|`false`|`true` or `false`|
|isFlexibleDate|A boolean determines whether it will be a flexible selector or not (It cannot be used in combination with `isRangePicker`)|Boolean|`false`|`true` or `false`|
|showDateRangeDetails|A boolean determines whether it will show the selected date/range details in the date picker|Boolean|`false`|`true` or `false`|
|showTitleDropDown|A boolean determines whether it will show a dropdown with a list of months in each month title or not.|Boolean|`false`|`true` or `false`|
|showInputLabel|Only activated if `isPopUp` is `true`, and it determines whether it will show the label of the date picker input or not|Boolean|`false`|`true` or `false`|
|selectedDateCanBeOutOfAllowedRange|A boolean determines whether selected date can be (before `minDate` or after `maxDate`) or not.|Boolean|`false`|`true` or `false`|
|flexibleDateRanges|Only activated if `isFlexibleDate` is set to `true`. It is an array of all flexible date ranges|Array of Numbers|`[]`|`[1, 2, 3]`|
|flexibleDateRangesLabels|Only activated if `isFlexibleDate` is set to `true`. It is an array of all flexible date ranges labels|Array of Strings|`['± 1 day', '± 2 days', ...]`|`['± 1 day', '± 2 days', '± 3 days']`|
|flexibleDateRange|Only activated if `isFlexibleDate` is set to `true`. It is the default flexible date range. It should be one of the `flexibleDateRanges` array.|Number|0|2|
|flexibleDateTitle|Only activated if `isFlexibleDate` is set to `true`. It is a title that will be shown above the flexible date ranges buttons|String|`'Arrival day earlier or later'`|`'Any title ...'`|
|flexibleDateSelectButtonLabel|Only activated if `isFlexibleDate` is set to `true`. |String|`'Select'`|`'Any label ...'`|
|firstDayInWeekShift|A number between `0` and `6` sets the beginning of the week. `0` is for Monday and `6` is for Sunday|Number|`0`|`4`|
|monthsInDatePicker|A number sets how many months to show|Number|`1`|`2`|
|monthStep|A number sets the value of the months change step when the previous or next buttons are pressed|Number|`1`|`2`|
|selectedDaysInOneClick|Only activated if `isRangePicker` is set to `false`. And by giving it a value more than `1` you can select more than one day in one click|Number|`1`|`3`|
|dayNameLength|A number that sets the length of day names in the month table header|Number|`3`|`9`|
|weekEnds|An array that sets the indexes of the weekends. Monday's index is is `0` and Sunday's index is `6`|Array of Numbers|`[5, 6]`|`[6]`|
|inputDateFormat|Only activated when `isPopUp` is set to `true` and it can be a function or a string specifies how the selected date in the date picker input will be shown. For example 8/March/2019:<ul><li>yyyy: 2019</li><li>yy: 19</li><li>MMMM: March</li><li>MMM: Mar</li><li>MM: Ma</li><li>M: M</li><li>mm: 03</li><li>m: 3</li><li>DDDD: Friday</li><li>DDD: Fri</li><li>DD: Fr</li><li>D: F</li><li>dd: 08</li><li>d: 8</li></ul>|String OR Function(Date) => String|`'DDD, MMM dd yyyy'`|`'d/m/yyyy'`|
|headerDateFormat|ِIt can be a function or a string specifies how the month header will be shown. The same format pattern used in `inputDateFormat`|String OR Function(Date) => String|`'MMMM yyyy'`|`'mm-yyyy'`|
|datePickerRangeFormat|ِIt can be a function or a string specifies how the selected date/range will be shown. The same format pattern used in `inputDateFormat`|String OR Function(Date) => String|`'dd/mm/yyyy'`|`'d-m-yyyy'`|
|inputPlaceholder|Only activated if `isPopUp` is `true`, and it sets the placeholder text for the date picker input|String|`'Click here to select date'`|`'Select date'`|
|inputLabel|Only activated if both `isPopUp` & `showInputLabel` are `true`, and it sets the label text for the date picker input|String|`'Click here to select date'`|`'Select date'`|
|monthNames|Use it to provide your own month names|Array of Strings|`['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`|`['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`|
|dayNames|Use it to provide your own day names. Please note that the array should start with Monday's name|Array of Strings|`['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']`|`['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']`|
|minDate|To prevent showing or selecting dates before this date. If not provided, there will be no minimum limit|Date|`null`|`new Date(2010, 2, 4)`|
|maxDate|To prevent showing or selecting dates after this date. If not provided, there will be no maximum limit|Date|`null`|`new Date(2025, 3, 2)`|
|startDate|If `isRangePicker` is set to `true` then this will be the initial start date, if not then it will be the initial selected date|Date|`null`|`new Date(2019, 2, 9)`|
|endDate|Only activated when `isRangePicker` is set to `true` and it represents the initial end date|Date|`null`|`new Date(2019, 5, 4)`|
|shownMonth|The initial shown month|Date|`null`|`new Date()`|
|firstMonthInMonthsDropDown|Only activated if `showTitleDropDown` is set to `true`, It sets the first month in the month title dropdown|Date|Current month|`new Date(2019, 2, 17)`|
|lastMonthInMonthsDropDown|Only activated if `showTitleDropDown` is set to `true`, It sets the last month in the month title dropdown|Date|After 2 years from current month|`new Date(2021, 5, 21)`|
|blackList|Array of dates/ranges that you want to prevent the user from selecting them|[Date, {start: Date, end: Date}, Date, ...]|`[]`|`[new Date(2019, 9, 30), new Date(2019, 11, 1), {start: new Date(2020, 2, 3), end: new Date(2020, 8, 1)}, ...]`|
|onSelect|A callback function that will be called each time the user selects a date|Function|`null`|`({startDate, endDate, shownMonth, flexibleDateRange}) => this.setState({start: startDate, end: endDate})`|
|onMonthChange|A callback function that will be called each time the user shows a different month|Function|`null`|`({startDate, endDate, shownMonth}) => this.setState({start: startDate, end: endDate})`|
|onToggle|Only activated if `isPopUp` is `true`. It ia a callback function that will be called each time the popup toggles|Function|`null`|`(isOpen) => console.log('popup is ' + (isOpen ? 'open' : 'closed'))`|
|dayTileTemplate|To provide your own template for day tiles|Function|`null`|`({startDate, endDate, shownMonth, dayDate, dayLabel}) => <div><h1>{dayDate.getDate()}</h1><p>Some text</p></div>`|
|inputPlaceholderIconTemplate|To add a template for the input placeholder icon|Function|`null`|`({isOpen, startDate, endDate, shownMonth, flexibleDateRange}) => (isOpen ? <Some open icon /> : <Some closed icon />)`|
|inputTemplate|A template for the date picker input button|Function|`null`|`({startDate, endDate, shownMonth, flexibleDateRange}) => <Some button />`|
|inputClearButtonTemplate|This is a template to add a clear selection button to the date picker input|Function|`null`|`({startDate, endDate, shownMonth, flexibleDateRange}) => (startDate ? <Some clear icon /> : <Some picker icon />)`|
|footerTemplate|To add a template for the date picker footer|Function|`null`|`({startDate, endDate, shownMonth}) => <div></div>`|
|previousButtonTemplate|To provide your own template for previous month button|Function|`null`|`({startDate, endDate, shownMonth}) => <button>Previous</button>`|
|nextButtonTemplate|To provide your own template for next month button|Function|`null`|`({startDate, endDate, shownMonth}) => <button>Next</button>`|
|monthTitleDropDownIconTemplate|To provide a template for the icon of the month dropdown title|Function|`null`|`({startDate, endDate, shownMonth, open}) => (open ? <Some icon /> : <Other icon />)`|

## Authors
**Mustapha Idrissi & Yaser Somaf**  
<a href="mailto:m.idrissi@freetimecompany.nl">m.idrissi@freetimecompany.nl</a>  
<a href="mailto:y.somaf@freetimecompany.nl">y.somaf@freetimecompany.nl</a>