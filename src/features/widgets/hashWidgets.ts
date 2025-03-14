"use client"

import { WidgetModel } from "@/types/widget";

// Function to hash the widgets array using the browser's native Web Crypto API
export const hashWidgets = async (data: WidgetModel[]): Promise<string> => {
    // Convert the widgets array to a JSON string
    const jsonString = JSON.stringify(data);

    // Convert the JSON string to a Uint8Array
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(jsonString);

    // Use the subtle crypto API to create a SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
};