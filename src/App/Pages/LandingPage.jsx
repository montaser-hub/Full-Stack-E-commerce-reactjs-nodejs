import { useRef } from "react";
import Text from "../SharedElements/Text";
import HeroSlider from "../Components/HeroSlider.jsx";
import ForwardTo from "../SharedElements/ForwardTo.jsx";

export default function LandingPage() {
  const topRef = useRef(null);

  // Sample images for HeroSlider
  // --- Hero Slider Images ---
  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://png.pngtree.com/background/20231029/original/pngtree-contemporary-beige-home-interior-featuring-chic-modern-furniture-3d-render-picture-image_5780852.jpg",
    "https://png.pngtree.com/background/20230618/original/pngtree-a-business-meeting-room-in-an-office-building-3d-rendered-picture-image_3754544.jpg",
    "https://png.pngtree.com/background/20231030/original/pngtree-3d-rendering-of-scandinavian-inspired-living-room-interior-picture-image_5781422.jpg",
    "https://png.pngtree.com/background/20230619/original/pngtree-modern-workspace-with-natural-light-and-sleek-bookshelf-in-3d-picture-image_3851182.jpg",
    "https://png.pngtree.com/background/20250123/original/pngtree-sunlit-living-room-with-large-window-and-plants-stock-photo-picture-image_16011508.jpg",
    "https://png.pngtree.com/background/20250122/original/pngtree-mountain-view-living-room-with-large-windows-and-sofa-picture-image_15778350.jpg",
    "https://png.pngtree.com/thumb_back/fw800/background/20250813/pngtree-modern-living-room-with-minimalist-design-large-windows-neutral-tones-image_17900634.webp",
    "https://png.pngtree.com/background/20230621/original/pngtree-contemporary-villa-with-pool-and-garden-a-striking-3d-rendering-picture-image_3894164.jpg",
    "https://png.pngtree.com/background/20231030/original/pngtree-contemporary-living-room-and-stylish-bookcase-furnished-with-library-accessories-and-picture-image_5796113.jpg"
  ];

  // --- Featured Categories ---
  const categories = [
    {
      name: "Living Room",
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20240912/pngtree-living-room-decoration-image_16178182.jpg",
    },
    {
      name: "Bedroom",
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20230727/pngtree-a-master-bedroom-with-a-bed-image_10201906.jpg",
    },
    {
      name: "Office",
      image:
        "https://png.pngtree.com/background/20250709/original/pngtree-a-modern-minimalist-workspace-featuring-sleek-desk-laptop-and-stylish-office-picture-image_16262595.jpg",
    },
    {
      name: "Kitchen",
      image:
        "https://png.pngtree.com/background/20230718/original/pngtree-luxury-mahogany-kitchen-with-modern-furniture-windows-kitchen-top-photo-picture-image_4249107.jpg",
    },
  ];

  // --- Image + Text Sections ---
  const sections = [
    {
      title: "Modern furniture for minimalist homes",
      description:
        "Our new exclusive collections designed to transform your living space.",
      image:
        "https://png.pngtree.com/background/20250102/original/pngtree-architectural-drawing-of-a-modern-house-plan-blueprint-with-multiple-rooms-picture-image_15762759.jpg",
      reverse: false,
    },
    {
      title: "New experience is going to unlock",
      description: "Explore innovative designs crafted for comfort and style.",
      image:
        "https://png.pngtree.com/background/20230621/original/pngtree-contemporary-villa-with-pool-and-garden-a-striking-3d-rendering-picture-image_3894164.jpg",
      reverse: true,
    },
    {
      title: "Offers up to 50%",
      description: "Get your favorite furniture at unbeatable prices.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      reverse: false,
    },
    {
      title: "Inspiring interiors crafted with passion",
      description: "Unique designs to elevate your home experience.",
      image:
        "https://png.pngtree.com/background/20231017/original/pngtree-swimming-pool-terrace-and-landscape-garden-in-exquisite-exterior-design-of-picture-image_5590264.jpg",
      reverse: true,
    },
  ];


  return (
    <main
      ref={topRef}
      className="bg-gray-50 dark:bg-neutral-900 min-h-screen py-8 px-4 md:px-12 space-y-16"
    >
      {/* Hero Slider */}
      <HeroSlider images={heroImages} />

      {/* Featured Categories */}
      <section className="space-y-6">
        <Text
          as="h2"
          content="Shop by Category"
          MyClass="text-2xl font-semibold text-center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <Text
                  as="span"
                  content={cat.name}
                  MyClass="text-white text-lg font-bold"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image + Text Sections */}
      {sections.map((sec, idx) => (
        <section
          key={idx}
          className={`flex flex-col md:flex-row items-center gap-8 ${
            sec.reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
            <img
              src={sec.image}
              alt={sec.title}
              className="w-full h-64 md:h-96 object-cover transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <Text
              as="h2"
              content={sec.title}
              MyClass="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
            />
            <Text
              as="p"
              content={sec.description}
              MyClass="text-gray-700 dark:text-gray-300 text-lg"
            />
          </div>
        </section>
      ))}

      {/* Promotional / CTA Section */}
      <section className="relative rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Promo"
          className="w-full h-64 sm:h-96 object-cover transform transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 px-4">
  <Text
    as="h2"
    content="Upgrade Your Home"
    MyClass="text-3xl sm:text-5xl font-bold text-white"
  />
  <div className="flex flex-col sm:flex-row items-center gap-4">
    <p className="text-white text-lg sm:text-xl">
      Unlock your home with our innovative designs crafted for comfort
      and style....
    </p>
    <ForwardTo
      content="Register Now"
      to="/register"
      myClass="px-6 py-3 rounded-lg font-semibold 
    bg-gradient-to-r from-green-500 to-green-700 
    text-white shadow-lg 
    transition-transform duration-300 
    hover:scale-105 hover:from-green-600 hover:to-green-800"
    />
  </div>
</div>

      </section>
    </main>
  );
}
