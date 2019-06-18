/**
 * Color Control codes
 * @typedef {Object} Font
 * @property {string} bold_on - Bold text
 * @property {string} reset - Reset text formatting
 * @property {string} inverse_on - Inverse the fg and bg colors
 * @property {string} bold_off - Disable bold text
 * @property {string} fg_black - Black text
 * @property {string} fg_red - Red text
 * @property {string} fg_green - Green text
 * @property {string} fg_yellow - Yellow text
 * @property {string} fg_blue - Blue text
 * @property {string} fg_magenta - Magenta text
 * @property {string} fg_cyan - Cyan text
 * @property {string} fg_white - White text
 * @property {string} bg_red - Red text
 * @property {string} bg_green - Green text
 * @property {string} bg_yellow - Yellow text
 * @property {string} bg_blue - Blue text
 * @property {string} bg_magenta - Magenta text
 * @property {string} bg_cyan - Cyan text
 * @property {string} bg_white - White text
 * @property {string} moveback1char - Move cursor position back by 1 character
 * @property {string} moveback1line - Move cursor position up by 1 line
 * @property {string} cls -Clear the screen
 * 
 */
const Font = {
    bold_on: "\x1b[1m",
    reset: "\x1b[0m",
    inverse_on: "\x1b[7m",
    bold_off: "\x1b[22m",
    fg_black: "\x1b[30m",
    fg_red: "\x1b[31m",
    fg_green: "\x1b[32m",
    fg_yellow: "\x1b[33m",
    fg_blue: "\x1b[34m",
    fg_magenta: "\x1b[35m",
    fg_cyan: "\x1b[36m",
    fg_white: "\x1b[37m",
    bg_red: "\x1b[41m",
    bg_green: "\x1b[42m",
    bg_yellow: "\x1b[43m",
    bg_blue: "\x1b[44m",
    bg_magenta: "\x1b[45m",
    bg_cyan: "\x1b[46m",
    bg_white: "\x1b[47m",
    moveback1char: "\033[1D",
    moveback1line: "\033[1A",
    cls: "\033c"
}

const ux4TerminalLog = {

    /**
    * Set to true to enable debug logging
    * 
    * @type {boolean} 
    */
    showDebug: false,

    /**
     * Disable all colors codes from being output. All output will be monochrome
     *
     * @returns {object} Self reference for chaining commands
     */
    disableColor: function () {
        for (let key in Font) {
            Font[key] = "";
        }
        noColor = true;
        return this;
    },

    /**
     * Log a message to the terminal.
     *
     * @param {string} The debug text to output
     * @param {string} Specify a Font color code eg. Font.fg_red. You can chain these together eg. Font.fg_red+Font.bg_white
     * @returns {object} Self reference for chaining commands
     */
    info: function (text = "", color = "") {
        console.log(color + Font.moveback1char + text + Font.reset);
        return this;
    },

    /**
     * Writes out a debug message. This is only output if the showDebug flag is set
     *
     * @param {string} The debug text to output
     * @param {string} Specify a Font color code eg. Font.fg_red. You can chain these together eg. Font.fg_red+Font.bg_white
     * @returns {object} Self reference for chaining commands
     */
    debug: function (text = "", color = "") {
        if (this.showDebug) this.info(text, color);
        return this;
    },

    /**
     * Apply the specified colour codes to the terminal
     *
     * @param {string} The color codes to apply
     * @returns {object} Self reference for chaining commands
     */
    applyStyle: function (color = "") {
        if (noColor) return this;
        console.log(color + Font.moveback1char + Font.moveback1line);
        return this;
    },

    /**
     * Logs a title in the terminal which is underlined by ======
     *
     * @param {string} title - The title
     * @param {Font} color - Specify a Font color code override eg. Font.fg_red. You can chain these together eg. Font.fg_red+Font.bg_white
     * @returns {object} Self reference for chaining commands
     */
    title: function (title, color) {
        if (!noColor) {
            if (!color) color = Font.fg_cyan;
            color += Font.bold_on + Font.moveback1char;
        } else {
            color = "";
        }

        let x = "\n";
        for (let i = 0; i < title.length; i++) {
            x += "=";
        }
        title += x;

        console.log(color + title + Font.reset);
        return this;
    },


    /**
     * Logs a success message (displays in green)
     *
     * @param {*} text - The text to log
     * @returns {object} Self reference for chaining commands
     */
    success: function (text) {
        this.info(text, Font.fg_green);
        return this;
    },

    /**
     * Logs a warning message (displays in yellow)
     *
     * @param {string} text - The text to log
     * @returns {object} Self reference for chaining commands
     */
    warn: function (text) {
        this.info(text, Font.fg_yellow);
        return this;
    },

    /**
     * Logs a fail message (displays in red)
     *
     * @param {*} text - The text to log
     * @returns {object} Self reference for chaining commands
     */
    fail: function (text) {
        this.info(text, Font.fg_red);
        return this;
    },

    /**
     * Logs a serious error surround by asterisks
     *
     * @param {*} text -  The text to log
     * @returns {object} Self reference for chaining commands
     */
    majorError: function (text) {
        this.lf().fail("ERROR\n***************************************************\n" + text + "\n***************************************************\n").lf();
        return this;
    },

    /**
     * Move to next line in the terminal
     *
     * @returns {object} Self reference for chaining commands
     */
    lf: function () {
        console.log("");
        return this;
    },

    /**
     * Clears the terminal
     *
     * @returns {object} Self reference for chaining commands
     */
    cls: function () {
        process.stdout.write(Font.cls);
        return this;
    }
};


if (process.argv.indexOf("-nocolor") >= 0) this.disableColor();

module.exports = {
    Log: ux4TerminalLog,
    Font: font
};
