const express = require("express");
//const auth = require("../controllers/auth");
const router = express.Router();
const app = express();

require("dotenv").config();

// index page
router.get('/', function(req, res) {// load up an ejs view file
    res.render("pages/index");
});
  
// about page
router.get('/about', function(req, res) {
    var summary = "Eager to put knowledge and experience into use, Francis is motivated to learn and support your team to deliver the best solution to your client."
    var experienceTitle = "Experience";
    var experiences = [
        {name: "Blue Salt Media Hackathon", description:"Engage in UI/UX design for media company targeted in real-time TV commercials overlays"},
        {name: "Collision", description:"Facilitate smooth operation of the multi-day event as a volunteer"},
        {name: "Salesperson, Icon Optical Inc.", description:"Provide professional and multilingual (English, Cantonese and Mandarin) retail optical services"}
    ]
    var educationTitle = "Education";
    var educations = [
        {program: "Diploma in Software Engineering Technician", institution: "Centennial College, Toronto", year: "2023"},
        {program: "BSc (Hons) in Optometry", institution: "The Hong Kong Polytechnic University, Hong Kong", year: "2020"}
    ]
    res.render('pages/about', {
        summary: summary,
        experienceTitle: experienceTitle,
        experiences: experiences,
        educationTitle: educationTitle,
        educations: educations
    }
  );
});
// services page
router.get('/services', function(req, res) {
    var tagline = "Frontend development and other services";
    var skills = [
      { name: 'Responsive website development', description: "jQuery, Bootstrap 5, Node js, Angular, Express framework and EJS"},
      { name: 'UI/UX design', description: "Figma, Adobe Illustrator"},
      { name: 'Relational and non-relational database management', description: "Oracle sql, PL/SQL and MongoDB"},
      { name: 'Eyecare and optical industry knowledge', description: "Registered Optometrist (Part I) in Hong Kong"},
      { name: 'Photography and painting', description: 'DSLR user with experience in watercolour and arcylic painting'}
    ];
    var linkToProjects = "./projects";
    res.render('pages/services', {
      skills: skills,
      tagline: tagline,
      linkToProjects: linkToProjects
    }
  );
});
//projects page
router.get('/projects', (req, res)=>{
  var projectsTitle = "My projects and works in progress (WIP)";
  var projects = [
    {
      name: 'OptomHub (WIP)', 
      image:'img/optomhublogo.png',
      description: 'A website designed for eyecare professionals. OptomHub uses jQuery for multiple choice question creation and formula calculation.', 
      link: 'https://github.com/francisallin/PWA'
    },
    {
      name: 'Blue Salt Media Hackathon UI Prototype', 
      image: 'img/Hackathon.png',
      description: 'Targeting small scale restaurant owners, this UI serves as an integral part of an user-friendly solution for managing the advertisement overlays on TV.', 
      link: 'https://www.figma.com/file/7Tul7ZcS2nTrsYYawPT4Cb/Bluesalt-Hackathon-Solo-(Copy)?type=design&t=5KdHGMwdJ7vKNOSH-6'
    },
    {
      name: 'Google Page Replica',
      image: 'img/GooglePage.png',
      description:'A replica of Google homepage created with purely HTML and CSS in the early days of my coding journey.',
      link:'https://github.com/francisallin/Google-page'
    }
  ]
  res.render('pages/projects', {
    projectsTitle: projectsTitle,
    projects: projects
  })
})
// contacts page
router.get('/contact', function(req, res) {// load up an ejs view file
  res.render("pages/contact")
});
// login page
router.get('/login', function(req, res) {// load up an ejs view file
  res.render("pages/login")
});

// database routes
const contacts = require('../controllers/index.server.controller');
const users = require('../controllers/index.server.userController');

router.post("/register", users.register);

//router.post("/login", users.login);

router.post('/businessContacts', users.login, (req, res) => res.render('pages/businessContacts'))//contacts.create)

router.get('/businessContacts', users.login, contacts.findAll) 

//router.get('/businessContacts/:id', users.adminAuth, contacts.findOne) 

// router.put('/businessContacts/:id', users.adminAuth, contacts.update) 

// router.delete('/businessContacts/:id', users.adminAuth, contacts.delete) 

module.exports = router;