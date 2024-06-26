import {valid_users} from '../../data/private';

type CookieProperties = {
    isDark?: string,
    password?: string,
    accent?: string
}

/**
 * Gets the cookies as an object of key value pairs
 * @returns Object
 */
export function getCookie(): CookieProperties {
    const cookies = document.cookie.split("; ");
    const keyValues = cookies.map((c: string) => c.split("="));
    const storedCookies: CookieProperties = {};
    const keys = ["isDark", "password", "accent"];
    keyValues.map((c: string[]) => {
        if (keys.find(key => key === c[0])) storedCookies[c[0] as "isDark" | "password" | "accent"] = c[1];
    });

    return storedCookies;
}

/**
 * Gets the value of a cookie by it's key
 * @param key string
 * @returns value: string
 */
export function getCookieValue(key: "isDark" | "password") {
    const cookie: CookieProperties = getCookie();
    return cookie[key];
}

/**
 * Checks if a user is an authorized user
 * @param email user email address
 * @returns 
 */
export function isValidUser(email: string) {
    return !!valid_users.find(e => e === email);
}