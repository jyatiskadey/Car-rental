import swift from "../Media/swift.jpg";
import seltos from "../Media/seltos.jpg";
import scorpio from '../Media/scorpio.jpg';

const cars = [
    { id: 1, name: "Suzuki Swift", type: "Luxury", price: "₹18000/day", image: swift },
    { id: 2, name: "Kia Seltos", type: "SUV", price: "₹2200/day", image: seltos },
    { id: 3, name: "Mahindra Scorpio", type: "SUV", price: "₹3800/day", image: scorpio },
];

function FeaturedCars() {
    return (
        <section className="py-12 bg-gray-50">
            <h2 className="text-4xl font-bold text-center text-gray-800">Top Picks for You</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                {cars.map(car => (
                    <div key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={car.image} alt={car.name} className="w-full h-56 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-xl">{car.name}</h3>
                            <p className="text-gray-600">{car.type}</p>
                            <p className="font-semibold text-indigo-600">{car.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedCars;
