function convertTimezone(date, locale, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString(locale, { timeZone: tzString }));
}

module.exports = convertTimezone;
