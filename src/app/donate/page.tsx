import Image from 'next/image';

export default function DonatePage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F4A460] mb-12 text-center">
          Support Our Cause
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bank Account Details */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bank Account Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-2">UPI ID</h3>
                <p className="text-gray-700 text-lg">9742352647@upiQ43849429@upi</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-2">Account No.</h3>
                <p className="text-gray-700 text-lg">0618101040229</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-2">Bank Name</h3>
                <p className="text-gray-700 text-lg">Canara Bank, Court Road Branch, Udupi</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-2">IFSC Code</h3>
                <p className="text-gray-700 text-lg">CNRB0000618</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-600">
                All donations are eligible for tax savings under 80G.
              </p>
            </div>
          </div>

          {/* UPI QR Code */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <Image
                src="/upi-logo.png"
                alt="UPI Logo"
                width={200}
                height={50}
                className="mx-auto mb-4"
              />
              <h2 className="text-xl text-gray-700">
                BHIM UPI Payments Accepted at
                <br />
                <span className="font-semibold">KARUNYA SPECIAL SCHOOL</span>
              </h2>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64">
                <Image
                  src="/upi-qr.png"
                  alt="UPI QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 mb-8">
              <p>Account Number : 0618101040229, IFSC Code: CNRB0000618</p>
              <p>Scan and Pay using any UPI supported Apps</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                'imobile.png', 'bhim.png', 'phonepe.png',
                'paytm.png', 'sbi.png', 'gpay.png',
                'rbl.png', 'dbs.png', 'pnb.png',
                'yes.png', 'axis.png', 'chillr.png',
                'union.png', 'hdfc.png', 'baroda.png',
                'indus.png', 'boi.png', 'maha.png'
              ].map((icon, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Image
                    src={`/upi-icons/${icon}`}
                    alt={icon.split('.')[0]}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your contribution helps us provide better facilities and care for our children. 
            Every donation, no matter how small, makes a difference in their lives.
          </p>
        </div>
      </div>
    </main>
  );
} 