const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Unified Engine Running on Port ${PORT}`));
const io = new Server(server, { 
  cors: { 
    origin: process.env.FRONTEND_URL || "*", 
    methods: ["GET", "POST"] 
  } 
});