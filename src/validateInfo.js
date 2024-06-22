export default function validateInfo(values) {
  let errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full Name required';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.surveyTopic) {
    errors.surveyTopic = 'Survey Topic required';
  }

  if (values.surveyTopic === 'Technology') {
    if (!values.favoriteProgrammingLanguage) {
      errors.favoriteProgrammingLanguage = 'Favorite Programming Language required';
    }
    if (!values.yearsOfExperience) {
      errors.yearsOfExperience = 'Years of Experience required';
    }
  }

  if (values.surveyTopic === 'Health') {
    if (!values.exerciseFrequency) {
      errors.exerciseFrequency = 'Exercise Frequency required';
    }
    if (!values.dietPreference) {
      errors.dietPreference = 'Diet Preference required';
    }
  }

  if (values.surveyTopic === 'Education') {
    if (!values.highestQualification) {
      errors.highestQualification = 'Highest Qualification required';
    }
    if (!values.fieldOfStudy.trim()) {
      errors.fieldOfStudy = 'Field of Study required';
    }
  }

  if (!values.feedback.trim()) {
    errors.feedback = 'Feedback required';
  } else if (values.feedback.length < 50) {
    errors.feedback = 'Feedback must be at least 50 characters';
  }

  return errors;
}
