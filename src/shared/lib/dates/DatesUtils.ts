import { ICall, IFilterCalls } from '@/entities/Calls/model/types/ICallType';

interface IStartEndDate {
    start: number;
    end: number;
}

type DateFilters = '3 дня' | 'Неделя' | 'Месяц' | 'Год' | 'Даты';

class DatesUtils {
    static oneDayMilliseconds: number = 24 * 60 * 60 * 1000;

    private static addZeroToDate(str: string): string {
        return str.length < 2 ? `0${str}` : str;
    }

    static getFetchDate(date: number): string {
        const now = new Date(date);

        const nowDay = now.getDate().toString();
        const nowMonth = (now.getMonth() + 1).toString();
        const nowYear = now.getFullYear().toString();

        return [
            nowYear,
            this.addZeroToDate(nowMonth),
            this.addZeroToDate(nowDay),
        ].join('-');
    }

    static getFormatDate(date: string): string {
        const now = new Date(date);
        const result = now.toLocaleString('default', {
            day: 'numeric',
            month: 'long',
        });
        return result[0].toUpperCase() + result.slice(1);
    }

    static getViewDate(date: number): string {
        const now = new Date(date);

        const nowDay = now.getDate().toString();
        const nowMonth = (now.getMonth() + 1).toString();
        const nowYear = now.getFullYear().toString().slice(2);

        return [
            this.addZeroToDate(nowDay),
            this.addZeroToDate(nowMonth),
            nowYear,
        ].join('.');
    }

    static getYesterdayDate(date: number): string {
        const yesterday = new Date(date - this.oneDayMilliseconds);

        const nowDay = yesterday.getDate().toString();
        const nowMonth = (yesterday.getMonth() + 1).toString();
        const nowYear = yesterday.getFullYear().toString();

        return [
            nowYear,
            this.addZeroToDate(nowMonth),
            this.addZeroToDate(nowDay),
        ].join('-');
    }

    static getThreeDays(date: number): IStartEndDate {
        return {
            start: date - 2 * this.oneDayMilliseconds,
            end: date,
        };
    }

    static getWeek(date: number): IStartEndDate {
        const nowDay = new Date(date).getDay() ? new Date(date).getDay() : 7;
        const endWeek = 7 - nowDay;
        const startWeek = nowDay - 1;

        return {
            start: date - startWeek * this.oneDayMilliseconds,
            end: date + endWeek * this.oneDayMilliseconds,
        };
    }

    static getMonth(date: number): IStartEndDate {
        const now = new Date(date);
        const nowMonth = now.getMonth() + 1;
        const nowYear = now.getFullYear();
        const nowEndDay = new Date(nowYear, nowMonth, 0).getTime();

        const startStrMonth = [nowYear, nowMonth, '01'].join('-');
        const endStrMonth = [nowYear, nowMonth, nowEndDay].join('-');

        return {
            start: new Date(startStrMonth).getTime(),
            end: new Date(endStrMonth).getTime(),
        };
    }

    static getYear(date: number): IStartEndDate {
        const now = new Date(date);
        const nowYear = now.getFullYear();
        const nowEndDay = new Date(nowYear, 12, 0).getDate();

        const startStrYear = [nowYear, '01', '01'].join('-');
        const endStrYear = [nowYear, '12', nowEndDay].join('-');

        return {
            start: new Date(startStrYear).getTime(),
            end: new Date(endStrYear).getTime(),
        };
    }

    static getFirstDaysMonth(date: number): number {
        const now = new Date(date);
        const nowMonth = now.getMonth() + 1;
        const nowYear = now.getFullYear();

        const firstStrDaysMonth = [nowYear, nowMonth, '01'].join('-');

        return new Date(firstStrDaysMonth).getTime();
    }

    static getLastDaysMonth(date: number): number {
        const now = new Date(date);
        const nowMonth = now.getMonth() + 1;
        const nowYear = now.getFullYear();
        const nowEndDay = new Date(nowYear, nowMonth, 0).getDate();

        const lastStrDaysMonth = [nowYear, nowMonth, nowEndDay].join('-');

        return new Date(lastStrDaysMonth).getTime();
    }

    static getYearsByDate(date: number, year: number): IStartEndDate {
        const now = new Date(date);
        const nowYear = now.getFullYear() + year;

        const startStrYear = [nowYear, '01', '01'].join('-');
        const endStrYear = [nowYear, '12', '31'].join('-');

        return {
            start: new Date(startStrYear).getTime(),
            end: new Date(endStrYear).getTime(),
        };
    }

    static getMinutesFromSeconds(seconds: number): string | number {
        if (!seconds) return 0;

        const minute = Math.floor(seconds / 60);
        const second = minute > 0 ? seconds - minute * 60 : seconds;

        return [minute.toString(), this.addZeroToDate(second.toString())].join(
            ':',
        );
    }

    static getTimeByDate(date: Date): string {
        const dateStr = date.toString();
        const nowTime = dateStr.split(' ')[1].split(':');

        return [nowTime[0], nowTime[1]].join(':');
    }

    static getFormatByCalls(calls: ICall[]): IFilterCalls[] {
        const dates = new Set<string>();
        const formatedCalls: IFilterCalls[] = [];

        calls.forEach((call: ICall) => {
            dates.add(call.date_notime);
        });

        Array.from(dates).map((date: string) => {
            const newFilterCall: IFilterCalls = {
                calls: [],
                date: '',
            };
            newFilterCall.calls = calls.filter(
                (call: ICall) => date === call.date_notime,
            );
            newFilterCall.date = date;

            formatedCalls.push(newFilterCall);
        });

        return formatedCalls;
    }

    static validDay(day: number): boolean {
        return day > 0 && day < 32 && !isNaN(day);
    }

    static validMonth(month: number): boolean {
        return month > 0 && month < 13 && !isNaN(month);
    }

    static validYear(year: number): boolean {
        return (
            year > 2000 && year < new Date().getFullYear() + 1 && !isNaN(year)
        );
    }

    static validDateWithDot(date: string): boolean {
        const splitDate = date.split('.');
        return (
            this.validDay(parseInt(splitDate[0])) &&
            this.validMonth(parseInt(splitDate[1])) &&
            this.validYear(parseInt(splitDate[2]))
        );
    }

    static validDateWithDash(date: string): boolean {
        const splitDate = date.split('-');
        return (
            this.validDay(parseInt(splitDate[0])) &&
            this.validMonth(parseInt(splitDate[1])) &&
            this.validYear(parseInt(splitDate[2]))
        );
    }
}

export { DatesUtils };
export type { DateFilters, IStartEndDate };
