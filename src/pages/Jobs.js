import React, { useState } from 'react';

const Jobs = () => {
  const allJobs = [
    {
      title: "Senior React Developer",
      company: "TechSolutions Inc.",
      location: "London, UK (Remote)",
      type: "Full-time",
      category: "IT",
      salary: "£70,000 - £85,000",
      description: "We are looking for an experienced React developer to join our growing team...",
    },
    {
      title: "Aviation Maintenance Engineer",
      company: "AirConnect",
      location: "Manchester, UK",
      type: "Full-time",
      category: "Aviation",
      salary: "£55,000 - £65,000",
      description: "Seeking a certified aviation maintenance engineer with experience in...",
    },
    {
      title: "IT Project Manager",
      company: "Global Systems Ltd",
      location: "Birmingham, UK (Hybrid)",
      type: "Contract",
      category: "IT",
      salary: "£500 - £600 per day",
      description: "Experienced IT project manager needed for a 12-month contract to oversee...",
    },
    {
      title: "Flight Operations Specialist",
      company: "SkyWays Airlines",
      location: "London Heathrow, UK",
      type: "Full-time",
      category: "Aviation",
      salary: "£45,000 - £52,000",
      description: "Join our flight operations team to coordinate and manage daily flight activities...",
    },
  ];

  const [filter, setFilter] = useState({
    category: 'All',
    type: 'All'
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = allJobs.filter(job => {
    // Filter by category
    if (filter.category !== 'All' && job.category !== filter.category) return false;
    
    // Filter by job type
    if (filter.type !== 'All' && job.type !== filter.type) return false;
    
    // Filter by search term
    if (searchTerm && !(
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    )) return false;
    
    return true;
  });

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Available Jobs</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our current openings in the IT and Aviation sectors
          </p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search jobs..."
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value})}
              >
                <option value="All">All Categories</option>
                <option value="IT">IT</option>
                <option value="Aviation">Aviation</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                id="type"
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                value={filter.type}
                onChange={(e) => setFilter({...filter, type: e.target.value})}
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 lg:gap-8">
            {filteredJobs.map((job, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                      <p className="text-gray-600 mt-1">{job.company} • {job.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4">{job.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-900 font-medium">{job.salary}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white shadow-md rounded-lg">
            <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
            <button 
              onClick={() => {
                setFilter({ category: 'All', type: 'All' });
                setSearchTerm('');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;