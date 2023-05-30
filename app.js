Vue.createApp({
  mounted() {
    document.querySelector("body").addEventListener("click", () => {this.$refs.userInput.focus()});
    setTimeout(() => {
      this.isLoading = false;
      this.getRandomQuote();
      pContentId.classList.add("show");
    }, 1000);
    this.highScore = Number (localStorage.getItem('localHighScoreItem') || sessionStorage.getItem('sessionHighScoreItem'));
  },
  data() {
    return {
      quotes: [
        { text: "When we hit our lowest point, we are open to the greatest change.", byWho: "- Aang" },
        { text: "It is important to draw wisdom from different places. If you take it from only one place, it becomes rigid and stale.", byWho: "- Iroh" },
        { text: "There is nothing wrong with letting people who love you, help you.", byWho: "- Iroh" },
        { text: "In the darkest times, hope is something you give yourself.", byWho: "- Zuko" },
        { text: "While it is always best to believe in oneself, a little help from others can be a great blessing.", byWho: "- Iroh" },
        { text: "It is usually best to admit mistakes when they occur, and to seek to restore honor.", byWho: "- Iroh" },
        { text: "It's time for you to look inward and begin asking yourself the big question: who are you and what do you want?", byWho: "- Iroh" },
        { text: "You must never give in to despair. Allow yourself to slip down that road and you surrender to your lowest instincts.", byWho: "- Zuko" },
        { text: "Life happens wherever you are, whether you make it or not.", byWho: "- Iroh" },
        { text: "While it is always best to believe in oneself, a little help from others can be a great blessing.", byWho: "- Iroh" },
        { text: "Sharing tea with a fascinating stranger is one of life's true delights.", byWho: "- Iroh" },
        { text: "The greatest illusion of this world is the illusion of separation. Things you think are separate and different are actually one and the same.", byWho: "- Guru Pathik" },
        { text: "It is important to draw wisdom from many different places. If you take it from only one place, it becomes rigid and stale.", byWho: "- Iroh" },
        { text: "Failure is only the opportunity to begin again. Only this time, more wisely.", byWho: "- Iroh" },
        { text: "Sometimes the best way to solve your own problems is to help someone else.", byWho: "- Iroh" },
        { text: "The true mind can weather all the lies and illusions without being lost. The true heart can touch the poison of hatred without being harmed.", byWho: "- Lion Turtle" },
        { text: "It's time for you to look inward and begin asking yourself the big question: who are you and what do you want?", byWho: "- Iroh" },
        { text: "The Fire Nation and the Avatar are linked, but now the Avatar is the last hope for the world.", byWho: "- Roku" },
        { text: "As the Avatar, you are not meant to hurt others, but to bring peace.", byWho: "- Roku" },
        { text: "I know now that no one can give you your honor. It's something you earn for yourself by choosing to do what's right.", byWho: "- Zuko" },
        { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", byWho: "- Roku" },
        { text: "You must never give in to despair. Allow yourself to slip down that road and you surrender to your lowest instincts.", byWho: "- Zuko" },
        { text: "When we hit our lowest point, we are open to the greatest change.", byWho: "- Roku" },
        { text: "Destiny is a funny thing. You never know how things are going to work out.", byWho: "- Aang" },
        { text: "Fire is the element of power. The people of the Fire Nation have desire and will, and the energy and drive to achieve what they want.", byWho: "- Iroh" },
        { text: "The true mind can weather all the lies and illusions without being lost. The true heart can touch the poison of hatred without being harmed.", byWho: "- Lion Turtle" },
        { text: "When we hit our lowest point, we are open to the greatest change.", byWho: "- Aang" },
        { text: "It is usually best to admit mistakes when they occur, and to seek to restore honor.", byWho: "- Iroh" },
        { text: "You have light and peace inside of you. If you let it out, you can change the world around you.", byWho: "- Iroh" },
        { text: "The greatest victories are those won without fighting.", byWho: "- Iroh" },
        { text: "In the darkest times, hope is something you give yourself. That is the meaning of inner strength.", byWho: "- Iroh" },
        { text: "Destiny is a funny thing. You never know how things are going to work out.", byWho: "- Aang" },
        { text: "Sometimes life is like this dark tunnel, you can't always see the light at the end of the tunnel, but if you just keep moving, you will come to a better place.", byWho: "- Iroh" },
        { text: "Some friendships are so strong, they can even transcend lifetimes.", byWho: "- Katara" },
        { text: "Water is the element of change. The people of the Water Tribe are capable of adapting to many things.", byWho: "- Katara" },
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
      ended: false,

      isLoading: true,
      imgLoading: false,
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
  },
  methods: {
    getRandomQuote() {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      this.randomQuote = this.quotes[randomIndex].text.split("").map(char => ({char: char, isDefault: true}));
      this.randomQuoteByWho = this.quotes[randomIndex].byWho;
      this.userInput = "";
      this.correctlyTypedWords = [];
      this.$nextTick(() => {
        this.$refs.userInput.focus();
        this.userInputted = false;
      });
      this.charactersTyped = 0;
      this.ended = false;
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
      if (this.typingSpeed > this.highScore) {
        this.highScore = this.typingSpeed
        this.highScoreMsg = "New Highscore!";
      }
      else {
        this.highScoreMsg = "Highscore: ";
      }
      sessionStorage.setItem("sessionHighScoreItem", this.highScore);
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
      this.imgLoading = true;

      setTimeout(() => {
        this.imgLoading = false;
      }, 150);

      byWhoModalId.classList.add("show");
    },
    closeModal() {
      endModalId.classList.remove("show");
      byWhoModalId.classList.remove("show");
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
      localStorage.setItem("localHighScoreItem", this.highScore);
      savedMsgId.classList.add("show");
      setTimeout(() => {
        savedMsgId.classList.remove("show");
      }, 1000)
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
  },
}).mount("#typingGame");
