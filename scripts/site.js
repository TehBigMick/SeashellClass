(function () {
  const body = document.body;
  if (!body || body.dataset.noShell === "true" || document.querySelector(".site-header")) return;
  body.classList.add("site-shell");

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const section = path.includes("stories") || /pirate-pat|dressing-up|perfect-pet|comic-story/.test(path)
    ? "stories"
    : path.includes("games") || /game|sound-detective|picture-match|sentence-builder/.test(path)
      ? "games"
      : path.includes("resources") || path.includes("phonics") || path.includes("weather") || path.includes("hobbies") || path.includes("supertato")
        ? "learn"
        : "home";

  const links = [["home", "/", "Home"], ["learn", "/resources.html", "Learn"], ["stories", "/stories.html", "Stories"], ["games", "/games.html", "Games"]];
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="site-header__inner">
      <a class="site-brand" href="/" aria-label="Seashell Class home">
        <span class="site-brand__mark" aria-hidden="true">≈</span>
        <span class="site-brand__label">Seashell Class</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Open navigation">☰</button>
      <nav class="site-nav" id="site-navigation" aria-label="Main navigation">
        ${links.map(([key, href, label]) => `<a href="${href}"${key === section ? ' aria-current="page"' : ""}${key === "games" ? ' class="site-nav__play"' : ""}>${label}</a>`).join("")}
      </nav>
    </div>`;

  const skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main-content";
  skip.textContent = "Skip to content";
  const firstContent = Array.from(body.children).find((child) => !["SCRIPT", "STYLE", "LINK"].includes(child.tagName));
  if (firstContent && !firstContent.id) firstContent.id = "main-content";
  body.prepend(header);
  body.prepend(skip);

  const menuButton = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".site-nav");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuButton.textContent = open ? "×" : "☰";
  });
  nav.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.textContent = "☰";
  });

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<p><strong>Seashell Class</strong> · Small activities for big learning.</p><p>Made for shared practice with a parent, carer or teacher.</p>`;
  body.append(footer);
})();
