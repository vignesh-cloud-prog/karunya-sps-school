import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <main className="pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/contact-hero.jpg"
          alt="Contact Karunya Special School"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/50 to-primary-yellow/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Contact Us</h1>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-yellow/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-primary-blue">Get in Touch</h2>
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-orange">Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Karunya Special School<br />
                      Near Malpe Beach<br />
                      Malpe, Udupi District<br />
                      Karnataka, India
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-orange">Contact Details</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Phone: +91 1234567890<br />
                      Email: info@karunyaspecialschool.org<br />
                      Office Hours: Monday to Friday, 9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="bg-white p-8 rounded-2xl shadow-medium">
                <h3 className="text-2xl font-bold mb-6 text-primary-blue">Send us a Message</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-colors"
                      placeholder="Message subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-colors resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-orange text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-blue transition-colors duration-300 shadow-soft hover:shadow-medium"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-gradient-to-b from-primary-yellow/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-blue">Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-medium hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-primary-orange">Volunteer With Us</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We welcome volunteers who want to make a difference in the lives of our special children. You can help in various areas:
              </p>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-yellow rounded-full mr-3"></span>
                  Teaching assistance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-yellow rounded-full mr-3"></span>
                  Activity coordination
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-yellow rounded-full mr-3"></span>
                  Event organization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-yellow rounded-full mr-3"></span>
                  Administrative support
                </li>
              </ul>
              <button className="bg-primary-blue text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-orange transition-colors duration-300 shadow-soft hover:shadow-medium">
                Apply as Volunteer
              </button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-medium hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-primary-orange">Support Our Cause</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your donation helps us provide better facilities, resources, and care for our special children. Every contribution makes a difference.
              </p>
              <div className="space-y-6">
                <div className="p-6 bg-primary-yellow/5 rounded-xl border border-primary-yellow/20">
                  <h4 className="font-semibold mb-4 text-primary-blue">Bank Details</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Account Name: Karunya Special School<br />
                    Account Number: XXXX XXXX XXXX<br />
                    IFSC Code: XXXX0000XXX<br />
                    Bank: State Bank of India
                  </p>
                </div>
                <button className="w-full bg-primary-orange text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-blue transition-colors duration-300 shadow-soft hover:shadow-medium">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-blue">Our Location</h2>
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-medium">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.4763!2d74.7036!3d13.3487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIwJzU1LjMiTiA3NMKwNDInMTMuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 