// app/fonts.js
import { Outfit, Roboto } from 'next/font/google';

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '700'], // adjust weights as needed
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // adjust weights as needed
});
