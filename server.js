const express=require('express')
const app=express()
const path=require('path')
const { v4: uuid } = require("uuid");
const methodOverride=require('method-override')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//comment array

let comments=[
    {
        id:uuid(),
        username: 'jhon Doe',
        comment: 'lol that is so funny'
    },
    {
        id:uuid(),
        username: 'Asik',
        comment: 'Hi'
    },
    {
        id:uuid(),
        username: 'Riaz',
        comment: 'Kemon acho'
    }
]
//routes
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})
app.get('/comments/new',(req,res)=>{
    res.render('comments/newComment')
})
app.post('/comments',(req,res)=>{ //to create 
    const{username,comment}=req.body
    comments.push({username,comment})
    res.redirect('/comments')
})

app.get('/comments/:id',(req,res)=>{
    const{id}=req.params;
    const comment=comments.find(c=>c.id===id);
    res.render('comments/show',{comment})
})

app.patch('/comments/:id',(req,res)=>{
    const{id}=req.params;
    const newcomment=req.body.comment;
    const foundcomment=comments.find(c=>c.id===id);
    foundcomment.comment=newcomment;
    res.redirect('/comments')
})
app.get('/comments/:id/edit',(req,res)=>{
    const{id}=req.params
    const comment=comments.find(c=>c.id===id)
    res.render('comments/edit',{comment})
})
app.delete('/comments/:id',(req,res)=>{
    const{id}=req.params
    comments=comments.filter(c=>c.id!==id)
    res.redirect('/comments')
})

app.listen(4000,()=>{
    console.log('connected to port 4000')
})