import { useThemes } from '@/hooks/useThemes'
import { useWidth } from '@/hooks/useWidth'
import ReCAPTCHA, { type ReCAPTCHAProps } from 'react-google-recaptcha'

const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY

if (!siteKey) {
  throw Error('Missing CAPTCHA_SITE_KEY')
}

export const Captcha = (props: Omit<ReCAPTCHAProps, 'sitekey'>) => (
  <ReCAPTCHA
    sitekey={siteKey}
    size={useWidth().isDesktopWidth ? 'normal' : 'compact'}
    theme={useThemes().isDarkTheme ? 'dark' : 'light'}
    autoFocus
    {...props}
  />
)
