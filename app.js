const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const { log } = require('console')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res) =>{
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',(req,res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
   
    const data = {
        members:[
            {
                email_address:email,
                status:'subscribed',
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    }

    const jSONDATA = JSON.stringify(data)
    const url = 'https://us9.api.mailchimp.com./3.0/lists/1df3f3f159'
    const option = {
        method:'POST',
        auth:'Harik:213d1c222a15ae268921119587aff465-us9'
    }

   const request =  https.request(url,option,(response)=>{
    if(response.statusCode == 200){
        res.sendFile(__dirname+'/success.html')
    }
    if(response.statusCode != 200){
        res.sendFile(__dirname+'/failure.html')
    }
        response.on("data",(data) =>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jSONDATA)
    request.end()
})

app.post('/failure',(req,res) =>{
    res.redirect('/')
})


app.listen(process.env.PORT || 3000,() => {
    console.log('server is running on 3000');
})

//api key
//213d1c222a15ae268921119587aff465-us9

//unique id
//1df3f3f159