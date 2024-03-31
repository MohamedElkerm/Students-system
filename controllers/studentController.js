// Get all students

const db = require("../config/db")

const getStudents =async (req,res)=>{
    try{
        const data = await db.query('SELECT * FROM STUDENTS')
        if(!data){
            return res.status(404).send({
                success:false,
                message:'no data found'
            })
        }
        res.status(200).send({
            success:true,
            message:'get data success',
            studentsNum:data[0].length,
            students:data[0]
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'error in get all students',
            err
        })
    }
}

const getStudentsByID = async (req , res)=>{
    try{
        const studenntId = req.params.id
        if(!studenntId){
            return res.status(404).send({
                success:false,
                message:'no id , data found'
            })
        }
        const data =await db . query('SELECT * FROM  STUDENTS WHERE id ='+studenntId)
        if(!data){
             return res.status(404).send({
                success:false,
                message : 'no data found'
            })
        }
        res.status(200).send({
            success : true , 
            message : 'get data success',
            data : data[0]
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message : 'Error in get the data',
            error:err
        })
    }
}

const cretaeNewStudent = async(req , res)=>{
    try{
        const {studentName,studentClass,studentFees,studentRoll_no,studentMedium} = req.body
        if(!studentName || !studentClass || !studentFees || !studentRoll_no || !studentMedium){
            return res.status(404).send({
                success : false,
                message:"the data is incorrect please check your data"
            })
        }
        const data =await db.query('insert into STUDENTS (`name`,`roll_no`,`fees`,`class`,`medium`)values(? , ? , ? , ? , ?)',[studentName , studentRoll_no , studentFees , studentClass , studentMedium])
       
        //const data =await db.query('insert into students(`name`,`roll_no`,`fees`,`class`,`medium`)values("mohamed khaled",6,2568,7,"english");')
      
        if(!data){
            return res.status(404).send({
                success:false,
                message:"failed to insert the data"
            })
        }
        res.status(200).send({
            success:true,
            message:'insert data success'
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'internal server error ',
            error:err
        })
    }
}

const deleteStudent = async(req , res)=>{
    try {
        const {studentID} = req.body
        console.log(studentID)

        if(!studentID){
            return res.status(404).send({
                success : false,
                message : 'provide the data correctly'
            })
        }
console.log(studentID)


        const data = await db.query('delete from students where id = ' + [studentID])
        if(!data){
            return res.status(404).send({
                success:false,
                message : 'failed to delete the student '
            })
        }
        res.status(200).send({
            success : true , 
            message : 'deleted succefully'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'error in delete the account',
            error : error
        })
    }
}

const updateAccount = async(req , res)=>{
    try {
        const {studentName,studentClass,studentFees,studentRoll_no,studentMedium,studenntId} = req.body
        if(!studentName || !studentClass || !studentFees || !studentRoll_no || !studentMedium || !studenntId){
            return res.status(404).send({
                success : false,
                message:"the data is incorrect please check your data"
            })
        }
        const data = await db.query('update students set name = ? , roll_no = ? , fees = ? , class = ? , medium = ? where (id = ?)' , [studentName , studentRoll_no,studentFees,studentClass,studentMedium,studenntId])
        if(!data){
            return res.status(401).send({
                success:false,
                message : "the id doent correct"
            })
        }
        res.status(200).send({
            success : true,
            message:"the acc updated successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success : false , 
            message : "cant make this operation now .",
            error : err
        })
        
    }
}

module.exports = [getStudents,getStudentsByID,cretaeNewStudent,deleteStudent,updateAccount]