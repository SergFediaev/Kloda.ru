import type { Nullable } from '@/types/nullable'
import { useState } from 'react'

export const useCaptcha = (isShown?: boolean) => {
  const [isCaptchaShown, setIsCaptchaShown] = useState(isShown)
  const [captchaToken, setCaptchaToken] = useState<Nullable<string>>()

  const onCaptcha = (token: Nullable<string>) => setCaptchaToken(token)

  return {
    isCaptchaShown,
    captchaToken,
    setIsCaptchaShown,
    onCaptcha,
  }
}
