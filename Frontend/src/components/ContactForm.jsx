import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { SITE_CONTENT, FORM_PLACEHOLDERS } from '../constants/content';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await contactAPI.create(formData);
      setMessage({ type: 'success', text: SITE_CONTENT.contact.success });
      setFormData({ fullName: '', email: '', mobile: '', city: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || SITE_CONTENT.contact.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">{SITE_CONTENT.contact.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{SITE_CONTENT.contact.title}</h2>
          <p className="text-lg text-gray-600 max-w-xl">{SITE_CONTENT.contact.subtitle}</p>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">{SITE_CONTENT.contact.fields.name}</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={FORM_PLACEHOLDERS.contact.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{SITE_CONTENT.contact.fields.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={FORM_PLACEHOLDERS.contact.email}
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">{SITE_CONTENT.contact.fields.phone}</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={FORM_PLACEHOLDERS.contact.phone}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">{SITE_CONTENT.contact.fields.city}</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={FORM_PLACEHOLDERS.contact.city}
                />
              </div>
            </div>

            {message.text && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="pt-2">
              <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Sending...' : SITE_CONTENT.contact.button}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
