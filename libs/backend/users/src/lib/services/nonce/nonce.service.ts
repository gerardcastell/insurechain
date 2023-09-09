import { Injectable } from '@nestjs/common';

@Injectable()
export class NonceService {
  private nonces: Map<string, number> = new Map();

  // Add a nonce to the store with an expiration time
  addNonce(nonce: string): void {
    const expirationTimeInSeconds = 60 * 20; // Set the expiration time to 20 minutes

    const expirationTimestamp = Date.now() + expirationTimeInSeconds * 1000;
    this.nonces.set(nonce, expirationTimestamp);
  }

  // Check if a nonce exists in the store and is not expired; remove it if valid
  validateAndRemoveNonce(nonce: string): boolean {
    const expirationTimestamp = this.nonces.get(nonce);
    if (expirationTimestamp && expirationTimestamp > Date.now()) {
      this.nonces.delete(nonce);
      return true;
    }
    return false;
  }

  // Cleanup expired nonces
  cleanupExpiredNonces(): void {
    const now = Date.now();
    for (const [nonce, expirationTimestamp] of this.nonces) {
      if (expirationTimestamp <= now) {
        this.nonces.delete(nonce);
      }
    }
  }

  // Cleanup expired nonces periodically (e.g., every hour)
  cleanupExpiredNoncesPeriodically(): void {
    setInterval(() => {
      this.cleanupExpiredNonces();
    }, 1000 * 60 * 60); // 1 hour
  }
}
