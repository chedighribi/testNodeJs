const express = require ('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const User = require ('../models/usersSchema');




// GET users.
router.get('/users', async(req, res) => {
  try {
      const users = await User.find().sort({'score':-1}).select('-email')
      res.json ({msg:'players list', users})
  } catch (error) {
      res.status(500).send('Server error')
  }
});


// GET cities stats.
router.get('/stats/cities', async(req, res) => {
    try {
        const users = await User.find()
        const citiestab = new Set(users.map (el => el.city))
        const citytab = [...citiestab]
        const citygame = citytab.map(el=> users.filter(user=>user.city==el).length)
        const usersbycity = citytab.map(el=> users.filter(user => user.city==el))
        const score = usersbycity.map((el)=>el.reduce((a,b)=>a+b.score,0))
        const statscity = citytab.map((el,i)=> {
            return {
                city : el, 
                avarageScore : score[i]/citygame[i],
                usersbyCity : citygame[i]
            }
        } )
        const statscityorder = statscity.sort(function(a, b){return b.avarageScore - a.avarageScore})
        
        res.json ({msg:'cities stats' ,statscityorder})
    } catch (error) {
        res.status(500).send('Server error')
    }
  });
  

// GET months stats.
router.get('/stats/months', async(req, res) => {
    try {
        const users = await User.find()
        const monthstab = new Set(users.map (el => (el.playOn).slice(5,7)))
        const monthtab = [...monthstab]
        const monthlygame = monthtab.map(el=> users.filter(user=>(user.playOn).slice(5,7)==el).length)
        const usersbymonth = monthtab.map(el=> users.filter(user => (user.playOn).slice(5,7)==el))
        const scoremonthly = usersbymonth.map((el)=>el.reduce((a,b)=>a+b.score,0))
        const statsmonthly = monthtab.map((el,i)=> {
            return {
                Month : el, 
                avarageScore : scoremonthly[i]/monthlygame[i],
                usersbyMonth : monthlygame[i]
            }
        } )
        const statsmonthorder = statsmonthly.sort(function(a, b){return a.Month - b.Month})

        res.json ({msg:'monthly stats', statsmonthly})
    } catch (error) {
        res.status(500).send('Server error')
    }
  });
  


module.exports = router;
