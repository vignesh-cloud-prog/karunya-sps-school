import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Programs() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/programs-hero.jpg"
          alt="Programs at Karunya Special School"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Programs</h1>
        </div>
      </section>

      {/* Special Education Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Special Education Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Early Intervention Program (Ages 3-6)</h3>
              <p className="text-gray-600 mb-6">
                Our early intervention program focuses on developing fundamental skills during the crucial early years. We provide:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Sensory integration activities</li>
                <li>• Basic motor skills development</li>
                <li>• Communication and language development</li>
                <li>• Social interaction skills</li>
                <li>• Pre-academic readiness skills</li>
              </ul>
            </div>
            <div className="relative h-[300px]">
              <Image
                src="/early-intervention.jpg"
                alt="Early Intervention Program"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Therapy Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Therapy Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Speech Therapy</h3>
              <p className="text-gray-600">
                Our speech therapy program helps children improve their communication skills, including:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Speech articulation</li>
                <li>• Language development</li>
                <li>• Alternative communication methods</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Occupational Therapy</h3>
              <p className="text-gray-600">
                We focus on developing daily living skills and motor functions through:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Fine motor skills training</li>
                <li>• Sensory integration</li>
                <li>• Self-care skills</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Physical Therapy</h3>
              <p className="text-gray-600">
                Our physical therapy program helps improve:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Gross motor skills</li>
                <li>• Balance and coordination</li>
                <li>• Strength and endurance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Life Skills Program */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/life-skills.jpg"
                alt="Life Skills Training"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Life Skills Program</h2>
              <p className="text-gray-600 mb-6">
                Our comprehensive life skills program is designed to help students achieve greater independence in their daily lives. We focus on:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>• Personal hygiene and self-care</li>
                <li>• Basic cooking and nutrition</li>
                <li>• Money management</li>
                <li>• Social skills and community integration</li>
                <li>• Basic vocational skills</li>
                <li>• Safety awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vocational Training */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Vocational Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Arts and Crafts</h3>
              <p className="text-gray-600">
                Training in various art forms and handicrafts to develop creative skills and potential income-generating abilities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Computer Skills</h3>
              <p className="text-gray-600">
                Basic computer operations and typing skills to prepare students for modern workplace requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Garden Maintenance</h3>
              <p className="text-gray-600">
                Training in basic gardening and plant care, promoting both vocational skills and therapeutic benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 