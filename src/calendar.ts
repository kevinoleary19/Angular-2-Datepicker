/*!
 * calendar: a port of the calendar module from Python
 * Copyright(c) 2011 Luciano Ramalho <luciano@ramalho.org>
 * MIT Licensed
 */

// const CalendarException = message => {
//    this.message = message;
//    this.toString = function() {
//        return this.message
//    };
// }

export class Calendar {
    firstWeekDay: number;

    constructor(firstWeekDay = 0) {
        this.firstWeekDay = firstWeekDay; // 0 = Sunday
    }

    weekStartDate(date) {
        var startDate = new Date(date.getTime());
        while (startDate.getDay() !== this.firstWeekDay) {
            startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
    }

    monthDates(year, month, dayFormatter = null, weekFormatter = null) {
        if ((typeof year !== "number") || (year < 1970)) {
            throw ('year must be a number >= 1970');
        };
        if ((typeof month !== "number") || (month < 0) || (month > 11)) {
            throw ('month must be a number (Jan is 0)');
        };
        var weeks = [],
            week = [],
            i = 0,
            date = this.weekStartDate(new Date(year, month, 1));
        do {
            for (i=0; i<7; i++) {
                week.push(dayFormatter ? dayFormatter(date) : date);
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            weeks.push(weekFormatter ? weekFormatter(week) : week);
            week = [];
        } while ((date.getMonth()<=month) && (date.getFullYear()===year));
        return weeks;
    }

    monthDays(year, month) {
        var getDayOrZero = function getDayOrZero(date) {
            return date.getMonth() === month ? date : 0;
        };
        return this.monthDates(year, month, getDayOrZero);
    }

    monthText(year, month) {
        if (typeof year === "undefined") {
            var now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
        };
        var getDayOrBlank = function getDayOrBlank(date) {
            var s = date.getMonth() === month ? date.getDate().toString() : "  ";
            while (s.length < 2) s = " "+s;
            return s;
        };
        var weeks = this.monthDates(year, month, getDayOrBlank,
            function (week) { return week.join(" ") });
        return weeks.join("\n");
    }
}

const months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
for (var i=0; i<months.length; i++) {
    Calendar[months[i]] = i;
}
