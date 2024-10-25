// Kabisa yilini aniqlash funksiyasi
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Sana input maydonini ochish va tekshiruv funksiyasi
function toggleDateInput() {
  const category = document.getElementById("category").value;
  const dateInputDiv = document.getElementById("dateInputDiv");
  const numberInputDiv = document.getElementById("numberInputDiv");

  if (category === "date") {
    dateInputDiv.style.display = "block";
    numberInputDiv.style.display = "none";
  } else {
    dateInputDiv.style.display = "none";
    numberInputDiv.style.display = "block";
  }
}

function handleSubmit() {
  const category = document.getElementById("category").value;
  const number = document.getElementById("number").value;
  const month = parseInt(document.getElementById("month").value);
  const day = parseInt(document.getElementById("day").value);
  const error = document.getElementById("error");

  // Xatoliklarni tozalash
  error.textContent = "";

  if (!category) {
    error.textContent = "Kategoriya tanlashingiz kerak.";
    return;
  }

  // Raqam tekshiruvi
  if (category !== "date" && number && isNaN(number)) {
    error.textContent = "Raqam raqam shaklida bo'lishi kerak.";
    return;
  }

  // Sana tekshiruvlari
  if (category === "date") {
    if (isNaN(month) || month < 1 || month > 12) {
      error.textContent = "Oyni to'g'ri kiriting (1 dan 12 gacha).";
      return;
    }
    
    // Har bir oy uchun kunlar sonini belgilash
    const daysInMonth = {
      1: 31, 2: isLeapYear(new Date().getFullYear()) ? 29 : 28,
      3: 31, 4: 30, 5: 31, 6: 30,
      7: 31, 8: 31, 9: 30, 10: 31,
      11: 30, 12: 31
    };

    if (isNaN(day) || day < 1 || day > daysInMonth[month]) {
      error.textContent = `Bu oyda faqat ${daysInMonth[month]} kun mavjud.`;
      return;
    }
  }

  // API chaqiruv qismi
  let apiUrl = "http://numbersapi.com/";
  if (category === "date") {
    apiUrl += `${month}/${day}/date`;
  } else if (category === "math") {
    apiUrl += number || "random";
    apiUrl += "/math";
  } else if (category === "trivia") {
    apiUrl += number || "random";
    apiUrl += "/trivia";
  }

  // Ma'lumotni API orqali olish
  fetch(apiUrl)
    .then(response => response.text())
    .then(data => {
      // Ma'lumotlarni ko'rsatish
      const resultWindow = window.open("", "_blank");
      resultWindow.document.write(`
        <html>
          <head>
            <title>Sonlar haqida ma'lumot</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css">
          </head>
          <body class="container my-5">
            <h1 class="text-center">Sonlar haqida ma'lumot</h1>
            <p><strong>Kategoriya:</strong> ${category}</p>
            ${number ? `<p><strong>Raqam:</strong> ${number}</p>` : ""}
            ${category === "date" ? `<p><strong>Sana:</strong> ${month}/${day}</p>` : ""}
            <hr>
            <p><strong>Fakt:</strong> ${data}</p>
          </body>
        </html>
      `);
    })
    .catch(() => {
      error.textContent = "Ma'lumot olishda xatolik yuz berdi. Qayta urinib ko'ring.";
    });
}
