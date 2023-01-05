export const formatTime = (secs) => {
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor(secs / 60) % 60;
  var seconds = secs % 60;

  return [hours, minutes, seconds]
    .map((el) => (el < 10 ? "0" + el : el))
    .filter((el, i) => el !== "00" || i > 0)
    .join(":");
};
