import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import './DatePicker.css';
class DatePicker extends Component {
	constructor(props) {
		super(props);

		this.monthListSelectedItem = React.createRef();
		this.monthListContainer = React.createRef();

		// Set constants
		this.CONSTANTS = {
			DAY_NAMES: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			MONTH_NAMES: [
				'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
				'October', 'November', 'December'
			],
			INPUT_PLACEHOLDER: 'Click here to select date',
			INPUT_LABEL: 'Click here to select date',
			INPUT_DATE_FORMAT: 'ddd, mmm dd yyyy',
			HEADER_DATE_FORMAT: 'mmmm yyyy',
			FOOTER_DATE_FORMAT: 'dd/mm/yyyy',
			IN_BLACK_LIST: 'inBlackList',
			NEXT_TO_BLACK_LIST: 'nextToBlackList',
			NOT_IN_BLACK_LIST: 'notInBlackList',
			CLASS_NAMES: {
				DATE_PICKER_BACKDROP: 'date-picker-backdrop',
				DATE_PICKER_CONTAINER: 'date-picker-container',
				DATE_PICKER_INPUT: 'date-picker-input',
				DATE_PICKER_INPUT_EMPTY: 'date-picker-input-empty',
				DATE_PICKER_INPUT_NOT_EMPTY: 'date-picker-input-not-empty',
				DATE_PICKER_INPUT_LABEL: 'date-picker-input-label',
				DATE_PICKER_INPUT_PLACEHOLDER: 'date-picker-input-placeholder',
				INPUT_BUTTON: 'input-button',
				DATE_PICKER: 'date-picker',
				MONTHS_CONTAINER: 'months-container',
				DATE_PICKER_FOOTER: 'date-picker-footer',
				BTN_PREVIOUS: 'btn-previous',
				BTN_NEXT: 'btn-next',
				BTN_DISABLED: 'btn-disabled',
				MONTH_CONTAINER: 'month-container',
				MONTH_TITLE_CONTENT: 'month-title-content',
				MONTH_TITLE_CONTAINER: 'month-title-container',
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
				EMPTY: 'day-empty',
				DISABLED: 'day-disabled',
				IN_BLACK_LIST: 'day-in-black-list',
				NEXT_TO_DISABLED: 'day-next-to-disabled',
				DAY: 'day',
				NORMAL: 'day-normal',
				WEEK_END: 'day-week-end',
				TODAY: 'day-today',
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
				IN_HOVER: 'day-in-hover'
			}
		};

		// Set initial props
		const today = this.toBeginningOfDay(new Date());
		this.monthNames = this.CONSTANTS.MONTH_NAMES;
		this.dayNames = this.CONSTANTS.DAY_NAMES;
		this.dayNameLength = 3;
		this.firstDayInWeekShift = 0;
		this.shiftedDayNames = this.dayNames.slice(this.firstDayInWeekShift).concat(
			this.dayNames.slice(0, this.firstDayInWeekShift)
		).map(name => name.slice(0, this.dayNameLength));
		this.weekEnds = [5, 6];
		this.isPopUp = false;
		this.isRangePicker = false;
		this.showFooter = false;
		this.showTitleDropDown = false;
		this.showInputLabel = false;
		this.monthsInDatePicker = 1;
		this.monthStep = 1;
		this.selectedDaysInOneClick = 1;
		this.selectedMSsInOneClick = this.selectedDaysInOneClick * 86400000;
		this.inputPlaceholder = this.CONSTANTS.INPUT_PLACEHOLDER;
		this.inputLabel = this.CONSTANTS.INPUT_LABEL;
		this.inputDateFormat = this.CONSTANTS.INPUT_DATE_FORMAT;
		this.headerDateFormat = this.CONSTANTS.HEADER_DATE_FORMAT;
		this.footerDateFormat = this.CONSTANTS.FOOTER_DATE_FORMAT;
		this.blackList = [];
		this.minDate = null;
		this.minMonth = this.minDate ? this.toBeginningOfMonth(this.minDate) : null;
		this.maxDate = null;
		this.maxMonth = this.maxDate ? this.toBeginningOfMonth(this.maxDate) : null;
		this.firstMonthInMonthsDropDown = this.toBeginningOfMonth(today);
		this.lastMonthInMonthsDropDown = this.toBeginningOfMonth(new Date(
			today.getFullYear(), today.getMonth() + 24, 1
		));
		this.onSelect = null;
		this.inputClearButtonTemplate = null;
		this.previousButtonTemplate = null;
		this.nextButtonTemplate = null;
		this.monthTitleDropDownIconTemplate = null;
		this.dayTileTemplate = null;

		// Set initial state
		this.state = {
			startDate: null,
			endDate: null,
			shownMonth: this.setShownMonth(new Date()),
			isVisible: false,
			monthList: null,
			dateHovered: null
		};

	}

	componentDidMount() {
		// Update state
		this.updateState({});
	}

	componentDidUpdate(prevProps, prevState) {

		// Scroll to selected month in month's dropdown
		if (prevState.monthList !== this.state.monthList && this.monthListContainer.current && this.monthListSelectedItem.current) {
			this.monthListContainer.current.scrollTop = this.monthListSelectedItem.current.offsetTop;
		}

		// Update state
		this.updateState(prevProps);
	}

	updateState = prevProps => {
		const props = this.props;
		let startDate = this.state.startDate;
		let endDate = this.state.endDate;
		let shownMonth = this.state.shownMonth;
		let updateState = false;
		if (this.propsAreNotTheSame(prevProps, [
			'startDate', 'minDate', 'maxDate', 'isRangePicker', 'selectedDaysInOneClick', 'blackList'
		])) {
			updateState = true;
			if (typeof props.startDate !== 'undefined') {
				startDate = props.startDate;
			}
			startDate = this.isDate(startDate) ? this.toBeginningOfDay(startDate) : null;
			startDate = startDate && (!this.minDate || startDate - this.minDate >= 0) &&
				(!this.maxDate || this.maxDate - startDate >= (this.selectedDaysInOneClick - 1) * 86400000) &&
				this.inBlackList(startDate) === this.CONSTANTS.NOT_IN_BLACK_LIST ? startDate : null;
		}
		if (this.propsAreNotTheSame(prevProps, [
			'startDate', 'endDate', 'minDate', 'maxDate', 'isRangePicker', 'selectedDaysInOneClick',
			'blackList'
		])) {
			updateState = true;
			if (typeof props.endDate !== 'undefined') {
				endDate = props.endDate;
			}
			endDate = this.isRangePicker && this.isDate(endDate) ? this.toBeginningOfDay(endDate) : null;
			endDate = endDate && startDate && endDate - startDate > 0 &&
				(!this.maxDate || endDate - this.maxDate <= 0) &&
				this.blackListIsNotInRange(startDate, endDate) ? endDate : null;
		}
		if (this.propsAreNotTheSame(prevProps, [
			'startDate', 'minDate', 'maxDate', 'shownMonth', 'isRangePicker', 'selectedDaysInOneClick',
			'monthsInDatePicker', 'blackList'
		])) {
			updateState = true;
			if (typeof props.shownMonth !== 'undefined') {
				shownMonth = props.shownMonth;
			}
			const thisMonth = this.toBeginningOfMonth(new Date());
			shownMonth = this.isDate(shownMonth) ? this.toBeginningOfMonth(shownMonth) : null;
			shownMonth = this.setShownMonth(
				shownMonth && (!this.minMonth || shownMonth - this.minMonth >= 0) &&
				(!this.maxMonth || shownMonth - this.maxMonth <= 0) ? shownMonth : startDate ?
				startDate : (!this.minMonth || thisMonth - this.minMonth >= 0) &&
				(!this.maxMonth || thisMonth - this.maxMonth <= 0) ? thisMonth :
				this.minMonth ? this.minMonth : this.maxMonth
			);
		}
		if (updateState) {
			this.setState({
				startDate: startDate,
				endDate: endDate,
				shownMonth: shownMonth
			});
		}
	};

	windowClickHandler = () => {
		this.setState({
			isVisible: this.isPopUp ? false : true,
			monthList: null
		});
	};

	valuesAreNotTheSame = (val1, val2) => {
		if (typeof val1 !== typeof val2) {
			return true;
		}
		else if (
			['boolean', 'function', 'number', 'string', 'undefined'].indexOf(typeof val1) !== -1 ||
			val1 === null
		) {
			if (val1 !== val2) {
				return true;
			}
		}
		else if (this.isDate(val1)) {
			if (!this.isDate(val2) || val1 - val2 !== 0) {
				return true;
			}
		}
		else if (Array.isArray(val1)) {
			if (!Array.isArray(val2) || val1.length !== val2.length) {
				return true;
			}
			for (let i = val1.length - 1; i >= 0; i--) {
				if (this.valuesAreNotTheSame(val1[i], val2[i])) {
					return true;
				}
			}
		}
		else if (typeof val1 === 'object') {
			if (typeof val2 !== 'object') {
				return true;
			}
			const keys1 = Object.keys(val1);
			const keys2 = Object.keys(val2);
			if (keys1.length !== keys2.length) {
				return true;
			}
			for (let i = keys1.length - 1; i >= 0; i--) {
				if (
					keys2.indexOf(keys1[i]) === -1 ||
					this.valuesAreNotTheSame(val1[keys1[i]], val2[keys1[i]])
				) {
					return true;
				}
			}
		}
		return false;
	};
	
	propsAreNotTheSame = (prevProps, propsList) => {
		for (let i = propsList.length - 1; i >= 0; i--) {
			if (this.valuesAreNotTheSame(this.props[propsList[i]], prevProps[propsList[i]])) {
				return true;
			}
		}
		return false;
	};

	isValidDateFormat = format => {
		if (typeof format !== 'string') {
			return false;
		}
		const length = format.length;
		format = format.replace(/yyyy|yy|mmmm|mmm|mm|m|dddd|ddd|dd|d/gmi, '');
		if (length === format.length || /[a-z]|\d/mi.test(format)) {
			return false;
		}
		return true;
	};

	dateToString = (date, format) => {
		const dateYear = date.getFullYear();
		const dateMonth = date.getMonth();
		const dateDate = date.getDate();
		const dateDay = (date.getDay() + 6) % 7;
		return format.replace(/yyyy|yy|mmmm|mmm|mm|m|dddd|ddd|dd|d/gmi, match => {
			match = match.toLowerCase();
			switch (match) {
				case 'yyyy':
					return dateYear + '';
				case 'yy':
					return (dateYear + '').slice(-2);
				case 'mmmm':
					return this.monthNames[dateMonth];
				case 'mmm':
					return this.monthNames[dateMonth].slice(0, 3);
				case 'mm':
					return ('0' + (dateMonth + 1)).slice(-2);
				case 'm':
					return dateMonth + 1 + '';
				case 'dddd':
					return this.dayNames[dateDay];
				case 'ddd':
					return this.dayNames[dateDay].slice(0, 3);
				case 'dd':
					return ('0' + dateDate).slice(-2);
				case 'd':
					return dateDate + '';
			}
		});
	};

	createDateString = (format, date1, date2) => {
		let result = this.dateToString(date1, format);
		if (date2) {
			result += ' - ' + this.dateToString(date2, format);
		}
		return result;
	};

	isValidBlackList = arr => {
		if (!Array.isArray(arr)) {
			return false;
		}
		for (let i = arr.length - 1; i >= 0; i--) {
			if (
				!this.isDate(arr[i]) && (!this.isDate(arr[i].start) || !this.isDate(arr[i].end) ||
				this.toBeginningOfDay(arr[i].end) - this.toBeginningOfDay(arr[i].start) < 0)
			) {
				return false;
			}
		}
		return true;
	};

	isDate = date => Object.prototype.toString.call(date) === '[object Date]';

	toBeginningOfDay = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

	toBeginningOfMonth = date => new Date(date.getFullYear(), date.getMonth(), 1);

	inBlackList = date => {
		const blackList = this.blackList;
		let isNextToBlackList = false;
		for (let i = blackList.length - 1; i >= 0; i--) {
			const dateToStart = this.isDate(blackList[i]) ? blackList[i] - date : blackList[i].start - date;
			const dateToEnd = this.isDate(blackList[i]) ? dateToStart : blackList[i].end - date;
			if (dateToStart <= 0 && dateToEnd >= 0) {
				return this.CONSTANTS.IN_BLACK_LIST;
			}
			if (!isNextToBlackList && dateToStart > 0 && dateToStart < this.selectedMSsInOneClick) {
				isNextToBlackList = true;
			}
		}
		if (isNextToBlackList) {
			return this.CONSTANTS.NEXT_TO_BLACK_LIST;
		}
		return this.CONSTANTS.NOT_IN_BLACK_LIST;
	};

	blackListIsNotInRange = (start, end) => {
		const blackList = this.blackList;
		for (let i=0; i<blackList.length; i++) {
			const item = blackList[i];
			if (
				this.isDate(item) && item - start >= 0 && item - end <= 0 || !this.isDate(item) &&
				((item.start - start >= 0 && item.start - end <= 0) ||
				(item.end - start >= 0 && item.end - end <= 0) ||
				(item.start - start < 0 && item.end - end > 0))
			) {
				return false;
			}
		}
		return true;
	};

	setShownMonth = date => {
		let shownMonth = this.toBeginningOfMonth(date);
		if (
			this.maxMonth &&
			new Date(shownMonth.getFullYear(), shownMonth.getMonth() + this.monthsInDatePicker - 1, 1) -
			this.maxMonth > 0
		) {
			shownMonth = new Date(
				this.maxMonth.getFullYear(), this.maxMonth.getMonth() + 1 - this.monthsInDatePicker, 1
			);
		}
		if (this.minMonth && shownMonth - this.minMonth < 0) {
			shownMonth = this.toBeginningOfMonth(this.minMonth);
		}
		return shownMonth;
	};

	DatePickerToggle = e => {
		e.stopPropagation();
		this.setState({
			isVisible: !this.state.isVisible,
			monthList: null
		});
	};

	setSelection = (start, end) => {
		this.setState({
			startDate: start,
			endDate: end,
			dateHovered: null,
			isVisible: this.isPopUp && (end || !this.isRangePicker) ? false : true
		});
		if (this.onSelect) {
			this.onSelect({
				startDate: this.cloneDate(start),
				endDate: this.cloneDate(end),
				shownMonth: this.cloneDate(this.state.shownMonth)
			});
		}
	};

	inputClearClickHandler = e => {
		if (this.state.startDate) {
			e.stopPropagation();
			this.setState({
				startDate: null,
				endDate: null,
				isVisible: false,
				monthList: null
			});
			if (this.onSelect) {
				this.onSelect({
					startDate: null,
					endDate: null,
					shownMonth: this.cloneDate(this.state.shownMonth)
				});
			}
		}
	};

	datePickerClickHandler = e => {
		e.stopPropagation();
		this.setState({
			monthList: null
		});
	};

	monthShiftHandler = shift => {
		const shownMonth = this.state.shownMonth;
		this.setState({shownMonth: this.setShownMonth(new Date(
			shownMonth.getFullYear(), shownMonth.getMonth() + shift, 1
		))});
	};

	monthTitleClickHandler = (e, index) => {
		e.stopPropagation();
		this.setState({
			monthList: this.state.monthList === index ? null : index
		});
	};

	createMonthList = date => {
		const list = [];
		let itrationDate = this.firstMonthInMonthsDropDown;
		while(
			itrationDate - this.firstMonthInMonthsDropDown >= 0 &&
			itrationDate - this.lastMonthInMonthsDropDown <= 0
		) {
			if (
				(!this.minMonth || itrationDate - this.minMonth >= 0) &&
				(!this.maxMonth || itrationDate - this.maxMonth <= 0)
			) {
				list.push({
					date: itrationDate,
					selected: itrationDate - date === 0
				});
			}
			itrationDate = new Date(itrationDate.getFullYear(), itrationDate.getMonth() + 1, 1);
		}
		return list;
	};

	monthListItemClickHandler = (date, shift) => {
		this.setState({
			shownMonth: this.setShownMonth(new Date(date.getFullYear(), date.getMonth() - shift, 1))
		});
	};

	isArrayOfStrings = (arr, num) => {
		if (!Array.isArray(arr)) {
			return false;
		}
		for (let i=0; i<num; i++) {
			if (typeof arr[i] !== 'string') {
				return false;
			}
		}
		return true;
	};

	getWeekEnds = weekEnds => {
		if (!Array.isArray(weekEnds)) {
			return [];
		}
		return weekEnds.reduce((acc, current) => {
			if (typeof current === 'number') {
				const _current = Math.round(current);
				if (_current >= 0 && _current <= 6 && acc.indexOf(_current) === -1) {
					acc.push(_current);
				}
			}
			return acc;
		}, []);
	};

	dayLeaveHandler = () => {
		if (this.state.dateHovered) {
			this.setState({dateHovered: null});
		}
	};

	dayEnterHandler = (date, className) => {
		if (
			className === this.CONSTANTS.CLASS_NAMES.NORMAL && this.isRangePicker &&
			this.state.startDate && !this.state.endDate && date - this.state.startDate > 0 &&
			this.blackListIsNotInRange(this.state.startDate, date)
		) {
			this.setState({dateHovered: date});
		}
	};

	dayClickHandler = (date, className) => {
		if (className === this.CONSTANTS.CLASS_NAMES.NORMAL) {
			let startDate = this.state.startDate;
			let endDate = null;
			if (
				this.isRangePicker && startDate && !this.state.endDate &&
				date - startDate > 0 && this.blackListIsNotInRange(startDate, date)
			) {
				endDate = date;
			}
			else {
				startDate = date;
			}
			this.setSelection(startDate, endDate);
		}
	};

	cloneDate = date => {
		if (this.isDate(date)) {
			return this.toBeginningOfDay(date);
		}
		else {
			return date;
		}
	};

	// getHighestZIndex = () => {
	// 	let highestZIndex = 0;
	// 	const elements = document.getElementsByTagName('*');
	// 	for (let i = 0; i < elements.length; i++) {
	// 		var zIndex = document.defaultView.getComputedStyle(elements[i],null).getPropertyValue("z-index");
	// 		if (zIndex != 'auto' && zIndex > highestZIndex) {
	// 			highestZIndex = zIndex;
	// 		}
	// 	}
	// 	return  parseInt(highestZIndex);
	// }

	createDays = (year, month, today) => {
		const days = [];
		const firstDayInMonthPosition = (new Date(
			year, month, 1
		).getDay() + 6 - this.firstDayInWeekShift) % 7;
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		for (let i=0; i<firstDayInMonthPosition + daysInMonth; i++) {
			const dayDate = i - firstDayInMonthPosition + 1;
			const itrationDate = new Date(year, month, dayDate);
			const inBlackList = this.inBlackList(itrationDate);
			const startDateToItrationDate = this.state.startDate ? itrationDate - this.state.startDate : null;
			const endDateToItrationDate = this.state.endDate ? itrationDate - this.state.endDate : null;
			const minDateToItrationDate = this.minDate ? itrationDate - this.minDate : null;
			const maxDateToItrationDate = this.maxDate ? itrationDate - this.maxDate : null;
			const dateHoveredToItrationDate = this.state.dateHovered ?
				itrationDate - this.state.dateHovered : null;
			const classNames = this.CONSTANTS.CLASS_NAMES;
			const itrationClassName1 = dayDate < 1 ? classNames.EMPTY :
				(this.minDate && minDateToItrationDate < 0) || (this.maxDate && maxDateToItrationDate > 0) ?
				classNames.DISABLED : inBlackList === this.CONSTANTS.IN_BLACK_LIST ?
				classNames.IN_BLACK_LIST : inBlackList === this.CONSTANTS.NEXT_TO_BLACK_LIST ||
				(this.maxDate && - maxDateToItrationDate > 0 && - maxDateToItrationDate <
				this.numberOfSelectedMSs) ? classNames.NEXT_TO_DISABLED : classNames.NORMAL;
			const itrationClassName2 = dayDate > 0 && this.weekEnds.indexOf(
				(i + this.firstDayInWeekShift) % 7
			) > -1 ? classNames.WEEK_END : null;
			const itrationClassName3 = dayDate > 0 && itrationDate - today === 0 ? classNames.TODAY : null;
			const itrationClassName4 = dayDate < 1 ? null : this.state.startDate &&
				startDateToItrationDate === 0 ? (this.isRangePicker ? (this.state.endDate ?
				classNames.RANGE_START : classNames.RANGE_START_END) : (this.selectedDaysInOneClick === 1 ?
				classNames.SELECTION_START_END : classNames.SELECTION_START)) : this.state.endDate &&
				endDateToItrationDate === 0 ? classNames.RANGE_END : this.state.endDate &&
				startDateToItrationDate > 0 && endDateToItrationDate < 0 ? classNames.IN_RANGE :
				!this.isRangePicker && this.state.startDate && startDateToItrationDate > 0 &&
				startDateToItrationDate < this.numberOfSelectedMSs ?
				(startDateToItrationDate === this.numberOfSelectedMSs - 86400000 ?
				classNames.SELECTION_END : classNames.IN_SELECTION) : null;
			const itrationClassName5 = dayDate <= 0 || !this.state.dateHovered ||
				dateHoveredToItrationDate > 0 || startDateToItrationDate < 0 ? null :
				startDateToItrationDate === 0 ? classNames.HOVER_START :
				dateHoveredToItrationDate === 0 ? classNames.HOVER_END : classNames.IN_HOVER;
			days.push(<div
				key={i}
				className={classNames.DAY + ' ' + itrationClassName1 +
					(itrationClassName2 ? ' ' + itrationClassName2 : '') +
					(itrationClassName3 ? ' ' + itrationClassName3 : '') +
					(itrationClassName4 ? ' ' + itrationClassName4 : '') +
					(itrationClassName5 ? ' ' + itrationClassName5 : '')}
				onClick={() => this.dayClickHandler(itrationDate, itrationClassName1)}
				onMouseEnter={() => this.dayEnterHandler(itrationDate, itrationClassName1)}
				onMouseLeave={this.dayLeaveHandler}
			>{dayDate < 1 ? '' : this.dayTileTemplate ? this.dayTileTemplate({
				startDate: this.cloneDate(this.state.startDate),
				endDate: this.cloneDate(this.state.endDate),
				shownMonth: this.cloneDate(this.state.shownMonth),
				currentDate: this.cloneDate(itrationDate)
			}) : ('0' + dayDate).slice(-2)}</div>);
		}
		return days;
	};

	createMonths = today => {
		const classNames = this.CONSTANTS.CLASS_NAMES;
		const shownYear = this.state.shownMonth.getFullYear();
		const shownMonth = this.state.shownMonth.getMonth();
		const months = [];
		for (let i=0; i<this.monthsInDatePicker; i++) {
			const monthDate = new Date(shownYear, shownMonth + i, 1);
			if (!this.maxMonth || monthDate - this.maxMonth <= 0) {
				months.push(
					<div className={classNames.MONTH_CONTAINER} key={i}>
						{!this.showTitleDropDown ? <div className={classNames.MONTH_TITLE_CONTENT}>
							{this.dateToString(monthDate, this.headerDateFormat)}
						</div> : <div className={classNames.MONTH_TITLE_CONTAINER}>
							<div
								className={classNames.MONTH_TITLE + ' ' + (this.state.monthList === i ?
									classNames.MONTH_TITLE_OPEN : classNames.MONTH_TITLE_CLOSED)}
								onClick={e => this.monthTitleClickHandler(e, i)}
							>
								{this.dateToString(monthDate, this.headerDateFormat)}
								{!this.monthTitleDropDownIconTemplate ? null : this.monthTitleDropDownIconTemplate({
									startDate: this.cloneDate(this.state.startDate),
									endDate: this.cloneDate(this.state.endDate),
									shownMonth: this.cloneDate(this.state.shownMonth),
									open: this.state.monthList === i
								})}
							</div>
							{this.state.monthList !== i ? null : <ul
								className={classNames.MONTH_LIST}
								ref={this.monthListContainer}
							>
								{this.createMonthList(monthDate).map((item, index) => <li
									key={index}
									className={classNames.MONTH_LIST_ITEM + (item.selected ? ' ' +
										classNames.MONTH_LIST_ITEM_SELECTED : '')}
									onClick={() => this.monthListItemClickHandler(item.date, i)}
									ref={item.selected ? this.monthListSelectedItem : null}
								>{this.dateToString(item.date, this.headerDateFormat)}</li>)}
							</ul>}
						</div>}
						<div className={classNames.DAY_NAMES_CONTAINER}>
							{this.shiftedDayNames.map((day, index) => <div
								key={index}
								className={classNames.DAY_NAME + (this.weekEnds.indexOf(
									(index + this.firstDayInWeekShift) % 7
								) === -1 ? '' : ' ' + classNames.DAY_NAME_WEEK_END)}
							>{day}</div>)}
						</div>
						<div className={classNames.DAYS_CONTAINER}>
							{this.createDays(shownYear, shownMonth + i, today)}
						</div>
					</div>
				);
			}
		}
		return months;
	};

	render() {

		// Update props
		const today = this.toBeginningOfDay(new Date);
		const props = this.props;
		Object.keys(this.props).forEach(key => {
			switch (key) {
				case 'inputPlaceholder':
				case 'inputLabel':
					this[key] = typeof props[key] === 'string' ? props[key] : this[key];
					break;
				case 'weekEnds':
					this[key] = this.getWeekEnds(props[key]);
					break;
				case 'monthNames':
					this[key] = this.isArrayOfStrings(props[key], 12) ? props[key].slice(0, 12) : this[key];
					break;
				case 'dayNames':
					this[key] = this.isArrayOfStrings(props[key], 7) ? props[key].slice(0, 7) : this[key];
					this.shiftedDayNames = this[key].slice(this.firstDayInWeekShift).concat(
						this[key].slice(0, this.firstDayInWeekShift)
					).map(name => name.slice(0, this.dayNameLength));
					break;
				case 'dayNameLength':
					this[key] = typeof props[key] !== 'number' ? this[key] : Math.max(Math.round(props[key]), 1);
					this.shiftedDayNames = this.dayNames.slice(this.firstDayInWeekShift).concat(
						this.dayNames.slice(0, this.firstDayInWeekShift)
					).map(name => name.slice(0, this[key]));
					break;
				case 'firstDayInWeekShift':
					this[key] = typeof props[key] !== 'number' ? this[key] :
						Math.min(Math.max(Math.round(props[key]), 0), 6);
					this.shiftedDayNames = this.dayNames.slice(this[key]).concat(
						this.dayNames.slice(0, this[key])
					).map(name => name.slice(0, this.dayNameLength));
					break;
				case 'firstMonthInMonthsDropDown':
					this[key] = this.isDate(props[key]) ? this.toBeginningOfMonth(props[key]) :
						this.toBeginningOfMonth(today);
					const _lastMonthInMonthsDropDown = typeof props.lastMonthInMonthsDropDown === 'undefined' ?
						this.lastMonthInMonthsDropDown : props.lastMonthInMonthsDropDown;
					this.lastMonthInMonthsDropDown = this.isDate(_lastMonthInMonthsDropDown) &&
						_lastMonthInMonthsDropDown - this[key] >= 0 ?
						this.toBeginningOfMonth(_lastMonthInMonthsDropDown) : this[key];
					break;
				case 'inputDateFormat':
				case 'headerDateFormat':
				case 'footerDateFormat':
					this[key] = this.isValidDateFormat(props[key]) ? props[key] : this[key];
					break;
				case 'onSelect':
				case 'inputClearButtonTemplate':
				case 'previousButtonTemplate':
				case 'nextButtonTemplate':
				case 'monthTitleDropDownIconTemplate':
				case 'dayTileTemplate':
					this[key] = typeof props[key] === 'function' ? props[key] : this[key];
					break;
				case 'isPopUp':
				case 'showFooter':
				case 'showTitleDropDown':
				case 'showInputLabel':
					this[key] = !!props[key];
					break;
				case 'isRangePicker':
					this[key] = !!props[key];
					this.selectedDaysInOneClick = !this[key] ? Math.max(Math.round(
						typeof props.selectedDaysInOneClick === 'number' ? props.selectedDaysInOneClick :
						this.selectedDaysInOneClick
					), 1) : 1;
					this.selectedMSsInOneClick = this.selectedDaysInOneClick * 86400000;
					break;
				case 'monthsInDatePicker':
					this[key] = typeof props[key] !== 'number' ? this[key] : Math.max(Math.round(props[key]), 1);
					this.monthStep = Math.min(Math.max(Math.round(
						typeof props.monthStep !== 'number' ? this.monthStep : props.monthStep
					), 1), this[key]);
					break;
				case 'blackList':
					this[key] = this.isValidBlackList(props[key]) ?
						props[key].map(item => this.isDate(item) ? this.toBeginningOfDay(item) : ({
							start: this.toBeginningOfDay(item.start), end: this.toBeginningOfDay(item.end)
						})) : [];
					break;
				case 'minDate':
					this[key] = this.isDate(props[key]) ? this.toBeginningOfDay(props[key]) : null;
					this.minMonth = this[key] ? this.toBeginningOfMonth(this[key]) : null;
					const _maxDate = typeof props.maxDate === 'undefined' ? this.maxDate : props.maxDate;
					this.maxDate = !this.isDate(_maxDate) || this[key] && _maxDate - this[key] < 0 ?
						null : this.toBeginningOfDay(_maxDate);
					this.maxMonth = this.maxDate ? this.toBeginningOfMonth(this.maxDate) : null;
			}
		});
		Object.keys(this.props).forEach(key => {
			switch (key) {
				case 'lastMonthInMonthsDropDown':
					this[key] = this.isDate(props[key]) && props[key] - this.firstMonthInMonthsDropDown >= 0 ?
						this.toBeginningOfMonth(props[key]) : this.firstMonthInMonthsDropDown;
					break;
				case 'monthStep':
					this[key] = Math.min(Math.max(Math.round(
						props[key] === 'number' ? props[key] : this[key]
					), 1), this.monthsInDatePicker);
					break;
				case 'selectedDaysInOneClick':
					this[key] = !this.isRangePicker ? Math.max(Math.round(
						typeof props[key] === 'number' ? props[key] : this[key]
					), 1) : 1;
					this.selectedMSsInOneClick = this[key] * 86400000;
					break;
				case 'maxDate':
					this[key] = !this.isDate(props[key]) || this.minDate && props[key] - this.minDate < 0 ?
						null : this.toBeginningOfDay(props[key]);
					this.maxMonth = this[key] ? this.toBeginningOfMonth(this[key]) : null;
			}
		});

		const classNames = this.CONSTANTS.CLASS_NAMES;
		const disablePreviousBTN = this.minMonth && this.state.shownMonth - this.minMonth <= 0;
		const disableNextBTN = this.maxMonth && new Date(this.state.shownMonth.getFullYear(),
			this.state.shownMonth.getMonth() + this.monthsInDatePicker - 1, 1) - this.maxMonth >= 0;
		const selectedStart = this.state.startDate;
		const selectedEnd = this.isRangePicker ? this.state.endDate :
			this.selectedDaysInOneClick > 1 ? new Date(selectedStart.getFullYear(), selectedStart.getMonth(),
			selectedStart.getDate() + this.selectedDaysInOneClick - 1) : null;

		// const highestZIndex = this.getHighestZIndex();

		return <div className={classNames.DATE_PICKER_CONTAINER}>
			{this.isPopUp ? <div
				className={classNames.DATE_PICKER_INPUT + ' ' + (
					this.state.startDate ? classNames.DATE_PICKER_INPUT_NOT_EMPTY : classNames.DATE_PICKER_INPUT_EMPTY
				)}
				onClick={this.DatePickerToggle}
			>
				{this.showInputLabel ? <div className={classNames.DATE_PICKER_INPUT_LABEL}>{this.inputLabel}</div> : null}
				<div className={classNames.DATE_PICKER_INPUT_PLACEHOLDER}>{!selectedStart ? this.inputPlaceholder : this.createDateString(
					this.inputDateFormat, selectedStart, selectedEnd
				)}</div>
				{this.inputClearButtonTemplate ? <div
					className={classNames.INPUT_BUTTON}
					onClick={this.inputClearClickHandler}
				>{this.inputClearButtonTemplate({
					startDate: this.cloneDate(this.state.startDate),
					endDate: this.cloneDate(this.state.endDate),
					shownMonth: this.cloneDate(this.state.shownMonth)
				})}</div> : null}
			</div> : null}
			{this.isPopUp && this.state.isVisible && <div
				className={classNames.DATE_PICKER_BACKDROP}
				style={{zIndex: 16777270, position: 'fixed', top: 0, left: 0, bottom: 0, right: 0}}
				onClick={this.windowClickHandler}
			></div>}
			{!this.isPopUp || this.state.isVisible ? <div
				className={classNames.DATE_PICKER}
				onClick={this.datePickerClickHandler}
				style={this.isPopUp ? {zIndex: 16777271} : {}}
			>
				<div className={classNames.MONTHS_CONTAINER}>
					{this.createMonths(today)}
				</div>
				{!this.showFooter ? null : <div className={classNames.DATE_PICKER_FOOTER}>
					{!selectedStart ? '' : this.createDateString(
						this.footerDateFormat, selectedStart, selectedEnd
					)}
				</div>}
				<div
					className={classNames.BTN_PREVIOUS + (disablePreviousBTN ? ' ' + classNames.BTN_DISABLED : '')}
					onClick={disablePreviousBTN ? null : () => this.monthShiftHandler(-this.monthStep)}
				>{!this.previousButtonTemplate ? 'Previous' : this.previousButtonTemplate({
					startDate: this.cloneDate(this.state.startDate),
					endDate: this.cloneDate(this.state.endDate),
					shownMonth: this.cloneDate(this.state.shownMonth)
				})}</div>
				<div
					className={classNames.BTN_NEXT + (disableNextBTN ? ' ' + classNames.BTN_DISABLED : '')}
					onClick={disableNextBTN ? null : () => this.monthShiftHandler(this.monthStep)}
				>{!this.nextButtonTemplate ? 'Next' : this.nextButtonTemplate({
					startDate: this.cloneDate(this.state.startDate),
					endDate: this.cloneDate(this.state.endDate),
					shownMonth: this.cloneDate(this.state.shownMonth)
				})}</div>
			</div> : null}
		</div>;
	}
}

DatePicker.propTypes = {
	isPopUp: PropTypes.bool,
	isRangePicker: PropTypes.bool,
	showFooter: PropTypes.bool,
	showTitleDropDown: PropTypes.bool,
	showInputLabel: PropTypes.bool,
	monthsInDatePicker: PropTypes.number,
	monthStep: PropTypes.number,
	selectedDaysInOneClick: PropTypes.number,
	firstDayInWeekShift: PropTypes.number,
	dayNameLength: PropTypes.number,
	weekEnds: PropTypes.arrayOf(PropTypes.number),
	inputDateFormat: PropTypes.string,
	headerDateFormat: PropTypes.string,
	footerDateFormat: PropTypes.string,
	inputPlaceholder: PropTypes.string,
	inputLabel: PropTypes.string,
	dayNames: PropTypes.arrayOf(PropTypes.string),
	monthNames: PropTypes.arrayOf(PropTypes.string),
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	shownMonth: PropTypes.instanceOf(Date),
	firstMonthInMonthsDropDown: PropTypes.instanceOf(Date),
	lastMonthInMonthsDropDown: PropTypes.instanceOf(Date),
	blackList: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.shape({
			start: PropTypes.instanceOf(Date),
			end: PropTypes.instanceOf(Date)
		})
	])),
	inputClearButtonTemplate: PropTypes.func,
	previousButtonTemplate: PropTypes.func,
	nextButtonTemplate: PropTypes.func,
	monthTitleDropDownIconTemplate: PropTypes.func,
	dayTileTemplate: PropTypes.func,
	onSelect: PropTypes.func
};

export default DatePicker;