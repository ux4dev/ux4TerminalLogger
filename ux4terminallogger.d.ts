/** Declaration file generated by dts-gen */

export = ux4terminallogger;

interface Font {
    bg_blue: string;
    bg_cyan: string;
    bg_green: string;
    bg_magenta: string;
    bg_red: string;
    bg_white: string;
    bg_yellow: string;
    bold_off: string;
    bold_on: string;
    cls: string;
    fg_black: string;
    fg_blue: string;
    fg_cyan: string;
    fg_green: string;
    fg_magenta: string;
    fg_white: string;
    fg_yellow: string;
    inverse_on: string;
    moveback1char: string;
    moveback1line: string;
    reset: string;
}

declare const ux4terminallogger: {
    Font: Font;
    Log: {
        streamToFile(filename: string): void;
        endStream(color: Font): void;
        writeToFile(text: string): void;
        applyStyle(color: Font): any;
        applyStyle(color: Font): any;
        cls(): any;
        debug(text: string, color: Font): any;
        disableColor(): any;
        fail(text: string): any;
        info(text: string): any;
        lf(): any;
        majorError(text: string): any;
        showDebug: boolean;
        success(text: string): any;
        title(text: string, color: Font): any;
        warn(text: string): any;
    };
};

