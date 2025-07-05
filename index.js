class ScrollPhrases {
  constructor() {
    this.phrases = document.querySelectorAll(".phrase");
    this.totalPhrases = this.phrases.length;
    this.currentPhrase = 0;
    this.isTransitioning = false;

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
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new ScrollPhrases();

  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const musicControl = document.getElementById("musicControl");
  const music = document.getElementById("bgMusic");

  music.volume = 0.3;
  let isPlaying = false;

  function toggleMusic() {
    if (isPlaying) {
      music.pause();
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
      isPlaying = false;
    } else {
      music
        .play()
        .then(() => {
          playIcon.style.display = "none";
          pauseIcon.style.display = "block";
          isPlaying = true;
        })
        .catch((err) => {
          console.warn("Autoplay bloqueado o error al reproducir:", err);
        });
    }
  }

  document.body.addEventListener(
    "click",
    function firstClick() {
      music
        .play()
        .then(() => {
          playIcon.style.display = "none";
          pauseIcon.style.display = "block";
          isPlaying = true;
        })
        .catch((err) => {
          console.warn("Autoplay bloqueado o error al reproducir:", err);
        });
      document.body.removeEventListener("click", firstClick);
    },
    { once: true }
  );

  // Evento del botón play/pause
  musicControl.addEventListener("click", toggleMusic);
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth";
