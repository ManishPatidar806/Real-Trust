import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageCropper from '../components/ImageCropper';
import { projectAPI, clientAPI, contactAPI, newsletterAPI } from '../services/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('add-project');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [projectForm, setProjectForm] = useState({ name: '', description: '', image: null });
  const [clientForm, setClientForm] = useState({ name: '', designation: '', description: '', image: null });
  const [contactForms, setContactForms] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    if (activeTab === 'view-contacts') {
      fetchContactForms();
    } else if (activeTab === 'view-subscribers') {
      fetchSubscribers();
    }
  }, [activeTab]);

  const fetchContactForms = async () => {
    try {
      const response = await contactAPI.getAll();
      setContactForms(response.data || []);
    } catch (error) {
      console.error('Error fetching contact forms:', error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await newsletterAPI.getAll();
      setSubscribers(response.data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectForm.image) {
      setMessage({ type: 'error', text: 'Please upload and crop an image' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('name', projectForm.name);
      formData.append('description', projectForm.description);
      formData.append('image', projectForm.image);

      await projectAPI.create(formData);
      setMessage({ type: 'success', text: 'Project added successfully!' });
      setProjectForm({ name: '', description: '', image: null });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add project' });
    } finally {
      setLoading(false);
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (!clientForm.image) {
      setMessage({ type: 'error', text: 'Please upload and crop an image' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('name', clientForm.name);
      formData.append('designation', clientForm.designation);
      formData.append('description', clientForm.description);
      formData.append('image', clientForm.image);

      await clientAPI.create(formData);
      setMessage({ type: 'success', text: 'Client added successfully!' });
      setClientForm({ name: '', designation: '', description: '', image: null });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add client' });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-600">Admin Panel</h1>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap border-b">
            <button
              onClick={() => setActiveTab('add-project')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'add-project'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Add Project
            </button>
            <button
              onClick={() => setActiveTab('add-client')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'add-client'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Add Client
            </button>
            <button
              onClick={() => setActiveTab('view-contacts')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'view-contacts'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Contact Forms
            </button>
            <button
              onClick={() => setActiveTab('view-subscribers')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'view-subscribers'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Newsletter Subscribers
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'add-project' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Project</h2>
                <form onSubmit={handleProjectSubmit} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={projectForm.name}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, name: e.target.value })
                      }
                      required
                      className="input-field"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      required
                      rows="4"
                      className="input-field"
                      placeholder="Enter project description"
                    />
                  </div>

                  <ImageCropper
                    onCropComplete={(file) =>
                      setProjectForm({ ...projectForm, image: file })
                    }
                    aspectRatio={450 / 350}
                  />

                  {message.text && (
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? 'Adding Project...' : 'Add Project'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'add-client' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Client</h2>
                <form onSubmit={handleClientSubmit} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={clientForm.name}
                      onChange={(e) =>
                        setClientForm({ ...clientForm, name: e.target.value })
                      }
                      required
                      className="input-field"
                      placeholder="Enter client name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Client Designation *
                    </label>
                    <input
                      type="text"
                      value={clientForm.designation}
                      onChange={(e) =>
                        setClientForm({ ...clientForm, designation: e.target.value })
                      }
                      required
                      className="input-field"
                      placeholder="e.g., CEO at Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Testimonial / Description *
                    </label>
                    <textarea
                      value={clientForm.description}
                      onChange={(e) =>
                        setClientForm({ ...clientForm, description: e.target.value })
                      }
                      required
                      rows="4"
                      className="input-field"
                      placeholder="Enter client testimonial"
                    />
                  </div>

                  <ImageCropper
                    onCropComplete={(file) =>
                      setClientForm({ ...clientForm, image: file })
                    }
                    aspectRatio={450 / 350}
                  />

                  {message.text && (
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? 'Adding Client...' : 'Add Client'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'view-contacts' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Form Submissions
                </h2>
                {contactForms.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Full Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Mobile
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            City
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {contactForms.map((form) => (
                          <tr key={form._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {form.fullName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {form.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {form.mobile}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {form.city}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(form.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No contact form submissions yet.</p>
                )}
              </div>
            )}

            {activeTab === 'view-subscribers' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Newsletter Subscribers
                </h2>
                {subscribers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Subscription Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {subscriber.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(subscriber.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No newsletter subscribers yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
