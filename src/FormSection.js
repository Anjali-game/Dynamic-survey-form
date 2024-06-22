import React, { useContext } from 'react';
import { FormContext } from './App';

const FormSection = ({ topic }) => {
  const { handleChange, values, errors } = useContext(FormContext);

  switch (topic) {
    case 'Technology':
      return (
        <div className="form-group">
          <div>
            <label>Favorite Programming Language</label>
            <select name="favoriteProgrammingLanguage" onChange={handleChange} value={values.favoriteProgrammingLanguage}>
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteProgrammingLanguage && <p className="error">{errors.favoriteProgrammingLanguage}</p>}
          </div>
          <div>
            <label>Years of Experience</label>
            <input type="number" name="yearsOfExperience" onChange={handleChange} value={values.yearsOfExperience} />
            {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
          </div>
        </div>
      );
    case 'Health':
      return (
        <div className="form-group">
          <div>
            <label>Exercise Frequency</label>
            <select name="exerciseFrequency" onChange={handleChange} value={values.exerciseFrequency}>
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
          </div>
          <div>
            <label>Diet Preference</label>
            <select name="dietPreference" onChange={handleChange} value={values.dietPreference}>
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
          </div>
        </div>
      );
    case 'Education':
      return (
        <div className="form-group">
          <div>
            <label>Highest Qualification</label>
            <select name="highestQualification" onChange={handleChange} value={values.highestQualification}>
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <p className="error">{errors.highestQualification}</p>}
          </div>
          <div>
            <label>Field of Study</label>
            <input type="text" name="fieldOfStudy" onChange={handleChange} value={values.fieldOfStudy} />
            {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default FormSection;
