class ScrollPhrases {
  constructor() {
    this.phrases = document.querySelectorAll(".phrase");
    this.totalPhrases = this.phrases.length;
    this.currentPhrase = 0;
    this.isTransitioning = false;
    this.musicPlaying = false;
    this.audio = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateProgressBar();
  }

  setupEventListeners() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Control de música
    document.getElementById("musicControl").addEventListener("click", () => {
      this.toggleMusic();
    });

    // Prevenir scroll horizontal
    window.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaX !== 0) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  handleScroll() {
    const scrollPercent =
      window.pageYOffset /
      (document.documentElement.scrollHeight - window.innerHeight);
    const targetPhrase = Math.floor(scrollPercent * this.totalPhrases);

    // Actualizar barra de progreso
    this.updateProgressBar();

    // Cambiar frase si es necesario
    if (
      targetPhrase !== this.currentPhrase &&
      targetPhrase < this.totalPhrases
    ) {
      this.changePhrase(targetPhrase);
    }
  }

  changePhrase(newPhraseIndex) {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    const currentPhraseElement = this.phrases[this.currentPhrase];
    const newPhraseElement = this.phrases[newPhraseIndex];

    // Fade out current phrase
    currentPhraseElement.classList.add("fade-out");
    currentPhraseElement.classList.remove("active");

    // Wait for fade out, then fade in new phrase
    setTimeout(() => {
      currentPhraseElement.classList.remove("fade-out");
      newPhraseElement.classList.add("active");

      this.currentPhrase = newPhraseIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 100);
    }, 400);
  }

  updateProgressBar() {
    const scrollPercent =
      window.pageYOffset /
      (document.documentElement.scrollHeight - window.innerHeight);
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = scrollPercent * 100 + "%";
  }

  toggleMusic() {
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");

    if (!this.musicPlaying) {
      // Aquí puedes agregar tu archivo de música
      // this.audio = new Audio('tu-archivo-de-musica.mp3');
      // this.audio.loop = true;
      // this.audio.play();

      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
      this.musicPlaying = true;

      console.log("Música iniciada (agrega tu archivo de audio)");
    } else {
      // if (this.audio) {
      //     this.audio.pause();
      // }

      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
      this.musicPlaying = false;

      console.log("Música pausada");
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new ScrollPhrases();
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth";
