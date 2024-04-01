import e, {Request, Response} from 'express';
import MoviesService from "../services/MoviesService";

class MoviesController {
    public async get(req: Request, res: Response): Promise<void> {
        const movies = await MoviesService.list();
        res.status(200).json(movies);
    }

    public async find(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const movie = await MoviesService.find(id);
        res.status(200).json(movie);
    }

    public async create(req: Request, res: Response): Promise<e.Response> {
        try {
            const newMovie = await MoviesService.create(req.body);
            return res.status(201).json();
        } catch (error) {
            return res.status(500).json({error: 'Server error'});
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const movie = await MoviesService.delete(id);
        res.status(204).json();
    }
}

export default new MoviesController();