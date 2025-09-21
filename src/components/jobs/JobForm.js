import React, { useState, useEffect } from 'react';

const formContainerStyles = {
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const formTitleStyles = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '20px',
};

const formFieldStyles = {
  marginBottom: '15px',
};

const labelStyles = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: '500',
  color: '#555',
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonGroupStyles = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};

const saveButtonStyles = {
  padding: '10px 20px',
  borderRadius: '20px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
};

const cancelButtonStyles = {
  padding: '10px 20px',
  borderRadius: '20px',
  border: '1px solid #ccc',
  backgroundColor: 'transparent',
  color: '#555',
  cursor: 'pointer',
};

const JobForm = ({ job, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        tags: '',
        status: 'active',
    });

    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title,
                slug: job.slug,
                tags: job.tags.join(', '),
                status: job.status,
            });
        }
    }, [job]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()),
        };
        onSave(jobData);
    };

    return (
        <div style={formContainerStyles}>
            <h2 style={formTitleStyles}>{job ? 'Edit Job' : 'Create New Job'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={formFieldStyles}>
                    <label style={labelStyles}>Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={inputStyles}
                    />
                </div>
                <div style={formFieldStyles}>
                    <label style={labelStyles}>Job Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        style={inputStyles}
                    />
                </div>
                <div style={formFieldStyles}>
                    <label style={labelStyles}>Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>
                <div style={formFieldStyles}>
                    <label style={labelStyles}>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyles}
                    >
                        <option value="active">Active</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
                <div style={buttonGroupStyles}>
                    <button type="button" onClick={() => onSave(null)} style={cancelButtonStyles}>Cancel</button>
                    <button type="submit" style={saveButtonStyles}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;