// Projects whose project page IS a live "command center" dashboard (leads +
// GA4 + community + launch funnel) rather than the generic sales-report view.
//
// Kept in its own tiny module (no server-only imports) so BOTH the generic
// project page and the /comando route can import it without pulling in
// node:crypto / the service-role client.

export const COMMAND_CENTER_SLUGS = new Set<string>(['tudor']);
