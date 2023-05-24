//if byWho === "Water? Earth? Fire? Air? nation" || personal symbolysms
// TODO: update the page to have the nation colors and symbolisms

Vue.createApp({
  data() {
    return {
      quotes: [
        { text: "Pride is not the opposite of shame, but its source.", byWho: "Uncle Iroh" },
        { text: "In the darkest times, hope is something you give yourself.", byWho: "Zuko" },
        { text: "Sometimes life is like this dark tunnel, you can't always see the light at the end of the tunnel, but if you just keep moving, you will come to a better place.", byWho: "Uncle Iroh" },
        { text: "Destiny is a funny thing. You never know how things are going to work out.", byWho: "Aang" },
        { text: "There's nothing wrong with a life of peace and prosperity. I suggest you think about what it is that you want from your life, and why.", byWho: "Uncle Iroh" },
        { text: "Sharing tea with a fascinating stranger is one of life's true delights.", byWho: "Uncle Iroh" },
        { text: "Sometimes the best way to solve your own problems is to help someone else.", byWho: "Uncle Iroh" },
        { text: "Failure is only the opportunity to begin again. Only this time, more wisely.", byWho: "Uncle Iroh" },
        { text: "Life is like this dark tunnel. You may not always see the light at the end of the tunnel, but if you keep moving, you will come to a better place.", byWho: "Uncle Iroh" },
        { text: "The greatest illusion of this world is the illusion of separation. Things you think are separate and different are actually one and the same.", byWho: "Guru Pathik" },
        { text: "It is important to draw wisdom from many different places. If you take it from only one place, it becomes rigid and stale.", byWho: "Uncle Iroh" },
        { text: "The true mind can weather all the lies and illusions without being lost. The true heart can tough the poison of hatred without being harmed.", byWho: "Lion Turtle" },
        { text: "Fire is the element of power. The people of the Fire Nation have desire and will, and the energy and drive to achieve what they want.", byWho: "Uncle Iroh" },
        { text: "It's easy to do nothing, it's hard to forgive.", byWho: "Aang" },
        { text: "It's time for you to look inward and begin asking yourself the big question: who are you and what do you want?", byWho: "Uncle Iroh" },
        { text: "You have light and peace inside of you. If you let it out, you can change the world around you.", byWho: "Uncle Iroh" },
        { text: "It is important to draw wisdom from different places. If you take it from only one place, it becomes rigid and stale.", byWho: "Uncle Iroh" },
        { text: "Life happens wherever you are, whether you make it or not.", byWho: "Uncle Iroh" },
        { text: "Sometimes life is like this dark tunnel, you can't always see the light at the end of the tunnel, but if you just keep moving, you will come to a better place.", byWho: "Uncle Iroh" },
        { text: "Destiny is a funny thing. You never know how things are going to work out.", byWho: "Aang" },
      ],

      imageIndex: 0,
      imageSources: [
        "https://i1.sndcdn.com/artworks-000664630216-y0lu1g-t500x500.jpg",
        "https://i1.sndcdn.com/avatars-9MToyZakOV3d5S5y-tW0azw-t500x500.jpg",
        "https://i.pinimg.com/originals/72/ba/3e/72ba3ec4873f1b5ad6845108669afeba.png",
        "https://i1.sndcdn.com/artworks-Mp1kZBy3udSm8MZM-sPWreQ-t500x500.jpg",
        "https://i1.sndcdn.com/artworks-UZ5xlnRvFCzmDyGN-sk4UGQ-t500x500.jpg",
      ],

      userInput: "",
      randomQuote: null,
      correctlyTypedWords: [],

      startTime: null,
      endTime: null,
      wordsTyped: 0,
      charactersTyped: 0,
      typingSpeed: 0,
      
      userInputted: false,
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
    imageSource(){
      return this.imageSources[this.imageIndex]
    }
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
        this.startTyping();
      });
      this.charactersTyped = 0;
    },
    startTyping() {
      this.startTime = new Date();
    },
    endTyping() {
      this.endTime = new Date();
      const timeDiff = (this.endTime - this.startTime) / 1000; // Time difference in seconds
      const minutes = timeDiff / 60; // Time difference in minutes
      const correctWords = this.correctlyTypedWords.length;
      this.typingSpeed = Math.round(correctWords / minutes);
    },
    changeImg () {
      const quoteBy = {
        "Aang": 0,
        "Uncle Iroh": 1,
        "Zuko": 2,
        "Guru Pathik": 3,
        "Lion Turtle": 4,
      }
      this.imageIndex = quoteBy[this.randomQuoteByWho];

      byWhoModalId.classList.add("show");
    },
    closeModal() {
      endModalId.classList.remove("show");
      byWhoModalId.classList.remove("show");
    },
    insideClick(event) {
      event.stopPropagation();
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
  },
}).mount("#typingGame");
