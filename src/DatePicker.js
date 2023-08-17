import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';

// import './DatePicker.css';

class DatePicker extends Component {
	constructor(props) {
		super(props);

		this.monthListSelectedItem = createRef();
		this.monthListContainer = createRef();
		this.datePickerPopUp = createRef();
		this.datePickerButton = createRef();
		this.isFirstVisibleDayInFlexibleRangeRef = createRef();
		this.isFirstDayInFlexibleRangeRef = createRef();
		this.lastVisibleDayInFlexibleRangeRef = createRef();
		this.isLastDayInFlexibleRangeRef = createRef();

		// Set constants
		this.CONSTANTS = {
			DAY_NAMES: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			],
			MONTH_NAMES: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			],
			INPUT_PLACEHOLDER: 'Click here to select date',
			FLEXIBLE_DATE_TITLE: 'Arrival day earlier or later',
			INPUT_LABEL: 'Click here to select date',
			INPUT_DATE_FORMAT: 'DDD, MMM dd yyyy',
			HEADER_DATE_FORMAT: 'MMMM yyyy',
			FOOTER_DATE_FORMAT: 'dd/mm/yyyy',
			IN_BLACK_LIST: 'inBlackList',
			NEXT_TO_BLACK_LIST: 'nextToBlackList',
			NOT_IN_BLACK_LIST: 'notInBlackList',
			NEXT_BUTTON_LABEL: 'Click here to go to next month',
			BACK_BUTTON_LABEL: 'Click here to go to previous month',
			FLEXIBLE_DATE_SELECT_BUTTON_LABEL: 'Select',
			CLASS_NAMES: {
				DATE_PICKER_CONTAINER: 'date-picker-container',
				DATE_PICKER_INPUT: 'date-picker-input',
				DATE_PICKER_INPUT_EMPTY: 'date-picker-input-empty',
				DATE_PICKER_INPUT_NOT_EMPTY: 'date-picker-input-not-empty',
				DATE_PICKER_INPUT_LABEL: 'date-picker-input-label',
				DATE_PICKER_INPUT_PLACEHOLDER: 'date-picker-input-placeholder',
				INPUT_BUTTON: 'input-button',
				INPUT_BUTTON_DISABLED: 'input-button-disabled',
				INPUT_BUTTON_NO_DEATE: 'input-button-no-date',
				INPUT_BUTTON_NO_RANGE: 'input-button-no-range',
				DATE_PICKER: 'date-picker',
				MONTHS_CONTAINER: 'months-container',
				DATE_PICKER_RANGE_DETAILS: 'date-picker-range-details',
				FOOTER_CONTAINER: 'footer-container',
				FLEXIBLE_DATE_CONTAINER: 'flexible-date-container',
				FLEXIBLE_DATE_CONTAINER_DISABLED:
					'flexible-date-container-disabled',
				FLEXIBLE_DATE_TITLE_CONTAINER: 'flexible-date-title-container',
				FLEXIBLE_DATE_TITLE_CONTAINER_DISABLED:
					'flexible-date-title-container-disabled',
				FLEXIBLE_DATE_BUTTONS_CONTAINER:
					'flexible-date-buttons-container',
				FLEXIBLE_DATE_BUTTONS_CONTAINER_DISABLED:
					'flexible-date-buttons-container-disabled',
				FLEXIBLE_DATE_BUTTON: 'flexible-date-button',
				FLEXIBLE_DATE_BUTTON_SELECTED: 'flexible-date-button-selected',
				FLEXIBLE_DATE_SELECT_BUTTON: 'flexible-date-select-button',
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
				IN_HOVER: 'day-in-hover',
				IN_FLEXIBLE_RANGE: 'day-in-flexible-range',
				IN_FLEXIBLE_RANGE_FROM_LEFT: 'day-in-flexible-range-from-left',
				IN_FLEXIBLE_RANGE_FROM_RIGHT:
					'day-in-flexible-range-from-right',
				IN_FLEXIBLE_RANGE_CENTER: 'day-in-flexible-range-center',
				FIRST_DAY_IN_FLEXIBLE_RANGE: 'first-day-in-flexible-range',
				FIRST_VISIBLE_DAY_IN_FLEXIBLE_RANGE:
					'first-visible-day-in-flexible-range',
				LAST_DAY_IN_FLEXIBLE_RANGE: 'last-day-in-flexible-range',
				LAST_VISIBLE_DAY_IN_FLEXIBLE_RANGE:
					'last-visible-day-in-flexible-range',
			},
		};

		// Set initial props
		const today = this.toBeginningOfDay(new Date());
		this.monthNames = this.CONSTANTS.MONTH_NAMES;
		this.dayNames = this.CONSTANTS.DAY_NAMES;
		this.dayNameLength = 3;
		this.firstDayInWeekShift = 0;
		this.shiftedDayNames = this.dayNames
			.slice(this.firstDayInWeekShift)
			.concat(this.dayNames.slice(0, this.firstDayInWeekShift))
			.map((name) => name.slice(0, this.dayNameLength));
		this.weekEnds = [5, 6];
		this.flexibleDateRanges = [];
		this.flexibleDateRangesLabels = [];
		this.selectedDateCanBeOutOfAllowedRange = false;
		this.isPopUp = false;
		this.isRangePicker = false;
		this.showDateRangeDetails = false;
		this.showTitleDropDown = false;
		this.showInputLabel = false;
		this.isFlexibleDate = false;
		this.monthsInDatePicker = 1;
		this.monthStep = 1;
		this.selectedDaysInOneClick = 1;
		this.selectedMSsInOneClick = this.selectedDaysInOneClick * 86400000;
		this.inputPlaceholder = this.CONSTANTS.INPUT_PLACEHOLDER;
		this.flexibleDateTitle = this.CONSTANTS.FLEXIBLE_DATE_TITLE;
		this.inputLabel = this.CONSTANTS.INPUT_LABEL;
		this.nextButtonLabel = this.CONSTANTS.NEXT_BUTTON_LABEL;
		this.backButtonLabel = this.CONSTANTS.BACK_BUTTON_LABEL;
		this.flexibleDateSelectButtonLabel =
			this.CONSTANTS.FLEXIBLE_DATE_SELECT_BUTTON_LABEL;
		this.inputDateFormat = this.CONSTANTS.INPUT_DATE_FORMAT;
		this.headerDateFormat = this.CONSTANTS.HEADER_DATE_FORMAT;
		this.datePickerRangeFormat = this.CONSTANTS.FOOTER_DATE_FORMAT;
		this.blackList = [];
		this.minDate = null;
		this.minMonth = this.minDate
			? this.toBeginningOfMonth(this.minDate)
			: null;
		this.maxDate = null;
		this.maxMonth = this.maxDate
			? this.toBeginningOfMonth(this.maxDate)
			: null;
		this.firstMonthInMonthsDropDown = this.toBeginningOfMonth(today);
		this.lastMonthInMonthsDropDown = this.toBeginningOfMonth(
			new Date(today.getFullYear(), today.getMonth() + 24, 1)
		);
		this.onSelect = null;
		this.onToggle = null;
		this.onMonthChange = null;
		this.inputTemplate = null;
		this.inputClearButtonTemplate = null;
		this.footerTemplate = null;
		this.previousButtonTemplate = null;
		this.nextButtonTemplate = null;
		this.monthTitleDropDownIconTemplate = null;
		this.dayTileTemplate = null;
		this.inputPlaceholderIconTemplate = null;

		// Set initial state
		this.state = {
			startDate: null,
			endDate: null,
			shownMonth: this.setShownMonth(new Date()),
			isVisible: false,
			monthList: null,
			dateHovered: null,
			flexibleDateRange: 0,
		};
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.documentClickHandler);

		// Update state
		this.updateState({});
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.documentClickHandler);
	}

	componentDidUpdate(prevProps, prevState) {
		// Scroll to selected month in month's dropdown
		if (
			prevState.monthList !== this.state.monthList &&
			this.monthListContainer.current &&
			this.monthListSelectedItem.current
		) {
			this.monthListContainer.current.scrollTop =
				this.monthListSelectedItem.current.offsetTop;
		}

		// Update state
		this.updateState(prevProps);
	}

	documentClickHandler = (e) => {
		if (
			!this.isPopUp ||
			!this.state.isVisible ||
			(this.datePickerPopUp.current &&
				this.datePickerPopUp.current.contains(e.target)) ||
			(this.datePickerButton.current &&
				this.datePickerButton.current.contains(e.target))
		) {
			return;
		}
		this.setState({ isVisible: false, monthList: null });
		if (this.onToggle) {
			this.onToggle(false);
		}
	};

	updateState = (prevProps) => {
		const props = this.props;
		let startDate = this.state.startDate;
		let endDate = this.state.endDate;
		let shownMonth = this.state.shownMonth;
		let flexibleDateRange = this.state.flexibleDateRange;
		let updateState = false;
		const areDatePropsChanged = this.propsAreNotTheSame(prevProps, [
			'startDate',
			'minDate',
			'maxDate',
			'isRangePicker',
			'selectedDaysInOneClick',
			'blackList',
		]);
		if (
			areDatePropsChanged ||
			this.propsAreNotTheSame(prevProps, [
				'selectedDateCanBeOutOfAllowedRange',
			])
		) {
			updateState = true;
			if (typeof props.startDate !== 'undefined') {
				startDate = props.startDate;
			}
			startDate = this.isDate(startDate)
				? this.toBeginningOfDay(startDate)
				: null;
			startDate =
				startDate &&
				(this.selectedDateCanBeOutOfAllowedRange ||
					((!this.minDate || startDate - this.minDate >= 0) &&
						(!this.maxDate ||
							this.maxDate - startDate >=
								(this.selectedDaysInOneClick - 1) * 86400000) &&
						this.inBlackList(startDate) ===
							this.CONSTANTS.NOT_IN_BLACK_LIST))
					? startDate
					: null;
		}
		if (
			areDatePropsChanged ||
			this.propsAreNotTheSame(prevProps, [
				'endDate',
				'selectedDateCanBeOutOfAllowedRange',
			])
		) {
			updateState = true;
			if (typeof props.endDate !== 'undefined') {
				endDate = props.endDate;
			}
			endDate =
				this.isRangePicker && this.isDate(endDate)
					? this.toBeginningOfDay(endDate)
					: null;
			endDate =
				endDate &&
				startDate &&
				endDate - startDate > 0 &&
				(this.selectedDateCanBeOutOfAllowedRange ||
					((!this.maxDate || endDate - this.maxDate <= 0) &&
						this.blackListIsNotInRange(startDate, endDate)))
					? endDate
					: null;
		}
		if (
			areDatePropsChanged ||
			this.propsAreNotTheSame(prevProps, [
				'shownMonth',
				'monthsInDatePicker',
			])
		) {
			updateState = true;
			if (
				this.propsAreNotTheSame(prevProps, ['shownMonth']) &&
				typeof props.shownMonth !== 'undefined'
			) {
				shownMonth = props.shownMonth;
			} else if (
				this.propsAreNotTheSame(prevProps, ['startDate']) &&
				typeof props.startDate !== 'undefined'
			) {
				shownMonth = props.startDate;
			}
			const thisMonth = this.toBeginningOfMonth(new Date());
			shownMonth = this.isDate(shownMonth)
				? this.toBeginningOfMonth(shownMonth)
				: null;
			shownMonth = this.setShownMonth(
				shownMonth &&
					(!this.minMonth || shownMonth - this.minMonth >= 0) &&
					(!this.maxMonth || shownMonth - this.maxMonth <= 0)
					? shownMonth
					: startDate
					? this.toBeginningOfMonth(startDate)
					: (!this.minMonth || thisMonth - this.minMonth >= 0) &&
					  (!this.maxMonth || thisMonth - this.maxMonth <= 0)
					? thisMonth
					: this.minMonth
					? this.minMonth
					: this.maxMonth
			);
		}
		if (
			this.propsAreNotTheSame(prevProps, [
				'isFlexibleDate',
				'flexibleDateRange',
				'flexibleDateRanges',
			])
		) {
			updateState = true;
			flexibleDateRange =
				!props.isFlexibleDate ||
				!props.flexibleDateRange ||
				!this.isArrayOfNumbers(props.flexibleDateRanges) ||
				props.flexibleDateRanges.indexOf(props.flexibleDateRange) === -1
					? 0
					: props.flexibleDateRange;
		}
		if (updateState) {
			this.setState({
				startDate: startDate,
				endDate: endDate,
				shownMonth: shownMonth,
				flexibleDateRange: flexibleDateRange,
			});
		}
	};

	valuesAreNotTheSame = (val1, val2) => {
		if (typeof val1 !== typeof val2) {
			return true;
		} else if (
			['boolean', 'function', 'number', 'string', 'undefined'].indexOf(
				typeof val1
			) !== -1 ||
			val1 === null
		) {
			if (val1 !== val2) {
				return true;
			}
		} else if (this.isDate(val1)) {
			if (!this.isDate(val2) || val1 - val2 !== 0) {
				return true;
			}
		} else if (Array.isArray(val1)) {
			if (!Array.isArray(val2) || val1.length !== val2.length) {
				return true;
			}
			for (let i = val1.length - 1; i >= 0; i--) {
				if (this.valuesAreNotTheSame(val1[i], val2[i])) {
					return true;
				}
			}
		} else if (typeof val1 === 'object') {
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
			if (
				this.valuesAreNotTheSame(
					this.props[propsList[i]],
					prevProps[propsList[i]]
				)
			) {
				return true;
			}
		}
		return false;
	};

	isValidDateFormat = (format) => {
		if (
			format &&
			Object.prototype.toString.call(format) == '[object Function]'
		) {
			return true;
		}
		if (typeof format !== 'string') {
			return false;
		}
		const length = format.length;
		format = format.replace(
			/yyyy|yy|MMMM|MMM|MM|M|mm|m|DDDD|DDD|DD|D|dd|d/gm,
			''
		);
		if (length === format.length || /[a-z]|\d/im.test(format)) {
			return false;
		}
		return true;
	};

	dateToString = (date, format) => {
		if (
			format &&
			Object.prototype.toString.call(format) == '[object Function]'
		) {
			return format(date);
		}
		const dateYear = date.getFullYear();
		const dateMonth = date.getMonth();
		const dateDate = date.getDate();
		const dateDay = this.dayNames[(date.getDay() + 6) % 7];
		return format
			.replace(/Y/gm, 'y')
			.replace(
				/yyyy|yy|MMMM|MMM|MM|M|mm|m|DDDD|DDD|DD|D|dd|d/gm,
				(match) => {
					switch (match) {
						case 'yyyy':
							return dateYear + '';
						case 'yy':
							return (dateYear + '').slice(-2);
						case 'MMMM':
							return this.monthNames[dateMonth];
						case 'MMM':
							return this.monthNames[dateMonth].slice(0, 3);
						case 'MM':
							return this.monthNames[dateMonth].slice(0, 2);
						case 'M':
							return this.monthNames[dateMonth].slice(0, 1);
						case 'mm':
							return ('0' + (dateMonth + 1)).slice(-2);
						case 'm':
							return dateMonth + 1 + '';
						case 'DDDD':
							return dateDay;
						case 'DDD':
							return dateDay.slice(0, 3);
						case 'DD':
							return dateDay.slice(0, 2);
						case 'D':
							return dateDay.slice(0, 1);
						case 'dd':
							return ('0' + dateDate).slice(-2);
						case 'd':
							return dateDate + '';
					}
				}
			);
	};

	createDateString = (format, date1, date2) => {
		let result = this.dateToString(date1, format);
		if (date2) {
			result += ' - ' + this.dateToString(date2, format);
		}
		return result;
	};

	isValidBlackList = (arr) => {
		if (!Array.isArray(arr)) {
			return false;
		}
		for (let i = arr.length - 1; i >= 0; i--) {
			if (
				!this.isDate(arr[i]) &&
				(!this.isDate(arr[i].start) ||
					!this.isDate(arr[i].end) ||
					this.toBeginningOfDay(arr[i].end) -
						this.toBeginningOfDay(arr[i].start) <
						0)
			) {
				return false;
			}
		}
		return true;
	};

	isDate = (date) => Object.prototype.toString.call(date) === '[object Date]';

	toBeginningOfDay = (date) =>
		new Date(date.getFullYear(), date.getMonth(), date.getDate());

	toBeginningOfMonth = (date) =>
		new Date(date.getFullYear(), date.getMonth(), 1);

	inBlackList = (date) => {
		const blackList = this.blackList;
		let isNextToBlackList = false;
		for (let i = blackList.length - 1; i >= 0; i--) {
			const dateToStart = this.isDate(blackList[i])
				? blackList[i] - date
				: blackList[i].start - date;
			const dateToEnd = this.isDate(blackList[i])
				? dateToStart
				: blackList[i].end - date;
			if (dateToStart <= 0 && dateToEnd >= 0) {
				return this.CONSTANTS.IN_BLACK_LIST;
			}
			if (
				!isNextToBlackList &&
				dateToStart > 0 &&
				dateToStart < this.selectedMSsInOneClick
			) {
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
		for (let i = 0; i < blackList.length; i++) {
			const item = blackList[i];
			if (
				(this.isDate(item) && item - start >= 0 && item - end <= 0) ||
				(!this.isDate(item) &&
					((item.start - start >= 0 && item.start - end <= 0) ||
						(item.end - start >= 0 && item.end - end <= 0) ||
						(item.start - start < 0 && item.end - end > 0)))
			) {
				return false;
			}
		}
		return true;
	};

	setShownMonth = (date) => {
		let shownMonth = this.toBeginningOfMonth(date);
		if (
			this.maxMonth &&
			new Date(
				shownMonth.getFullYear(),
				shownMonth.getMonth() + this.monthsInDatePicker - 1,
				1
			) -
				this.maxMonth >
				0
		) {
			shownMonth = new Date(
				this.maxMonth.getFullYear(),
				this.maxMonth.getMonth() + 1 - this.monthsInDatePicker,
				1
			);
		}
		if (this.minMonth && shownMonth - this.minMonth < 0) {
			shownMonth = this.toBeginningOfMonth(this.minMonth);
		}

		if (
			this.onMonthChange &&
			(!this.state ||
				!this.state.shownMonth ||
				shownMonth.getFullYear() !==
					this.state.shownMonth.getFullYear() ||
				shownMonth.getMonth() !== this.state.shownMonth.getMonth())
		) {
			this.onMonthChange({
				startDate: this.cloneDate(this.state.startDate),
				endDate: this.cloneDate(this.state.endDate),
				shownMonth: this.cloneDate(shownMonth),
			});
		}

		return shownMonth;
	};

	datePickerToggle = () => {
		const isVisible = !this.state.isVisible;
		this.setState({ isVisible: isVisible, monthList: null });
		if (isVisible) {
			setTimeout(() => {
				const element = document.querySelector(
					'[data-id="date-picker-dialog"]'
				);
				if (element)
					this.trapFocus(element, (e) => {
						if (e.key === 'Escape') {
							this.setState(() => ({
								isVisible: false,
							}));
						}
					});
			});
		}
		if (this.onToggle) {
			this.onToggle(isVisible);
		}
	};

	selectFlexibleDate = () => {
		this.setState({ isVisible: false });
		if (this.onToggle) {
			this.onToggle(false);
		}
	};

	inputClearClickHandler = (e) => {
		if (this.state.startDate || this.state.flexibleDateRange) {
			e.stopPropagation();
			const isVisible = this.state.isVisible;
			this.setState({
				startDate: null,
				endDate: null,
				isVisible: false,
				monthList: null,
				flexibleDateRange: 0,
			});
			if (this.onSelect) {
				this.onSelect({
					startDate: null,
					endDate: null,
					shownMonth: this.cloneDate(this.state.shownMonth),
					flexibleDateRange: 0,
				});
			}
			if (isVisible && this.onToggle) {
				this.onToggle(false);
			}
		}
	};

	datePickerClickHandler = () => {
		this.setState({
			monthList: null,
		});
	};

	monthShiftHandler = (shift) => {
		this.setState({
			shownMonth: this.setShownMonth(
				new Date(
					this.state.shownMonth.getFullYear(),
					this.state.shownMonth.getMonth() + shift,
					1
				)
			),
		});
	};

	monthTitleClickHandler = (e, index) => {
		e.stopPropagation();
		this.setState({
			monthList: this.state.monthList === index ? null : index,
		});

		setTimeout(() => {
			const element = e.target?.parentNode?.querySelector(
				'[data-id="month-list-selection"]'
			);
			element &&
				this.trapFocus(element, (e) => {
					if (e.key === 'Escape') {
						this.setState({
							monthList:
								this.state.monthList === index ? null : index,
						});
						e.stopPropagation();
						e.preventDefault();
					}
				});
		});
	};

	createMonthList = (date) => {
		const list = [];
		let itrationDate = this.firstMonthInMonthsDropDown;
		while (
			itrationDate - this.firstMonthInMonthsDropDown >= 0 &&
			itrationDate - this.lastMonthInMonthsDropDown <= 0
		) {
			if (
				(!this.minMonth || itrationDate - this.minMonth >= 0) &&
				(!this.maxMonth || itrationDate - this.maxMonth <= 0)
			) {
				list.push({
					date: itrationDate,
					selected: itrationDate - date === 0,
				});
			}
			itrationDate = new Date(
				itrationDate.getFullYear(),
				itrationDate.getMonth() + 1,
				1
			);
		}
		return list;
	};

	monthListItemClickHandler = (date, shift) => {
		this.setState({
			shownMonth: this.setShownMonth(
				new Date(date.getFullYear(), date.getMonth() - shift, 1)
			),
		});
	};

	isArrayOfStrings = (arr, num) => {
		if (!Array.isArray(arr)) {
			return false;
		}
		const length = num || arr.length;
		for (let i = 0; i < length; i++) {
			if (typeof arr[i] !== 'string') {
				return false;
			}
		}
		return true;
	};

	isArrayOfNumbers = (arr, num) => {
		if (!Array.isArray(arr)) {
			return false;
		}
		const length = num || arr.length;
		for (let i = 0; i < length; i++) {
			if (typeof arr[i] !== 'number') {
				return false;
			}
		}
		return true;
	};

	getWeekEnds = (weekEnds) => {
		if (!Array.isArray(weekEnds)) {
			return [];
		}
		return weekEnds.reduce((acc, current) => {
			if (typeof current === 'number') {
				const _current = Math.round(current);
				if (
					_current >= 0 &&
					_current <= 6 &&
					acc.indexOf(_current) === -1
				) {
					acc.push(_current);
				}
			}
			return acc;
		}, []);
	};

	dayLeaveHandler = () => {
		if (this.state.dateHovered) {
			this.setState({ dateHovered: null });
		}
	};

	dayEnterHandler = (date) => {
		if (
			this.isRangePicker &&
			this.state.startDate &&
			!this.state.endDate &&
			date - this.state.startDate > 0 &&
			(!this.minDate || this.state.startDate - this.minDate >= 0) &&
			this.blackListIsNotInRange(this.state.startDate, date)
		) {
			this.setState({ dateHovered: date });
		}
	};

	dayClickHandler = (date) => {
		let startDate = this.state.startDate;
		let endDate = null;
		if (
			this.isRangePicker &&
			!this.isFlexibleDate &&
			startDate &&
			!this.state.endDate &&
			(!this.minDate || this.state.startDate - this.minDate >= 0) &&
			date - startDate > 0 &&
			this.blackListIsNotInRange(startDate, date)
		) {
			endDate = date;
		} else {
			startDate = date;
		}
		const isVisible =
			this.isPopUp &&
			!this.isFlexibleDate &&
			(endDate || !this.isRangePicker)
				? false
				: true;
		this.setState({
			startDate: startDate,
			endDate: endDate,
			dateHovered: null,
			isVisible: isVisible,
		});
		if (this.onSelect) {
			this.onSelect({
				startDate: this.cloneDate(startDate),
				endDate: this.cloneDate(endDate),
				shownMonth: this.cloneDate(this.state.shownMonth),
				flexibleDateRange: this.state.flexibleDateRange,
			});
		}
		if (!isVisible && this.onToggle) {
			this.onToggle(false);
		}
	};

	cloneDate = (date) => {
		if (this.isDate(date)) {
			return this.toBeginningOfDay(date);
		} else {
			return date;
		}
	};

	getFlexibleDateRangesLabels = (flexibleDateRangesLabels) =>
		!this.isFlexibleDate
			? []
			: this.isArrayOfStrings(
					flexibleDateRangesLabels,
					this.flexibleDateRanges.length
			  )
			? flexibleDateRangesLabels.slice(0, this.flexibleDateRanges.length)
			: this.flexibleDateRanges.map(
					(range) =>
						'\u00B1 ' + range + 'day' + (range > 1 ? 's' : '')
			  );

	triggerClick = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.target.click();
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
		const monthKey = `${year}_${month + 1}`;
		const days = [];
		const firstDayInMonthPosition =
			(new Date(year, month, 1).getDay() + 6 - this.firstDayInWeekShift) %
			7;
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		for (let i = 0; i < firstDayInMonthPosition + daysInMonth; i++) {
			const dayDate = i - firstDayInMonthPosition + 1;
			const itrationDate = new Date(year, month, dayDate);
			const inBlackList = this.inBlackList(itrationDate);
			const startDateToItrationDate = this.state.startDate
				? itrationDate - this.state.startDate
				: null;
			const startDateToItrationDateInDays = startDateToItrationDate
				? Math.round(startDateToItrationDate / 86400000)
				: null;
			const endDateToItrationDate = this.state.endDate
				? itrationDate - this.state.endDate
				: null;
			const minDateToItrationDate = this.minDate
				? itrationDate - this.minDate
				: null;
			const maxDateToItrationDate = this.maxDate
				? itrationDate - this.maxDate
				: null;
			const dateHoveredToItrationDate = this.state.dateHovered
				? itrationDate - this.state.dateHovered
				: null;
			const isInFlexibleDateRange =
				this.state.startDate &&
				this.state.flexibleDateRange &&
				Math.abs(startDateToItrationDateInDays) <=
					this.state.flexibleDateRange;
			const classNames = this.CONSTANTS.CLASS_NAMES;
			const itrationClassName1 =
				dayDate < 1
					? classNames.EMPTY
					: (this.minDate && minDateToItrationDate < 0) ||
					  (this.maxDate && maxDateToItrationDate > 0)
					? classNames.DISABLED
					: inBlackList === this.CONSTANTS.IN_BLACK_LIST
					? classNames.IN_BLACK_LIST
					: inBlackList === this.CONSTANTS.NEXT_TO_BLACK_LIST ||
					  (this.maxDate &&
							-maxDateToItrationDate > 0 &&
							-maxDateToItrationDate < this.selectedMSsInOneClick)
					? classNames.NEXT_TO_DISABLED
					: classNames.NORMAL;
			const itrationClassName2 =
				dayDate > 0 &&
				this.weekEnds.indexOf((i + this.firstDayInWeekShift) % 7) > -1
					? classNames.WEEK_END
					: null;
			const itrationClassName3 =
				dayDate > 0 && itrationDate - today === 0
					? classNames.TODAY
					: null;
			const itrationClassName4 =
				dayDate < 1
					? null
					: this.state.startDate && startDateToItrationDate === 0
					? this.isRangePicker
						? this.state.endDate
							? classNames.RANGE_START
							: classNames.RANGE_START_END
						: this.selectedDaysInOneClick === 1
						? classNames.SELECTION_START_END
						: classNames.SELECTION_START
					: this.state.endDate && endDateToItrationDate === 0
					? classNames.RANGE_END
					: this.state.endDate &&
					  startDateToItrationDate > 0 &&
					  endDateToItrationDate < 0
					? classNames.IN_RANGE
					: !this.isRangePicker &&
					  this.state.startDate &&
					  startDateToItrationDate > 0 &&
					  startDateToItrationDate < this.selectedMSsInOneClick
					? startDateToItrationDate ===
					  this.selectedMSsInOneClick - 86400000
						? classNames.SELECTION_END
						: classNames.IN_SELECTION
					: null;
			const itrationClassName5 =
				dayDate <= 0 ||
				!this.state.dateHovered ||
				dateHoveredToItrationDate > 0 ||
				startDateToItrationDate < 0
					? null
					: startDateToItrationDate === 0
					? classNames.HOVER_START
					: dateHoveredToItrationDate === 0
					? classNames.HOVER_END
					: classNames.IN_HOVER;
			let itrationClassName6 = !isInFlexibleDateRange
				? null
				: classNames.IN_FLEXIBLE_RANGE +
				  ' ' +
				  (startDateToItrationDateInDays > 0
						? classNames.IN_FLEXIBLE_RANGE_FROM_RIGHT +
						  ' ' +
						  classNames.IN_FLEXIBLE_RANGE_FROM_RIGHT +
						  '-' +
						  startDateToItrationDateInDays
						: startDateToItrationDateInDays < 0
						? classNames.IN_FLEXIBLE_RANGE_FROM_LEFT +
						  ' ' +
						  classNames.IN_FLEXIBLE_RANGE_FROM_LEFT +
						  '-' +
						  -startDateToItrationDateInDays
						: classNames.IN_FLEXIBLE_RANGE_CENTER) +
				  (startDateToItrationDateInDays ===
						this.state.flexibleDateRange &&
				  itrationClassName1 === classNames.NORMAL
						? ' ' + classNames.LAST_DAY_IN_FLEXIBLE_RANGE
						: '');
			if (
				itrationClassName6 &&
				itrationClassName1 === classNames.NORMAL &&
				!this.isFirstVisibleDayInFlexibleRangeRef.current &&
				itrationClassName6.indexOf(
					classNames.IN_FLEXIBLE_RANGE_FROM_LEFT
				) > -1
			) {
				this.isFirstVisibleDayInFlexibleRangeRef.current = true;
				itrationClassName6 +=
					' ' + classNames.FIRST_VISIBLE_DAY_IN_FLEXIBLE_RANGE;

				if (
					this.isFirstDayInFlexibleRangeRef.current ||
					startDateToItrationDateInDays ===
						-this.state.flexibleDateRange
				) {
					itrationClassName6 +=
						' ' + classNames.FIRST_DAY_IN_FLEXIBLE_RANGE;
				}
			}
			const dayLabel = ('0' + dayDate).slice(-2);
			const dayElement = (
				<div
					key={`day_${monthKey}_${dayDate}_${i}`}
					data-id={`grid-${dayLabel}`}
					tabIndex="-1"
					aria-disabled={
						!!itrationClassName1 &&
						itrationClassName1.indexOf(classNames.DISABLED) !== -1
					}
					aria-selected={
						!!itrationClassName4 &&
						itrationClassName4.indexOf('day-selection') !== -1
					}
					className={
						classNames.DAY +
						' ' +
						itrationClassName1 +
						(itrationClassName2 ? ' ' + itrationClassName2 : '') +
						(itrationClassName3 ? ' ' + itrationClassName3 : '') +
						(itrationClassName4 ? ' ' + itrationClassName4 : '') +
						(itrationClassName5 ? ' ' + itrationClassName5 : '') +
						(itrationClassName6 ? ' ' + itrationClassName6 : '')
					}
					onClick={() =>
						itrationClassName1 ===
							this.CONSTANTS.CLASS_NAMES.NORMAL &&
						this.dayClickHandler(itrationDate)
					}
					onMouseEnter={() =>
						itrationClassName1 ===
							this.CONSTANTS.CLASS_NAMES.NORMAL &&
						this.dayEnterHandler(itrationDate)
					}
					onMouseLeave={this.dayLeaveHandler}
				>
					{dayDate < 1
						? ''
						: this.dayTileTemplate
						? this.dayTileTemplate({
								startDate: this.cloneDate(this.state.startDate),
								endDate: this.cloneDate(this.state.endDate),
								shownMonth: this.cloneDate(
									this.state.shownMonth
								),
								dayDate: this.cloneDate(itrationDate),
								dayLabel: dayLabel,
						  })
						: dayLabel}
				</div>
			);
			if (
				itrationClassName6 &&
				itrationClassName1 === classNames.NORMAL &&
				itrationClassName6.indexOf(
					classNames.IN_FLEXIBLE_RANGE_FROM_RIGHT
				) > -1
			) {
				this.lastVisibleDayInFlexibleRangeRef.current = dayElement;
			}
			days.push(dayElement);
			this.isFirstDayInFlexibleRangeRef.current = true;
			if (i === firstDayInMonthPosition + daysInMonth - 1) {
				if (itrationClassName6) {
					this.isLastDayInFlexibleRangeRef.current = false;
				} else {
					this.isLastDayInFlexibleRangeRef.current = true;
				}
			}
		}
		return days;
	};

	createMonths = (today) => {
		const classNames = this.CONSTANTS.CLASS_NAMES;
		const shownYear = this.state.shownMonth.getFullYear();
		const shownMonth = this.state.shownMonth.getMonth();
		const months = [];
		this.isFirstVisibleDayInFlexibleRangeRef.current = false;
		this.isFirstDayInFlexibleRangeRef.current = false;
		this.lastVisibleDayInFlexibleRangeRef.current = null;
		this.isLastDayInFlexibleRangeRef.current = false;
		for (let i = 0; i < this.monthsInDatePicker; i++) {
			const monthDate = new Date(shownYear, shownMonth + i, 1);
			const monthKey = this.dateToString(monthDate, 'yyyy_m');
			if (!this.maxMonth || monthDate - this.maxMonth <= 0) {
				const days = this.createDays(shownYear, shownMonth + i, today);
				const monthLabel = this.dateToString(
					monthDate,
					this.headerDateFormat
				);
				months.push(
					<div
						data-index="1"
						className={classNames.MONTH_CONTAINER}
						key={`month_${monthKey}_${i}`}
						role="cell"
					>
						{!this.showTitleDropDown ? (
							<div className={classNames.MONTH_TITLE_CONTENT}>
								{monthLabel}
							</div>
						) : (
							<div className={classNames.MONTH_TITLE_CONTAINER}>
								<div
									tabIndex="0"
									role="combobox"
									aria-expanded={this.state.monthList === i}
									aria-label={monthLabel}
									className={
										classNames.MONTH_TITLE +
										' ' +
										(this.state.monthList === i
											? classNames.MONTH_TITLE_OPEN
											: classNames.MONTH_TITLE_CLOSED)
									}
									onClick={(e) =>
										this.monthTitleClickHandler(e, i)
									}
									onKeyDown={this.triggerClick}
								>
									<Fragment key="month-label">
										{monthLabel}
									</Fragment>
									<Fragment key="month-icon">
										{this.monthTitleDropDownIconTemplate &&
											this.monthTitleDropDownIconTemplate(
												{
													startDate: this.cloneDate(
														this.state.startDate
													),
													endDate: this.cloneDate(
														this.state.endDate
													),
													shownMonth: this.cloneDate(
														this.state.shownMonth
													),
													open:
														this.state.monthList ===
														i,
												}
											)}
									</Fragment>
								</div>
								{this.state.monthList === i && (
									<ul
										role="list"
										className={classNames.MONTH_LIST}
										ref={this.monthListContainer}
										data-id="month-list-selection"
									>
										{this.createMonthList(monthDate).map(
											(item, index) => (
												<li
													tabIndex="0"
													key={`month_${monthKey}_list_${this.dateToString(
														item.date,
														'yyyy_m'
													)}_${index}`}
													className={
														classNames.MONTH_LIST_ITEM +
														(item.selected
															? ' ' +
															  classNames.MONTH_LIST_ITEM_SELECTED
															: '')
													}
													onClick={() =>
														this.monthListItemClickHandler(
															item.date,
															i
														)
													}
													onKeyDown={
														this.triggerClick
													}
													ref={
														item.selected
															? this
																	.monthListSelectedItem
															: null
													}
												>
													{this.dateToString(
														item.date,
														this.headerDateFormat
													)}
												</li>
											)
										)}
									</ul>
								)}
							</div>
						)}
						<div className={classNames.DAY_NAMES_CONTAINER}>
							{this.shiftedDayNames.map((day, index) => (
								<div
									key={`day_name_${monthKey}_${day}_${index}`}
									className={
										classNames.DAY_NAME +
										(this.weekEnds.indexOf(
											(index + this.firstDayInWeekShift) %
												7
										) === -1
											? ''
											: ' ' +
											  classNames.DAY_NAME_WEEK_END)
									}
								>
									{day}
								</div>
							))}
						</div>
						<div
							className={classNames.DAYS_CONTAINER}
							tabIndex="0"
							role="table"
							data-index="1"
							data-id="days-container"
							onKeyDown={(e) => {
								const KEYCODE_TAB = 9;
								const isTabPressed =
									e.key === 'Tab' ||
									e.keyCode === KEYCODE_TAB;
								if (e.shiftKey || isTabPressed) {
									return;
								}
								const node =
									e.target.getAttribute('data-id') ===
									'days-container'
										? e.target
										: e.target.parentNode;
								let index = parseInt(
									node.getAttribute('data-index'),
									10
								);

								const length =
									node?.querySelectorAll(
										'.day:not(.day-empty)'
									)?.length || 0;
								if (e.key === 'ArrowDown') {
									index =
										index + 7 > length ? index : index + 7;
									e.preventDefault();
								} else if (e.key === 'ArrowUp') {
									index = index - 7 < 1 ? index : index - 7;
									e.preventDefault();
								} else if (e.key === 'ArrowRight') {
									index =
										index + 1 > length ? index : index + 1;
								} else if (e.key === 'ArrowLeft') {
									index = index < 2 ? index : index - 1;
								}

								const position =
									index < 10 ? '0' + index : '' + index;
								node.setAttribute('data-index', index + '');
								node.querySelector(
									'div[data-id="grid-' + position + '"]'
								).focus();
								if (e.key === 'Enter' || e.key === ' ') {
									node.querySelector(
										'div[data-id="grid-' + position + '"]'
									).click();
								}
							}}
						>
							{days}
						</div>
					</div>
				);
			}
		}
		if (this.lastVisibleDayInFlexibleRangeRef.current) {
			this.lastVisibleDayInFlexibleRangeRef.current.props.className +=
				' ' + classNames.LAST_VISIBLE_DAY_IN_FLEXIBLE_RANGE;

			if (
				this.isLastDayInFlexibleRangeRef.current &&
				this.lastVisibleDayInFlexibleRangeRef.current.props.className.indexOf(
					classNames.LAST_DAY_IN_FLEXIBLE_RANGE
				) === -1
			) {
				this.lastVisibleDayInFlexibleRangeRef.current.props.className +=
					' ' + classNames.LAST_DAY_IN_FLEXIBLE_RANGE;
			}
		}
		return months;
	};

	trapFocus = (element, customFn = undefined) => {
		element.addEventListener('keydown', (e) => {
			const KEYCODE_TAB = 9;
			const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
			const focusableEls = element.querySelectorAll(
				'[tabIndex="0"]:not([disabled]):not([aria-disabled]), [tabIndex="1"]:not([disabled]):not([aria-disabled])'
			);
			const firstFocusableEl = focusableEls[0];
			const lastFocusableEl = focusableEls[focusableEls.length - 1];

			typeof customFn === 'function' && customFn(e);

			if (!isTabPressed) {
				return;
			}

			if (e.shiftKey) {
				/* shift + tab */ if (
					document.activeElement === firstFocusableEl
				) {
					lastFocusableEl.focus();
					e.preventDefault();
				}
			} /* tab */ else {
				if (document.activeElement === lastFocusableEl) {
					firstFocusableEl.focus();
					e.preventDefault();
				}
			}
		});
	};

	render() {
		// Update props
		const today = this.toBeginningOfDay(new Date());
		const props = this.props;
		Object.keys(props).forEach((key) => {
			switch (key) {
				case 'inputPlaceholder':
				case 'inputLabel':
				case 'backButtonLabel':
				case 'nextButtonLabel':
				case 'flexibleDateTitle':
				case 'flexibleDateSelectButtonLabel':
					this[key] =
						typeof props[key] === 'string' ? props[key] : this[key];
					break;
				case 'weekEnds':
					this[key] = this.getWeekEnds(props[key]);
					break;
				case 'monthNames':
					this[key] = this.isArrayOfStrings(props[key], 12)
						? props[key].slice(0, 12)
						: this[key];
					break;
				case 'dayNames':
					this[key] = this.isArrayOfStrings(props[key], 7)
						? props[key].slice(0, 7)
						: this[key];
					this.shiftedDayNames = this[key]
						.slice(this.firstDayInWeekShift)
						.concat(this[key].slice(0, this.firstDayInWeekShift))
						.map((name) => name.slice(0, this.dayNameLength));
					break;
				case 'dayNameLength':
					this[key] =
						typeof props[key] !== 'number'
							? this[key]
							: Math.max(Math.round(props[key]), 1);
					this.shiftedDayNames = this.dayNames
						.slice(this.firstDayInWeekShift)
						.concat(
							this.dayNames.slice(0, this.firstDayInWeekShift)
						)
						.map((name) => name.slice(0, this[key]));
					break;
				case 'firstDayInWeekShift':
					this[key] =
						typeof props[key] !== 'number'
							? this[key]
							: Math.min(Math.max(Math.round(props[key]), 0), 6);
					this.shiftedDayNames = this.dayNames
						.slice(this[key])
						.concat(this.dayNames.slice(0, this[key]))
						.map((name) => name.slice(0, this.dayNameLength));
					break;
				case 'firstMonthInMonthsDropDown':
					this[key] = this.isDate(props[key])
						? this.toBeginningOfMonth(props[key])
						: this.toBeginningOfMonth(today);
					const _lastMonthInMonthsDropDown =
						typeof props.lastMonthInMonthsDropDown === 'undefined'
							? this.lastMonthInMonthsDropDown
							: props.lastMonthInMonthsDropDown;
					this.lastMonthInMonthsDropDown =
						this.isDate(_lastMonthInMonthsDropDown) &&
						_lastMonthInMonthsDropDown - this[key] >= 0
							? this.toBeginningOfMonth(
									_lastMonthInMonthsDropDown
							  )
							: this[key];
					break;
				case 'inputDateFormat':
				case 'headerDateFormat':
				case 'datePickerRangeFormat':
					this[key] = this.isValidDateFormat(props[key])
						? props[key]
						: this[key];
					break;
				case 'onSelect':
				case 'onToggle':
				case 'onMonthChange':
				case 'inputTemplate':
				case 'inputClearButtonTemplate':
				case 'footerTemplate':
				case 'previousButtonTemplate':
				case 'nextButtonTemplate':
				case 'monthTitleDropDownIconTemplate':
				case 'dayTileTemplate':
				case 'inputPlaceholderIconTemplate':
					this[key] =
						typeof props[key] === 'function'
							? props[key]
							: this[key];
					break;
				case 'isPopUp':
				case 'showDateRangeDetails':
				case 'showTitleDropDown':
				case 'showInputLabel':
				case 'selectedDateCanBeOutOfAllowedRange':
				case 'isFlexibleDate':
					this[key] = !!props[key];
					break;
				case 'isRangePicker':
					this[key] = !!props[key];
					this.selectedDaysInOneClick = !this[key]
						? Math.max(
								Math.round(
									typeof props.selectedDaysInOneClick ===
										'number'
										? props.selectedDaysInOneClick
										: this.selectedDaysInOneClick
								),
								1
						  )
						: 1;
					this.selectedMSsInOneClick =
						this.selectedDaysInOneClick * 86400000;
					break;
				case 'monthsInDatePicker':
					this[key] =
						typeof props[key] !== 'number'
							? this[key]
							: Math.max(Math.round(props[key]), 1);
					this.monthStep = Math.min(
						Math.max(
							Math.round(
								typeof props.monthStep !== 'number'
									? this.monthStep
									: props.monthStep
							),
							1
						),
						this[key]
					);
					break;
				case 'blackList':
					this[key] = this.isValidBlackList(props[key])
						? props[key].map((item) =>
								this.isDate(item)
									? this.toBeginningOfDay(item)
									: {
											start: this.toBeginningOfDay(
												item.start
											),
											end: this.toBeginningOfDay(
												item.end
											),
									  }
						  )
						: [];
					break;
				case 'minDate':
					this[key] = this.isDate(props[key])
						? this.toBeginningOfDay(props[key])
						: null;
					this.minMonth = this[key]
						? this.toBeginningOfMonth(this[key])
						: null;
					const _maxDate =
						typeof props.maxDate === 'undefined'
							? this.maxDate
							: props.maxDate;
					this.maxDate =
						!this.isDate(_maxDate) ||
						(this[key] && _maxDate - this[key] < 0)
							? null
							: this.toBeginningOfDay(_maxDate);
					this.maxMonth = this.maxDate
						? this.toBeginningOfMonth(this.maxDate)
						: null;
					break;
			}
		});
		Object.keys(props).forEach((key) => {
			switch (key) {
				case 'lastMonthInMonthsDropDown':
					this[key] =
						this.isDate(props[key]) &&
						props[key] - this.firstMonthInMonthsDropDown >= 0
							? this.toBeginningOfMonth(props[key])
							: this.firstMonthInMonthsDropDown;
					break;
				case 'monthStep':
					this[key] = Math.min(
						Math.max(
							Math.round(
								props[key] === 'number' ? props[key] : this[key]
							),
							1
						),
						this.monthsInDatePicker
					);
					break;
				case 'selectedDaysInOneClick':
					this[key] = !this.isRangePicker
						? Math.max(
								Math.round(
									typeof props[key] === 'number'
										? props[key]
										: this[key]
								),
								1
						  )
						: 1;
					this.selectedMSsInOneClick = this[key] * 86400000;
					break;
				case 'maxDate':
					this[key] =
						!this.isDate(props[key]) ||
						(this.minDate && props[key] - this.minDate < 0)
							? null
							: this.toBeginningOfDay(props[key]);
					this.maxMonth = this[key]
						? this.toBeginningOfMonth(this[key])
						: null;
					break;
				case 'flexibleDateRanges':
					this[key] =
						!this.isFlexibleDate ||
						!this.isArrayOfNumbers(props[key])
							? []
							: props[key];
					this.flexibleDateRangesLabels =
						this.getFlexibleDateRangesLabels(
							props.flexibleDateRangesLabels
						);
					break;
			}
		});
		Object.keys(props).forEach((key) => {
			if (key.indexOf('aria-') !== -1) {
				this[key] = props[key];
			} else if (key === 'flexibleDateRangesLabels') {
				this[key] = this.getFlexibleDateRangesLabels(props[key]);
			}
		});

		const classNames = this.CONSTANTS.CLASS_NAMES;
		const disablePreviousBTN =
			this.minMonth && this.state.shownMonth - this.minMonth <= 0;
		const disableNextBTN =
			this.maxMonth &&
			new Date(
				this.state.shownMonth.getFullYear(),
				this.state.shownMonth.getMonth() + this.monthsInDatePicker - 1,
				1
			) -
				this.maxMonth >=
				0;
		const selectedEnd = this.isFlexibleDate
			? null
			: this.isRangePicker
			? this.state.endDate
			: this.state.startDate && this.selectedDaysInOneClick > 1
			? new Date(
					this.state.startDate.getFullYear(),
					this.state.startDate.getMonth(),
					this.state.startDate.getDate() +
						this.selectedDaysInOneClick -
						1
			  )
			: null;

		// const highestZIndex = this.getHighestZIndex();
		const ariaProperties = {
			...(this['aria-label'] ? { 'aria-label': this['aria-label'] } : {}),
			...(this['aria-describedby']
				? { 'aria-describedby': this['aria-describedby'] }
				: {}),
		};

		return (
			<div
				className={classNames.DATE_PICKER_CONTAINER}
				{...ariaProperties}
			>
				{this.isPopUp && (
					<div
						className={
							classNames.DATE_PICKER_INPUT +
							' ' +
							(this.state.startDate
								? classNames.DATE_PICKER_INPUT_NOT_EMPTY
								: classNames.DATE_PICKER_INPUT_EMPTY)
						}
						tabIndex="0"
						onKeyDown={this.triggerClick}
						onClick={this.datePickerToggle}
						ref={this.datePickerButton}
					>
						{this.showInputLabel && (
							<div className={classNames.DATE_PICKER_INPUT_LABEL}>
								{this.inputLabel}
							</div>
						)}
						<div
							className={classNames.DATE_PICKER_INPUT_PLACEHOLDER}
						>
							<Fragment key="input-text">
								{!this.state.startDate &&
								!this.state.flexibleDateRange ? (
									<Fragment key="input-placeholder-text">
										{this.inputPlaceholder}
									</Fragment>
								) : !!this.inputTemplate ? (
									<Fragment key="input-template-text">
										{this.inputTemplate({
											startDate: this.cloneDate(
												this.state.startDate
											),
											endDate:
												this.cloneDate(selectedEnd),
											shownMonth: this.cloneDate(
												this.state.shownMonth
											),
											flexibleDateRange:
												this.state.flexibleDateRange,
										})}
									</Fragment>
								) : (
									<Fragment key="input-format-text">
										{this.state.startDate && (
											<span key="input-date-format-text">
												{this.createDateString(
													this.inputDateFormat,
													this.state.startDate,
													selectedEnd
												)}
											</span>
										)}
										{!!this.state.flexibleDateRange && (
											<span key="input-range-format-text">
												{' '}
												(&#177;
												{this.state.flexibleDateRange})
											</span>
										)}
									</Fragment>
								)}
							</Fragment>
							<Fragment key="input-icon">
								{this.inputPlaceholderIconTemplate &&
									this.inputPlaceholderIconTemplate({
										isOpen: this.state.isVisible,
										startDate: this.cloneDate(
											this.state.startDate
										),
										endDate: this.cloneDate(selectedEnd),
										shownMonth: this.cloneDate(
											this.state.shownMonth
										),
										flexibleDateRange:
											this.state.flexibleDateRange,
									})}
							</Fragment>
						</div>
						{this.inputClearButtonTemplate && (
							<div
								className={
									classNames.INPUT_BUTTON +
									(this.state.startDate
										? ''
										: ' ' +
										  classNames.INPUT_BUTTON_NO_DEATE) +
									(this.state.flexibleDateRange
										? ''
										: ' ' +
										  classNames.INPUT_BUTTON_NO_RANGE) +
									(this.state.startDate ||
									this.state.flexibleDateRange
										? ''
										: ' ' +
										  classNames.INPUT_BUTTON_DISABLED)
								}
								onClick={this.inputClearClickHandler}
							>
								{this.inputClearButtonTemplate({
									startDate: this.cloneDate(
										this.state.startDate
									),
									endDate: this.isFlexibleDate
										? null
										: this.cloneDate(this.state.endDate),
									shownMonth: this.cloneDate(
										this.state.shownMonth
									),
									flexibleDateRange:
										this.state.flexibleDateRange,
								})}
							</div>
						)}
					</div>
				)}
				{(!this.isPopUp || this.state.isVisible) && (
					<div
						role="dialog"
						aria-modal="true"
						data-id="date-picker-dialog"
						className={classNames.DATE_PICKER}
						onClick={this.datePickerClickHandler}
						style={this.isPopUp ? { zIndex: 16777271 } : {}}
						ref={this.datePickerPopUp}
					>
						<div
							className={
								classNames.BTN_PREVIOUS +
								(disablePreviousBTN
									? ' ' + classNames.BTN_DISABLED
									: '')
							}
							tabIndex="0"
							role="button"
							aria-label={this.backButtonLabel}
							aria-disabled={disablePreviousBTN || undefined}
							onClick={
								disablePreviousBTN
									? null
									: () =>
											this.monthShiftHandler(
												-this.monthStep
											)
							}
							onKeyDown={this.triggerClick}
						>
							{!this.previousButtonTemplate
								? 'Previous'
								: this.previousButtonTemplate({
										startDate: this.cloneDate(
											this.state.startDate
										),
										endDate: this.cloneDate(
											this.state.endDate
										),
										shownMonth: this.cloneDate(
											this.state.shownMonth
										),
								  })}
						</div>
						<div
							className={
								classNames.BTN_NEXT +
								(disableNextBTN
									? ' ' + classNames.BTN_DISABLED
									: '')
							}
							tabIndex="0"
							role="button"
							aria-label={this.nextButtonLabel}
							aria-disabled={disableNextBTN || undefined}
							onClick={
								disableNextBTN
									? null
									: () =>
											this.monthShiftHandler(
												this.monthStep
											)
							}
							onKeyDown={this.triggerClick}
						>
							{!this.nextButtonTemplate
								? 'Next'
								: this.nextButtonTemplate({
										startDate: this.cloneDate(
											this.state.startDate
										),
										endDate: this.cloneDate(
											this.state.endDate
										),
										shownMonth: this.cloneDate(
											this.state.shownMonth
										),
								  })}
						</div>
						<div className={classNames.MONTHS_CONTAINER}>
							{this.createMonths(today)}
						</div>
						{this.isFlexibleDate && (
							<div
								className={
									classNames.FLEXIBLE_DATE_CONTAINER +
									(this.state.startDate
										? ''
										: ' ' +
										  classNames.FLEXIBLE_DATE_CONTAINER_DISABLED)
								}
							>
								<div
									className={
										classNames.FLEXIBLE_DATE_TITLE_CONTAINER +
										(this.state.startDate
											? ''
											: ' ' +
											  classNames.FLEXIBLE_DATE_TITLE_CONTAINER_DISABLED)
									}
								>
									{this.flexibleDateTitle}
								</div>
								<div
									className={
										classNames.FLEXIBLE_DATE_BUTTONS_CONTAINER +
										(this.state.startDate
											? ''
											: ' ' +
											  classNames.FLEXIBLE_DATE_BUTTONS_CONTAINER_DISABLED)
									}
								>
									{this.flexibleDateRanges.map(
										(range, index) => (
											<button
												type="button"
												key={
													'flexible-button-' +
													index +
													'-' +
													range
												}
												className={
													classNames.FLEXIBLE_DATE_BUTTON +
													(this.state
														.flexibleDateRange ===
													range
														? ' ' +
														  classNames.FLEXIBLE_DATE_BUTTON_SELECTED
														: '')
												}
												onClick={() => {
													const flexibleDateRange =
														this.state
															.flexibleDateRange ===
														range
															? 0
															: range;
													this.setState({
														flexibleDateRange:
															flexibleDateRange,
													});
													if (this.onSelect) {
														this.onSelect({
															startDate:
																this.cloneDate(
																	this.state
																		.startDate
																),
															endDate:
																this.cloneDate(
																	this.state
																		.endDate
																),
															shownMonth:
																this.cloneDate(
																	this.state
																		.shownMonth
																),
															flexibleDateRange:
																flexibleDateRange,
														});
													}
												}}
											>
												{
													this
														.flexibleDateRangesLabels[
														index
													]
												}
											</button>
										)
									)}
								</div>
								<button
									type="button"
									className={
										classNames.FLEXIBLE_DATE_SELECT_BUTTON
									}
									onClick={this.selectFlexibleDate}
								>
									{this.flexibleDateSelectButtonLabel}
								</button>
							</div>
						)}
						{this.footerTemplate && (
							<div className={classNames.FOOTER_CONTAINER}>
								{this.footerTemplate({
									startDate: this.cloneDate(
										this.state.startDate
									),
									endDate: this.cloneDate(this.state.endDate),
									shownMonth: this.cloneDate(
										this.state.shownMonth
									),
								})}
							</div>
						)}
						{this.showDateRangeDetails && (
							<div
								className={classNames.DATE_PICKER_RANGE_DETAILS}
							>
								{!this.state.startDate
									? ''
									: this.createDateString(
											this.datePickerRangeFormat,
											this.state.startDate,
											selectedEnd
									  )}
							</div>
						)}
						<span
							tabIndex="0"
							onFocus={() => {
								const element = document.querySelector(
									'[data-id="date-picker-dialog"]'
								);
								element?.focus();
							}}
						></span>
					</div>
				)}
			</div>
		);
	}
}

DatePicker.propTypes = {
	isPopUp: PropTypes.bool,
	isRangePicker: PropTypes.bool,
	showDateRangeDetails: PropTypes.bool,
	showTitleDropDown: PropTypes.bool,
	showInputLabel: PropTypes.bool,
	selectedDateCanBeOutOfAllowedRange: PropTypes.bool,
	isFlexibleDate: PropTypes.bool,
	monthsInDatePicker: PropTypes.number,
	monthStep: PropTypes.number,
	selectedDaysInOneClick: PropTypes.number,
	firstDayInWeekShift: PropTypes.number,
	dayNameLength: PropTypes.number,
	flexibleDateRange: PropTypes.number,
	flexibleDateRanges: PropTypes.arrayOf(PropTypes.number),
	flexibleDateRangesLabels: PropTypes.arrayOf(PropTypes.string),
	weekEnds: PropTypes.arrayOf(PropTypes.number),
	inputDateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	headerDateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	datePickerRangeFormat: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
	flexibleDateTitle: PropTypes.string,
	inputPlaceholder: PropTypes.string,
	inputLabel: PropTypes.string,
	nextButtonLabel: PropTypes.string,
	backButtonLabel: PropTypes.string,
	flexibleDateSelectButtonLabel: PropTypes.string,
	dayNames: PropTypes.arrayOf(PropTypes.string),
	monthNames: PropTypes.arrayOf(PropTypes.string),
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	shownMonth: PropTypes.instanceOf(Date),
	firstMonthInMonthsDropDown: PropTypes.instanceOf(Date),
	lastMonthInMonthsDropDown: PropTypes.instanceOf(Date),
	blackList: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.shape({
				start: PropTypes.instanceOf(Date),
				end: PropTypes.instanceOf(Date),
			}),
		])
	),
	inputTemplate: PropTypes.func,
	inputClearButtonTemplate: PropTypes.func,
	footerTemplate: PropTypes.func,
	previousButtonTemplate: PropTypes.func,
	nextButtonTemplate: PropTypes.func,
	monthTitleDropDownIconTemplate: PropTypes.func,
	dayTileTemplate: PropTypes.func,
	onSelect: PropTypes.func,
	onToggle: PropTypes.func,
	onMonthChange: PropTypes.func,
	inputPlaceholderIconTemplate: PropTypes.func,
};

export default DatePicker;
