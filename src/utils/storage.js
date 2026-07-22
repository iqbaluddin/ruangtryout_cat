// src/utils/storage.js

const STORAGE_KEY = "cat_bkn_exam_data";

export const saveExamData = (data) => {
  try {
    const examData = {
      ...data,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(examData));
    return true;
  } catch (error) {
    console.error("Error saving exam data:", error);
    return false;
  }
};

export const loadExamData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error("Error loading exam data:", error);
    return null;
  }
};

export const clearExamData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing exam data:", error);
    return false;
  }
};

export const hasSavedExam = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

export const getExamStats = () => {
  const data = loadExamData();
  if (!data) return null;

  const { answers, flaggedQuestions, timeSpent, totalQuestions } = data;
  const answered = Object.keys(answers || {}).length;
  const flagged = (flaggedQuestions || []).length;

  return {
    answered,
    total: totalQuestions || 50,
    flagged,
    progress: totalQuestions
      ? Math.round((answered / totalQuestions) * 100)
      : 0,
    timeSpent: timeSpent || 0,
    savedAt: data.savedAt,
  };
};
