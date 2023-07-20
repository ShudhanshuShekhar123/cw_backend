const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
  const token=req.headers.authorization
//   if(BlackList.includes(token)){

//   }
  jwt.verify(token,"masai",(err,decoded)=>{
    if(err){
      res.send("you are not authorized to access")
    }else{
      console.log(decoded)
      req.userId=decoded.userId
      console.log(req.userId)
      next()
    }
  })
}
module.exports={authMiddleware}