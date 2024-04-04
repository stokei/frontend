export interface FormatNumber {
  (value: number): string | undefined;
}

export interface FormatMessage<TKeys> {
  ({ id }: { id: TKeys }, values?: Record<string, any>): string;
}

export interface FormatMoney {
  ({
    currency,
    amount,
    minorUnit,
    showSymbol,
  }: {
    currency: string;
    amount: number;
    minorUnit?: number;
    showSymbol?: boolean;
  }): string;
}

export interface FormatDate {
  (
    date: Parameters<Intl.DateTimeFormat["format"]>[0] | string,
    options?: Intl.DateTimeFormatOptions & {
      format?: string;
      fullDate?: boolean;
    }
  ): string | undefined;
}

export interface FormatTime {
  (seconds: number): string | undefined;
}

export interface FormatDateTime {
  (
    time: Parameters<Intl.DateTimeFormat["format"]>[0] | string,
    options?: Intl.DateTimeFormatOptions & { format?: string }
  ): string | undefined;
}

export interface FormatMoneyToNumber {
  (money: string): number;
}

export interface Translations<TKeys = string> {
  locale: string;
  formatNumber: FormatNumber;
  formatMessage: FormatMessage<TKeys>;
  formatMoney: FormatMoney;
  formatDate: FormatDate;
  formatTime: FormatTime;
  formatDateTime: FormatDateTime;
  formatMoneyToNumber: FormatMoneyToNumber;
}
