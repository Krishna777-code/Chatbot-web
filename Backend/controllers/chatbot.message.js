import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message=async(req,res)=>{
   try {
    const {text}=req.body;
 
    if(!text?.trim()){
        return res.status(400).json({error:"Text cannot be empty"});
    }

    const user=await User.create({
        sender:"user",
        text
    })

    // Data
    const botResponses={
  "hi": "Hello 👋! How can I assist you today?",
  "hello": "Hi there! 😊 What brings you here?",
  "how are you": "I'm just a bot, but feeling awesome today! How about you?",
  "what is your name": "I’m BotSpoof, your virtual AI assistant built using the MERN stack.",
  "who made you": "I was created by developers to chat, answer questions, and help users learn programming.",
  "can we become friends": "Of course 🤝! I love chatting and helping friends like you.",
  "bye": "Goodbye 👋! Have a productive day ahead!",
  "thank you": "You’re most welcome! 😊",
  "i love you": "Aww 💖 That’s sweet! I’m here whenever you need me.",
  "where are you from": "I live in the cloud ☁️ — no rent, no bills, just bytes!",
  "what can you do": "I can answer your questions, explain programming concepts, and keep you company when you're coding.",
  "tell me a joke": "😂 Why do Java developers wear glasses? Because they don't see sharp!",
  "what is the time": "⏰ I can’t read a clock, but your device can help with that!",
  "what is date today": "I don’t track real-time dates, but I bet your system calendar knows! 📅",

  "what is html": "HTML (HyperText Markup Language) is the standard language for creating web pages.\n• Defines structure of webpages using tags like <h1>, <p>, <div>\n• Works with CSS for styling and JS for interactivity.\n• Example: <h1>Hello World</h1>",
  "what is css": "CSS (Cascading Style Sheets) controls how HTML elements look.\n• Used for colors, layouts, and animations\n• Supports Flexbox, Grid, and media queries for responsiveness.\n• Example: body { background-color: black; color: white; }",
  "what is javascript": "JavaScript is the language of the web 🌐.\n• Used for interactivity (clicks, forms, dynamic content)\n• Runs in browsers and Node.js\n• Example: console.log('Hello World');",
  "what is react": "React is a JavaScript library for building fast, interactive UIs.\n• Developed by Facebook\n• Uses components and virtual DOM\n• Example: function Hello() { return <h1>Hello React!</h1> }",
  "what is nodejs": "Node.js lets you run JavaScript on the server side.\n• Built on Chrome’s V8 engine\n• Handles asynchronous I/O efficiently\n• Example: Used in backend APIs, chat apps, and servers.",
  "what is express": "Express.js is a Node.js framework for building APIs.\n• Minimal and flexible\n• Supports routing, middleware, and REST APIs\n• Example: app.get('/', (req,res)=>res.send('Hello World'))",

  "what is python": "Python is a high-level, interpreted programming language.\n• Simple syntax (like English)\n• Used for AI, ML, data science, and web apps\n• Example: print('Hello, Python!')",
  "what is java": "Java is an object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere'\n• Used in enterprise systems, Android, and cloud apps\n• Example: System.out.println('Hello Java');",
  "what is c": "C is one of the oldest and most powerful programming languages.\n• Used in system programming and embedded devices\n• Provides low-level memory control\n• Example: printf('Hello C');",
  "what is recursion": "Recursion is when a function calls itself.\n• Commonly used in factorial, Fibonacci, and tree traversal.\n• Example:\nfunction fact(n){ return n===0?1:n*fact(n-1); }",
  "what is api": "API (Application Programming Interface) lets software systems talk to each other.\n• Example: Weather API gives temperature data when you request it.",
  "what is database": "A database stores and manages data efficiently.\n• Types: SQL (MySQL, PostgreSQL), NoSQL (MongoDB)\n• Example: MongoDB stores documents in JSON format.",
  "what is mongodb": "MongoDB is a NoSQL database storing data in JSON-like documents.\n• Schema-less and scalable\n• Example: db.users.insertOne({name:'Krishnakant'})",

  "who is prime minister of india": "🇮🇳 Narendra Modi is the Prime Minister of India since May 2014.\n• Represents Varanasi constituency\n• Key initiatives: Digital India, Startup India, Swachh Bharat, Make in India",
  "who is virat kohli": "🏏 Virat Kohli is one of India’s greatest batsmen and former cricket team captain.\n• Known for aggressive play and fitness\n• Nickname: Chase Master",
  "what is g20": "🌍 The G20 (Group of Twenty) is an international forum of 19 countries + the EU.\n• Founded in 1999\n• Discusses global economy, climate, and development\n• India hosted G20 in 2023.",

  "tell me about yourself": "Here’s how to answer this interview question:\n1️⃣ Start with your background (name, education)\n2️⃣ Mention your key skills\n3️⃣ Highlight a project or internship\n4️⃣ End with your career goal\nExample: 'I’m a B.Tech student skilled in React and Node.js. I built an Employee Management System using MERN. I love solving problems and aim to grow as a full-stack developer.'",
  "why should we hire you": "Focus on your strengths & relevance to the job.\n• Match your skills to their needs\n• Show enthusiasm & teamwork\nExample: 'I have strong JavaScript and API integration skills. I’m proactive, quick learner, and excited to contribute innovative ideas to your projects.'",
  "what is leadership": "Leadership is about guiding and inspiring others to achieve goals.\n• Traits: communication, vision, accountability\n• Example: 'I led a 4-member team in a college project, ensuring collaboration and on-time delivery.'",
  "what are your strengths": "Some good examples:\n• Problem-solving mindset\n• Adaptability\n• Communication\n• Teamwork\nTip: Always link your strength to an example.",
  "what are your weaknesses": "Choose a real but improvable weakness.\nExample: 'I sometimes focus too much on details, but I’m learning to balance perfection with deadlines.'",
  "what are your hobbies": "You can say:\n• Coding and exploring new tech\n• Reading about AI or startups\n• Watching tech talks or cricket\nKeep it genuine and simple."
}


const normalizedText = text.toLowerCase().trim();

const botResponse = botResponses[normalizedText] || "Sorry, I don't understand that!!!";

const bot = await Bot.create({
    text: botResponse
})

return res.status(200).json({
    userMessage:user.text,
    botMessage:bot.text,
})
   } catch (error) {
    console.log("Error in Message Controller:", error);
    return res.status(500).json({error:"Internal Server Error"});
   }
}