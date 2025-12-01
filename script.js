(function (global) {
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

  const StorageService = {
    getKey(k) {
      return load()[k];
    },
    setKey(k, v) {
      const d = load();
      d[k] = v;
      save(d);
    },
    addValue(k, v, list) {
      const d = load();
      if (list) d[k].push(v);
      else d[k] = v;
      save(d);
    },
    findValue(k, pred, list) {
      const data = load()[k];
      return list ? (data || []).find(pred) : pred(data);
    },
    saveOrUpdateQuiz(quiz, oldName) {
      const d = load();
      const existing = d.quizzes.findIndex(
        (q) => q.name === (oldName || quiz.name)
      );
      if (existing >= 0) d.quizzes[existing] = quiz;
      else d.quizzes.push(quiz);
      save(d);
    },
    removeQuiz(name) {
      const d = load();
      d.quizzes = d.quizzes.filter((q) => q.name !== name);
      save(d);
    },
  };
  global.StorageService = StorageService;
  global.escapeHtml = (s) =>
    (s ?? "").replace(
      /[&<>]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])
    );
})(window);
