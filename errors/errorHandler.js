const handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  };

const handleIdErrors = (err, req, res, next) => {
  if(err.code === "22P02"){
    res.status(400).send({ msg : "invalid input"})
  }
  else next(err);
}

const handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  };


module.exports = {handleCustomErrors,handleServerErrors,handleIdErrors};