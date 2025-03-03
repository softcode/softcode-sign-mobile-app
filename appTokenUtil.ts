import CryptoJS from 'crypto-js';
// import { config } from 'dotenv';
import Config from './react-native-config';

export const generateToken = () => {
    const timestamp = Math.floor(Date.now() / 1000); // Current UNIX time
    const message = `${timestamp}`;

    const secret = Config.SHARED_SECRET || "";
    console.log("secret loaded", secret !== "");
    console.log("Secret..", secret);

    // Generate HMAC-SHA256 signature
    const signature = CryptoJS.HmacSHA256(message, secret);
    // Convert to Base64 format
    const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);

    return `${timestamp}.${signatureBase64}`;
};

export const getAppTokenHeader = () => {
    const token = { "X-App-Token": `${generateToken()}` };
    console.log(token);
    return token;
};
