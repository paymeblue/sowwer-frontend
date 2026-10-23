import { neon } from "@neondatabase/serverless";

// Created per call rather than at import: neon() throws without a connection
// string, which would fail any build where NEON_DB isn't set.
export const getSql = () => neon(process.env.NEON_DB!);
