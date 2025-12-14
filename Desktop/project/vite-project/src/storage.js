
export const StorageService = {
  QUIZZES_KEY: "quizzes",
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

    const existingIndex = quizzes.findIndex((q) => q.name === oldName);

    if (existingIndex !== -1 && oldName === newQuiz.name) {
      quizzes[existingIndex] = newQuiz;
    } else if (existingIndex !== -1 && oldName !== newQuiz.name) {
      quizzes.splice(existingIndex, 1);
      quizzes.push(newQuiz);
    } else if (existingIndex === -1 && oldName) {
    
      quizzes.push(newQuiz);
    } else {
     
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
