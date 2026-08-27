/**
 * Emits a JSON-LD block. Server component — no client JS involved, so the
 * structured data is in the HTML crawlers and LLM fetchers receive.
 *
 * @param {object} props Component props.
 * @param {Record<string, unknown>} props.data Schema.org payload to serialise.
 * @return {JSX.Element} A script tag carrying the structured data.
 */
const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    // Schema payloads are built from our own content, never user input.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
