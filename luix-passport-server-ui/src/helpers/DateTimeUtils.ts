import dayjs from 'dayjs';
import type { DateTimeFormat } from '@/domain/DateTimeFormat';

export const defaultDateTimeFormat = "1";
export const dateTimeFormats: Array<DateTimeFormat> = [
  { id: '1', dateTimeFormat: 'YYYY-MM-DD HH:mm:ss', dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm:ss', sample: '2021-09-10 10:15:00' },
  { id: '2', dateTimeFormat: 'DD MMM YYYY, HH:mm A', dateFormat: 'DD MMM YYYY', timeFormat: 'HH:mm A', sample: '10 Sep 2021, 10:15 AM' },
  { id: '3', dateTimeFormat: 'DD/MM/YYYY, HH:mm A', dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm A', sample: '10/09/2021, 10:15 AM' },
  { id: '4', dateTimeFormat: 'MMM DD, YYYY HH:mm a', dateFormat: 'MMM DD, YYYY', timeFormat: 'HH:mm a', sample: 'Sep 10, 2021 10:15 am' },
];

// https://day.js.org/docs/en/timezone/set-default-timezone
export class DateTimeUtils {

    public static iso8601DateTimeFormat = "yyyy-MM-dd'T'HH:mm:ss";
    public static defaultTimeZone = "Asia/Shanghai";

    constructor() {
    }

    public static setDateTimeFormatId(formatId: string): void {
        localStorage.setItem("date_time_format_id", formatId);
    }

    public static getCurrentDateTimeFormat(): string {
        const formatId = DateTimeUtils.getCurrentDateTimeFormatId();
        return dateTimeFormats.find(item => item.id === formatId)?.dateTimeFormat as string;
    }

    public static getCurrentDateFormat(): string {
      const formatId = DateTimeUtils.getCurrentDateTimeFormatId();
      return dateTimeFormats.find(item => item.id === formatId)?.dateFormat as string;
    }

    public static getCurrentTimeFormat(): string {
      const formatId = DateTimeUtils.getCurrentDateTimeFormatId();
      return dateTimeFormats.find(item => item.id === formatId)?.timeFormat as string;
    }

    public static getCurrentDateTimeFormatId(): string {
      return localStorage.getItem("date_time_format_id") 
      ? (localStorage.getItem("date_time_format_id") as string) 
      : defaultDateTimeFormat;
    }

    public static setTimeZone(timeZone: string): void {
        localStorage.setItem("time_zone", timeZone);
    }

    public static getCurrentTimeZone(): string {
        return localStorage.getItem("time_zone") 
        ? (localStorage.getItem("time_zone") as string) 
        : DateTimeUtils.defaultTimeZone;
    }

   /**
   * @description format date time with the specified format
   */
  public static formatDateTime(value: string): string {
    if (!value) {
      return '';
    }
    return dayjs(value).tz(DateTimeUtils.getCurrentTimeZone()).format(DateTimeUtils.getCurrentDateTimeFormat());
  }

  /**
   * @description format date 
   */
  public static formatDate(value: string, format: string): string {
    if (!value) {
      return '';
    }
    return dayjs(value).tz(DateTimeUtils.getCurrentTimeZone()).format(format);
  }

  /**
   * @description format date 
   */
  public static formatDuration(value: string): string {
    if (!value) {
      return '';
    }
    const formatted = dayjs.duration(value).humanize();
    if (formatted) {
      return formatted;
    }
    return value;
  }

  /**
   * @description 
   */
  public static getTime(timeVal: number, timeUnit: string): string {
    // get last character
    let unit = timeUnit.slice(-1);
    let scale = timeUnit.slice(0, -1);
    if(+scale > 0) {
      return timeVal * + scale + unit;  
    } else {
      return timeVal + timeUnit;
    } 
  }
}