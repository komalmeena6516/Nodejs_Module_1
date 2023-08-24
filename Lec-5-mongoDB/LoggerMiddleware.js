const LoggerMiddleware = (req, res, next) => {
  // console.log(req);
  console.log(
    `header: ${JSON.stringify(req.headers)}  Body: ${JSON.stringify(
      req.body
    )}, URL: ${req.url} , Method: ${req.method}`
  );

  next();
};

const SampleMiddleware = (req, res, next) => {
    // console.log(req);
    console.log(
      "this is sample middleware"
    );
  
    next();
  };

module.exports = { LoggerMiddleware , SampleMiddleware};
