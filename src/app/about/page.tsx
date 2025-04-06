import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/about-hero.jpg"
          alt="About Karunya Special School"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">About Us</h1>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Established in 2005, Karunya Special School in Malpe has been dedicated to providing quality education and care for children with special needs. Our journey began with a vision to create an inclusive environment where every child can learn, grow, and thrive.
              </p>
              <p className="text-gray-600">
                Over the years, we have helped numerous children develop essential life skills, achieve their potential, and become more independent. Our dedicated team of special educators, therapists, and support staff work tirelessly to ensure each child receives individualized attention and care.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/school-building.jpg"
                alt="Karunya Special School Building"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• To provide specialized education and therapy services to children with special needs</li>
                <li>• To create a nurturing environment that promotes learning and development</li>
                <li>• To help each child reach their maximum potential</li>
                <li>• To support families in their journey of raising children with special needs</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• To be a leading institution in special education in the region</li>
                <li>• To create an inclusive society that embraces and supports individuals with special needs</li>
                <li>• To empower our students with skills for greater independence</li>
                <li>• To continuously improve our programs and services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4">
                <Image
                  src="/principal.jpg"
                  alt="Principal"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Dr. Sarah Thomas</h3>
              <p className="text-gray-600">Principal</p>
              <p className="mt-2 text-sm text-gray-500">Special Education Expert with 20+ years experience</p>
            </div>
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4">
                <Image
                  src="/coordinator.jpg"
                  alt="Program Coordinator"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Ms. Priya Sharma</h3>
              <p className="text-gray-600">Program Coordinator</p>
              <p className="mt-2 text-sm text-gray-500">Specialized in Curriculum Development</p>
            </div>
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4">
                <Image
                  src="/therapist.jpg"
                  alt="Head Therapist"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Mr. Rajesh Kumar</h3>
              <p className="text-gray-600">Head Therapist</p>
              <p className="mt-2 text-sm text-gray-500">Expert in Occupational and Physical Therapy</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 