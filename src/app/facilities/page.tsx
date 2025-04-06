import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Facilities() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/facilities-hero.jpg"
          alt="Facilities at Karunya SPS School"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Facilities</h1>
        </div>
      </section>

      {/* Classrooms Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Modern Classrooms</h2>
              <p className="text-gray-600 mb-4">
                Our classrooms are designed to provide an optimal learning environment with:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Smart boards and digital learning tools</li>
                <li>• Comfortable and ergonomic furniture</li>
                <li>• Proper ventilation and lighting</li>
                <li>• Interactive learning spaces</li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/classroom.jpg"
                alt="Modern Classroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden order-2 md:order-1">
              <Image
                src="/library.jpg"
                alt="School Library"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Well-Stocked Library</h2>
              <p className="text-gray-600 mb-4">
                Our library is a treasure trove of knowledge with:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Extensive collection of books and periodicals</li>
                <li>• Digital resources and e-books</li>
                <li>• Quiet study areas</li>
                <li>• Research assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Facilities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sports Facilities</h2>
              <p className="text-gray-600 mb-4">
                We provide state-of-the-art sports facilities including:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Indoor sports complex</li>
                <li>• Outdoor playgrounds</li>
                <li>• Swimming pool</li>
                <li>• Basketball and tennis courts</li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/sports.jpg"
                alt="Sports Facilities"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Science Labs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden order-2 md:order-1">
              <Image
                src="/lab.jpg"
                alt="Science Laboratory"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Science Laboratories</h2>
              <p className="text-gray-600 mb-4">
                Our well-equipped laboratories include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Physics lab with modern equipment</li>
                <li>• Chemistry lab with safety features</li>
                <li>• Biology lab with specimens</li>
                <li>• Computer lab with latest technology</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Facilities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Cafeteria</h3>
              <p className="text-gray-600">
                A hygienic and well-maintained cafeteria serving nutritious meals and snacks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Medical Room</h3>
              <p className="text-gray-600">
                A fully equipped medical room with trained staff for first aid and emergency care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Transport</h3>
              <p className="text-gray-600">
                Safe and reliable transportation services with GPS tracking and trained drivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 