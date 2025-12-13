/**
 * src/services/storage.js
 * Service for handling all application data persistence via localStorage.
 */
export const StorageService = {
  // Key used to store all quizzes
  QUIZZES_KEY: "quizzes",
  // Key used to store quiz results
  RESULTS_KEY: "results",

  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading key ${key} from localStorage:`, error);
      return [];
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing key ${key} to localStorage:`, error);
    }
  },

  findQuiz(name) {
    const quizzes = this.get(this.QUIZZES_KEY);
    return quizzes.find((q) => q.name === name) || null;
  },

  updateQuiz(newQuiz, oldName) {
    const quizzes = this.get(this.QUIZZES_KEY);

    // Check if we are editing an existing quiz
    const existingIndex = quizzes.findIndex((q) => q.name === oldName);

    if (existingIndex !== -1 && oldName === newQuiz.name) {
      // Editing: replace the old quiz at the same index
      quizzes[existingIndex] = newQuiz;
    } else if (existingIndex !== -1 && oldName !== newQuiz.name) {
      // Editing and Name Changed: Remove old, add new
      quizzes.splice(existingIndex, 1);
      quizzes.push(newQuiz);
    } else if (existingIndex === -1 && oldName) {
      // Name must have changed from an old, now non-existent quiz (shouldn't happen with proper flow)
      quizzes.push(newQuiz);
    } else {
      // Creating New: simply add the new quiz
      quizzes.push(newQuiz);
    }

    this.set(this.QUIZZES_KEY, quizzes);
  },

  removeQuiz(name) {
    const quizzes = this.get(this.QUIZZES_KEY);
    const updatedQuizzes = quizzes.filter((q) => q.name !== name);
    this.set(this.QUIZZES_KEY, updatedQuizzes);
  },

  add(key, result) {
    const list = this.get(key);
    list.push(result);
    this.set(key, list);
  },
};
