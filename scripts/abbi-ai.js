// Abbi AI Chat Functionality
class AbbiAI {
  constructor() {
    this.chatInput = document.getElementById("chatInput");
    this.sendButton = document.getElementById("sendMessage");
    this.messagesContainer = document.getElementById("chatMessages");
    this.clearChatButton = document.getElementById("clearChat");
    this.toggleSoundButton = document.getElementById("toggleSound");
    this.quickButtons = document.querySelectorAll(".quick-btn");

    this.soundEnabled = localStorage.getItem("soundEnabled") !== "false";
    this.messageData = {
      abdumutolib: {
        age: "15",
        fullName: "Abdumutolib Abdulahadov",
        skills: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Responsive Design",
          "UI/UX Design",
          "AI Integration",
          "React.js",
          "Node.js",
          "Python",
          "Git",
          "Database Management",
        ],
        education: {
          current: "O'rta maktab o'quvchisi",
          achievements:
            "Dasturlash bo'yicha bir nechta onlayn kurslarni tugatgan",
          certifications: [
            "Web Development",
            "JavaScript Advanced",
            "AI Basics",
          ],
          selfStudy: "Dasturlashni mustaqil ravishda o'rganmoqda",
        },
        experience: {
          years: "2+ yillik web dasturlash tajribasi",
          projects: "50 dan ortiq loyihalar",
          specialization: "Frontend va AI integratsiyasi",
          current: "Freelance web dasturchi",
        },
        future: {
          goals: [
            "O'z texnologiya kompaniyasini ochish",
            "Innovatsion mahsulotlar yaratish",
            "Yosh dasturchilarni o'qitish",
            "Xalqaro loyihalarda qatnashish",
          ],
          vision: "O'zbekistonda IT sohasini rivojlantirishga hissa qo'shish",
        },
        interests: [
          "Web dasturlash",
          "AI va Machine Learning",
          "Mobil ilovalar yaratish",
          "UI/UX dizayn",
          "Yangi texnologiyalar",
          "Robotics",
          "Open Source",
        ],
        workProcessSteps: [
          "1.G'oya Topish",
          "2.Puxta reja tuzish",
          "3.Kod yozish",
          "4.Test qilish",
        ],
        testingTools: ["Sayt test kodlaridan", "AIlardan", "Mutaxassislardan"],
        languages: {
          programming: ["JavaScript", "Python", "HTML", "CSS", "SQL"],
          speaking: ["O'zbek", "Ingliz", "Rus"],
        },
        location: "Toshkent, O'zbekiston",
        contact: {
          email: "abdumutolib00@gmail.com",
          telegram: "@mrabdumutolib_dev",
          github: "github.com/abdumutolib-404",
          portfolio: "abdumutolib.uz",
        },
        hobbies: [
          "Kitob o'qish",
          "Shaxmat o'ynash",
          "Dasturlash musobaqalarida qatnashish",
          "Yangi texnologiyalarni o'rganish",
        ],
        achievements: [
          "Yoshlar innovatsiya tanlovida g'olib",
          "GitHub'da 1000+ contribution",
          "Stack Overflow'da faol ishtirokchi",
          "IT hackathon g'olibi",
        ],
        favoriteTools: ["VS Code", "Figma", "Postman", "GitHub", "Docker"],
        currentProjects: [
          "AI asosidagi chat-bot",
          "E-commerce veb-sayt",
          "O'quv platformasi",
        ],
        inspirations: [
          "Elon Musk",
          "Linus Torvalds",
          "Ada Lovelace",
          "O'zbek IT jamoasi",
        ],
      },
    };

    // Initialize
    this.init();
  }

  init() {
    this.loadMessages();
    this.updateSoundButton();

    this.sendButton.addEventListener("click", () => this.sendMessage());
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    this.clearChatButton.addEventListener("click", () => this.clearChat());
    this.toggleSoundButton.addEventListener("click", () => this.toggleSound());

    this.quickButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const question = button.getAttribute("data-question");
        if (question) {
          this.chatInput.value = question;
          this.sendMessage();
        }
      });
    });

    setTimeout(() => {
      if (this.chatInput) this.chatInput.focus();
    }, 1000);
  }

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;

    this.addMessage(message, "user");
    this.chatInput.value = "";
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.generateResponse(message);
      this.addMessage(response, "bot");

      if (this.soundEnabled) this.playMessageSound();
    }, 1000 + Math.random() * 1000);
  }

  addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}-message`;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let avatarIcon = sender === "user" ? "fa-user" : "fa-robot";

    messageElement.innerHTML = `
        <div class="message-avatar">
          <i class="fas ${avatarIcon}"></i>
        </div>
        <div class="message-content">
          <div class="message-text">${this.formatMessage(text)}</div>
          <div class="message-time">${time}</div>
        </div>
      `;

    this.messagesContainer.appendChild(messageElement);
    this.scrollToBottom();
    this.saveMessages();
  }

  formatMessage(text) {
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    text = text.replace(/\n/g, "<br>");
    text = this.addEmojis(text);
    return text;
  }

  addEmojis(text) {
    const emojiMap = {
      "\\:\\)": "😊",
      "\\:\\(": "😢",
      "\\:D": "😃",
      "\\;\\)": "😉",
      "\\:P": "😛",
      "<3": "❤️",
      ":thumbsup:": "👍",
      ":robot:": "🤖",
      ":star:": "⭐",
      ":book:": "📚",
      ":computer:": "💻",
      ":rocket:": "🚀",
      ":bulb:": "💡",
      ":trophy:": "🏆",
    };

    for (const [emoji, unicode] of Object.entries(emojiMap)) {
      text = text.replace(new RegExp(emoji, "g"), unicode);
    }
    return text;
  }

  showTypingIndicator() {
    const typingElement = document.createElement("div");
    typingElement.className = "message bot-message typing-indicator";
    typingElement.innerHTML = `
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;

    this.messagesContainer.appendChild(typingElement);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) typingIndicator.remove();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  clearChat() {
    const welcomeMessage = document.querySelector(".welcome-message");
    this.messagesContainer.innerHTML = "";
    if (welcomeMessage) this.messagesContainer.appendChild(welcomeMessage);
    localStorage.removeItem("chatMessages");
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem("soundEnabled", this.soundEnabled);
    this.updateSoundButton();
  }

  updateSoundButton() {
    const icon = this.toggleSoundButton.querySelector("i");
    if (this.soundEnabled) {
      icon.className = "fas fa-volume-up";
      this.toggleSoundButton.title = "Ovozni o'chirish";
    } else {
      icon.className = "fas fa-volume-mute";
      this.toggleSoundButton.title = "Ovozni yoqish";
    }
  }

  playMessageSound() {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
    );
    audio.volume = 0.5;
    audio.play().catch((e) => console.error("Error playing sound:", e));
  }

  saveMessages() {
    const messages = Array.from(
      this.messagesContainer.querySelectorAll(".message:not(.typing-indicator)")
    );

    const messageData = messages.map((message) => ({
      text: message.querySelector(".message-text").innerHTML,
      sender: message.classList.contains("user-message") ? "user" : "bot",
      time: message.querySelector(".message-time").textContent,
    }));

    localStorage.setItem("chatMessages", JSON.stringify(messageData));
  }

  loadMessages() {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        const messageData = JSON.parse(savedMessages);
        this.messagesContainer.innerHTML = "";
        messageData.forEach((message) => {
          const messageElement = document.createElement("div");
          messageElement.className = `message ${message.sender}-message`;
          let avatarIcon = message.sender === "user" ? "fa-user" : "fa-robot";
          messageElement.innerHTML = `
              <div class="message-avatar">
                <i class="fas ${avatarIcon}"></i>
              </div>
              <div class="message-content">
                <div class="message-text">${message.text}</div>
                <div class="message-time">${message.time}</div>
              </div>
            `;
          this.messagesContainer.appendChild(messageElement);
        });
        this.scrollToBottom();
      } catch (error) {
        console.error("Error loading saved messages:", error);
      }
    }
  }

  generateResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    const data = this.messageData.abdumutolib;

    // Kalit so'zlar bo'yicha aniqlash uchun yordamchi funksiya
    const includes = (keywords) =>
      keywords.some((keyword) => userMessage.includes(keyword.toLowerCase()));

    // Yangi savol-javob turlari
    if (includes(["salom", "hello", "hi", "assalomu", "hey"])) {
      return "Salom! Men Abbi AI, Abdumutolibning yordamchisiman. Savollaringiz bo'lsa, bemalol so'rang! 😊";
    }

    if (includes(["kimsan", "who are you", "nima", "kim", "name"])) {
      return "Men Abbi AI, Abdumutolib Abdulahadovning virtual yordamchisiman. Uning tajribasi, ko'nikmalari va maqsadlari haqida ma'lumot beraman. 🤖";
    }

    if (includes(["abdumutolib", "about", "haqida", "u haqida"])) {
      return `${data.fullName} - ${data.age} yoshli iqtidorli web dasturchi. U ${data.experience.years} ega, ${data.experience.projects} yaratgan va ${data.location}da yashaydi. Uning maqsadi: ${data.future.vision}. 🚀`;
    }

    if (includes(["yosh", "age", "necha", "yoshda"])) {
      return `Abdumutolib ${data.age} yoshda. U yoshiga qaramay, ${data.experience.specialization} sohasida katta yutuqlarga erishgan. 🌟`;
    }

    if (
      includes([
        "skills",
        "ko'nikma",
        "biladi",
        "nima qila oladi",
        "texnologiya",
      ])
    ) {
      return `Abdumutolibning ko'nikmalari: ${data.skills.join(
        ", "
      )}. U har doim yangi bilimlarni o'zlashtirishga intiladi. 💻`;
    }

    if (includes(["future", "kelajak", "plan", "reja", "maqsad", "goal"])) {
      return `Abdumutolibning kelajak rejalari: ${data.future.goals.join(
        ", "
      )}. U ${data.future.vision}ga erishmoqchi. 🎯`;
    }

    if (includes(["education", "o'qish", "ta'lim", "school", "university"])) {
      return `Abdumutolib hozirda ${data.education.current}. U ${
        data.education.achievements
      } va ${data.education.certifications.join(
        ", "
      )} sertifikatlariga ega. 📚`;
    }

    if (includes(["programming", "dasturlash", "til", "language"])) {
      return `Abdumutolib quyidagi dasturlash tillarini biladi: ${data.languages.programming.join(
        ", "
      )}. Shuningdek, u ${data.languages.speaking.join(
        ", "
      )} tillarida gaplashadi. 💻`;
    }

    if (includes(["hobby", "qiziqish", "interest", "sevimli"])) {
      return `Abdumutolibning sevimli mashg'ulotlari: ${data.hobbies.join(
        ", "
      )}. U ayniqsa ${data.interests.slice(0, 3).join(", ")}ga qiziqadi. ⭐`;
    }

    if (includes(["achievement", "yutuq", "medal", "win"])) {
      return `Abdumutolibning muhim yutuqlari: ${data.achievements.join(
        ", "
      )}. 🏆`;
    }

    if (includes(["contact", "aloqa", "email", "telegram", "github"])) {
      return `Abdumutolib bilan bog'lanish uchun:\n- Email: ${data.contact.email}\n- Telegram: ${data.contact.telegram}\n- GitHub: ${data.contact.github}\n- Portfolio: ${data.contact.portfolio} 📧`;
    }

    if (includes(["where", "qayerda", "location", "joylashuv", "yashaydi"])) {
      return `Abdumutolib ${data.location}da yashaydi va faoliyat yuritadi. 📍`;
    }

    if (includes(["experience", "tajriba", "ishla", "work"])) {
      return `Abdumutolib ${data.experience.years} va ${data.experience.projects} yaratgan. U ${data.experience.specialization} sohasida ixtisoslashgan va hozirda ${data.experience.current} sifatida ishlaydi. 💼`;
    }

    if (includes(["thanks", "rahmat", "thank you", "tashakkur"])) {
      return "Arzimaydi! Yana savollar bo'lsa, so'rang! 😊";
    }

    if (includes(["bye", "goodbye", "xayr", "sog' bo'ling"])) {
      return "Xayr! Yana suhbatlashamiz, albatta! 👋";
    }

    if (
      includes(["you do", "you can", "nima qila olasan", "imkoniyatlaring"])
    ) {
      return "Men Abdumutolib haqida har xil ma'lumotlarni beraman: uning tajribasi, ko'nikmalari, yutuqlari, qiziqishlari, loyihalari va boshqalar. Savol bering, javob beraman! 🤖";
    }

    // Yangi savollar
    if (includes(["tools", "vositalar", "qaysi dastur", "software"])) {
      return `Abdumutolib quyidagi vositalardan foydalanadi: ${data.favoriteTools.join(
        ", "
      )}. Bu vositalar uning ishini yanada samarali qiladi. 🛠️`;
    }

    if (includes(["current project", "hozirgi loyiha", "nimada ishlayapti"])) {
      return `Abdumutolib hozirda quyidagi loyihalar ustida ishlamoqda: ${data.currentProjects.join(
        ", "
      )}. U har doim innovatsion g'oyalarni amalga oshiradi! 🚀`;
    }

    if (includes(["inspiration", "ilhom", "kimdan ilhomlanadi"])) {
      return `Abdumutolib quyidagi shaxslardan ilhomlanadi: ${data.inspirations.join(
        ", "
      )}. Ular uning katta maqsadlarga erishishiga motivatsiya beradi. 💡`;
    }

    if (includes(["portfolio", "ishlari", " loyihalarni ko'rsat"])) {
      return `Abdumutolibning loyihalarini uning portfolio saytidan ko'rishingiz mumkin: ${data.contact.portfolio}. U erda uning eng yaxshi ishlarini topasiz! 🌐`;
    }

    if (includes(["freelance", "frilans", "qanday ishlaydi"])) {
      return `Abdumutolib hozirda ${data.experience.current} sifatida ishlaydi. U mijozlar uchun sifatli va innovatsion veb-loyihalar yaratadi. 💻`;
    }

    if (includes(["hackathon", "musobaqa", "tanlov"])) {
      return `Abdumutolib bir nechta IT hackathonlarda ishtirok etgan va ulardan birida g'olib chiqqan! Uning yutuqlari: ${data.achievements[3]}. 🏆`;
    }

    if (includes(["open source", "ochiq kod", "github ishtirok"])) {
      return `Abdumutolib ochiq kodli loyihalarda faol ishtirok etadi. Uning GitHub'da ${data.achievements[1]}. Uning GitHub profilini bu yerda ko'rishingiz mumkin: ${data.contact.github}. 🌟`;
    }

    // Default javob

    if (includes(["mentor", "ustoz", "kimdan o'rganadi", "rahbar"])) {
      return "Abdumutolib bir nechta onlayn kurslar va darsliklardan o'rganadi, shuningdek, xalqaro dasturchilarning tajribasidan ilhomlanadi. U o'z ustozlarining maslahatlariga quloq tutadi. 👨‍🏫";
    }

    if (includes(["blog", "maqola", "yozadi", "tajriba yozadi"])) {
      return "Ha, Abdumutolib o'z blogida tajribalari va o‘rgangan texnologiyalari haqida maqolalar yozadi. Tez orada blog sahifasi portfolioda chiqadi. ✍️";
    }

    if (includes(["community", "jamiyat", "faoliyati", "forum"])) {
      return "Abdumutolib O'zbek dasturchilar jamoasida faol ishtirok etadi, savollarga javob beradi va o‘z bilimlarini ulashadi. 👥";
    }

    if (
      includes([
        "daily routine",
        "kun tartibi",
        "kunlik reja",
        "qanday ishlaydi",
      ])
    ) {
      return "Abdumutolib har kuni dasturlash, o‘qish, loyihalar ustida ishlash va o‘zini rivojlantirishga vaqt ajratadi. U intizomli va maqsadga yo‘naltirilgan shaxs. 📆";
    }

    if (includes(["fail", "xato", "muvaffaqiyatsizlik", "qiyinchilik"])) {
      return "Abdumutolib dasturlashda ko‘p xatolar qilgan, lekin aynan shu xatolar uni kuchliroq qilgan. U har bir xatoni yangi imkoniyat deb hisoblaydi. 💪";
    }

    if (includes(["team", "jamoa", "birgalikda ishlash"])) {
      return "Abdumutolib jamoaviy ishlashni yaxshi ko'radi. U loyihalarda hamkorlik qilish, fikr almashish va kodni birga yozish tajribasiga ega. 🤝";
    }

    if (
      includes(["soft skills", "shaxsiy ko'nikmalar", "muloqot", "rahbarlik"])
    ) {
      return "Abdumutolib yaxshi muloqot ko‘nikmalariga, vaqtni boshqarish va muammoni hal qilish qobiliyatiga ega. U o‘zini doimiy rivojlantiradi. 🌟";
    }
    if (includes(["favorite book", "sevimli kitob", "kitob tavsiya"])) {
      return `Abdumutolibning sevimli kitoblari: Python dasturlash asoslari va texnologik kitoblar. U har kuni yangi bilim o‘rganishga intiladi. 📚`;
    }

    if (includes(["motivation", "motivatsiya", "qanday ruhlanadi"])) {
      return "Abdumutolib muvaffaqiyatli dasturchilarning hikoyalaridan, tabiatdan va murakkab muammolarni yechishdan ruhlanadi. 💡";
    }

    if (
      includes([
        "started coding",
        "dasturlashni qachon boshlagan",
        "birinchi kod",
      ])
    ) {
      return "Abdumutolib dasturlashni 12 yoshida HTML va CSS bilan boshlagan. Birinchi loyihasi - o‘zining oddiy veb-sahifasi edi! 👶💻";
    }

    if (includes(["work-life balance", "ish va hayot", "dam olish"])) {
      return "U ish va shaxsiy hayot muvozanatini saqlash uchun sport bilan shug‘ullanadi, kitob o‘qiydi va do‘stlari bilan vaqt o‘tkazadi. ⚖️";
    }

    if (includes(["favorite quote", "sevimli aforizm", "hayot qoidasi"])) {
      return `Abdumutolibning sevimli shiori: "Xatolar muvafaqqiyat uchun bir zina poya, bu zina poya juda uzun uni faqat kuchlilar yengadi". Bu uning harakatlariga rahbarlik qiladi. ✨`;
    }

    if (includes(["learning method", "qanday o‘rganadi", "o‘rganish usuli"])) {
      return "U loyihalar orqali o‘rganish (learning by doing) usulini qo‘llaydi. Har bir yangi texnologiyani real loyihada sinab ko‘radi. 🛠️";
    }

    if (includes(["role model", "nafaqa oladi", "kimga qarab"])) {
      return `Abdumutolib Mark Zuckerberg, Ahror Web va Elon Musk kabi mutaxassislarga qarab rivojlanadi. Ularning tajribasidan o‘rganadi. 🌟`;
    }

    if (includes(["productivity", "samaradorlik", "fokuslanish"])) {
      return "U Pomodoro texnikasidan, Trello va Notion kabi vositalardan foydalanadi. Kuniga 4-5 soatni yuqori fokusda ishlashga ajratadi. 🎯";
    }

    if (includes(["design", "dizayn", "figma", "ui/ux"])) {
      return "Abdumutolib Figma yordamida oddiy dizaynlar yarata oladi, lekin asosan frontend dasturchi sifatida ishlaydi. 🎨";
    }

    if (includes(["backend", "server", "nodejs", "database"])) {
      return `U GraphQL va Node.js texnologiyalari yordamida backend qismini ham yaxshi ishlaydi. 💾`;
    }

    if (includes(["frontend", "interfeys", "react", "vue"])) {
      return `Abdumutolibning asosiy kuchli tomoni - frontend. U HTML CSS JavaScript va React bilan ishlashni yaxshi ko‘radi. 🖥️`;
    }

    if (includes(["algorithm", "dasturlash algoritmlari", "leetcode"])) {
      return "U har kuni algoritmik masalalar yechishga vaqt ajratadi. LeetCode va CodeWars platformalarida faol. 🧠";
    }

    if (includes(["startup", "biznes", "o‘z loyihasi"])) {
      return `Abdumutolib 2ta startap g‘oyalarini ishlab chiqmoqda. U tez orada o‘zining texnologik kompaniyasiga ega bo‘lishni xohlaydi. 🚀`;
    }

    if (includes(["travel", "sayoxat", "yurtlar", "borgan joylar"])) {
      return `U Uzbekistondan tashqariga chiqmagan. Ammo kelajakda albatta dunyoni sayohat qiladi. ✈️`;
    }

    if (includes(["music", "musiqa", "qushiq", "spotify"])) {
      return `Abdumutolib sokin va tinchlantiruvchi janridagi musiqalarni tinglashni yaxshi ko‘radi. 🎵`;
    }

    if (includes(["movie", "kino", "sevimli film", "netflix"])) {
      return `Uning sevimli filmlari: Mr.Robot va Transformers. Texnologiyaga oid hikoyalar uni qiziqtiradi. 🎬`;
    }

    if (includes(["pet", "hayvon", "mushuk", "it"])) {
      return "Abdumutolibning uy hayvoni yo‘q, lekin u mushuklarni yaxshi ko‘radi. Kelajakda birorta egallashni rejalashtiradi. 🐱";
    }

    if (includes(["sport", "idman", "futbol", "jismoniy"])) {
      return `U futbol bilan shug‘ullanadi. Jismoniy faollik unga ishda fokuslanishga yordam beradi. ⚽`;
    }

    if (includes(["food", "ovqat", "sevimli taom", "milliy taom"])) {
      return `Abdumutolibning sevimli taomlari: osh, manti, chuchvara, sho'rva va somsa. U sog‘lom ovqatlanishga harakat qiladi. 🍲`;
    }

    if (includes(["coffee", "kofe", "choy", "ichimlik"])) {
      return "U dasturlash paytida ko‘p kofe ichmaydi, lekin yashil choyni afzal ko‘radi. ☕";
    }

    if (includes(["sleep", "uxlash", "qancha uxlaydi"])) {
      return "Abdumutolib kuniga 7-8 soat uxlashga harakat qiladi, chuni u yaxshi dam olish samaradorlikni oshirishini biladi. 😴";
    }

    if (includes(["habits", "odatlar", "kunlik odat"])) {
      return `Uning foydali odatlari: o'qish va hayotda muvofaqqiyatga erishish uchun harakat va yo'llar topish. U ularni har kuni amalga oshirishga intiladi. 📝`;
    }

    if (includes(["bad habits", "yomon odatlar", "qanday qilib to‘xtatdi"])) {
      return `Abdumutolib tez jahl chiqishi, baqirish, hammani yomon ko'rish kabi yomon odatlardan xalos bo‘ldi. Endi u ularga qaytmaydi. 💪`;
    }

    if (
      includes(["mentorship", "mentorlik", "o‘rgatadi", "qanday o‘rgatadi"])
    ) {
      return "U boshlang‘ich dasturchilarga bepul maslahat beradi va ularning loyihalarini tekshiradi. Bilim ulashishni yaxshi ko‘radi. 👨‍🏫";
    }

    if (includes(["philosophy", "falsafa", "hayot qarash"])) {
      return "Abdumutolibning hayotdagi falsafasi: «Har bir muvaffaqiyat qo‘lga kiritilgan qiyinchiliklar orqasida yashaydi». U qiyinchiliklardan qochmaydi. 🌌";
    }

    if (includes(["money", "pul", "moliyaviy", "qancha topadi"])) {
      return "Abdumutolib pulni maqsadlar uchun vositadek ko‘radi. U bilim va ko‘nikmalarga sarmoya kiritishni afzal ko‘radi. 💰";
    }

    if (includes(["investment", "investitsiya", "kripto", "aksiya"])) {
      return `U frontend va backend sohalariga qiziqadi va kelajakda aktiv investitsiyalar bilan shug‘ullanishni rejalashtiradi. 📈`;
    }

    if (includes(["language learning", "til o‘rganish", "chegirma"])) {
      return `Abdumutolib hozirda React va ingliz tillarini o‘rganmoqda. U til o‘rganish uchun maxsus dasturlardan foydalanadi. 🗣️`;
    }

    if (includes(["time management", "vaqt boshqarish", "rejalashtirish"])) {
      return "U Google Calendar va Notion yordamida kun tartibini rejalashtiradi. Muhim vazifalarni ertalab bajaradi. ⏳";
    }

    if (includes(["stress", "stress", "qanday bardosh", "charchoq"])) {
      return "Abdumutolib stressni sport, musiqalar tinglash va tabiatda sayr qilish orqali bartaraf etadi. 🧘‍♂️";
    }

    if (
      includes([
        "failure story",
        "muvaffaqiyatsiz hikoya",
        "qanday to‘g‘riladi",
      ])
    ) {
      return `Bir marta uning techno.uz nomli loyihasi muvaffaqiyatsiz tugagan. Lekin u shundan muhim saboq oldi va keyingi loyihada xatolarini tuzatdi. 📉➡️📈`;
    }

    if (includes(["success story", "muvaffaqiyat hikoya", "eng yaxshi"])) {
      return `Eng katta muvaffaqiyati - Xato qilganda uni qayta-qayta qilish. Bu unga ishonch va yangi imkoniyatlar berdi. 🏆`;
    }

    if (includes(["collaboration", "hamkorlik", "loyihada ishlash"])) {
      return "Abdumutolib GitHub, Slack va Figma yordamida jamoaviy loyihalarda samarali ishlaydi. U ochiq muloqotni yaxshi ko‘radi. 🤝";
    }

    if (includes(["remote work", "masofadan ish", "qanday ishlaydi"])) {
      return "U uydan ishlashni yaxshi ko‘radi. Kuniga 2-3 marta video-konferensiyalar o‘tkazadi, qolgan vaqt mustaqil ishlaydi. 🏠💻";
    }

    if (includes(["office", "ofis", "qayerda ishlaydi"])) {
      return "Abdumutolib ko‘p hollarda uydan ishlaydi, ba‘zan hamkorlar bilan birga ishlash uchun coworking spacelarga boradi. 🏢";
    }

    if (includes(["work environment", "ish muhiti", "qanday joy"])) {
      return "U sokin, tartibli va yorug‘ ish muhitini afzal ko‘radi. Stol atrofida qiziqarli inshootlar va yashil o‘simliklar bo‘ladi. 🌱";
    }

    if (includes(["coding setup", "dasturlash uskunalari", "kompyuter"])) {
      return `U Xtech monoblokidan foydalanadi. Uning asosiy qurilmasi - Monoblok`;
    }

    if (includes(["keyboard", "klaviatura", "mexanik"])) {
      return "Abdumutolib mexanik klaviaturada yozishni yaxshi ko‘radi. Unda yengil va tez yozish uchun Brown switchlar mavjud. ⌨️";
    }

    if (includes(["monitor", "ekran", "qancha monitor"])) {
      return "U ish vaqtida 2 ta monitordan foydalanadi: biri kod uchun, ikkinchisi dizayn va dokumentatsiya uchun. 🖥️🖥️";
    }

    if (includes(["meetup", "tech event", "tadbir", "konferensiya"])) {
      return `Abdumutolib 3ta texnologik tadbirlarda ishtirok etgan. U yangi odamlar bilan tanishishni yaxshi ko‘radi. 📅`;
    }

    if (includes(["speaker", "speaker", "taqdimot", "prezident"])) {
      return "U bir necha marta dasturlash bo‘yicha kichik master-klasslar o‘tkazgan. Kelajakda yirik konferensiyalarda ma‘ruza qilishni xohlaydi. 🎤";
    }

    if (includes(["reading", "o‘qish", "kitoblar", "nimalar o‘qiydi"])) {
      return `U har oy 3 ta kitob o‘qiydi. Asosan dasturlash mavzularidagi kitoblar. 📖`;
    }

    if (includes(["writing", "yozish", "blog", "maqola"])) {
      return "Abdumutolib dasturlash haqida qisqa maqolalar yozadi. U tez orada o‘zining texnik blogini ishga tushiradi. ✍️";
    }

    if (includes(["podcast", "podcast", "eshtish", "qaysi podcast"])) {
      return `U muvofaqqiyatga erishish kabi podcastlarni eshitishni yaxshi ko‘radi. Ko‘pincha kod yozayotganda tinglaydi. 🎧`;
    }

    if (includes(["game", "o‘yin", "kompyuter o‘yinlari"])) {
      return `Dam olish vaqtida futbol, voleybol kabi o‘yinlarni o‘ynaydi. Bu unga aqliy dam olish beradi. 🎮`;
    }

    if (includes(["car", "mashina", "avtomobil", "haydash"])) {
      return "Abdumutolib hozircha haydovchilik guvohnomasiga ega emas, lekin kelajakda BMW M5 haydashni xohlaydi. 🚗";
    }

    if (includes(["family", "oilaviy", "qanday oila", "ota-ona"])) {
      return "Uning oilasi uning dasturlashga bo‘lgan qiziqishini qo‘llab-quvvatlaydi. Ota-onasi uni har doim rag‘batlantiradi. 👨‍👩‍👧‍👦";
    }

    if (includes(["childhood", "bolalik", "qanday bola"])) {
      return "Bolaligida Abdumutolib kompyuterlar bilan qiziqardi, ularni qanday ishlashini tushunishga harakat qilardi. 👦💻";
    }

    if (includes(["school", "maktab", "qaysi maktab"])) {
      return `U 57-maktabda o‘qimoqda va u yerda dasturlashga qiziqish paydo bo‘lgan. Maktab yillarida birinchi dasturlash tanlovida qatnashgan. 🏫`;
    }

    if (includes(["university", "universitet", "qayerda o‘qiydi"])) {
      return `Abdumutolib hozirda 57-Maktabdada 9-sinf yo‘nalishi bo‘yicha o‘qimoqda. U bilimni amaliyot bilan birlashtirishga harakat qiladi. 🎓`;
    }

    if (includes(["first job", "birinchi ish", "qachon ishlagan"])) {
      return `Uning rasmiy ishi hali mavjud emas u hozirda o'qishga qattiq berilgan. 💼`;
    }

    if (includes(["job interview", "intervyu", "suhbat", "maslahat"])) {
      return "Abdumutolib intervyularda halol va ochiq bo‘lishni, shuningdek, o‘z bilimlari haqida aniq gapirishni maslahat beradi. 🤵";
    }

    if (includes(["salary", "maosh", "qancha oladi"])) {
      return "Abdumutolib professional dasturchi sifatida bozor talabiga mos maosh oladi. U puldan ko‘ra, loyihaning mazmuni va tajriba uchun ishlaydi. 💵";
    }

    if (includes(["work process", "ish jarayoni", "qanday ishlaydi"])) {
      return `Uning ish jarayoni: ${data.workProcessSteps.join(
        ", "
      )}. Har bir bosqichga alohida e‘tibor beradi. 📊`;
    }

    if (includes(["debugging", "debug", "xatolarni tuzatish"])) {
      return "Abdumutolib kodda xatolarni topish uchun Chrome DevTools, console.log() va breakpointlardan foydalanadi. U debaggingni «dasturchining detektiv ishi» deb ataydi. 🕵️‍♂️";
    }

    if (includes(["code review", "kodni tekshirish", "qanday tekshiradi"])) {
      return "U jamoaviy loyihalarda kodni diqqat bilan tekshiradi, clean code va optimal yechimlarga ahamiyat beradi. 👀";
    }

    if (includes(["git", "github", "version control", "branch"])) {
      return "Abdumutolib Git va GitHub’dan professional darajada foydalanadi. U feature branch workflow’ni qo‘llaydi va commit messagelarga ahamiyat beradi. 🌿";
    }

    if (includes(["testing", "testlash", "unit test", "jest"])) {
      return `U ${data.testingTools.join(
        ", "
      )} yordamida kodni test qiladi. To‘liq test qilingan kodga ishonch bildiradi. ✅`;
    }
    if (includes(["paradigma", "dasturlash uslubi", "oop", "functional"])) {
      return "Abdumutolib obyektga yo'naltirilgan dasturlash (OOP) va funksional dasturlashni qo'llaydi. U loyihaga qarab mos uslubni tanlaydi. 🧩";
    }
    if (includes(["qiziqarli loyiha", "sevimli loyiha", "qaysi loyiha"])) {
      return "Abdumutolib AI va foydalanuvchi interfeyslariga yo'naltirilgan loyihalarni eng qiziqarli deb biladi. Masalan, uning AI chat-boti foydalanuvchilarga real yordam beradi! 🤖";
    }
    if (includes(["hamkorlik", "qanday dasturchi", "jamoa a'zolari"])) {
      return "U ijodiy, intizomli va ochiq fikrli dasturchilar bilan ishlashni afzal ko'radi. Fikr almashish va yangi g'oyalarni sinashni yaxshi ko'radi. 🤝";
    }
    if (
      includes(["yangi texnologiya", "keyingi o'rganish", "nima o'rganmoqchi"])
    ) {
      return "Abdumutolib hozirda TypeScript, GraphQL va Machine Learningni chuqur o'rganmoqchi. U doimo yangi narsalarni sinab ko'radi! 📚";
    }
    if (includes(["rivojlanish", "o'zini rivojlantirish", "qanday o'sadi"])) {
      return "U har kuni yangi maqola o'qiydi, onlayn kurslarda qatnashadi va haqiqiy loyihalarda tajriba orttiradi. Doimiy o'sish uning asosiy maqsadi! 🌱";
    }
    if (includes(["mobil ilova", "app", "mobile app"])) {
      return "Abdumutolib hali mobil ilova chiqarmagan, lekin React Native yordamida oddiy ilovalar ustida tajriba o'tkazmoqda. Tez orada birinchi ilovasini chiqaradi! 📱";
    }
    if (includes(["test usullari", "unit testing", "qanday test qiladi"])) {
      return "Abdumutolib unit testlar uchun Jest va integratsion testlar uchun Postmandan foydalanadi. Sifatli kod uchun testlashni muhim deb biladi. ✅";
    }
    if (includes(["sevimli xususiyat", "dasturlash tili xususiyati"])) {
      return "U JavaScriptda dinamik typing va Python'da oson sintaksisni yaxshi ko'radi. Bu tillar ijodkorlikni oshiradi! 💻";
    }
    return "Uzr, savolingizni aniq tushunmadim. Abdumutolib haqida ko'proq ma'lumot olish uchun uning ko'nikmalari, loyihalari, yutuqlari, qiziqishlari yoki aloqa ma'lumotlari haqida so'rashingiz mumkin. 🤔";
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const abbiAI = new AbbiAI();
});
