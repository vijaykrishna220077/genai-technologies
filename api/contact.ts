// Alias handler to api/send-confirmation for backwards compatibility
import handler, { contactSubmissionSchema } from './send-confirmation'

export { contactSubmissionSchema }
export default handler
