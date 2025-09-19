import React from 'react';

const HomePage = () => {
  return (
    <div className="font-sans text-gray-800 bg-white">

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">CareerLink</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your Gateway to Dream Jobs & Top Talent
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What CareerLink Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Features */}
            {[
              {
                icon: 'https://cdn-icons-png.flaticon.com/512/1008/1008103.png',
                title: 'Find Jobs Easily',
                text: 'Search thousands of curated job listings tailored to your skills and goals.',
              },
              {
                icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                title: 'Professional Profiles',
                text: 'Build a standout profile and attract the right opportunities.',
              },
              {
                icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077046.png',
                title: 'Hire the Best',
                text: 'Post jobs, review applications, and hire quality candidates fast.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-14 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-gray-600 mb-6">
            CareerLink connects job seekers and employers in a fast, easy-to-use platform.
          </p>
          <a
            href="/register"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Join Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;