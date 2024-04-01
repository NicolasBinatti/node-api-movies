import MoviesService from "./MoviesService";
import Producer from "../interfaces/ProducerInterface";

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

        const result: any = {}
        result.max = this.getMaxDiferenceBetweenYears(Producers).sort((a, b) => b.interval - a.interval);
        result.min = this.getMinDiferenceBetweenYears(Producers).sort((a, b) => a.interval - b.interval);

        return result;
    }

    private getMaxDiferenceBetweenYears(data: Producer[]): any[] {

        const newWin: any[] = [];
        for (const win of this.getYearsInArray(data)) {

            const years = win.years.map((item: any) => {
                return isNaN(parseInt(item)) ? item : parseInt(item);
            });

            const firstYear = Math.min(...years);
            const lastYear = Math.max(...years);

            newWin.push({
                producer: win.producer,
                interval: lastYear - firstYear,
                previousWin: firstYear,
                followingWin: lastYear,
            })
        }
        return newWin;
    }

    private getMinDiferenceBetweenYears(Producer: any[]): any[] {
        const lazyWin: any[] = [];

        for (const win of this.getYearsInArray(Producer)) {

            win.years.sort((a: number, b: number) => a - b);

            let smallestDifference: number = Number.MAX_SAFE_INTEGER;
            var smallestYear: number = 0;
            let biggestYear: number = 0;


            for (const [key, year] of win.years.entries()) {
                if (key === 0) {
                    continue;
                }

                if (year - win.years[key - 1] < smallestDifference) {
                    smallestDifference = year - win.years[key - 1]
                    smallestYear = win.years[key - 1];
                    biggestYear = year;
                }

            }

            lazyWin.push({
                producer: win.producer,
                interval: smallestDifference,
                previousWin: smallestYear,
                followingWin: biggestYear,
            })
        }
        return lazyWin;
    }

    private getYearsInArray(Producer: any[]): any {

        const winningYearsByProducer: any[] = [];
        for (const entry of Producer) {
            const producerName = entry.name;
            const winningYears: number[] = [];

            for (const movie of entry.movies) {
                if (movie.winner) {
                    winningYears.push(movie.year);
                }
            }

            //Just who have more than 1 award
            if (winningYears.length > 1) {
                winningYearsByProducer.push({producer: producerName, years: winningYears});
            }
        }

        return winningYearsByProducer;
    }

}

export default new ProducerService();



