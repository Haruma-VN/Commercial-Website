import { Explore } from "./components/Explore";
import Carousel from "./components/Carousel";
import Heros from "./components/Heros";
import LibraryService from "./components/LibraryService";

const HomePage = () => {
    return (
        <>
            <Explore />
            <Carousel />
            <Heros />
            <LibraryService />
        </>
    );
};

export default HomePage;
