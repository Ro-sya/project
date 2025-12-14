const KEY = "simple_quiz_storage_v2";

const DEF = {
  quizzes: [],
  results: [],
};

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || DEF;
  } catch {
    return DEF;
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export const StorageService = {
  get(key) {
    return load()[key];
  },

  set(key, value) {
    const d = load();
    d[key] = value;
    save(d);
  },

  add(key, value) {
    const d = load();
    d[key].push(value);
    save(d);
  },

  updateQuiz(quiz, oldName) {
    const d = load();
    const i = d.quizzes.findIndex((q) => q.name === (oldName || quiz.name));
    if (i >= 0) d.quizzes[i] = quiz;
    else d.quizzes.push(quiz);
    save(d);
  },

  removeQuiz(name) {
    const d = load();
    d.quizzes = d.quizzes.filter((q) => q.name !== name);
    save(d);
  },

  findQuiz(name) {
    return load().quizzes.find((q) => q.name === name);
  },
};
