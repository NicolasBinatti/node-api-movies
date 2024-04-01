import e, {Request, Response} from 'express';
import ProducerService from "../services/ProducerService";

class ProducerController {
    public async getAwards(req: Request, res: Response): Promise<void> {
        const awards = await ProducerService.getListMovies();
        res.status(200).json(awards);
    }
}

export default new ProducerController();