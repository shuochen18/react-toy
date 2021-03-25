import Commerce from '@chec/commerce.js';
console.log("process.env.REACT_APP_CHEC_PUBLIC_KEY",process.env);
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);