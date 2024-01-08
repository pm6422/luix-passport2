import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
// import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import 'dayjs/locale/en';

export default class DayjsConfig {

  public static init() {
    // DAYJS CONFIGURATION
    // dayjs.extend(customParseFormat);
    // dayjs.extend(localizedFormat);
    // dayjs.extend(relativeTime);


    dayjs.extend(utc);
    dayjs.extend(timezone);
  }
}
