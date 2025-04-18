import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import SearchBar from '../Components/SearchBar';
import FeaturedProperties from '../Components/FeaturedProperties';
import Footer from '../Components/Footer';
import CarRentalComponents from '../Components/CarRentalComponents';

function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <HeroSection />
            <SearchBar />
            <FeaturedProperties />
            <CarRentalComponents/>
            {/* <Footer /> */}
        </div>
    );
}

export default Home;
