import { toast } from 'react-toastify'

export const copyToClipboard = async (
  content: string,
  notification?: string,
  theme?: string,
) => {
  try {
    await navigator.clipboard.writeText(content)
    toast(notification, { theme, type: 'info' })
  } catch (error) {
    console.error(error)
    toast('Failed to share', { theme, type: 'error' })
  }
}
