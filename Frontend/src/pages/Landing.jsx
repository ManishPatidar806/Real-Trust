import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import { projectAPI, clientAPI } from '../services/api';
import { SITE_CONTENT, NAV_LINKS } from '../constants/content';

const Landing = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsResponse, clientsResponse] = await Promise.all([
        projectAPI.getAll(),
        clientAPI.getAll(),
      ]);
      setProjects(projectsResponse.data || []);
      setClients(clientsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">Real Trust</h1>
            </div>

            <div className="hidden md:flex items-center space-x-7">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-600 hover:text-gray-900 text-sm font-medium">{link.label}</a>
              ))}
              <Link to="/admin" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Admin</Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 mt-1">
              <div className="flex flex-col space-y-3 pt-4">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} className="text-gray-600 hover:text-gray-900 text-sm font-medium">{link.label}</a>
                ))}
                <Link to="/admin" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium text-center inline-block">Admin</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="hero" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {SITE_CONTENT.hero.title}
            <br />
            {SITE_CONTENT.hero.titleHighlight}
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            {SITE_CONTENT.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#projects" className="px-7 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">{SITE_CONTENT.hero.cta.primary}</a>
            <a href="#contact" className="px-7 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">{SITE_CONTENT.hero.cta.secondary}</a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center">
            {SITE_CONTENT.about.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">{SITE_CONTENT.about.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">{SITE_CONTENT.about.title}</h2>
              {SITE_CONTENT.about.description.map((para, idx) => (
                <p key={idx} className={idx === 0 ? "text-lg text-gray-600 mb-5 leading-relaxed" : "text-base text-gray-600 leading-relaxed"}>
                  {para}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                {SITE_CONTENT.about.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {SITE_CONTENT.about.stats.map((stat, idx) => (
                <div key={idx} className={idx === 2 ? "bg-blue-600 p-6 rounded-xl text-white shadow-sm" : "bg-white p-6 rounded-xl border border-gray-200 shadow-sm"}>
                  <div className={idx === 2 ? "text-3xl font-bold mb-1" : "text-3xl font-bold text-gray-900 mb-1"}>{stat.value}</div>
                  <div className={idx === 2 ? "text-blue-100 text-sm" : "text-gray-600 text-sm"}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">{SITE_CONTENT.projects.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{SITE_CONTENT.projects.title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl">{SITE_CONTENT.projects.subtitle}</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm p-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600 text-lg">{SITE_CONTENT.projects.emptyState}</p>
            </div>
          )}
        </div>
      </section>

      <section id="clients" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">{SITE_CONTENT.clients.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{SITE_CONTENT.clients.title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl">{SITE_CONTENT.clients.subtitle}</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
            </div>
          ) : clients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client) => (
                <ClientCard key={client._id} client={client} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl shadow-sm p-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-600 text-lg">{SITE_CONTENT.clients.emptyState}</p>
            </div>
          )}
        </div>
      </section>

      <ContactForm />

      <Newsletter />

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-3">Real Trust</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{SITE_CONTENT.footer.tagline}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">{SITE_CONTENT.footer.sections.navigation}</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}><a href={link.href} className="text-gray-400 hover:text-white text-sm">{link.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">{SITE_CONTENT.footer.sections.contact}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>{SITE_CONTENT.footer.contact.email}</li>
                <li>{SITE_CONTENT.footer.contact.phone}</li>
              </ul>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm text-center">© {new Date().getFullYear()} Company. {SITE_CONTENT.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
