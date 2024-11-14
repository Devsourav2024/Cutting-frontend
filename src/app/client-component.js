// app/client-component.js
'use client';

import { outfit, roboto } from './font';

export default function ClientComponent() {
  return (
    <div>
      <style jsx global>{`
        :root {
          --outfit-font: ${outfit.style.fontFamily};
          --roboto-font: ${roboto.style.fontFamily};
        }
      `}</style>
    </div>
  );
}
