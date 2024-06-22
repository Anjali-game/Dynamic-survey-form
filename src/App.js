import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import FormSection from './FormSection';
import useForm from './hooks/useForm';
import validate from './validateInfo';
import './App.css';

export const FormContext = createContext();

const App = () => {
  const [surveyTopic, setSurveyTopic] = useState('');
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const { handleChange, values, handleSubmit, errors } = useForm(validate, submitForm);
  const [submitted, setSubmitted] = useState(false);

  function fetchAdditionalQuestions(topic) {
    axios.defaults.withCredentials = true
    return axios.get(`https://api.example.com/questions?topic=${topic}`)
      .then(response => response.data)
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        return [];
      });
  }

  async function submitForm() {
    const additionalQuestions = await fetchAdditionalQuestions(surveyTopic);
    setAdditionalQuestions(additionalQuestions);
    setSubmittedData(values);
    setSubmitted(true);
  }

  useEffect(() => {
    if (submittedData) {
      fetchAdditionalQuestions(surveyTopic).then(setAdditionalQuestions);
    }
  }, [submittedData, surveyTopic]);

  return (
    <FormContext.Provider value={{ handleChange, values, errors }}>
      <div className="app">
        <h1>Survey Form</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" onChange={handleChange} value={values.fullName} />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} value={values.email} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Survey Topic</label>
              <select name="surveyTopic" onChange={(e) => { handleChange(e); setSurveyTopic(e.target.value); }} value={values.surveyTopic}>
                <option value="">Select</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
              {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
            </div>

            {surveyTopic && <FormSection topic={surveyTopic} />}

            <div className="form-group">
              <label>Feedback</label>
              <textarea name="feedback" onChange={handleChange} value={values.feedback} />
              {errors.feedback && <p className="error">{errors.feedback}</p>}
            </div>

            <button type="submit">Submit</button>
          </form>
        ) : (
          <div className="form-summary">
            <h2>Form Submitted</h2>
            <p><strong>Full Name:</strong> {submittedData.fullName}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Survey Topic:</strong> {submittedData.surveyTopic}</p>
            {submittedData.surveyTopic === 'Technology' && (
              <>
                <p><strong>Favorite Programming Language:</strong> {submittedData.favoriteProgrammingLanguage}</p>
                <p><strong>Years of Experience:</strong> {submittedData.yearsOfExperience}</p>
              </>
            )}
            {submittedData.surveyTopic === 'Health' && (
              <>
                <p><strong>Exercise Frequency:</strong> {submittedData.exerciseFrequency}</p>
                <p><strong>Diet Preference:</strong> {submittedData.dietPreference}</p>
              </>
            )}
            {submittedData.surveyTopic === 'Education' && (
              <>
                <p><strong>Highest Qualification:</strong> {submittedData.highestQualification}</p>
                <p><strong>Field of Study:</strong> {submittedData.fieldOfStudy}</p>
              </>
            )}
            <p><strong>Feedback:</strong> {submittedData.feedback}</p>

            {additionalQuestions.length > 0 && (
              <div className="additional-questions">
                <h3>Additional Questions</h3>
                {additionalQuestions.map((question, index) => (
                  <div key={index}>
                    <label>{question}</label>
                    <input type="text" name={`additionalQuestion${index}`} onChange={handleChange} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </FormContext.Provider>
  );
};

export default App;
