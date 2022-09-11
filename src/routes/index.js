import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
    res.send({ message : "Bimsalabim jadi apa cing !!!"})
})

export { router as indexRouter }
