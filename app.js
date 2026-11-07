
const categories = ["全部", "銀行知識", "證券知識", "金融法規", "金融證照"];

let selectedCategory = "全部";

const categoryList = document.getElementById("categoryList");
const articleList = document.getElementById("articleList");
const searchInput = document.getElementById("searchInput");

// 顯示分類按鈕
function renderCategories() {
  categoryList.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category;

    button.style.margin = "6px";
    button.style.padding = "10px 16px";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.background =
      selectedCategory === category ? "#172b4d" : "#e8edf4";
    button.style.color =
      selectedCategory === category ? "white" : "#263447";

    button.addEventListener("click", () => {
      selectedCategory = category;
      renderCategories();
      renderArticles();
    });

    categoryList.appendChild(button);
  });
}

// 顯示文章
function renderArticles() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(note => {
    const matchCategory =
      selectedCategory === "全部" ||
      note.category === selectedCategory;

    const matchKeyword =
      note.title.toLowerCase().includes(keyword) ||
      note.summary.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword);

    return matchCategory && matchKeyword;
  });

  articleList.innerHTML = "";

  if (filteredNotes.length === 0) {
    articleList.textContent = "找不到相關文章。";
    return;
  }

  filteredNotes.forEach(note => {
    const card = document.createElement("article");

    card.style.padding = "18px";
    card.style.marginTop = "12px";
    card.style.border = "1px solid #e5e9ef";
    card.style.borderRadius = "10px";
    card.style.cursor = "pointer";

    const title = document.createElement("h3");
    title.textContent = note.title;

    const category = document.createElement("p");
    category.textContent = note.category;
    category.style.color = "#64748b";

    const summary = document.createElement("p");
    summary.textContent = note.summary;

    const date = document.createElement("small");
    date.textContent = note.date;

    card.append(title, category, summary, date);

    card.addEventListener("click", () => {
      alert(note.title + "\n\n" + note.content);
    });

    articleList.appendChild(card);
  });
}

// 搜尋功能
searchInput.addEventListener("input", renderArticles);

// 啟動網站
renderCategories();
renderArticles();
