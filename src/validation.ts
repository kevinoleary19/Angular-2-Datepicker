export interface DateFormatFunction {
    (date: Date): string;
}

export interface ValidationResult {
    [key: string]: boolean;
}