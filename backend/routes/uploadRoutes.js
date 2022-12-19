const express = require('express')
const multer = require('multer')
const path = require('path')
const User = require('../Models/UserModel')
const router = express.Router()
const fs = require('fs');
//console.log("Fired!")
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'../frontend/public')
    },
    filename(req,file,cb){
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}) 


function checkFileType(file,cb){
    const fileTypes = /doc|docx|pdf|DOC|DOCX|PDF/
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Doc/Docx/Pdf Only!')
    }
}
const upload = multer({
    storage,
    fileFilter:function(req,file,cb){
        //console.log("Called")
        checkFileType(file,cb)
    }

})

router.post('/updateResume',upload.single('resume'),async(req,res)=>{
    const obj = Object.assign({},req.body)
    console.log(obj)
    console.log(req.file.path)
    const userID = obj.userId
    const user = await User.findOne({_id:userID})
    if(user){
        if(user.resume === ""){
            user.resume = req.file.path
            const resumeUploaded = await user.save()
            if(resumeUploaded){
                res.send("Resume Uploaded Successfully!")
            }
            else{
                res.status(500).json({
                    error:"Internal Server Error. Please try after sometime"
                })
            }
        }
        else{
            const prevResumePath = user.resume
            user.resume = req.file.path
            const resumeUploaded = await user.save()
            if(resumeUploaded){

                fs.unlink(prevResumePath, async(err)=> {
                    if (err) {
                        res.status(500).json({error:"Internal Server Error!"})
                    }
                    else{
                        res.send("Resume Updated Successfully!");
                    }
                   
                });
            }
            else{
            } 
        }
    }
    else{
        res.status(401).json({error:"user Not found!"})
    }
    //res.send(`${req.file.path}`)
})

router.post('/addResume',upload.single('resume'),async(req,res)=>{
    console.log(req.file.path)
    const userID = req.body.userID
    const user = await User.findOne({userId:userID})
    if(user){
        user.resume = req.file.path
        const resumeUploaded = await user.save()
        if(resumeUploaded){
            res.send("Resume Uploaded Successfully!")
        }
        else{
            res.status(500).json({
                error:"Internal Server Error. Please try after sometime"
            })
        }
    }
    else{
        res.status(401).json({error:"user Not found!"})
    }
    //res.send(`${req.file.path}`)
})

router.get('/deleteResume',async(req,res)=>{
    const userID = req.query.userID
    console.log(userID)
    const user = await User.findOne({_id:userID})
    if(user){
        const resumePath = user.resume
        fs.unlink(resumePath, async(err)=> {
            if (err) throw err;
            // if no error, file has been deleted successfully
           // console.log('File deleted!');
           user.resume = ""
           const userResumePathUpdated = await user.save()
           if(userResumePathUpdated)
            res.send("Resume File Deleted Successfully")
            else{
                res.status(500).json({
                    error:"Internal Server Error. Please try after sometime"
                })
            }
        });
    }
    else{
        res.status(401).json({error:"user Not found!"})
    }
})


// cover letter upload control

router.post('/updateCoverLetter',upload.single('cover_letter'),async(req,res)=>{
    //console.log(req.file.path)
    const userID = req.body.userID
    const user = await User.findOne({userId:userID})
    if(user){
        if(user.coverLetter === ""){
            user.coverLetter = req.file.path
            const coverLetterUploaded = await user.save()
            if(coverLetterUploaded){
                res.send("Cover Letter Uploaded Successfully!")
            }
            else{
                res.status(500).json({
                    error:"Internal Server Error. Please try after sometime"
                })
    
            }
        }
        else{
            const prevcoverLetterPath = user.coverLetter
            user.coverLetter = req.file.path
            const coverLetterUploaded = await user.save()
            if(coverLetterUploaded){

                fs.unlink(prevcoverLetterPath, async(err)=> {
                    if (err) {
                        res.status(500).json({error:"Internal Server Error!"})
                    }
                    else{
                        res.send("cover Letter Updated Successfully!");
                    }
                   
                });
            

            }
            else{

            }
            
        }
        
        

    }
    else{
        res.status(401).json({error:"user Not found!"})
    }
    //res.send(`${req.file.path}`)
})

router.post('/addcoverLetter',upload.single('cover_letter'),async(req,res)=>{
    //console.log(req.file.path)
    const userID = req.body.userID
    const user = await User.findOne({userId:userID})
    if(user){
        user.coverLetter = req.file.path
        const coverLetterUploaded = await user.save()
        if(coverLetterUploaded){
            res.send("Cover Letter Uploaded Successfully!")
        }
        else{
            res.status(500).json({
                error:"Internal Server Error. Please try after sometime"
            })

        }

    }
    else{
        res.status(401).json({error:"user Not found!"})
    }
    //res.send(`${req.file.path}`)
})

router.get('/deleteCoverLetter/:userID',async(req,res)=>{
    const userID = req.params.userID
    const user = await User.findOne({userId:userID})
    if(user){
        const coverLetterPath = user.coverLetter
        fs.unlink(coverLetterPath, async(err)=> {
            if (err) throw err;
            // if no error, file has been deleted successfully
           // console.log('File deleted!');
           user.coverLetter = ""
           const userCoverLetterPathUpdated = await user.save()
           if(userCoverLetterPathUpdated)
            res.send("cover Letter File Deleted Successfully")
            else{
                res.status(500).json({
                    error:"Internal Server Error. Please try after sometime"
                })
            }
           
        });
    }
    else{
        res.status(401).json({error:"user Not found!"})
    }

})



module.exports = router 