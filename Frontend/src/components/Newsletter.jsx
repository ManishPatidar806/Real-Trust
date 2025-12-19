import React, { useState } from 'react';
import { newsletterAPI } from '../services/api';
import { SITE_CONTENT } from '../constants/content';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await newsletterAPI.subscribe({ email });
      setMessage({ type: 'success', text: SITE_CONTENT.newsletter.success });
      setEmail('');
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage({ type: 'error', text: SITE_CONTENT.newsletter.alreadySubscribed });
      } else {
        setMessage({ type: 'error', text: error.response?.data?.message || SITE_CONTENT.newsletter.error });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{SITE_CONTENT.newsletter.title}</h2>
          <p className="text-lg text-blue-100">{SITE_CONTENT.newsletter.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              placeholder={SITE_CONTENT.newsletter.placeholder}
            />
            <button type="submit" disabled={loading} className="bg-white text-blue-600 px-7 py-3.5 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap">
              {loading ? 'Subscribing...' : SITE_CONTENT.newsletter.button}
            </button>
          </div>

          {message.text && (
            <div className={`mt-4 p-3.5 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
