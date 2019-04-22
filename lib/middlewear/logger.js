// eslint-disable-next-line
module.exports = (req, res, next) => {
  //time in ms
  const startAt = Date.now();
  res.on('finish', () => {
    const totalTime = Date.now() - startAt;
    console.log(`[${req.method}] ${req.baseUrl}`);
  });
}
;
