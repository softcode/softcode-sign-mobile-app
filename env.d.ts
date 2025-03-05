declare module '@env' {
    export const API_URL: string;
    export const SHARED_SECRET: string;
}
declare module "./appTokenUtil" {
    export function getAppTokenHeader(): string;
  }
  
  