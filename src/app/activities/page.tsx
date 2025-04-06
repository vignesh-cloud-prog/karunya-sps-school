import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Activities() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/activities-hero.jpg"
          alt="Activities at Karunya Special School"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Activities</h1>
        </div>
      </section>

      {/* Therapeutic Activities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Therapeutic Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative h-48 mb-4">
                <Image
                  src="/yoga.jpg"
                  alt="Yoga Classes"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Yoga Classes</h3>
              <p className="text-gray-600">
                Regular yoga sessions to improve flexibility, balance, and concentration. Our trained instructors adapt poses to suit each child's abilities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative h-48 mb-4">
                <Image
                  src="/music-therapy.jpg"
                  alt="Music Therapy"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Music Therapy</h3>
              <p className="text-gray-600">
                Interactive music sessions that help develop communication skills, emotional expression, and motor coordination.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative h-48 mb-4">
                <Image
                  src="/art-therapy.jpg"
                  alt="Art Therapy"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Art Therapy</h3>
              <p className="text-gray-600">
                Creative art sessions that promote self-expression, fine motor skills, and emotional development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports and Recreation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sports and Recreation</h2>
              <p className="text-gray-600 mb-6">
                We believe in the power of sports and recreational activities to promote physical development, social interaction, and joy. Our activities include:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>• Adapted physical education</li>
                <li>• Swimming sessions</li>
                <li>• Indoor games and sports</li>
                <li>• Outdoor play activities</li>
                <li>• Group games for social interaction</li>
              </ul>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/sports.jpg"
                alt="Sports Activities"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Activities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Cultural Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Dance</h3>
              <p className="text-gray-600">
                Movement therapy and dance sessions adapted for different abilities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Drama</h3>
              <p className="text-gray-600">
                Theater activities to build confidence and social skills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Festivals</h3>
              <p className="text-gray-600">
                Celebration of various festivals to promote cultural awareness.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Annual Day</h3>
              <p className="text-gray-600">
                Yearly celebration showcasing students' talents and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Integration */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Community Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Field Trips</h3>
              <p className="text-gray-600">
                Regular visits to parks, museums, and local attractions to promote community interaction and learning in real-world settings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Community Events</h3>
              <p className="text-gray-600">
                Participation in community events and exhibitions to showcase our students' talents and promote awareness about special needs education.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 