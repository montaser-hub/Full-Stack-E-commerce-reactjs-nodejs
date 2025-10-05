import { useRef } from "react";
import Text from "../SharedElements/Text";
import HeroSlider from "../Components/HeroSlider.jsx";
import ForwardTo from "../SharedElements/ForwardTo.jsx";

export default function LandingPage() {
  const topRef = useRef(null);

  // Sample images for HeroSlider
  // --- Hero Slider Images ---
    const heroImages = [
      "./Images/LandingBage/Slider/1.avif",
      "./Images/LandingBage/Slider/2.jpg",
      "./Images/LandingBage/Slider/3.jpg",
      "./Images/LandingBage/Slider/4.jpg",
      "./Images/LandingBage/Slider/5.jpg",
      "./Images/LandingBage/Slider/6.jpg",
      "./Images/LandingBage/Slider/7.jpg",
      "./Images/LandingBage/Slider/8.webp",
      "./Images/LandingBage/Slider/9.png",
      "./Images/LandingBage/Slider/10.jpg"    
    ];

  // --- Featured Categories ---
  const categories = [
    {
      name: "Living Room",
      image:
        "./Images/LandingBage/Categories/LivingRoom.jpg",
    },
    {
      name: "Bedroom",
      image:
        "./Images/LandingBage/Categories/Bedroom.jpg",
    },
    {
      name: "Office",
      image:
        "./Images/LandingBage/Categories/Office.jpg",
    },
    {
      name: "Kitchen",
      image:
        "./Images/LandingBage/Categories/Kitchen.jpg",
    },
  ];

  // --- Image + Text Sections ---
  const sections = [
    {
      title: "Modern furniture for minimalist homes",
      description:
        "Our new exclusive collections designed to transform your living space.",
      image:
        "./Images/LandingBage/Show/1.jpg",
      reverse: false,
    },
    {
      title: "New experience is going to unlock",
      description: "Explore innovative designs crafted for comfort and style.",
      image:
        "./Images/LandingBage/Show/2.png",
      reverse: true,
    },
    {
      title: "Offers up to 50%",
      description: "Get your favorite furniture at unbeatable prices.",
      image:
        "./Images/LandingBage/Slider/1.avif",
      reverse: false,
    },
    {
      title: "Inspiring interiors crafted with passion",
      description: "Unique designs to elevate your home experience.",
      image:
        "./Images/LandingBage/Show/3.jpg",
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
          src="./Images/LandingBage/Slider/1.avif"
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
      myClass="bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)] text-white hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] active:scale-95  inline-block px-8 py-3 rounded-full font-semibold 
                shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-green-300"
    />
  </div>
</div>

      </section>
    </main>
  );
}
