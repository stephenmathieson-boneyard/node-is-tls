
/**
 * SYN character (TLS handshakes start with a SYN).
 */

var SYN = 22;

/**
 * Expose `isTLS`.
 */

module.exports = isTLS;

/**
 * Check if the given `buf` belongs to a TLS connection.
 *
 * @param {Buffer} buf
 * @return {Boolean}
 * @api public
 */

function isTLS(buf){
  return SYN == buf[0];
}
