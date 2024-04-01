import {Router} from "express"
import MoviesController from "./controllers/MoviesController";
import {ValidationCreateMovie} from "./validators/MoviesValidator";
import ProducerController from "./controllers/ProducerController";

const router = Router();

router.get("/", (req, res) => {
    res.send({ok: true});
});

router.get("/movies", MoviesController.get);
router.get("/movies/:id", MoviesController.find);
router.post("/movies", ValidationCreateMovie, MoviesController.create);
router.delete("/movies/:id", MoviesController.delete);

router.get("/producer/awards", ProducerController.getAwards)

export {router}
