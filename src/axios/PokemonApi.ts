import axios from "axios";

const milliSecondsToSeconds: number = 1000;

export const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 5 * milliSecondsToSeconds,
    headers: {
        'Content-Type': 'application/json',
    }
});