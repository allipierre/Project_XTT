/**
 * APEX Client Extension Browser
 *
 * This module provides some utility and helper functions
 *
 * @summary   utility functions.
 *
 */

module.exports = {

    // parses and validates json
    isValidJson: function(obj) {
        try {
            JSON.parse(obj);
            return true;
        } catch (e) {
            return false;
        }
    }
};
