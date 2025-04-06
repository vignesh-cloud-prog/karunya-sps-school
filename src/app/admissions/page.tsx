import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admissions() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/admissions-hero.jpg"
          alt="Admissions at Karunya SPS School"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Admissions</h1>
        </div>
      </section>

      {/* Admission Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Admission Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We welcome applications from students who are eager to learn and grow in a nurturing environment. Our admission process is designed to be transparent and straightforward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-4">Application</h3>
              <p className="text-gray-600">
                Submit the online application form along with required documents and application fee.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-4">Assessment</h3>
              <p className="text-gray-600">
                Students will be assessed through an entrance test and interview process.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-4">Admission</h3>
              <p className="text-gray-600">
                Selected students will receive admission offers and complete the enrollment process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Admission Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Documents Required</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Birth Certificate</li>
                <li>• Previous School Records</li>
                <li>• Passport-sized Photographs</li>
                <li>• Transfer Certificate</li>
                <li>• Medical Certificate</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Age Criteria</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Pre-KG: 3+ years</li>
                <li>• LKG: 4+ years</li>
                <li>• UKG: 5+ years</li>
                <li>• Grade 1: 6+ years</li>
                <li>• And so on...</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Fee Structure</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Tuition Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Fee</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pre-KG to Grade 5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹50,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹10,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Grade 6 to 8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹60,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹15,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Grade 9 to 12</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹70,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹20,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Admissions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              For any queries regarding admissions, please contact our admissions office.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Admissions Office</h3>
              <p className="text-gray-600">
                Phone: +91 1234567890<br />
                Email: admissions@karunyaspschool.edu<br />
                Hours: Monday - Friday, 9:00 AM - 5:00 PM
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
              <p className="text-gray-600">
                Karunya SPS School<br />
                123 Education Street<br />
                City, State - 123456
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 