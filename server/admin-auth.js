import { createHash, timingSafeEqual } from "node:crypto";

function sha256(value) {
  return createHash("sha256").update(String(value)).digest();
}

function readHeader(req, name) {
  if (typeof req?.get === "function") return req.get(name);
  const headers = req?.headers ?? {};
  const direct = headers[name];
  if (direct) return direct;
  const lower = headers[name.toLowerCase()];
  return lower ?? null;
}

export function extractAdminCredential(req) {
  const authHeader = readHeader(req, "authorization");
  if (typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }

  const apiKeyHeader = readHeader(req, "x-admin-api-key");
  if (typeof apiKeyHeader === "string") {
    const token = apiKeyHeader.trim();
    if (token) return token;
  }

  return "";
}

export function isAuthorizedAdminRequest(req, expectedSecret = process.env.ADMIN_API_KEY) {
  const expected = String(expectedSecret ?? "").trim();
  if (!expected) return false;

  const provided = extractAdminCredential(req);
  if (!provided) return false;

  const expectedHash = sha256(expected);
  const providedHash = sha256(provided);
  return expectedHash.length === providedHash.length && timingSafeEqual(expectedHash, providedHash);
}

export function requireAdminApiKey(req, res, next) {
  const expected = String(process.env.ADMIN_API_KEY ?? "").trim();
  if (!expected) {
    return res.status(503).json({
      error: "Admin endpoint is not configured.",
    });
  }

  if (!isAuthorizedAdminRequest(req, expected)) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  return next();
}
