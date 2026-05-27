(() => {
  const body = document.body;
  const introGate = document.getElementById("intro-gate");
  const goldCursor = document.getElementById("gold-cursor-glow");
  const optionalMediaNodes = document.querySelectorAll("[data-optional-media]");
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  const enterSite = () => {
    if (!body.classList.contains("prelaunch")) {
      return;
    }

    body.classList.remove("prelaunch");
  };

  if (introGate) {
    introGate.addEventListener("click", enterSite);
    introGate.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        enterSite();
      }
    });
  }

  const animateCursorGlow = () => {
    const easing = 0.18;
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    const x = `${currentX}px`;
    const y = `${currentY}px`;
    body.style.setProperty("--mx", x);
    body.style.setProperty("--my", y);

    if (goldCursor) {
      goldCursor.style.left = x;
      goldCursor.style.top = y;
    }

    window.requestAnimationFrame(animateCursorGlow);
  };

  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  window.requestAnimationFrame(animateCursorGlow);

  window.addEventListener("touchstart", () => {
    if (goldCursor) {
      goldCursor.style.display = "none";
    }
  }, { passive: true });

  optionalMediaNodes.forEach((node) => {
    node.addEventListener("error", () => {
      const holder = node.closest(".join-banner");
      if (holder && holder.classList.contains("join-banner")) {
        holder.style.display = "none";
        return;
      }

      node.style.display = "none";
    });
  });
})();
