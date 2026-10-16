# Payment, email, and backup notes

## Payment

The application includes a Paystack boundary but it is intentionally disabled. The server rejects initialization with HTTP 503 until the required values are present. When enabled, the server sends the amount in kobo, uses NGN, verifies the transaction server side, and validates the HMAC SHA 512 webhook signature against the exact raw body. The current webhook acknowledges a verified event but does not yet persist payment state, so live payment must not be enabled until an idempotent event handler updates `payments` and the linked reservation status.

The hotel owner must provide a Paystack account, test and live credentials, an approved callback URL, webhook configuration, reconciliation contact, refund process, and the final rule for when a reservation becomes confirmed. Test insufficient funds, cancelled checkout, wrong amount, wrong currency, duplicate webhooks, invalid signatures, delayed webhooks, and provider downtime.

## Email

No customer email provider is configured in the current build. The contact form stores validated submissions and the public page provides a telephone and email fallback. Before launch, select an authorized business email provider, keep credentials server side, configure a verified sending domain, set the reply to address, publish privacy wording, and test contact receipt, reservation enquiry receipt, cancellation, modification, payment failure, and staff notification messages. Email delivery must not be described as active until a real inbox receives test messages.

## Backups

The managed database contains operational records and is shared by development and publication. Establish a backup owner, frequency, retention period, protected destination, and restoration runbook before live bookings. Back up guests, reservations, payments, status history, room configuration, policies, and audit records. Store approved original photography and rights evidence separately in durable object storage. Never rely on Git or a container filesystem as the only data copy.

At least once before launch, restore a protected backup into a non production environment, run migrations against the restored copy, verify reservation and payment relationships, and record the restoration result. Do not test destructive recovery against the shared production database.

## Incident response

For double booking risk, disable new online submissions, keep manual inventory controlled, inspect overlapping reservations and holds, and notify the hotel operator. For payment uncertainty, do not manually mark a reservation paid until the provider dashboard and server verification agree. For leaked credentials, revoke and rotate them immediately through the approved secret workflow. For a data access concern, preserve audit evidence and follow the project owner incident process.
