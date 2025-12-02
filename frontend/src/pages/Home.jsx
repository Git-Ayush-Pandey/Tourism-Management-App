import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { destinationService } from '../services/destinationService';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  // Load featured destinations dynamically
  useEffect(() => {
    loadFeatured();
  }, []);

  const loadFeatured = async () => {
    try {
      const data = await destinationService.getAll(); // load all
      const picks = ["Dal Lake", "Gulmarg", "Vaishno Devi", "Pangong Lake", "Leh", "Patnitop"];
      const filtered = data.filter(d => picks.includes(d.name)).slice(0, 6);
      setFeatured(filtered);
    } catch (e) {
      console.error("Failed to load featured destinations", e);
    }
  };

  const fallbackImage = "https://via.placeholder.com/600x400?text=Destination";

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Discover Jammu, Kashmir & Ladakh</h1>
          <p className="text-xl mb-8">Experience the breathtaking beauty of the Himalayas</p>

          <div className="flex justify-center gap-4">
            <Link to="/destinations" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Explore Destinations
            </Link>
            <Link to="/packages" className="bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition">
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE BY REGION */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore by Region</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["Jammu", "Kashmir", "Ladakh"].map(region => (
            <Link 
              key={region}
              to={`/destinations?region=${region}`}
              className="card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-6xl mb-4">
                {region === "Jammu" ? "🏔️" : region === "Kashmir" ? "🌺" : "⛰️"}
              </div>
              <h3 className="text-2xl font-bold mb-2">{region}</h3>
              <p className="text-gray-600">
                {region === "Jammu" && "The city of temples and heritage"}
                {region === "Kashmir" && "Paradise on Earth"}
                {region === "Ladakh" && "Land of high passes"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Destinations</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.length === 0 ? (
              <p className="text-center w-full text-gray-500">Loading featured destinations...</p>
            ) : (
              featured.map(dest => (
                <Link 
                  key={dest._id}
                  to={`/destinations/${dest._id}`}
                  className="card overflow-hidden rounded-xl shadow hover:scale-[1.02] transition-transform bg-white"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={dest.image || fallbackImage}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                    <p className="text-gray-600">Region: {dest.region}</p>
                    {dest.best_season && (
                      <p className="text-gray-600">Best Season: {dest.best_season}</p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { count: "66+", label: "Destinations" },
            { count: "100+", label: "Hotels" },
            { count: "30+", label: "Tour Packages" },
            { count: "10K+", label: "Happy Tourists" },
          ].map(stat => (
            <div key={stat.label} className="card p-6">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stat.count}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
