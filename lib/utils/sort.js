function sortByDate(array) {
  return array.sort((a, b) => {
    if(a.created_at > b.created_at) {
      return -1;
    }
    if(a.created_at < b.created_at) {
      return 1;
    }
    return 0;
  });
}

module.exports = sortByDate;
