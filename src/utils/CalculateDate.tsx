export const CalculateDate = (before: number, now: number) => {
  var d = Math.abs(before - now) / 1000;
  const r: {[key:string]: number} = {};
  const s: {[key:string]: number} = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  Object.keys(s).forEach(function(key){
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });
  return r;

}