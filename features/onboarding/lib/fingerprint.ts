"use client";

import fpPromise from "@fingerprintjs/fingerprintjs";

export async function getFingerprint(): Promise<string> {
  const fp = await fpPromise.load();
  const result = await fp.get();
  return result.visitorId;
}
