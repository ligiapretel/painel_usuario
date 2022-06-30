const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// GET localhost:3000/user/create
router.get("/create",userController.create);
// POST localhost:3000/user/create
router.post("/create",userController.store);
// GET localhost:3000/user/edit/2
router.get("/edit/:id",userController.edit);
// PUT localhost:3000/user/edit/2
router.put("/edit/:id",userController.update);

//As rotas mais genéricas ficam mais abaixo, para evitar conflitos de rotas
// localhost:3000/user/
router.get("/",userController.index);
// localhost:3000/user/4
router.get("/:id",userController.show);

module.exports = router;