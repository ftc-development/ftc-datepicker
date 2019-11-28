"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "windowClickHandler", function () {
      _this.setState({
        isVisible: _this.isPopUp ? false : true,
        monthList: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getWeekEnds", function (weekEnds) {
      if (!Array.isArray(weekEnds)) {
        return [];
      }

      for (var i = weekEnds.length - 1; i >= 0; i--) {
        if (typeof weekEnds[i] !== 'number') {
          return [];
        }
      }

      return weekEnds.slice(0);
    });

    _defineProperty(_assertThisInitialized(_this), "isValidDateFormat", function (format) {
      if (typeof format !== 'string') {
        return false;
      }

      var length = format.length;
      format = format.replace(/yyyy|yy|mmmm|mmm|mm|m|dddd|ddd|dd|d/gmi, '');

      if (length === format.length || /[a-z]|\d/mi.test(format)) {
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "dateToString", function (date, format) {
      var dateYear = date.getFullYear();
      var dateMonth = date.getMonth();
      var dateDate = date.getDate();
      var dateDay = (date.getDay() + 6) % 7;
      return format.replace(/yyyy|yy|mmmm|mmm|mm|m|dddd|ddd|dd|d/gmi, function (match) {
        match = match.toLowerCase();

        switch (match) {
          case 'yyyy':
            return dateYear + '';

          case 'yy':
            return (dateYear + '').slice(-2);

          case 'mmmm':
            return _this.monthNames[dateMonth];

          case 'mmm':
            return _this.monthNames[dateMonth].slice(0, 3);

          case 'mm':
            return ('0' + (dateMonth + 1)).slice(-2);

          case 'm':
            return dateMonth + 1 + '';

          case 'dddd':
            return _this.dayNames[dateDay];

          case 'ddd':
            return _this.dayNames[dateDay].slice(0, 3);

          case 'dd':
            return ('0' + dateDate).slice(-2);

          case 'd':
            return dateDate + '';
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isArrayOfStrings", function (arr, num) {
      if (!Array.isArray(arr)) {
        return false;
      }

      for (var i = 0; i < num; i++) {
        if (typeof arr[i] !== 'string') {
          return false;
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "isArrayOfSpecialDates", function (arr) {
      if (!Array.isArray(arr)) {
        return false;
      }

      for (var i = arr.length - 1; i >= 0; i--) {
        if (!_this.isDate(arr[i].date) || typeof arr[i].title !== 'string') {
          return false;
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "isArrayOfDates", function (arr) {
      if (!Array.isArray(arr)) {
        return false;
      }

      for (var i = arr.length - 1; i >= 0; i--) {
        if (!_this.isDate(arr[i])) {
          return false;
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "isDate", function (date) {
      return Object.prototype.toString.call(date) === '[object Date]';
    });

    _defineProperty(_assertThisInitialized(_this), "getTitleOfSpecialDate", function (date) {
      var specialDates = _this.specialDates;

      for (var i = specialDates.length - 1; i >= 0; i--) {
        if (specialDates[i].date - date === 0) {
          return specialDates[i].title;
        }
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "toBeginningOfDay", function (date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

    _defineProperty(_assertThisInitialized(_this), "toBeginningOfMonth", function (date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    });

    _defineProperty(_assertThisInitialized(_this), "inBlackList", function (date) {
      var nextToBlackList = false;

      for (var i = _this.blackList.length - 1; i >= 0; i--) {
        var difference = _this.blackList[i] - date;

        if (difference === 0) {
          return _this.constants.IN_BLACK_LIST;
        }

        if (!nextToBlackList && difference > 0 && difference < _this.numberOfSelectedMSs) {
          nextToBlackList = true;
        }
      }

      if (nextToBlackList) {
        return _this.constants.NEXT_TO_BLACK_LIST;
      }

      return _this.constants.NOT_IN_BLACK_LIST;
    });

    _defineProperty(_assertThisInitialized(_this), "createMonthList", function (date) {
      var month = date.getMonth();
      var year = date.getFullYear();
      var list = [];

      for (var i = -_this.previousMonthsInMonthsList; i <= _this.nextMonthsInMonthsList; i++) {
        var itrationDate = new Date(year, month + i, 1);

        if ((!_this.firstMonth || itrationDate - _this.firstMonth >= 0) && (!_this.lastMonth || itrationDate - _this.lastMonth <= 0)) {
          list.push({
            date: itrationDate,
            selected: i === 0
          });
        }
      }

      return list;
    });

    _defineProperty(_assertThisInitialized(_this), "setCurrentMonth", function (date) {
      if (_this.lastMonth && new Date(date.getFullYear(), date.getMonth() + _this.numberOfShownMonths - 1, 1) - _this.lastMonth > 0) {
        date = new Date(_this.lastMonth.getFullYear(), _this.lastMonth.getMonth() + 1 - _this.numberOfShownMonths, 1);
      }

      if (_this.firstMonth && date - _this.firstMonth < 0) {
        date = new Date(_this.firstMonth.getFullYear(), _this.firstMonth.getMonth(), 1);
      }

      return date;
    });

    _defineProperty(_assertThisInitialized(_this), "setSelection", function (start, end) {
      _this.setState({
        dateRangeStart: start,
        dateRangeEnd: end,
        isVisible: _this.isPopUp && (end || !_this.isRangePicker) ? false : true
      });

      if (_this.selectCallbackFN) {
        _this.selectCallbackFN(start, end);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "blackListIsNotInRange", function (start, end) {
      for (var i = 0; i < _this.blackList.length; i++) {
        if (_this.blackList[i] - start >= 0 && _this.blackList[i] - end <= 0) {
          return false;
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "datePickerClickHandler", function (e) {
      e.stopPropagation();

      _this.setState({
        monthList: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dayEnterHandler", function (date, className) {
      if (className === _this.constants.CLASS_NAMES.NORMAL && _this.isRangePicker && _this.state.dateRangeStart && !_this.state.dateRangeEnd && date - _this.state.dateRangeStart > 0 && _this.blackListIsNotInRange(_this.state.dateRangeStart, date)) {
        _this.setState({
          dateHovered: date
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "dayLeaveHandler", function () {
      if (_this.state.dateHovered) {
        _this.setState({
          dateHovered: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "dayClickHandler", function (date, className) {
      if (className === _this.constants.CLASS_NAMES.NORMAL) {
        var dateRangeStart = _this.state.dateRangeStart;
        var dateRangeEnd = null;

        if (_this.isRangePicker && dateRangeStart && !_this.state.dateRangeEnd && date - dateRangeStart > 0 && _this.blackListIsNotInRange(dateRangeStart, date)) {
          dateRangeEnd = date;
        } else {
          dateRangeStart = date;
        }

        _this.setSelection(dateRangeStart, dateRangeEnd);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "monthShiftHandler", function (shift) {
      var currentMonth = _this.state.currentMonth;

      _this.setState({
        currentMonth: _this.setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + shift, 1))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "monthTitleClickHandler", function (e, index) {
      e.stopPropagation();

      _this.setState({
        monthList: _this.state.monthList === index ? null : index
      });
    });

    _defineProperty(_assertThisInitialized(_this), "monthListItemClickHandler", function (date, shift) {
      _this.setState({
        currentMonth: _this.setCurrentMonth(new Date(date.getFullYear(), date.getMonth() - shift, 1))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "DatePickerToggle", function (e) {
      e.stopPropagation();

      _this.setState({
        isVisible: !_this.state.isVisible,
        monthList: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createDays", function (year, month, today, DayElement) {
      var days = [];
      var firstDayInMonthPosition = (new Date(year, month, 1).getDay() + 6 - _this.firstDayInWeekShift) % 7;
      var daysInMonth = new Date(year, month + 1, 0).getDate();

      var _loop = function _loop(i) {
        var dayDate = i - firstDayInMonthPosition + 1;
        var itrationDate = new Date(year, month, dayDate);

        var inBlackList = _this.inBlackList(itrationDate);

        var startDateToItrationDate = _this.state.dateRangeStart ? itrationDate - _this.state.dateRangeStart : null;

        if (startDateToItrationDate !== null && startDateToItrationDate % 86400000 !== 0) {
          console.log(dayDate, _this.state.dateRangeStart, itrationDate);
        }

        var endDateToItrationDate = _this.state.dateRangeEnd ? itrationDate - _this.state.dateRangeEnd : null;
        var preventBeforeToItrationDate = _this.preventBefore ? itrationDate - _this.preventBefore : null;
        var preventAfterToItrationDate = _this.preventAfter ? itrationDate - _this.preventAfter : null;
        var dateHoveredToItrationDate = _this.state.dateHovered ? itrationDate - _this.state.dateHovered : null;
        var classNames = _this.constants.CLASS_NAMES;

        var itrationTitle = _this.getTitleOfSpecialDate(itrationDate);

        var itrationClassName1 = dayDate < 1 ? classNames.EMPTY : _this.preventBefore && preventBeforeToItrationDate <= 0 || _this.preventAfter && preventAfterToItrationDate >= 0 ? classNames.DISABLED : inBlackList === _this.constants.IN_BLACK_LIST ? classNames.IN_BLACK_LIST : inBlackList === _this.constants.NEXT_TO_BLACK_LIST || _this.preventAfter && -preventAfterToItrationDate > 0 && -preventAfterToItrationDate < _this.numberOfSelectedMSs ? classNames.NEXT_TO_DISABLED : classNames.NORMAL;
        var itrationClassName2 = dayDate > 0 && _this.weekEnds.indexOf((i + _this.firstDayInWeekShift) % 7) > -1 ? classNames.WEEK_END : null;
        var itrationClassName3 = dayDate > 0 && itrationDate - today === 0 ? classNames.TODAY : null;
        var itrationClassName4 = dayDate > 0 && itrationTitle !== null ? classNames.SPECIAL : null;
        var itrationClassName5 = dayDate < 1 ? null : _this.state.dateRangeStart && startDateToItrationDate === 0 ? _this.isRangePicker ? _this.state.dateRangeEnd ? classNames.RANGE_START : classNames.RANGE_START_END : _this.numberOfSelectedDays === 1 ? classNames.SELECTION_START_END : classNames.SELECTION_START : _this.state.dateRangeEnd && endDateToItrationDate === 0 ? classNames.RANGE_END : _this.state.dateRangeEnd && startDateToItrationDate > 0 && endDateToItrationDate < 0 ? classNames.IN_RANGE : !_this.isRangePicker && _this.state.dateRangeStart && startDateToItrationDate > 0 && startDateToItrationDate < _this.numberOfSelectedMSs ? startDateToItrationDate === _this.numberOfSelectedMSs - 86400000 ? classNames.SELECTION_END : classNames.IN_SELECTION : null;
        var itrationClassName6 = dayDate <= 0 || !_this.state.dateHovered || dateHoveredToItrationDate > 0 || startDateToItrationDate < 0 ? null : startDateToItrationDate === 0 ? classNames.HOVER_START : dateHoveredToItrationDate === 0 ? classNames.HOVER_END : classNames.IN_HOVER;
        days.push(_react["default"].createElement("div", {
          key: i,
          className: classNames.DAY + ' ' + itrationClassName1 + (itrationClassName2 ? ' ' + itrationClassName2 : '') + (itrationClassName3 ? ' ' + itrationClassName3 : '') + (itrationClassName4 ? ' ' + itrationClassName4 : '') + (itrationClassName5 ? ' ' + itrationClassName5 : '') + (itrationClassName6 ? ' ' + itrationClassName6 : ''),
          title: itrationTitle,
          onClick: function onClick() {
            return _this.dayClickHandler(itrationDate, itrationClassName1);
          },
          onMouseEnter: function onMouseEnter() {
            return _this.dayEnterHandler(itrationDate, itrationClassName1);
          },
          onMouseLeave: _this.dayLeaveHandler
        }, dayDate < 1 ? '' : DayElement ? _react["default"].createElement(DayElement, {
          date: itrationDate
        }) : dayDate));
      };

      for (var i = 0; i < firstDayInMonthPosition + daysInMonth; i++) {
        _loop(i);
      }

      return days;
    });

    _defineProperty(_assertThisInitialized(_this), "createMonths", function (today) {
      var DayElement = _this.props.dayElement || null;

      if (DayElement && !_react["default"].isValidElement(_react["default"].createElement(DayElement, null))) {
        DayElement = null;
      }

      var classNames = _this.constants.CLASS_NAMES;

      var currentYear = _this.state.currentMonth.getFullYear();

      var currentMonth = _this.state.currentMonth.getMonth();

      var months = [];

      var _loop2 = function _loop2(i) {
        var monthDate = new Date(currentYear, currentMonth + i, 1);

        if (!_this.lastMonth || monthDate - _this.lastMonth <= 0) {
          months.push(_react["default"].createElement("div", {
            className: classNames.MONTH_CONTAINER,
            key: i
          }, !_this.showTitleDropDown ? _react["default"].createElement("div", {
            className: classNames.MONTH_TITLE_CONTENT
          }, _this.dateToString(monthDate, _this.monthTitleDateFormat)) : _react["default"].createElement("div", {
            className: classNames.MONTH_TITLE_CONTAINER
          }, _react["default"].createElement("button", {
            className: classNames.MONTH_TITLE + ' ' + (_this.state.monthList === i ? classNames.MONTH_TITLE_OPEN : classNames.MONTH_TITLE_CLOSED),
            onClick: function onClick(e) {
              return _this.monthTitleClickHandler(e, i);
            }
          }, _this.dateToString(monthDate, _this.monthTitleDateFormat)), _this.state.monthList !== i ? '' : _react["default"].createElement("ul", {
            className: classNames.MONTH_LIST
          }, _this.createMonthList(monthDate).map(function (item, index) {
            return _react["default"].createElement("li", {
              key: index,
              className: classNames.MONTH_LIST_ITEM + (item.selected ? ' ' + classNames.MONTH_LIST_ITEM_SELECTED : ''),
              onClick: function onClick() {
                return _this.monthListItemClickHandler(item.date, i);
              },
              ref: item.selected ? _this.monthListSelectedItem : null
            }, _this.dateToString(item.date, _this.monthTitleDateFormat));
          }))), _react["default"].createElement("div", {
            className: classNames.DAY_NAMES_CONTAINER
          }, _this.shiftedDayNames.map(function (day, index) {
            return _react["default"].createElement("div", {
              key: index,
              className: classNames.DAY_NAME + (_this.weekEnds.indexOf((index + _this.firstDayInWeekShift) % 7) === -1 ? '' : ' ' + classNames.DAY_NAME_WEEK_END)
            }, day);
          })), _react["default"].createElement("div", {
            className: classNames.DAYS_CONTAINER
          }, _this.createDays(currentYear, currentMonth + i, today, DayElement))));
        }
      };

      for (var i = 0; i < _this.numberOfShownMonths; i++) {
        _loop2(i);
      }

      return months;
    });

    _this.monthListSelectedItem = _react["default"].createRef();
    _this.constants = {
      IN_BLACK_LIST: 'inBlackList',
      NEXT_TO_BLACK_LIST: 'nextToBlackList',
      NOT_IN_BLACK_LIST: 'notInBlackList',
      DAY_NAMES: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      MONTH_NAMES: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      DATE_FORMAT: 'ddd, mmm dd yyyy',
      TITLE_DATE_FORMAT: 'mmmm yyyy',
      CLASS_NAMES: {
        DAY: 'day',
        NORMAL: 'day-normal',
        EMPTY: 'day-empty',
        DISABLED: 'day-disabled',
        IN_BLACK_LIST: 'day-in-black-list',
        NEXT_TO_DISABLED: 'day-next-to-disabled',
        WEEK_END: 'day-week-end',
        TODAY: 'day-today',
        SPECIAL: 'day-special',
        RANGE_START: 'day-range-start',
        RANGE_END: 'day-range-end',
        RANGE_START_END: 'day-range-start-end',
        IN_RANGE: 'day-in-range',
        SELECTION_START: 'day-selection-start',
        SELECTION_END: 'day-selection-end',
        SELECTION_START_END: 'day-selection-start-end',
        IN_SELECTION: 'day-in-selection',
        HOVER_START: 'day-hover-start',
        HOVER_END: 'day-hover-end',
        IN_HOVER: 'day-in-hover',
        DATE_PICKER_CONTAINER: 'date-picker-container',
        DATE_PICKER_TITLE: 'date-picker-title',
        DATE_PICKER: 'date-picker',
        MONTH_CONTAINER: 'month-container',
        MONTH_TITLE_CONTAINER: 'month-title-container',
        MONTH_TITLE_CONTENT: 'month-title-content',
        MONTH_TITLE: 'month-title',
        MONTH_TITLE_OPEN: 'month-title-open',
        MONTH_TITLE_CLOSED: 'month-title-closed',
        MONTH_LIST: 'month-list',
        MONTH_LIST_ITEM: 'month-list-item',
        MONTH_LIST_ITEM_SELECTED: 'month-list-item-selected',
        DAY_NAMES_CONTAINER: 'day-names-container',
        DAY_NAME: 'day-name',
        DAY_NAME_WEEK_END: 'day-name-week-end',
        DAYS_CONTAINER: 'days-container',
        MONTHS_CONTAINER: 'months-container',
        DATE_PICKER_DETAILS: 'date-picker-details',
        BTN_DISABLED: 'btn-disabled',
        BTN_PREVIOUS: 'btn-previous',
        BTN_NEXT: 'btn-next',
        BTN_TODAY: 'btn-today',
        BTN_CLEAR: 'btn-clear'
      }
    };
    _this.weekEnds = _this.getWeekEnds(props.weekEnds);
    _this.isPopUp = !!props.isPopUp;
    _this.isRangePicker = !!props.isRangePicker;
    _this.showDatePickerDetails = !!props.showDatePickerDetails;
    _this.showTitleDropDown = !!props.showTitleDropDown;
    _this.numberOfSelectedDays = typeof props.numberOfSelectedDays === 'number' && !_this.isRangePicker ? Math.max(Math.round(props.numberOfSelectedDays), 1) : 1;
    _this.numberOfSelectedMSs = _this.numberOfSelectedDays * 86400000;
    _this.todayButton = typeof props.todayButton === 'string' && props.todayButton.length > 0 ? props.todayButton : !!props.todayButton;
    _this.clearButton = typeof props.clearButton === 'string' && props.clearButton.length > 0 ? props.clearButton : !!props.clearButton;
    _this.placeholder = typeof props.placeholder === 'string' ? props.placeholder : '';
    _this.previousMonthsInMonthsList = typeof props.previousMonthsInMonthsList !== 'number' ? 12 : Math.min(Math.max(Math.round(props.previousMonthsInMonthsList), 0), 24);
    _this.nextMonthsInMonthsList = typeof props.nextMonthsInMonthsList !== 'number' ? 12 : Math.min(Math.max(Math.round(props.nextMonthsInMonthsList), 0), 24);
    _this.dateFormat = _this.isValidDateFormat(props.dateFormat) ? props.dateFormat : _this.constants.DATE_FORMAT;
    _this.monthTitleDateFormat = _this.isValidDateFormat(props.monthTitleDateFormat) ? props.monthTitleDateFormat : _this.constants.TITLE_DATE_FORMAT;
    _this.containerClassName = typeof props.containerClassName === 'string' ? props.containerClassName : _this.constants.CLASS_NAMES.DATE_PICKER_CONTAINER;
    _this.numberOfShownMonths = typeof props.numberOfShownMonths !== 'number' ? 2 : Math.max(Math.round(props.numberOfShownMonths), 1);
    _this.monthShift = typeof props.monthShift !== 'number' ? 1 : Math.min(Math.max(Math.round(props.monthShift), 1), _this.numberOfShownMonths);
    _this.dayNames = _this.isArrayOfStrings(props.dayNames, 7) ? props.dayNames.slice(0, 7) : _this.constants.DAY_NAMES;
    _this.dayNameLength = typeof props.dayNameLength !== 'number' ? 3 : Math.max(Math.round(props.dayNameLength), 1);
    _this.firstDayInWeekShift = typeof props.firstDayInWeekShift !== 'number' ? 0 : Math.min(Math.max(Math.round(props.firstDayInWeekShift), 0), 6);
    _this.shiftedDayNames = _this.dayNames.slice(_this.firstDayInWeekShift).concat(_this.dayNames.slice(0, _this.firstDayInWeekShift)).map(function (name) {
      return name.slice(0, _this.dayNameLength);
    });
    _this.monthNames = _this.isArrayOfStrings(props.monthNames, 12) ? props.monthNames.slice(0, 12) : _this.constants.MONTH_NAMES;
    _this.preventBefore = _this.isDate(props.preventBefore) ? _this.toBeginningOfDay(props.preventBefore) : null;
    _this.firstMonth = _this.preventBefore ? _this.toBeginningOfMonth(new Date(_this.preventBefore.getFullYear(), _this.preventBefore.getMonth(), _this.preventBefore.getDate() + 1)) : null;
    var preventAfter = _this.isDate(props.preventAfter) ? _this.toBeginningOfDay(props.preventAfter) : null;
    _this.preventAfter = !preventAfter ? null : _this.preventBefore && preventAfter - _this.preventBefore < 0 ? _this.preventBefore : preventAfter;
    var lastMonth = _this.preventAfter ? _this.toBeginningOfMonth(new Date(_this.preventAfter.getFullYear(), _this.preventAfter.getMonth(), _this.preventAfter.getDate() - 1)) : null;
    _this.lastMonth = !lastMonth ? null : lastMonth - _this.firstMonth < 0 ? _this.firstMonth : lastMonth;
    _this.blackList = _this.isArrayOfDates(props.blackList) ? props.blackList.map(function (date) {
      return _this.toBeginningOfDay(date);
    }) : [];
    _this.specialDates = _this.isArrayOfSpecialDates(props.specialDates) ? props.specialDates.map(function (obj) {
      return {
        title: obj.title,
        date: _this.toBeginningOfDay(obj.date)
      };
    }) : [];
    _this.selectCallbackFN = typeof props.selectCallbackFN !== 'function' ? null : props.selectCallbackFN;
    setTimeout(function () {
      window.addEventListener('click', _this.windowClickHandler);
    }, 100);

    var _dateRangeStart = _this.isDate(props.dateRangeStart) ? _this.toBeginningOfDay(props.dateRangeStart) : null;

    var _dateRangeStart2 = _dateRangeStart && (!_this.preventBefore || _dateRangeStart - _this.preventBefore > 0) && (!_this.preventAfter || _this.preventAfter - _dateRangeStart >= _this.numberOfSelectedMSs) && _this.inBlackList(_dateRangeStart) === _this.constants.NOT_IN_BLACK_LIST ? _dateRangeStart : null;

    var _dateRangeEnd = _this.isRangePicker && _this.isDate(props.dateRangeEnd) ? _this.toBeginningOfDay(props.dateRangeEnd) : null;

    var thisMonth = _this.toBeginningOfMonth(new Date());

    var _initialDate = _this.isDate(props.initialDate) ? _this.toBeginningOfMonth(props.initialDate) : null;

    var initialDate = _initialDate && (!_this.firstMonth || _initialDate - _this.firstMonth >= 0) && (!_this.lastMonth || _initialDate - _this.lastMonth <= 0) ? _initialDate : _dateRangeStart2 ? _this.toBeginningOfMonth(_dateRangeStart2) : (!_this.firstMonth || thisMonth - _this.firstMonth >= 0) && (!_this.lastMonth || thisMonth - _this.lastMonth <= 0) ? thisMonth : _this.firstMonth ? _this.firstMonth : _this.lastMonth;
    _this.state = {
      currentMonth: _this.setCurrentMonth(initialDate),
      dateRangeStart: _dateRangeStart2,
      dateRangeEnd: _dateRangeEnd && _dateRangeStart2 && _dateRangeEnd - _dateRangeStart2 > 0 && (!_this.preventAfter || _dateRangeEnd - _this.preventAfter < 0) && _this.blackListIsNotInRange(_dateRangeStart2, _dateRangeEnd) ? _dateRangeEnd : null,
      isVisible: _this.isPopUp ? false : true,
      monthList: null
    };

    if (props.propsConsoleLog) {
      var consoleObj = {
        numberOfSelectedDays: _this.numberOfSelectedDays,
        containerClassName: _this.containerClassName,
        todayButton: _this.todayButton,
        clearButton: _this.clearButton,
        placeholder: _this.placeholder,
        previousMonthsInMonthsList: _this.previousMonthsInMonthsList,
        nextMonthsInMonthsList: _this.nextMonthsInMonthsList,
        numberOfShownMonths: _this.numberOfShownMonths,
        monthShift: _this.monthShift,
        isPopUp: _this.isPopUp,
        isRangePicker: _this.isRangePicker,
        showDatePickerDetails: _this.showDatePickerDetails,
        showTitleDropDown: _this.showTitleDropDown,
        dayNames: _this.dayNames,
        shiftedDayNames: _this.shiftedDayNames,
        weekEnds: _this.shiftedDayNames.filter(function (name, index) {
          return _this.weekEnds.indexOf(index + _this.firstDayInWeekShift) !== -1;
        }),
        monthNames: _this.monthNames,
        dateFormat: _this.dateFormat,
        monthTitleDateFormat: _this.monthTitleDateFormat,
        preventBefore: _this.preventBefore ? _this.preventBefore.toDateString() : _this.preventBefore,
        preventAfter: _this.preventAfter ? _this.preventAfter.toDateString() : _this.preventAfter,
        blackList: _this.blackList.map(function (date) {
          return date.toDateString();
        }),
        specialDates: _this.specialDates.map(function (obj) {
          return obj.date.toDateString() + ' (' + obj.title + ')';
        }),
        dateRangeStart: _this.state.dateRangeStart ? _this.state.dateRangeStart.toDateString() : _this.state.dateRangeStart,
        dateRangeEnd: _this.state.dateRangeEnd ? _this.state.dateRangeEnd.toDateString() : _this.state.dateRangeEnd,
        initialDate: _this.state.currentMonth ? _this.state.currentMonth.toDateString() : _this.state.currentMonth,
        selectCallbackFN: _this.selectCallbackFN ? _this.selectCallbackFN.toString() : null
      };
      Object.keys(consoleObj).forEach(function (key) {
        return console.log(key + ':', consoleObj[key]);
      });
    }

    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.windowClickHandler);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.monthList !== this.state.monthList && this.monthListSelectedItem.current) {
        this.monthListSelectedItem.current.scrollIntoView();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var classNames = this.constants.CLASS_NAMES;
      var today = this.toBeginningOfDay(new Date());
      var disablePreviousBTN = this.firstMonth && this.state.currentMonth - this.firstMonth <= 0;
      var disableNextBTN = this.lastMonth && new Date(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth() + this.numberOfShownMonths - 1, 1) - this.lastMonth >= 0;
      var disableTodayBTN = this.preventBefore && today - this.preventBefore <= 0 || this.preventAfter && today - this.preventAfter >= 0;
      var selectedDates = !this.state.dateRangeStart ? this.placeholder : this.dateToString(this.state.dateRangeStart, this.dateFormat) + (this.state.dateRangeEnd || !this.isRangePicker && this.numberOfSelectedDays > 1 ? ' - ' + (this.state.dateRangeEnd ? this.dateToString(this.state.dateRangeEnd, this.dateFormat) : this.dateToString(new Date(this.state.dateRangeStart.getFullYear(), this.state.dateRangeStart.getMonth(), this.state.dateRangeStart.getDate() + this.numberOfSelectedDays - 1), this.dateFormat)) : '');
      return _react["default"].createElement("div", {
        className: this.containerClassName
      }, this.isPopUp ? _react["default"].createElement("div", {
        className: classNames.DATE_PICKER_TITLE,
        onClick: this.DatePickerToggle
      }, selectedDates) : null, this.state.isVisible ? _react["default"].createElement("div", {
        className: classNames.DATE_PICKER,
        onClick: this.datePickerClickHandler
      }, _react["default"].createElement("div", {
        className: classNames.MONTHS_CONTAINER
      }, this.createMonths(today)), this.showDatePickerDetails ? _react["default"].createElement("div", {
        className: classNames.DATE_PICKER_DETAILS
      }, selectedDates) : null, _react["default"].createElement("button", {
        className: classNames.BTN_PREVIOUS + (disablePreviousBTN ? ' ' + classNames.BTN_DISABLED : ''),
        onClick: disablePreviousBTN ? null : function () {
          return _this2.monthShiftHandler(-_this2.monthShift);
        }
      }), _react["default"].createElement("button", {
        className: classNames.BTN_NEXT + (disableNextBTN ? ' ' + classNames.BTN_DISABLED : ''),
        onClick: disableNextBTN ? null : function () {
          return _this2.monthShiftHandler(_this2.monthShift);
        }
      }), this.todayButton ? _react["default"].createElement("button", {
        className: classNames.BTN_TODAY + (disableTodayBTN ? ' ' + classNames.BTN_DISABLED : ''),
        onClick: function onClick() {
          return _this2.setState({
            currentMonth: _this2.setCurrentMonth(_this2.toBeginningOfMonth(today))
          });
        }
      }, typeof this.todayButton === 'string' ? this.todayButton : '') : '', this.clearButton ? _react["default"].createElement("button", {
        className: classNames.BTN_CLEAR + (!this.state.dateRangeStart ? ' ' + classNames.BTN_DISABLED : ''),
        onClick: !this.state.dateRangeStart ? null : function () {
          return _this2.setSelection(null, null);
        }
      }, typeof this.clearButton === 'string' ? this.clearButton : '') : '') : null);
    }
  }]);

  return DatePicker;
}(_react.Component);

exports["default"] = DatePicker;
DatePicker.propTypes = {
  numberOfSelectedDays: _propTypes["default"].number,
  containerClassName: _propTypes["default"].string,
  dayNames: _propTypes["default"].arrayOf(_propTypes["default"].string),
  monthNames: _propTypes["default"].arrayOf(_propTypes["default"].string),
  blackList: _propTypes["default"].arrayOf(_propTypes["default"].instanceOf(Date)),
  dateFormat: _propTypes["default"].string,
  monthTitleDateFormat: _propTypes["default"].string,
  firstDayInWeekShift: _propTypes["default"].number,
  numberOfShownMonths: _propTypes["default"].number,
  monthShift: _propTypes["default"].number,
  isPopUp: _propTypes["default"].bool,
  isRangePicker: _propTypes["default"].bool,
  showDatePickerDetails: _propTypes["default"].bool,
  showTitleDropDown: _propTypes["default"].bool,
  dayNameLength: _propTypes["default"].number,
  preventBefore: _propTypes["default"].instanceOf(Date),
  preventAfter: _propTypes["default"].instanceOf(Date),
  dateRangeStart: _propTypes["default"].instanceOf(Date),
  dateRangeEnd: _propTypes["default"].instanceOf(Date),
  initialDate: _propTypes["default"].instanceOf(Date),
  previousMonthsInMonthsList: _propTypes["default"].number,
  nextMonthsInMonthsList: _propTypes["default"].number,
  selectCallbackFN: _propTypes["default"].func.isRequired,
  propsConsoleLog: _propTypes["default"].bool,
  weekEnds: _propTypes["default"].arrayOf(_propTypes["default"].number),
  todayButton: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool]),
  clearButton: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool]),
  placeholder: _propTypes["default"].string,
  specialDates: _propTypes["default"].arrayOf(_propTypes["default"].exact({
    title: _propTypes["default"].string,
    date: _propTypes["default"].instanceOf(Date)
  }))
};
