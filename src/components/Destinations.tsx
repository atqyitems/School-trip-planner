import { useState, ChangeEvent } from "react";
import {
  MapPin,
  Clock,
  Star,
  Plus,
  X,
  Camera,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Image Imports
import destinationSataflia from "@/assets/destination-sataflia.jpg";
import destinationGelati from "@/assets/destination-gelati.jpg";
import destinationSignagi from "@/assets/destination-signagi.jpg";
import destinationMotsameta from "@/assets/destination-motsameta.jpg";

interface Destination {
  name: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  tags: string[];
}

const initialDestinations: Destination[] = [
  {
    name: "Sataflia",
    description:
      "Explore dinosaur footprints, ancient caves, and stunning glass walkways in this natural wonder.",
    image: destinationSataflia,
    duration: "Full Day",
    rating: 4.9,
    tags: ["Nature", "Science"],
  },
  {
    name: "Gelati Monastery",
    description:
      "UNESCO World Heritage site with breathtaking medieval frescoes and rich Georgian history.",
    image: destinationGelati,
    duration: "Half Day",
    rating: 4.8,
    tags: ["History", "UNESCO"],
  },
  {
    name: "Signagi",
    description:
      "The 'City of Love' with panoramic Alazani Valley views and charming cobblestone streets.",
    image: destinationSignagi,
    duration: "Full Day",
    rating: 4.9,
    tags: ["Culture", "Wine"],
  },
  {
    name: "Motsameta",
    description:
      "Cliff-edge monastery surrounded by lush forests and the scenic Tskaltsitela River canyon.",
    image: destinationMotsameta,
    duration: "Half Day",
    rating: 4.7,
    tags: ["Nature", "Scenic"],
  },
];

const Destinations = () => {
  const [allDestinations, setAllDestinations] =
    useState<Destination[]>(initialDestinations);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("5.0");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
    }
  };

  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) return alert("Please add a name and image!");

    const newTrip: Destination = {
      name,
      description: description || "An exciting new journey awaits.",
      image: image,
      duration: "Flexible",
      rating: parseFloat(rating) || 5.0,
      tags: ["New Adventure"],
    };

    setAllDestinations([newTrip, ...allDestinations]);
    setName("");
    setDescription("");
    setImage(null);
    setShowForm(false);
  };

  const displayedDestinations = showAll
    ? allDestinations
    : allDestinations.slice(0, 4);

  return (
    <section
      id="destinations"
      className="py-24 lg:py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                Top Experiences
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
              Georgia's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Hidden Treasures
              </span>
            </h2>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full px-8 py-6 h-auto text-lg shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
          >
            {showForm ? <X className="mr-2" /> : <Plus className="mr-2" />}
            {showForm ? "Cancel" : "Add Your Trip"}
          </Button>
        </div>

        {/* Improved Add Trip Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-20 p-1 bg-gradient-to-br from-primary/20 to-transparent rounded-[2rem]">
            <div className="bg-card backdrop-blur-xl p-8 md:p-10 rounded-[1.8rem] shadow-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Camera className="text-primary" /> Share a New Destination
              </h3>
              <form
                onSubmit={handleAddTrip}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold ml-1 mb-2 block">
                    Destination Name
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:ring-2 ring-primary/20 outline-none transition-all"
                    placeholder="e.g. Martvili Canyon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold ml-1 mb-2 block">
                    Brief Story
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:ring-2 ring-primary/20 outline-none transition-all"
                    placeholder="Describe the magic of this place..."
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold ml-1 mb-2 block">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    className="w-full px-4 py-3 rounded-xl border bg-background/50 focus:ring-2 ring-primary/20 outline-none transition-all"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold ml-1 mb-2 block">
                    Photo
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      {image ? "Image Selected ✓" : "Upload Image"}
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="md:col-span-2 py-6 rounded-xl font-bold text-lg"
                >
                  Publish to Gallery
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Grid with improved cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedDestinations.map((destination, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-[2rem] overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                {/* Glass Badges */}
                <div className="absolute top-4 right-4 backdrop-blur-md bg-white/20 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{" "}
                  {destination.rating}
                </div>

                <div className="absolute bottom-4 left-4 backdrop-blur-md bg-black/40 border border-white/10 text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-primary-foreground" />{" "}
                  {destination.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {destination.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                  {destination.description}
                </p>
                <Button
                  variant="secondary"
                  className="w-full rounded-xl group-hover:bg-primary group-hover:text-white transition-all"
                >
                  Explore Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Toggle */}
        <div className="text-center mt-16">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="hover:bg-primary/5 text-primary font-bold gap-2 px-10"
          >
            {showAll ? "Show Less" : "View All Destinations"}
            <Plus
              className={`transition-transform duration-300 ${showAll ? "rotate-45" : ""}`}
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
