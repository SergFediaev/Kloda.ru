import emailjs from '@emailjs/browser'
import packageJson from '../../package.json'

const publicKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY
const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID

if (!serviceId) {
  throw Error('Missing EMAIL_SERVICE_ID')
}

if (!templateId) {
  throw Error('Missing EMAIL_TEMPLATE_ID')
}

emailjs.init({
  publicKey,
  blockHeadless: true,
  limitRate: {
    id: packageJson.name,
    throttle: 60_000,
  },
})

export const sendEmail = (message: Record<string, unknown>) =>
  emailjs.send(serviceId, templateId, message)
