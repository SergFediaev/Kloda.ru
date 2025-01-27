'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

export const YandexMetrica = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Yandex Metrica function and dependencies
  useEffect(() => {
    // @ts-ignore
    window.ym(99211256, 'hit', window.location.href)
  }, [pathname, searchParams])

  return (
    <Script>
      {`
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.webvisor.org/metrika/tag_ww.js", "ym");

   ym(99211256, "init", {
        defer: true,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
      `}
    </Script>
  )
}
