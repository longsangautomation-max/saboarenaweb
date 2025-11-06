export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    "applinks": {
      "apps": [],
      "details": [{
        "appID": "B465SC3K74.com.saboarena.app",
        "paths": ["/user/*", "/auth/*", "/tournament/*", "/club/*"]
      }]
    },
    "webcredentials": {
      "apps": ["B465SC3K74.com.saboarena.app"]
    }
  });
}
