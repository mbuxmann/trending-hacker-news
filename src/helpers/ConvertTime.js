export function convertTime(s) {
  var d = Math.floor(s / (3600 * 24));
  var h = Math.floor(s / 3600);
  var m = Math.floor((s % 3600) / 60);
  var s = Math.floor((s % 3600) % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day ago." : " days ago.") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour ago." : " hours ago.") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute ago." : " minutes ago.") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second ago." : " seconds ago.") : "";

  if (d > 0) {
    return dDisplay;
  } else if (h > 0) {
    return hDisplay;
  } else if (m > 0) {
    return mDisplay;
  } else if (s > 0) {
    return sDisplay;
  } else {
    return null;
  }
}
