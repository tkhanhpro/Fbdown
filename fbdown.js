const axios = require("axios");

const API_ENDPOINT =
  "https://serverless-tooly-gateway-6n4h522y.ue.gateway.dev/facebook/video";

/**
 * Regex chấp nhận:
 * - facebook.com
 * - m.facebook.com
 * - fb.watch
 * - /share/r/
 * - link app Facebook
 */
const FB_URL_REGEX =
  /^(https?:\/\/)?(www\.|m\.)?(facebook\.com|fb\.watch)\/.+/i;

async function fbdown(rawUrl) {
  if (!rawUrl) {
    throw new Error("Thiếu URL");
  }

  // Giải encodeURIComponent (an toàn)
  let url;
  try {
    url = decodeURIComponent(rawUrl);
  } catch {
    url = rawUrl;
  }

  // Check regex Facebook
  if (!FB_URL_REGEX.test(url)) {
    throw new Error("Chỉ hỗ trợ URL Facebook");
  }

  const res = await axios.get(API_ENDPOINT, {
    params: { url },
    headers: {
      "Accept": "*/*",
      "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.6,en;q=0.5",
      "Origin": "https://chative.io",
      "Referer": "https://chative.io/",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36"
    },
    timeout: 15000
  });

  return res.data;
}

module.exports = fbdown;
