const axios = require("axios");

const API_ENDPOINT = "https://fsmvid.com/api/proxy";

/**
 * Chỉ chấp nhận link Facebook (web + mobile)
 */
const FB_URL_REGEX =
  /^(https?:\/\/)?(www\.|m\.)?(facebook\.com|fb\.watch)\/.+/i;

async function fbdown(rawUrl) {
  if (!rawUrl) {
    throw new Error("Thiếu URL");
  }

  // Giải encodeURIComponent an toàn
  let url;
  try {
    url = decodeURIComponent(rawUrl);
  } catch {
    url = rawUrl;
  }

  // Validate Facebook URL
  if (!FB_URL_REGEX.test(url)) {
    throw new Error("Chỉ hỗ trợ URL Facebook");
  }

  const response = await axios.post(
    API_ENDPOINT,
    {
      isHomepage: true,
      platform: "facebook",
      url
    },
    {
      headers: {
        "Accept": "*/*",
        "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.6,en;q=0.5",
        "Content-Type": "application/json",
        "Origin": "https://fsmvid.com",
        "Referer": "https://fsmvid.com/",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36"
      },
      timeout: 15000
    }
  );

  return response.data;
}

module.exports = fbdown;
