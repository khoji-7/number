function handleSubmit() {
  const category = document.getElementById("category").value;
  const number = document.getElementById("number").value.trim();
  const errorElement = document.getElementById("error");

  errorElement.textContent = "";

  if (!category) {
    errorElement.textContent = "Iltimos, kategoriyani tanlang.";
    return;
  }

  if (number && isNaN(number)) {
    errorElement.textContent = "Son faqat raqam shaklida bo'lishi kerak";
    return;
  }

  localStorage.setItem("category", category);
  localStorage.setItem("number", number);

  window.location.href = "result.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  const categoryResult = document.getElementById("categoryResult");
  const numberResult = document.getElementById("numberResult");
  const factResult = document.getElementById("factResult");

  const category = localStorage.getItem("category");
  const number = localStorage.getItem("number") || "random";

  categoryResult.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  numberResult.textContent = number === "random" ? "Tasodifiy son" : number;

  try {
    const response = await fetch(`http://numbersapi.com/${number}/${category}`);
    if (!response.ok) throw new Error("Ma'lumot olishda xatolik yuz berdi");

    const fact = await response.text();
    factResult.textContent = fact;
  } catch (error) {
    factResult.textContent = "Xatolik: ma'lumotni yuklab bo'lmadi.";
  }
});
