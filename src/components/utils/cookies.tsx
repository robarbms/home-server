import {valid_users} from '../../data/private';

/**
 * Gets the cookies as an object of key value pairs
 * @returns Object
 */
export function getCookie() {
    return document.cookie.split("; ")
        .map(c => c.split("="))
        .reduce((o, c) => {
            o[c[0]] = c[1];
            return o;
        }, {});
}

/**
 * Gets the value of a cookie by it's key
 * @param key string
 * @returns value: string
 */
export function getCookieValue(key) {
    const cookie = getCookie();
    return cookie[key];
}

/**
 * Checks if a user is an authorized user
 * @param email user email address
 * @returns 
 */
export function isValidUser(email) {
    return !!valid_users.find(e => e === email);
}