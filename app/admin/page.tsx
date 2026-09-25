'use client';
import { useState, useRef } from 'react';
import { Lock, Unlock, Briefcase, Trophy, Plus, Trash2, CheckCircle, ExternalLink, Mail, Globe } from 'lucide-react';
import Link from 'next/link';

interface ListingItem {
  id: string;
  title: string;
  description: string;
  location: string;
  deadline: string;
  image: string;
  registerUrl?: string;
  applyEmail?: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'careers' | 'hackathons'>('careers');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // Hackathon specific fields
  const [regType, setRegType] = useState<'url' | 'email'>('url');
  const [registerUrl, setRegisterUrl] = useState('');
  const [applyEmail, setApplyEmail] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample initial data lists
  const [careers, setCareers] = useState<ListingItem[]>([
    {
      id: '1',
      title: 'Full Stack React Developer',
      description: 'Looking for experienced developers proficient in Next.js, Node.js, and Tailwind CSS.',
      location: 'Madurai / Remote',
      deadline: '2026-04-30',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    }
  ]);

  const [hackathons, setHackathons] = useState<ListingItem[]>([
    {
      id: '1',
      title: 'RoboWeb AI Hackathon 2026',
      description: 'Build innovative generative AI or automation solutions over 48 hours and win cash prizes.',
      location: 'Online & On-Campus',
      deadline: '2026-05-15',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
      registerUrl: 'https://lu.ma/example',
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'roboweb2026') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password! Try "roboweb2026"');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newItem: ListingItem = {
      id: Date.now().toString(),
      title,
      description,
      location: location || 'Madurai, India',
      deadline: deadline || '2026-12-31',
      image: imagePreview || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80',
      ...(activeTab === 'hackathons' && {
        registerUrl: regType === 'url' ? registerUrl : undefined,
        applyEmail: regType === 'email' ? applyEmail : undefined,
      })
    };

    if (activeTab === 'careers') {
      setCareers([newItem, ...careers]);
    } else {
      setHackathons([newItem, ...hackathons]);
    }

    // Reset form fields
    setTitle('');
    setDescription('');
    setLocation('');
    setDeadline('');
    setImagePreview('');
    setRegisterUrl('');
    setApplyEmail('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteItem = (id: string) => {
    if (activeTab === 'careers') {
      setCareers(careers.filter(item => item.id !== id));
    } else {
      setHackathons(hackathons.filter(item => item.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-xs text-slate-400">RoboWeb Technologies Management System</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Admin Password</label>
              <input
                type="password"
                placeholder="Enter password (hint: roboweb2026)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/20 text-sm"
            >
              Authorize Login
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentList = activeTab === 'careers' ? careers : hackathons;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Unlock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Admin Dashboard</h1>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Secure Session Active
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition">
              View Website
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('careers')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'careers'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Manage Careers ({careers.length})
          </button>
          <button
            onClick={() => setActiveTab('hackathons')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'hackathons'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" /> Manage Hackathons ({hackathons.length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Add New Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white capitalize">
                Add New {activeTab === 'careers' ? 'Job Opening' : 'Hackathon'}
              </h2>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter role details or event description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location / Mode</label>
                  <input
                    type="text"
                    placeholder="e.g. Madurai / Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Hackathon Specific Options: Register URL vs Apply via Mail */}
              {activeTab === 'hackathons' && (
                <div className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-medium text-slate-300">Application Method</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                      <input
                        type="radio"
                        name="regType"
                        checked={regType === 'url'}
                        onChange={() => setRegType('url')}
                        className="accent-blue-500"
                      />
                      Register URL
                    </label>
                    <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                      <input
                        type="radio"
                        name="regType"
                        checked={regType === 'email'}
                        onChange={() => setRegType('email')}
                        className="accent-blue-500"
                      />
                      Apply via Mail
                    </label>
                  </div>

                  {regType === 'url' ? (
                    <input
                      type="url"
                      placeholder="https://lu.ma/event-register"
                      value={registerUrl}
                      onChange={(e) => setRegisterUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 mt-2"
                      required
                    />
                  ) : (
                    <input
                      type="email"
                      placeholder="apply@robowebtechnologies.co.in"
                      value={applyEmail}
                      onChange={(e) => setApplyEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 mt-2"
                      required
                    />
                  )}
                </div>
              )}

              {/* Image Upload with Clear/Unselect Feature */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Banner Image</label>
                {!imagePreview ? (
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer bg-slate-950 border border-slate-800 rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-slate-800" />
                      <span className="text-xs text-slate-300 font-mono">Image attached</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 text-xs font-semibold transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/20 text-sm flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Publish {activeTab === 'careers' ? 'Job Opening' : 'Hackathon'}
              </button>
            </form>
          </div>

          {/* Right Column: Active Listings Management */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-white">
              Active {activeTab === 'careers' ? 'Careers Listings' : 'Hackathon Events'} ({currentList.length})
            </h2>

            {currentList.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                No active listings found. Use the form to add one.
              </div>
            ) : (
              <div className="space-y-4">
                {currentList.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start justify-between hover:border-slate-700 transition"
                  >
                    <div className="flex gap-4 items-start w-full">
                      {/* Fixed Aspect Ratio Image Container to prevent stretching */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-800 shrink-0 bg-slate-950">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className="font-bold text-white text-base">{item.title}</h3>
                        <p className="text-slate-400 text-xs line-clamp-2">{item.description}</p>
                        
                        {/* Action buttons preview if hackathon */}
                        {item.registerUrl && (
                          <div className="inline-flex items-center gap-1 text-xs text-blue-400 pt-1">
                            <Globe className="w-3 h-3" /> URL: {item.registerUrl}
                          </div>
                        )}
                        {item.applyEmail && (
                          <div className="inline-flex items-center gap-1 text-xs text-emerald-400 pt-1">
                            <Mail className="w-3 h-3" /> Email: {item.applyEmail}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-slate-500">
                          <span>📍 {item.location}</span>
                          <span>⏳ Deadline: {item.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}