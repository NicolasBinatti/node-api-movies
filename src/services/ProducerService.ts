import Producer from "../interfaces/ProducerInterface";
import MoviesService from "./MoviesService";

class ProducerService {
    public async getListMovies(): Promise<any> {
        const movies = await MoviesService.list();
        const Producers: Producer[] = [];

        for (const movie of movies) {
            const producerNames = movie.producers.replace(/\band\b/g, ',').split(',');

            for (const producerName of producerNames) {
                const existingGroupIndex = Producers.findIndex((group) => group.name === producerName);

                if (existingGroupIndex !== -1) {
                    Producers[existingGroupIndex].movies.push(movie);
                } else {
                    Producers.push({name: producerName.trim(), movies: [movie]});
                }
            }
        }

        return this.getDiferenceWin(Producers);
    }


    private getDiferenceWin(data: Producer[]): any {

        const newWin: any[] = [];
        for (const [key, value] of Object.entries<{ [key: string]: any }>(this.getYearsInArray(data))) {
            const years = value.years.map((item: any) => {
                return isNaN(parseInt(item)) ? item : parseInt(item);
            });
            //
            const firstYear = Math.min(...years);
            const lastYear = Math.max(...years);
            const diference = lastYear - firstYear;

            if (diference <= 0) {
                continue;
            }

            newWin.push({
                producer: key,
                interval: lastYear - firstYear,
                previousWin: firstYear,
                followingWin: lastYear,
            })
        }

        let min: any = newWin[0];
        let max: any = newWin[0];

        for (const producer of newWin) {
            if (producer.interval > max.interval) {
                max = producer
            }
            if (producer.interval < min.interval) {
                min = producer
            }
        }

        return {max: max, min: min};
    }

    private getYearsInArray(Producer: any[]): any {

        let producerObject: { [key: string]: { years: number[] } } = {};
        for (const entry of Producer) {
            let producerName = entry.name;
            for (const movie of entry.movies) {
                if (movie.winner) {
                    if (!producerObject[producerName]) {
                        producerObject[producerName] = {years: []};
                    }
                    producerObject[producerName].years.push(movie.year);
                }
            }
        }
        return producerObject;
    }

}

export default new ProducerService();



