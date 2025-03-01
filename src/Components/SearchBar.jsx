function SearchBar() {
    return (
        <div id="search" className="relative -mt-16 z-20 mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-wrap gap-4 justify-center">
            <input type="text" placeholder="Pickup Location" className="border p-3 w-full sm:w-auto flex-1 rounded-lg" />
            <input type="date" className="border p-3 w-full sm:w-auto flex-1 rounded-lg" />
            <select className="border p-3 w-full sm:w-auto flex-1 rounded-lg">
                <option>Choose Car Type</option>
                <option>Luxury</option>
                <option>SUV</option>
                <option>Convertible</option>
                <option>Economy</option>
            </select>
            <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg">Search Cars</button>
        </div>
    );
}

export default SearchBar;
