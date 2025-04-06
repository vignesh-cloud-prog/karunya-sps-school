import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Academics() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/academics-hero.jpg"
          alt="Academics at Karunya SPS School"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Academics</h1>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Curriculum</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Karunya SPS School, we follow a comprehensive curriculum that combines academic excellence with holistic development. Our curriculum is designed to prepare students for the challenges of the 21st century.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Primary School</h3>
              <p className="text-gray-600 mb-4">
                Our primary school program focuses on building strong foundations in core subjects while nurturing creativity and curiosity.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Grades 1-5</li>
                <li>• Interactive Learning</li>
                <li>• Activity-Based Education</li>
                <li>• Basic Computer Skills</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Middle School</h3>
              <p className="text-gray-600 mb-4">
                The middle school program emphasizes critical thinking and problem-solving skills while maintaining academic rigor.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Grades 6-8</li>
                <li>• Advanced Mathematics</li>
                <li>• Science Experiments</li>
                <li>• Language Development</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">High School</h3>
              <p className="text-gray-600 mb-4">
                Our high school program prepares students for higher education and professional careers through specialized streams.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Grades 9-12</li>
                <li>• Science Stream</li>
                <li>• Commerce Stream</li>
                <li>• Arts Stream</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Special Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">STEM Education</h3>
              <p className="text-gray-600 mb-4">
                Our STEM program integrates Science, Technology, Engineering, and Mathematics to foster innovation and problem-solving skills.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Robotics Club</li>
                <li>• Science Fairs</li>
                <li>• Coding Classes</li>
                <li>• Math Olympiad</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Arts & Culture</h3>
              <p className="text-gray-600 mb-4">
                We believe in the importance of arts and culture in developing well-rounded individuals.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Music Classes</li>
                <li>• Dance Academy</li>
                <li>• Art Studio</li>
                <li>• Drama Club</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Academic Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Board Results</h3>
              <p className="text-gray-600">
                Our students consistently achieve outstanding results in board examinations, with many securing top ranks in the state.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Scholarships</h3>
              <p className="text-gray-600">
                Numerous students have received prestigious scholarships for higher education in India and abroad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 