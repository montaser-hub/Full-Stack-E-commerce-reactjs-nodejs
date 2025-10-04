import { useRef } from "react";
import Text from "../SharedElements/Text";
import HeroSlider from "../Components/HeroSlider.jsx";
import ForwardTo from "../SharedElements/ForwardTo.jsx";

export default function LandingPage() {
  const topRef = useRef(null);

  // Sample images for HeroSlider
  // --- Hero Slider Images ---
  const heroImages = [
    "https://images.unsplash.com/photo-1616627982872-9f031b2c631f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1598300051477-b7d1f9c9d03f?auto=format&fit=crop&w=1600&q=80",
  ];

  // --- Featured Categories ---
  const categories = [
    {
      name: "Living Room",
      image:
        "https://images.unsplash.com/photo-1600585154376-8b3d07c6350b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Bedroom",
      image:
        "https://images.unsplash.com/photo-1598300051477-b7d1f9c9d03f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Office",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kitchen",
      image:
        "https://images.unsplash.com/photo-1582582494705-ff9b80b5c9a6?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // --- Image + Text Sections ---
  const sections = [
    {
      title: "Modern furniture for minimalist homes",
      description:
        "Our new exclusive collections designed to transform your living space.",
      image:
        "https://images.unsplash.com/photo-1616627982872-9f031b2c631f?auto=format&fit=crop&w=1200&q=80",
      reverse: false,
    },
    {
      title: "New experience is going to unlock",
      description: "Explore innovative designs crafted for comfort and style.",
      image:
        "https://images.unsplash.com/photo-1598300051477-b7d1f9c9d03f?auto=format&fit=crop&w=1200&q=80",
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
        "https://images.unsplash.com/photo-1600585154376-8b3d07c6350b?auto=format&fit=crop&w=1200&q=80",
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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center space-y-4 px-4">
          <Text
            as="h2"
            content="Upgrade Your Home"
            MyClass="text-3xl sm:text-5xl font-bold text-white"
          />
          {/* Inline paragraph + button container */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-white text-lg sm:text-xl">
              Unlock your home with our innovative designs crafted for comfort
              and style.
            </p>
            <ForwardTo
              content="Register Now"
              to="/register"
              myClass="text-white underline hover:text-blue-300 px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
