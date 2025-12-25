const axios = require("axios");
const https = require("https");

const API_ENDPOINT = "https://fsmvid.com/api/proxy";

const FB_URL_REGEX =
  /^(https?:\/\/)?(www\.|m\.)?(facebook\.com|fb\.watch)\/.+/i;

async function fbdown(rawUrl) {
  if (!rawUrl) throw new Error("Thiếu URL");

  let url;
  try {
    url = decodeURIComponent(rawUrl);
  } catch {
    url = rawUrl;
  }

  if (!FB_URL_REGEX.test(url)) {
    throw new Error("Chỉ hỗ trợ URL Facebook");
  }

  const res = await axios.post(
    API_ENDPOINT,
    {
      isHomepage: true,
      platform: "facebook",
      url
    },
    {
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/json",
        "origin": "https://fsmvid.com",
        "referer": "https://fsmvid.com/",
        "sec-ch-ua": `"Chromium";v="130", "Mises";v="130", "Not?A_Brand";v="99", "Google Chrome";v="130"`,
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": `"Android"`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "priority": "u=1, i",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36"
      },
      timeout: 20000
    }
  );

  return res.data;
}

module.exports = fbdown;
