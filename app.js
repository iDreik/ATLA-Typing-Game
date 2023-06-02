// TODO: Highscores button, inside theres a modal with a table of highscores and in which quote they got it

Vue.createApp({
  mounted() {
    document.querySelector("html").addEventListener("click", () => {this.$refs.userInput.focus()});
    setTimeout(() => {
      this.isLoading = false;
      this.getRandomQuote();
      pContentId.classList.add("show");
    }, 1000);
    this.highScoreList = JSON.parse(localStorage.getItem('localHighScoreList') || sessionStorage.getItem('sessionHighScoreList')) ?? {};
    this.highScore = Number (localStorage.getItem('localOverallHSItem') || sessionStorage.getItem('sessionOverallHSItem'));
  },
  data() {
    return {
      quotes: [
        { id: 0, text: "There is nothing wrong with letting people who love you, help you.", byWho: "- Iroh" },
        { id: 1, text: "While it is always best to believe in oneself, a little help from others can be a great blessing.", byWho: "- Iroh" },
        { id: 2, text: "It is usually best to admit mistakes when they occur, and to seek to restore honor.", byWho: "- Iroh" },
        { id: 3, text: "It's time for you to look inward and begin asking yourself the big question: who are you and what do you want?", byWho: "- Iroh" },
        { id: 4, text: "You must never give in to despair. Allow yourself to slip down that road and you surrender to your lowest instincts.", byWho: "- Zuko" },
        { id: 5, text: "Life happens wherever you are, whether you make it or not.", byWho: "- Iroh" },
        { id: 6, text: "Sharing tea with a fascinating stranger is one of life's true delights.", byWho: "- Iroh" },
        { id: 7, text: "The greatest illusion of this world is the illusion of separation. Things you think are separate and different are actually one and the same.", byWho: "- Guru Pathik" },
        { id: 8, text: "It is important to draw wisdom from many different places. If you take it from only one place, it becomes rigid and stale.", byWho: "- Iroh" },
        { id: 9, text: "Failure is only the opportunity to begin again. Only this time, more wisely.", byWho: "- Iroh" },
        { id: 10, text: "Sometimes the best way to solve your own problems is to help someone else.", byWho: "- Iroh" },
        { id: 11, text: "The Fire Nation and the Avatar are linked, but now the Avatar is the last hope for the world.", byWho: "- Roku" },
        { id: 12, text: "As the Avatar, you are not meant to hurt others, but to bring peace.", byWho: "- Roku" },
        { id: 13, text: "I know now that no one can give you your honor. It's something you earn for yourself by choosing to do what's right.", byWho: "- Zuko" },
        { id: 14, text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", byWho: "- Roku" },
        { id: 15, text: "When we hit our lowest point, we are open to the greatest change.", byWho: "- Roku" },
        { id: 16, text: "Destiny is a funny thing. You never know how things are going to work out.", byWho: "- Aang" },
        { id: 17, text: "Fire is the element of power. The people of the Fire Nation have desire and will, and the energy and drive to achieve what they want.", byWho: "- Iroh" },
        { id: 18, text: "The true mind can weather all the lies and illusions without being lost. The true heart can touch the poison of hatred without being harmed.", byWho: "- Lion Turtle" },
        { id: 19, text: "You have light and peace inside of you. If you let it out, you can change the world around you.", byWho: "- Iroh" },
        { id: 20, text: "The greatest victories are those won without fighting.", byWho: "- Iroh" },
        { id: 21, text: "In the darkest times, hope is something you give yourself. That is the meaning of inner strength.", byWho: "- Iroh" },
        { id: 22, text: "Sometimes life is like this dark tunnel, you can't always see the light at the end of the tunnel, but if you just keep moving, you will come to a better place.", byWho: "- Iroh" },
        { id: 23, text: "Some friendships are so strong, they can even transcend lifetimes.", byWho: "- Katara" },
        { id: 24, text: "Water is the element of change. The people of the Water Tribe are capable of adapting to many things.", byWho: "- Katara" },
      ],

      imageIndex: 0,
      imageSources: [
        "https://i1.sndcdn.com/artworks-000664630216-y0lu1g-t500x500.jpg",
        "https://i1.sndcdn.com/avatars-9MToyZakOV3d5S5y-tW0azw-t500x500.jpg",
        "https://i.pinimg.com/originals/72/ba/3e/72ba3ec4873f1b5ad6845108669afeba.png",
        "https://i1.sndcdn.com/artworks-Mp1kZBy3udSm8MZM-sPWreQ-t500x500.jpg",
        "https://i1.sndcdn.com/artworks-UZ5xlnRvFCzmDyGN-sk4UGQ-t500x500.jpg",
        "https://i1.sndcdn.com/artworks-000623230642-uapld7-t500x500.jpg",
        "https://i.pinimg.com/564x/7c/f8/7c/7cf87cff46ab2bfae880b0f16aac22de.jpg",
      ],

      userInput: "",
      userInputted: false,
      randomQuote: null,
      correctlyTypedWords: [],

      startTime: null,
      endTime: null,
      wordsTyped: 0,
      charactersTyped: 0,
      typingSpeed: 0,
      highScore: 0,
      highScoreMsg: "",
      highScoreQuote: 0,
      quoteHighScoreMsg: "",
      ended: false,

      currentQuoteId: null,
      highScoreList: {},

      isLoading: true,
    };
  },
  computed: {
    quoteCharacters() {
      return this.userInputted && this.randomQuote ?
          this.randomQuote.map((char, index) => {
            const correctlyTypedSoFar =
              this.correctlyTypedWords.join("").length +
              this.correctlyTypedWords.length;
            const position = index - correctlyTypedSoFar
            if (index < correctlyTypedSoFar) {
              return { char: char.char, isCorrect: true };
            }
            else if (index < this.charactersTyped) {
              const isCorrect = this.userInput[position] === char.char
              return {
                char: char.char,
                isCorrect: isCorrect,
                isIncorrect: !isCorrect,
                isDefault: false,
              };
            }
            else {
              return char;
            }
          })
        : this.randomQuote ? this.randomQuote : [];
    },
    quoteWords() {
      return this.randomQuote ? this.randomQuote.map(char => char.char).join("").split(" ") : [];
    },
    imageSource() {
      return this.imageSources[this.imageIndex];
    },
    highScoreListMapped () {
      return Object.entries(this.highScoreList).map(([id, score]) => ({id, score, quote: this.quotes.find(quote => quote.id === parseInt(id)).text, byWho: this.quotes.find(quote => quote.id === parseInt(id)).byWho}));
    },
  },
  methods: {
    getRandomQuote() {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      this.randomQuote = this.quotes[randomIndex].text.split("").map(char => ({char: char, isDefault: true}));
      this.currentQuoteId = this.quotes[randomIndex].id;
      this.randomQuoteByWho = this.quotes[randomIndex].byWho;
      this.userInput = "";
      this.correctlyTypedWords = [];
      this.$nextTick(() => {
        this.$refs.userInput.focus();
        this.userInputted = false;
      });
      this.charactersTyped = 0;
      this.ended = false;
      this.closeModal();
    },
    startTyping() {
      this.startTime = new Date();
    },
    endTyping() {
      if (this.ended) return;
      this.ended = true;
      this.endTime = new Date();
      const timeDiff = (this.endTime - this.startTime) / 1000; // Time difference in seconds
      const minutes = timeDiff / 60; // Time difference in minutes
      const correctWords = this.correctlyTypedWords.length;
      this.typingSpeed = Math.round(correctWords / minutes);
      if (!this.highScoreList[this.currentQuoteId] || (this.typingSpeed > this.highScoreList[this.currentQuoteId])) {
        this.highScoreList[this.currentQuoteId] = this.typingSpeed;
        this.quoteHighScoreMsg = "New Quote Highscore!";
      }
      else {
        this.quoteHighScoreMsg = "Quote Highscore: ";
        this.highScoreQuote = this.highScoreList[this.currentQuoteId];
      }
      if (this.typingSpeed > this.highScore) {
        this.highScore = this.typingSpeed;
        this.highScoreMsg = "New Overall Highscore!";
        sessionStorage.setItem("sessionOverallHSItem", this.highScore);
      }
      else {
        this.highScoreMsg = "Overall Highscore: ";
      }
    },
    changeImg () {
      byWhoId.classList.add("active");
      setTimeout(() => {
        byWhoId.classList.remove("active");
      }, 80);

      const quoteBy = {
        "- Aang": 0,
        "- Iroh": 1,
        "- Zuko": 2,
        "- Guru Pathik": 3,
        "- Lion Turtle": 4,
        "- Roku": 5,
        "- Katara": 6,
      };

      this.imageIndex = quoteBy[this.randomQuoteByWho];
      
      byWhoModalId.classList.add("show");
    },
    closeModal() {
      endModalId.classList.remove("show");
      byWhoModalId.classList.remove("show");
      highScoresModalId.classList.remove("show");
    },
    insideClick(event) {
      event.stopPropagation();
    },
    copyText() {
      const textArea = document.createElement("textarea");
      textArea.value = '"' + this.quoteWords.join(" ") + '" ' + this.randomQuoteByWho;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      copyMsgId.classList.add("show");
      setTimeout(() => {
        copyMsgId.classList.remove("show");
      }, 1000)
    },
    saveHighScore() {
      localStorage.setItem("localHighScoreList", sessionStorage.getItem("sessionHighScoreList"));
      localStorage.setItem("localOverallHSItem", this.highScore);
      savedMsgId.classList.add("show");
      setTimeout(() => {
        savedMsgId.classList.remove("show");
      }, 1000)
    },
    getHighScores() {
      highScoresModalId.classList.add("show");
    },
  },
  watch: {
    userInput(newVal) {
      this.userInputted = true;
      let isLastWord = this.quoteWords.length - this.correctlyTypedWords.length === 1;
      if (newVal[newVal.length - 1] === " " || isLastWord) {
        if (
          this.userInput.trim() ===
          this.quoteWords[this.correctlyTypedWords.length]
        ) {
          this.correctlyTypedWords.push(this.userInput.trim());
        }
        if (!isLastWord) this.userInput = "";
      }
      if (this.correctlyTypedWords.length === this.quoteWords.length) {
        endModalId.classList.add("show");
        this.userInput = "";
        this.endTyping();
      }
      const correctlyTypedSoFar =
        this.correctlyTypedWords.join("").length +
        this.correctlyTypedWords.length;
      this.charactersTyped = correctlyTypedSoFar + newVal.length;
    },
    userInputted(newVal) {
      if (newVal) {
        this.startTyping();
      }
    },
    highScoreList: {
      handler(newVal) {
        sessionStorage.setItem("sessionHighScoreList", JSON.stringify(newVal));
      },
      deep: true,
    },
  },
}).mount("#typingGame");
