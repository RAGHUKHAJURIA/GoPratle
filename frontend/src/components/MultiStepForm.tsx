"use client";

import React, { useState } from 'react';
import { useApi, RequirementPayload } from '@/context/ApiContext';

export default function MultiStepForm() {
  const { submitRequirement, isLoading, error } = useApi();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
    category: "" as "planner" | "performer" | "crew" | "",
    budget: "",
    expertise: "",
    crewRole: "",
    equipments: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (cat: "planner" | "performer" | "crew") => {
    setFormData({ ...formData, category: cat });
  };

  const nextStep = () => {
    // Validate basics
    if (step === 1) {
      if (!formData.eventName || !formData.eventType || !formData.startDate || !formData.location || !formData.category) {
        alert("Please fill all required fields and select a category.");
        return;
      }
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async () => {
    // validate cat details
    if (formData.category === "planner" && !formData.budget) return alert("Budget is required for Planner");
    if (formData.category === "performer" && !formData.expertise) return alert("Expertise is required for Performer");
    if (formData.category === "crew" && !formData.crewRole) return alert("Role is required for Crew");

    const payload: RequirementPayload = {
      eventName: formData.eventName,
      eventType: formData.eventType,
      date: {
        start: formData.startDate,
        ...(formData.endDate ? { end: formData.endDate } : {})
      },
      location: formData.location,
      venue: formData.venue || undefined,
      category: formData.category,
    };

    if (formData.category === "planner") payload.plannerDetails = { budget: formData.budget };
    if (formData.category === "performer") payload.performerDetails = { expertise: formData.expertise };
    if (formData.category === "crew") {
      payload.crewDetails = {
        role: formData.crewRole,
        equipments: formData.equipments
      };
    }

    const success = await submitRequirement(payload);
    if (success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-panel success-message">
        <div className="success-icon">✓</div>
        <h2>Requirement Posted!</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          Your requirement for a {formData.category} has been successfully submitted.
        </p>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '2rem' }}
          onClick={() => window.location.reload()}
        >
          Post Another
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          {error}
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="form-step-title"><span>1</span> Event Basics</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Event Name *</label>
              <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="e.g. Summer Music Fest" />
            </div>
            <div className="form-group">
              <label>Event Type *</label>
              <input name="eventType" value={formData.eventType} onChange={handleChange} placeholder="e.g. Concert" />
            </div>
            <div className="form-group">
              <label>Start Date *</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>End Date (Optional)</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input name="location" value={formData.location} onChange={handleChange} placeholder="City, State" />
            </div>
            <div className="form-group">
              <label>Venue (Optional)</label>
              <input name="venue" value={formData.venue} onChange={handleChange} placeholder="Specific Hall or Studio" />
            </div>

            <div className="form-group full-width" style={{ marginTop: '1rem' }}>
              <label>Who are you hiring? *</label>
              <div className="category-selection">
                <div className={`category-card ${formData.category === 'planner' ? 'selected' : ''}`} onClick={() => handleCategorySelect('planner')}>
                  <h3>Event Planner</h3>
                  <p>Organizers, decorators, managers</p>
                </div>
                <div className={`category-card ${formData.category === 'performer' ? 'selected' : ''}`} onClick={() => handleCategorySelect('performer')}>
                  <h3>Performer</h3>
                  <p>Singers, bands, DJs, dancers</p>
                </div>
                <div className={`category-card ${formData.category === 'crew' ? 'selected' : ''}`} onClick={() => handleCategorySelect('crew')}>
                  <h3>Crew / Tech</h3>
                  <p>Sound, lighting, stage hands</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="btn-row">
            <button className="btn btn-primary" onClick={nextStep}>Next Step</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="form-step-title"><span>2</span> Category Specifics</h2>
          
          <div className="form-grid">
            {formData.category === 'planner' && (
              <div className="form-group full-width">
                <label>Estimated Budget ($) *</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. 5000" />
              </div>
            )}

            {formData.category === 'performer' && (
              <div className="form-group full-width">
                <label>Required Expertise / Style *</label>
                <input name="expertise" value={formData.expertise} onChange={handleChange} placeholder="e.g. Jazz Singer, Hip Hop DJ" />
              </div>
            )}

            {formData.category === 'crew' && (
              <>
                <div className="form-group full-width">
                  <label>Specific Role *</label>
                  <select name="crewRole" value={formData.crewRole} onChange={handleChange}>
                    <option value="">Select a role</option>
                    <option value="Sound Engineer">Sound Engineer</option>
                    <option value="Lighting Tech">Lighting Tech</option>
                    <option value="Stage Hand">Stage Hand</option>
                    <option value="Videographer">Videographer</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Required Equipments (Optional)</label>
                  <textarea name="equipments" value={formData.equipments} onChange={handleChange} placeholder="List any tools they need to bring themselves..." rows={3}></textarea>
                </div>
              </>
            )}
          </div>

          <div className="btn-row">
            <button className="btn btn-secondary" onClick={prevStep}>Back</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Requirement'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
