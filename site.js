/* ===========================================================
   GO TO THE CAMPUS — Revamp Wireframe · shared site chrome
   Injects the prototype bar, header/nav, and footer on every
   page, and wires shared behaviors. EDIT THE NAV IN ONE PLACE
   (the NAV array below) and every page updates.
   =========================================================== */
(function () {
  var IMG = "https://campus.cru.org/high-school/go-to-the-campus/wp-content/uploads/sites/563/";

  // ---- Single source of truth for navigation ----
  var NAV = [
    { label: "Learn", href: "learn.html", children: [
      { label: "Understand Cru", href: "understand-cru.html" },
      { label: "Relate to Students", href: "relate-to-students.html" },
      { label: "Share Your Faith", href: "share-your-faith.html" },
      { label: "Lead a Small Group", href: "lead-a-small-group.html" },
      { label: "Meet the Parents", href: "meet-the-parents.html" }
    ]},
    { label: "Lead", href: "lead.html", children: [
      { label: "Planning", href: "planning.html" },
      { label: "Large Group Outreaches", href: "large-group-outreaches.html" },
      { label: "Prayer", href: "prayer.html" },
      { label: "Developing Student Leaders", href: "developing-student-leaders.html" },
      { label: "Conferences and Retreats", href: "conferences-and-retreats.html" },
      { label: "International Missions", href: "international-missions.html" },
      { label: "Working with Adults", href: "working-with-adults.html" },
      { label: "Promote Your Ministry", href: "promote-your-ministry.html" }
    ]},
    { label: "Launch", href: "launch.html", children: [
      { label: "The Coaching Center", href: "the-coaching-center.html" },
      { label: "The Launch Box", href: "the-launch-box.html" }
    ]},
    { label: "Join", href: "join.html" }
  ];

  var CRU_SVG = '<svg class="cru-mark" viewBox="0 0 1382 1000" role="img" aria-label="Cru"><defs><style>.b{fill:#ffd000;}.c{fill:#007890;}.d{fill:#00c0d8;}.e{fill:#f08020;}</style></defs><path d="M1064.32,692.4c-1.56,0-3.02-.29-4.38-.87-1.36-.58-2.56-1.39-3.59-2.42-1.03-1.03-1.84-2.23-2.42-3.59-.58-1.36-.87-2.82-.87-4.38s.29-3.02.87-4.38c.58-1.36,1.39-2.56,2.42-3.59,1.03-1.03,2.23-1.84,3.59-2.42,1.36-.58,2.82-.87,4.38-.87s3.02.29,4.38.87c1.36.58,2.56,1.39,3.59,2.42,1.03,1.03,1.84,2.23,2.42,3.59.58,1.36.87,2.82.87,4.38s-.29,3.02-.87,4.38c-.58,1.36-1.39,2.56-2.42,3.59s-2.23,1.84-3.59,2.42c-1.36.58-2.82.87-4.38.87Z"/><polygon class="b" points="955.07 426.93 955.07 624.93 930.32 624.93 930.32 451.68 757.07 451.68 757.07 426.93 955.07 426.93"/><polygon class="c" points="930.32 371.24 806.57 371.24 806.57 395.99 955.07 395.99 955.07 247.5 930.32 247.5 930.32 371.24"/><polygon class="e" points="986.01 426.93 986.01 692.99 1010.76 692.99 1010.76 451.68 1134.5 451.68 1134.5 426.93 986.01 426.93"/><polygon class="d" points="1010.76 371.24 1010.76 198 986.01 198 986.01 395.99 1184 395.99 1184 371.24 1010.76 371.24"/><path d="M409.8,731.53l17.86,16.67-4.65,5.49c-27.79,32.52-60.46,48.31-99.9,48.31-69.02,0-125.17-57.4-125.17-127.97v-.92c0-33.94,12.81-65.9,36.08-89.99,23.61-24.49,55.44-37.96,89.57-37.96,48.52,0,76.68,22.87,97.78,45.25l5.18,5.52-17.96,16.75-5.1-5.47c-24.14-25.78-49.71-37.8-80.38-37.8-56.08,0-99.98,45.38-99.98,103.28v.9c0,57.42,45.06,104.15,100.45,104.15,31.09,0,56.9-12.81,81.12-40.36l5.1-5.84ZM497.76,594.74v-44.06h-24.75v245.78h24.75v-127.05c0-41.73,32.41-99.98,85.24-99.98h9.83v-24.22l-8.43-.08c-39.36,0-68.97,21.87-86.64,49.6M806.57,550.68v137.19c0,57.08-29.4,89.86-80.64,89.86s-80.61-32.78-80.61-89.86v-137.19h-24.72v138.12c0,69.81,39.99,113.21,104.41,113.21h1.85c64.42,0,104.47-43.4,104.47-113.21v-138.12h-24.75Z"/></svg>';

  function navHTML() {
    var items = NAV.map(function (item) {
      if (item.children) {
        var subs = item.children.map(function (c) {
          return '<a href="' + c.href + '">' + c.label + '</a>';
        }).join("");
        return '<li><a href="' + item.href + '" class="navlink">' + item.label +
               ' <span class="caret">\u25BC</span></a><div class="submenu">' + subs + '</div></li>';
      }
      return '<li><a href="' + item.href + '" class="navlink">' + item.label + '</a></li>';
    }).join("");
    return '<header class="site"><div class="wrap navrow">' +
      '<a href="index.html" class="logo" aria-label="Go to the Campus — home">' +
      '<img src="' + IMG + '2022/10/Go-To-The-Campus-Logo.png" alt="Go to the Campus"></a>' +
      '<nav class="primary" id="nav" aria-label="Primary"><ul>' + items + '</ul></nav>' +
      '<span class="spacer"></span>' +
      '<button class="search" aria-label="Search">\uD83D\uDD0D</button>' +
      '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">\u2630</button>' +
      '</div></header>';
  }

  function footerHTML() {
    var links = NAV.map(function (i) { return '<a href="' + i.href + '">' + i.label + '</a>'; }).join("") +
      '<a href="content.html">All Content</a><a href="contact.html">Contact Us</a><a href="#">Staff Only</a>';
    return '<footer class="site"><div class="wrap"><div class="top"><div>' + CRU_SVG +
      '<p style="color:#8a8a8a;font-size:.85rem;max-width:320px;margin-top:14px;">Cru High School Ministry — helping caring adults reach students on the public high school campus.</p></div>' +
      '<div class="flinks">' + links + '</div>' +
      '<div class="fsearch">\uD83D\uDD0D Search</div></div>' +
      '<div class="fbottom"><span>\u00A9 Cru. Prototype for internal review — not the live site.</span>' +
      '<span>Go to the Campus \u00B7 Revamp Wireframe</span></div></div></footer>';
  }

  function protobarHTML() {
    return '<div class="protobar"><strong>GO TO THE CAMPUS — REVAMP WIREFRAME</strong>' +
      '<span class="meta" id="pb-page"></span><span class="spacer"></span>' +
      '<label><input type="checkbox" id="lblToggle"> Show section labels (for rearranging)</label></div>';
  }

  function init() {
    // Inject chrome
    document.body.insertAdjacentHTML("afterbegin", protobarHTML() + navHTML());
    document.body.insertAdjacentHTML("beforeend", footerHTML());

    var pb = document.getElementById("pb-page");
    if (pb) pb.textContent = document.title.replace(/\s*[—|].*$/, "").trim();

    // Section-label toggle
    var t = document.getElementById("lblToggle");
    if (t) t.addEventListener("change", function (e) {
      document.body.classList.toggle("labels", e.target.checked);
    });

    // Mobile nav
    var burger = document.getElementById("hamburger");
    var nav = document.getElementById("nav");
    if (burger && nav) burger.addEventListener("click", function () {
      var o = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", o ? "true" : "false");
    });

    // Featured/content slider arrows (only if present)
    var track = document.getElementById("track");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    if (track && next) next.addEventListener("click", function () { track.scrollBy({ left: 340, behavior: "smooth" }); });
    if (track && prev) prev.addEventListener("click", function () { track.scrollBy({ left: -340, behavior: "smooth" }); });

    // Content-listing category filter (only if present)
    var chips = document.querySelectorAll(".chip");
    if (chips.length) chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var cat = chip.getAttribute("data-cat");
        document.querySelectorAll("[data-card]").forEach(function (card) {
          card.style.display = (cat === "all" || card.getAttribute("data-card") === cat) ? "" : "none";
        });
      });
    });

    // Neutralize placeholder links so clicks don't jump
    document.querySelectorAll('a[href="#"]').forEach(function (a) {
      a.addEventListener("click", function (ev) { ev.preventDefault(); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
