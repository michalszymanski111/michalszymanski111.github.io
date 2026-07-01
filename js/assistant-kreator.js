(function () {
  var deps = null;
  var state = {
    active: false,
    track: null,
    step: 0,
    awaitingPhoto: false,
    awaitingPhotoPick: false,
  };

  function step(label, key, opts) {
    return {
      label: label,
      key: key,
      optional: !!(opts && opts.optional),
      type: (opts && opts.type) || "text",
      choices: (opts && opts.choices) || null,
      hint: (opts && opts.hint) || "",
      defaultValue: (opts && opts.defaultValue) || "",
    };
  }

  var TRACKS = {
    mdowod: {
      title: "mDowód i dowód osobisty",
      steps: [
        step("Imię (imiona)", "name"),
        step("Nazwisko", "surname"),
        step("Obywatelstwo", "nationality", {
          optional: true,
          defaultValue: "POLSKIE",
        }),
        step("Data urodzenia", "birthDate", {
          type: "date",
          hint: "Format: RRRR-MM-DD lub DD.MM.RRRR",
        }),
        step("Płeć", "gender", {
          type: "choice",
          choices: ["MĘŻCZYZNA", "KOBIETA"],
        }),
        step("PESEL", "pesel", { hint: "11 cyfr" }),
        step("Nazwisko rodowe", "lastName", { optional: true }),
        step("Miejsce urodzenia", "placeOfBirth", { optional: true }),
        step("Imię ojca", "fathername", { optional: true }),
        step("Imię matki", "mothername", { optional: true }),
        step("Nazwisko rodowe ojca", "fatherSurname", { optional: true }),
        step("Nazwisko rodowe matki", "motherSurname", { optional: true }),
        step("Seria i numer mDowodu", "md_idSeries", { optional: true }),
        step("Data wydania mDowodu", "md_issueDate", {
          optional: true,
          type: "date",
        }),
        step("Termin ważności mDowodu", "md_expiryDate", {
          optional: true,
          type: "date",
        }),
        step("Seria i numer dowodu osobistego", "do_idSeries", {
          optional: true,
        }),
        step("Organ wydający (dowód)", "do_issuingAuthority", {
          optional: true,
        }),
        step("Data wydania dowodu", "do_issueDate", {
          optional: true,
          type: "date",
        }),
        step("Termin ważności dowodu", "do_expiryDate", {
          optional: true,
          type: "date",
        }),
        step("Adres zameldowania", "address", { optional: true }),
        step("Kod pocztowy i miejscowość", "postalcode", {
          optional: true,
        }),
        step("Data zameldowania", "registrationDate", {
          optional: true,
          type: "date",
        }),
      ],
      photo: true,
    },
    diia: {
      title: "DIIA.pl",
      steps: [
        step("Imię (imiona)", "diia_name"),
        step("Nazwisko", "diia_surname"),
        step("Data urodzenia", "diia_birthDate", { type: "date" }),
        step("Płeć (do PESEL)", "gender_diia", {
          type: "choice",
          choices: ["MĘŻCZYZNA", "KOBIETA"],
          optional: true,
          hint: "Opcjonalnie — wpisz /pomin",
        }),
        step("PESEL", "diia_pesel", { hint: "11 cyfr" }),
        step("Miejsce urodzenia", "diia_placeOfBirth", { optional: true }),
        step("Kraj pochodzenia", "diia_countryOfOrigin", {
          optional: true,
          defaultValue: "UKRAINA",
        }),
        step("Obywatelstwo", "diia_nationality", {
          optional: true,
          defaultValue: "UKRAIŃSKIE",
        }),
      ],
      photo: true,
    },
    legszk: {
      title: "Legitymacja szkolna",
      steps: [
        step("Imię", "display-name_legszk"),
        step("Nazwisko", "display-surname_legszk"),
        step("Data urodzenia", "display-birthDate_legszk", { type: "date" }),
        step("Płeć", "gender_legszk", {
          type: "choice",
          choices: ["MĘŻCZYZNA", "KOBIETA"],
          optional: true,
        }),
        step("PESEL", "display-pesel_legszk"),
        step("Numer legitymacji", "display-cardNumber_legszk", {
          optional: true,
        }),
        step("Data wydania", "display-issueDate_legszk", {
          optional: true,
          type: "date",
        }),
        step("Data ważności", "display-expiryDate_legszk", {
          optional: true,
          type: "date",
        }),
        step("Nazwa szkoły", "display-schoolName_legszk", { optional: true }),
        step("Adres szkoły", "display-schoolAddress_legszk", {
          optional: true,
        }),
        step("Telefon szkoły", "display-schoolPhone_legszk", {
          optional: true,
        }),
        step("Dyrektor szkoły", "display-schoolDirector_legszk", {
          optional: true,
        }),
      ],
      photo: true,
    },
    legstu: {
      title: "Legitymacja studencka",
      steps: [
        step("Imię", "display-name_legstu"),
        step("Nazwisko", "display-surname_legstu"),
        step("Data urodzenia", "display-birthDate_legstu", { type: "date" }),
        step("Płeć", "gender_legstu", {
          type: "choice",
          choices: ["MĘŻCZYZNA", "KOBIETA"],
          optional: true,
        }),
        step("PESEL", "display-pesel_legstu"),
        step("Data wydania", "display-dataWydania_legstu", {
          optional: true,
          type: "date",
        }),
        step("Nazwa uczelni", "display-uczelnia_legstu", { optional: true }),
        step("Numer albumu", "display-albumNumber_legstu", { optional: true }),
      ],
      photo: true,
    },
    prawojazdy: {
      title: "Prawo jazdy",
      steps: [
        step("Imię", "display-name_prawojazdy"),
        step("Nazwisko", "display-surname_prawojazdy"),
        step("Data urodzenia", "display-birthDate_prawojazdy", {
          type: "date",
        }),
        step("Miejsce urodzenia", "display-birthPlace_prawojazdy", {
          optional: true,
        }),
        step("Płeć", "gender_prawojazdy", {
          type: "choice",
          choices: ["MĘŻCZYZNA", "KOBIETA"],
          optional: true,
        }),
        step("PESEL", "display-pesel_prawojazdy"),
        step("Data wydania", "display-issueDate_prawojazdy", {
          optional: true,
          type: "date",
        }),
        step("Numer dokumentu", "display-documentNumber_prawojazdy", {
          optional: true,
        }),
        step("Numer blankietu", "display-blanketNumber_prawojazdy", {
          optional: true,
        }),
        step("Organ wydający", "display-issuingAuthority_prawojazdy", {
          optional: true,
        }),
      ],
      photo: true,
    },
  };

  function up(s) {
    if (s == null) return "";
    try {
      return String(s).trim().toLocaleUpperCase("pl");
    } catch (_) {
      return String(s).trim().toUpperCase();
    }
  }

  function saveField(key, val) {
    var s = String(val == null ? "" : val).trim();
    try {
      if (s) localStorage.setItem(key, s);
      else localStorage.removeItem(key);
    } catch (_) {}
  }

  function parseDateInput(raw) {
    var t = String(raw || "").trim();
    if (!t) return "";
    var iso = t.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return t;
    var pl = t.match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
    if (pl) {
      var d = pl[1].padStart(2, "0");
      var m = pl[2].padStart(2, "0");
      return pl[3] + "-" + m + "-" + d;
    }
    return null;
  }

  function normalizeGender(raw) {
    var t = up(raw);
    if (t === "M" || t === "MEZCZYZNA" || t === "MĘŻCZYZNA") return "MĘŻCZYZNA";
    if (t === "K" || t === "KOBIETA") return "KOBIETA";
    return "";
  }

  function getCurrentStep() {
    if (!state.track || state.track === "menu") return null;
    var track = TRACKS[state.track];
    if (!track) return null;
    return track.steps[state.step] || null;
  }

  function progressText() {
    var track = TRACKS[state.track];
    if (!track) return "";
    return (
      " (" +
      (state.step + 1) +
      "/" +
      track.steps.length +
      ")"
    );
  }

  function disableOldKreatorButtons() {
    document.querySelectorAll(".asst-kreator-choice-btn").forEach(function (b) {
      b.disabled = true;
    });
  }

  function botSay(html, withTyping, actions) {
    if (!deps) return;
    disableOldKreatorButtons();
    if (withTyping === false) {
      deps.dodajWiadomosc(html, "bot", actions || null);
      return;
    }
    deps.scheduleBotReply(function () {
      deps.dodajWiadomosc(html, "bot", actions || null);
    });
  }

  function menuMessage() {
    return "<strong>Kreator danych</strong> — wybierz zestaw z listy:";
  }

  function menuActions() {
    return appendUtilityActions([
      { label: "1 · mDowód", value: "1" },
      { label: "2 · DIIA", value: "2" },
      { label: "3 · Leg. szkolna", value: "3" },
      { label: "4 · Leg. studencka", value: "4" },
      { label: "5 · Prawo jazdy", value: "5" },
    ]);
  }

  function appendUtilityActions(actions, opts) {
    opts = opts || {};
    var list = actions.slice();
    if (opts.stepMode) {
      list.push({
        label: "Dane losowe",
        value: "__random__",
        utility: true,
        random: true,
      });
    }
    if (opts.optional) {
      list.push({
        label: "Pomiń",
        value: "__skip__",
        ghost: true,
        utility: true,
      });
    }
    list.push({
      label: "Anuluj",
      value: "/anuluj",
      ghost: true,
      utility: true,
    });
    return list;
  }

  function questionMessage(st) {
    var html =
      "<strong>Kreator</strong>" +
      progressText() +
      "<br><strong>" +
      st.label +
      "</strong>";
    if (st.optional && st.type !== "choice") {
      html += ' <span style="opacity:0.75">(opcjonalne)</span>';
    }
    if (st.hint && st.type !== "choice") {
      html += "<br><small>" + st.hint + "</small>";
    }
    if (st.type === "choice") {
      html += "<br><small>Wybierz przycisk poniżej:</small>";
    } else if (st.defaultValue) {
      html += "<br><small>Możesz wpisać własną wartość lub użyć przycisku domyślnego.</small>";
    } else if (st.optional) {
      html += "<br><small>Wpisz wartość, <strong>Dane losowe</strong> lub <strong>Pomiń</strong>.</small>";
    } else {
      html +=
        "<br><small>Wpisz odpowiedź lub użyj <strong>Dane losowe</strong>.</small>";
    }
    return html;
  }

  function getQuestionActions(st) {
    var actions = [];
    if (st.type === "choice" && st.choices) {
      st.choices.forEach(function (c) {
        actions.push({ label: c, value: c });
      });
      return appendUtilityActions(actions, {
        optional: st.optional,
        stepMode: true,
      });
    }
    if (st.defaultValue) {
      actions.push({
        label: st.defaultValue + " (domyślnie)",
        value: st.defaultValue,
      });
    }
    return appendUtilityActions(actions, {
      optional: st.optional,
      stepMode: true,
    });
  }

  function photoMessage() {
    return (
      "<strong>Kreator</strong> — zdjęcie profilowe<br>" +
      "Czy chcesz dodać zdjęcie do dokumentów?"
    );
  }

  function photoActions() {
    return appendUtilityActions([
      { label: "Tak, dodaj zdjęcie", value: "tak" },
      { label: "Nie, bez zdjęcia", value: "nie", ghost: true },
    ]);
  }

  function photoPickActions() {
    return [
      { label: "Wybierz zdjęcie", value: "__pick_photo__" },
      { label: "Pomiń zdjęcie", value: "nie", ghost: true },
      { label: "Anuluj", value: "/anuluj", ghost: true, utility: true },
    ];
  }

  function finishKreator(saved) {
    state.active = false;
    state.track = null;
    state.step = 0;
    state.awaitingPhoto = false;
    state.awaitingPhotoPick = false;
    if (deps && deps.setInputPlaceholder) {
      deps.setInputPlaceholder("Wpisz pytanie");
    }
    var msg = saved
      ? "Zapisano dane w aplikacji. Możesz je poprawić komendą <code>/dane</code> lub uruchomić kreator ponownie: <code>/kreator</code>."
      : "Kreator zakończony bez zapisu zdjęcia. Dane tekstowe zostały zapisane. Edycja: <code>/dane</code>.";
    botSay(msg);
  }

  function cancelKreator() {
    state.active = false;
    state.track = null;
    state.step = 0;
    state.awaitingPhoto = false;
    state.awaitingPhotoPick = false;
    if (deps && deps.setInputPlaceholder) {
      deps.setInputPlaceholder("Wpisz pytanie");
    }
    botSay("Kreator anulowany.", false);
  }

  function startTrack(trackId) {
    state.track = trackId;
    state.step = 0;
    state.awaitingPhoto = false;
    state.awaitingPhotoPick = false;
    var track = TRACKS[trackId];
    deps.scheduleBotReply(function () {
      deps.dodajWiadomosc(
        "Rozpoczynam: <strong>" +
          track.title +
          "</strong>. Odpowiadaj na pytania po kolei." +
          " Użyj przycisków <strong>Pomiń</strong> lub <strong>Anuluj</strong> w razie potrzeby.",
        "bot",
      );
      deps.scheduleBotReply(function () {
        askCurrentQuestion();
      });
    });
  }

  var BOT_REPLY_DELAY = 1000;

  function askCurrentQuestion() {
    var st = getCurrentStep();
    if (!st) {
      askPhoto();
      return;
    }
    botSay(questionMessage(st), false, getQuestionActions(st));
  }

  var MALE_NAMES = [
    "JAN", "PIOTR", "KRZYSZTOF", "ANDRZEJ", "TOMASZ", "PAWEŁ", "MARCIN", "MICHAŁ",
    "JAKUB", "MATEUSZ", "ADAM", "ŁUKASZ", "KAMIL", "WOJCIECH", "DANIEL",
  ];
  var FEMALE_NAMES = [
    "ANNA", "MARIA", "KATARZYNA", "MAŁGORZATA", "JOANNA", "EWA", "AGNIESZKA",
    "MAGDALENA", "MONIKA", "KAROLINA", "NATALIA", "ZOFIA", "PAULINA", "JULIA",
  ];
  var MALE_SURNAMES = [
    "NOWAK", "KOWALSKI", "WIŚNIEWSKI", "WÓJCIK", "KAMIŃSKI", "LEWANDOWSKI",
    "ZIELIŃSKI", "SZYMAŃSKI", "DĄBROWSKI", "KOZŁOWSKI",
  ];
  var FEMALE_SURNAMES = [
    "NOWAK", "KOWALSKA", "WIŚNIEWSKA", "WÓJCIK", "KAMIŃSKA", "LEWANDOWSKA",
    "ZIELIŃSKA", "SZYMAŃSKA", "DĄBROWSKA", "KOZŁOWSKA",
  ];
  var UA_MALE_NAMES = [
    "OLEKSANDR", "ANDRIY", "IVAN", "MYKHAILO", "OLEH", "SERHIY", "YURIY",
  ];
  var UA_FEMALE_NAMES = [
    "OLENA", "IRYNA", "NATALIA", "OKSANA", "HANNA", "YULIA", "VIKTORIA",
  ];
  var UA_SURNAMES = [
    "MELNYK", "SHEVCHENKO", "KOVALENKO", "BONDARENKO", "KRAVCHENKO", "KOVAL",
  ];
  var CITIES_PL = [
    "WARSZAWA", "KRAKÓW", "POZNAŃ", "WROCŁAW", "GDAŃSK", "ŁÓDŹ", "LUBLIN", "KATOWICE",
  ];
  var CITIES_UA = ["KYIV", "KHARKIV", "ODESA", "DNIPRO", "LVIV"];
  var STREETS = [
    "GŁÓWNA", "POLNA", "SŁONECZNA", "KWIATOWA", "LEŚNA", "PARKOWA", "OGRODOWA",
  ];

  function getLS(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch (_) {
      return "";
    }
  }

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomBool() {
    return Math.random() > 0.5;
  }

  function randomGender() {
    return randomBool() ? "MĘŻCZYZNA" : "KOBIETA";
  }

  function randomBirthDateIso() {
    var today = new Date();
    var d = new Date(today);
    d.setFullYear(d.getFullYear() - 18);
    d.setDate(d.getDate() - (30 + Math.floor(Math.random() * 291)));
    return d.toISOString().split("T")[0];
  }

  function randomDatePastYears(minYears, maxYears) {
    var today = new Date();
    var d = new Date(today);
    var years = minYears + Math.floor(Math.random() * (maxYears - minYears + 1));
    d.setFullYear(d.getFullYear() - years);
    d.setDate(d.getDate() - Math.floor(Math.random() * 365));
    return d.toISOString().split("T")[0];
  }

  function randomDateFromIso(iso, addYears) {
    var d = new Date(iso);
    d.setFullYear(d.getFullYear() + addYears);
    return d.toISOString().split("T")[0];
  }

  function generatePeselFromDate(birthDateStr, gender) {
    if (!birthDateStr) return "";
    var g = gender || randomGender();
    var parts = birthDateStr.split("-");
    if (parts.length !== 3) return "";
    var year = parts[0];
    var month = parseInt(parts[1], 10);
    var day = parts[2];
    var yy = year.slice(2);
    var mm = month;
    if (parseInt(year, 10) >= 2000) mm += 20;
    var serial = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    var genderDigit =
      g === "MĘŻCZYZNA"
        ? String(1 + Math.floor(Math.random() * 5) * 2)
        : String(Math.floor(Math.random() * 5) * 2);
    var base = yy + String(mm).padStart(2, "0") + day + serial + genderDigit;
    var weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    var sum = 0;
    for (var i = 0; i < 10; i++) sum += parseInt(base[i], 10) * weights[i];
    return base + String((10 - (sum % 10)) % 10);
  }

  function randomLetters(n) {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var out = "";
    for (var i = 0; i < n; i++) {
      out += letters[Math.floor(Math.random() * 26)];
    }
    return out;
  }

  function randomMdowodSeries() {
    return randomLetters(4) + String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  }

  function randomDowodSeries() {
    return randomLetters(3) + String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  }

  function isMaleGender(g) {
    return up(g) === "MĘŻCZYZNA";
  }

  function randomName(isMale, ukrainian) {
    if (ukrainian) {
      return isMale
        ? randomPick(UA_MALE_NAMES)
        : randomPick(UA_FEMALE_NAMES);
    }
    return isMale ? randomPick(MALE_NAMES) : randomPick(FEMALE_NAMES);
  }

  function randomSurname(isMale, ukrainian) {
    if (ukrainian) return randomPick(UA_SURNAMES);
    return isMale ? randomPick(MALE_SURNAMES) : randomPick(FEMALE_SURNAMES);
  }

  function trackUsesUkrainian() {
    return state.track === "diia";
  }

  function getCtxGender() {
    if (state.track === "mdowod") return getLS("gender");
    if (state.track === "diia") return getLS("gender_diia") || randomGender();
    if (state.track === "legszk") return getLS("gender_legszk") || randomGender();
    if (state.track === "legstu") return getLS("gender_legstu") || randomGender();
    if (state.track === "prawojazdy") return getLS("gender_prawojazdy") || randomGender();
    return randomGender();
  }

  function getCtxBirthDate() {
    if (state.track === "mdowod") return getLS("birthDate");
    if (state.track === "diia") return getLS("diia_birthDate");
    if (state.track === "legszk") return getLS("display-birthDate_legszk");
    if (state.track === "legstu") return getLS("display-birthDate_legstu");
    if (state.track === "prawojazdy") return getLS("display-birthDate_prawojazdy");
    return "";
  }

  function generateRandomForStep(st) {
    var key = st.key;
    var ukr = trackUsesUkrainian();
    var g = getCtxGender() || randomGender();
    var male = isMaleGender(g);

    if (st.type === "choice" && st.choices && st.choices.length) {
      return randomPick(st.choices);
    }

    if (key === "name" || key === "diia_name" || key.indexOf("display-name") === 0) {
      return randomName(male, ukr);
    }
    if (key === "surname" || key === "diia_surname" || key.indexOf("display-surname") === 0) {
      return randomSurname(male, ukr);
    }
    if (key === "lastName" || key === "fatherSurname" || key === "motherSurname") {
      return randomSurname(male, false);
    }
    if (key === "fathername") return randomName(true, false);
    if (key === "mothername") return randomName(false, false);
    if (key === "nationality") return "POLSKIE";
    if (key === "diia_countryOfOrigin") return "UKRAINA";
    if (key === "diia_nationality") return "UKRAIŃSKIE";
    if (
      key === "gender" ||
      key === "gender_diia" ||
      key === "gender_legszk" ||
      key === "gender_legstu" ||
      key === "gender_prawojazdy"
    ) {
      return randomGender();
    }
    if (
      key === "birthDate" ||
      key === "diia_birthDate" ||
      key.indexOf("birthDate") >= 0
    ) {
      return randomBirthDateIso();
    }
    if (key.indexOf("pesel") >= 0) {
      var bd = getCtxBirthDate() || randomBirthDateIso();
      return generatePeselFromDate(bd, getCtxGender() || randomGender());
    }
    if (key === "md_idSeries") return randomMdowodSeries();
    if (key === "do_idSeries") return randomDowodSeries();
    if (key === "do_issuingAuthority") {
      return "PREZYDENT MIASTA " + randomPick(CITIES_PL);
    }
    if (key === "md_issueDate" || key === "do_issueDate") {
      return randomDatePastYears(1, 5);
    }
    if (key === "md_expiryDate") {
      var mdIssue = getLS("md_issueDate") || randomDatePastYears(1, 3);
      return randomDateFromIso(mdIssue, 5);
    }
    if (key === "do_expiryDate") {
      var doIssue = getLS("do_issueDate") || randomDatePastYears(2, 8);
      return randomDateFromIso(doIssue, 10);
    }
    if (key === "placeOfBirth" || key === "diia_placeOfBirth") {
      return randomPick(ukr ? CITIES_UA : CITIES_PL);
    }
    if (key === "display-birthPlace_prawojazdy") {
      return randomPick(CITIES_PL);
    }
    if (key === "address") {
      var hn = Math.floor(Math.random() * 99) + 1;
      var flat = randomBool() ? "/" + (Math.floor(Math.random() * 50) + 1) : "";
      return "UL. " + randomPick(STREETS) + " " + hn + flat;
    }
    if (key === "postalcode") {
      var city = randomPick(CITIES_PL);
      return (
        String(Math.floor(Math.random() * 90) + 10).padStart(2, "0") +
        "-" +
        String(Math.floor(Math.random() * 1000)).padStart(3, "0") +
        " " +
        city
      );
    }
    if (key === "registrationDate") {
      var bd = getLS("birthDate") || randomBirthDateIso();
      return randomDateFromIso(bd, 2 + Math.floor(Math.random() * 5));
    }
    if (key === "display-cardNumber_legszk") {
      return (
        String(Math.floor(1000 + Math.random() * 9000)) +
        "/" +
        String(Math.floor(10 + Math.random() * 90))
      );
    }
    if (key === "display-schoolName_legszk") {
      return "SZKOŁA PODSTAWOWA NR " + (Math.floor(Math.random() * 20) + 1);
    }
    if (key === "display-schoolAddress_legszk") {
      var c = randomPick(CITIES_PL);
      return (
        "UL. SZKOLNA " +
        (Math.floor(Math.random() * 50) + 1) +
        ", " +
        String(Math.floor(Math.random() * 90) + 10).padStart(2, "0") +
        "-" +
        String(Math.floor(Math.random() * 1000)).padStart(3, "0") +
        " " +
        c
      );
    }
    if (key === "display-schoolPhone_legszk") {
      var areas = ["22", "12", "58", "61", "71"];
      return (
        randomPick(areas) +
        " " +
        Math.floor(Math.random() * 900 + 100) +
        " " +
        Math.floor(Math.random() * 90 + 10) +
        " " +
        Math.floor(Math.random() * 90 + 10)
      );
    }
    if (key === "display-schoolDirector_legszk") {
      return randomName(randomBool(), false) + " " + randomSurname(randomBool(), false);
    }
    if (key === "display-uczelnia_legstu") {
      return randomPick([
        "UNIWERSYTET WARSZAWSKI",
        "POLITECHNIKA WARSZAWSKA",
        "UNIWERSYTET JAGIELLOŃSKI",
        "AGH",
      ]);
    }
    if (key === "display-albumNumber_legstu") {
      return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    }
    if (key === "display-dataWydania_legstu" || key.indexOf("issueDate") >= 0) {
      return randomDatePastYears(0, 3);
    }
    if (key === "display-expiryDate_legszk") {
      var today = new Date();
      var exp = new Date(today.getFullYear(), 8, 30);
      if (today > exp) exp.setFullYear(exp.getFullYear() + 1);
      return exp.toISOString().split("T")[0];
    }
    if (key === "display-documentNumber_prawojazdy") {
      return (
        String(Math.floor(Math.random() * 100000)).padStart(5, "0") +
        "/" +
        String(Math.floor(Math.random() * 100)).padStart(2, "0") +
        "/" +
        String(Math.floor(Math.random() * 10000)).padStart(4, "0")
      );
    }
    if (key === "display-blanketNumber_prawojazdy") {
      return randomLetters(1) + String(Math.floor(Math.random() * 100000000)).padStart(8, "0");
    }
    if (key === "display-issuingAuthority_prawojazdy") {
      var cities = ["Warszawie", "Lublinie", "Krakowie", "Gdańsku", "Wrocławiu"];
      return "Starostwo Powiatowe w " + randomPick(cities);
    }
    if (st.defaultValue) return st.defaultValue;
    if (st.type === "date") return randomBirthDateIso();
    return randomPick(MALE_NAMES) + " " + randomPick(MALE_SURNAMES);
  }

  function advanceAfterAnswer() {
    state.step += 1;
    var track = TRACKS[state.track];
    if (state.step >= track.steps.length) {
      askPhoto();
    } else {
      askCurrentQuestion();
    }
  }

  function applyRandomAnswer() {
    var st = getCurrentStep();
    if (!st) return true;
    var value = generateRandomForStep(st);
    if (!value) {
      botSay("Nie udało się wygenerować wartości dla tego pola.", false);
      return true;
    }
    deps.dodajWiadomosc(value, "user");
    var result = validateAndSaveAnswer(value);
    if (!result.ok) {
      botSay(result.error, false);
      return true;
    }
    advanceAfterAnswer();
    return true;
  }

  function applyTrackDefaults(trackId) {
    if (trackId === "prawojazdy") {
      saveField("display-expiryDate_prawojazdy", "Bezterminowo");
      saveField("display-blanketStatus_prawojazdy", "Wydany");
      saveField("display-restrictions_prawojazdy", "Brak");
    }
  }

  function askPhoto() {
    var track = TRACKS[state.track];
    applyTrackDefaults(state.track);
    if (!track || !track.photo) {
      finishKreator(true);
      return;
    }
    state.awaitingPhoto = true;
    state.awaitingPhotoPick = false;
    botSay(photoMessage(), false, photoActions());
  }

  function validateAndSaveAnswer(raw) {
    var st = getCurrentStep();
    if (!st) return { ok: false, error: "Brak aktywnego pytania." };

    var text = String(raw || "").trim();

    if (!text && st.defaultValue) {
      text = st.defaultValue;
    }

    if (!text && !st.optional) {
      return { ok: false, error: "To pole jest wymagane. Wpisz odpowiedź." };
    }

    if (!text && st.optional) {
      saveField(st.key, "");
      return { ok: true, skipped: true };
    }

    if (st.type === "date") {
      var iso = parseDateInput(text);
      if (!iso) {
        return {
          ok: false,
          error: "Niepoprawna data. Użyj RRRR-MM-DD lub DD.MM.RRRR.",
        };
      }
      saveField(st.key, iso);
      return { ok: true };
    }

    if (st.type === "choice") {
      var g = st.choices.indexOf("MĘŻCZYZNA") >= 0 ? normalizeGender(text) : up(text);
      if (st.choices.indexOf(g) < 0) {
        return {
          ok: false,
          error: "Wybierz jedną z podanych opcji.",
        };
      }
      saveField(st.key, g);
      return { ok: true };
    }

    if (st.key.indexOf("pesel") >= 0) {
      var digits = text.replace(/\D/g, "");
      if (digits.length !== 11) {
        return { ok: false, error: "PESEL musi mieć 11 cyfr." };
      }
      saveField(st.key, digits);
      return { ok: true };
    }

    saveField(st.key, up(text));
    return { ok: true };
  }

  function handleMenuChoice(text) {
    var n = text.replace(/\s/g, "");
    var map = { "1": "mdowod", "2": "diia", "3": "legszk", "4": "legstu", "5": "prawojazdy" };
    if (map[n]) {
      startTrack(map[n]);
      return true;
    }
    botSay("Wpisz cyfrę od <strong>1</strong> do <strong>5</strong>.", false);
    return true;
  }

  function handlePhotoAnswer(text) {
    if (text === "__pick_photo__") {
      var fileInput = document.getElementById("kreator-photo-input");
      if (fileInput) fileInput.click();
      return true;
    }

    var t = up(text);
    if (t === "NIE" || t === "N") {
      finishKreator(true);
      return true;
    }

    if ((t === "TAK" || t === "T") && state.awaitingPhoto && !state.awaitingPhotoPick) {
      state.awaitingPhoto = false;
      state.awaitingPhotoPick = true;
      botSay(
        "Wybierz zdjęcie z galerii urządzenia:",
        false,
        photoPickActions(),
      );
      return true;
    }

    if (state.awaitingPhotoPick) {
      botSay("Użyj przycisków poniżej.", false, photoPickActions());
      return true;
    }

    botSay("Wybierz <strong>Tak</strong> lub <strong>Nie, bez zdjęcia</strong>.", false, photoActions());
    return true;
  }

  function handleUserMessage(text) {
    if (!state.active) return false;

    var cmd = text.trim().toLowerCase();
    if (cmd === "/anuluj" || cmd === "anuluj") {
      cancelKreator();
      return true;
    }

    if (state.track === "menu") {
      return handleMenuChoice(text);
    }

    if (state.awaitingPhoto || state.awaitingPhotoPick) {
      return handlePhotoAnswer(text);
    }

    if (text === "__random__") {
      return applyRandomAnswer();
    }

    if (cmd === "/pomin" || cmd === "pomin" || text === "__skip__") {
      var stSkip = getCurrentStep();
      if (!stSkip || !stSkip.optional) {
        botSay("Tego pytania nie można pominąć — jest wymagane.", false);
        return true;
      }
      saveField(stSkip.key, "");
      state.step += 1;
      askCurrentQuestion();
      return true;
    }

    var result = validateAndSaveAnswer(text);
    if (!result.ok) {
      botSay(result.error, false);
      return true;
    }

    advanceAfterAnswer();
    return true;
  }

  function start() {
    if (!deps) return;
    state.active = true;
    state.track = "menu";
    state.step = 0;
    state.awaitingPhoto = false;
    state.awaitingPhotoPick = false;
    if (deps.setInputPlaceholder) {
      deps.setInputPlaceholder("Odpowiedź kreatora… (/anuluj)");
    }
    if (deps.hideSuggestion) deps.hideSuggestion();
    botSay(menuMessage(), undefined, menuActions());
  }

  function initPhotoInput() {
    var input = document.getElementById("kreator-photo-input");
    if (!input || input.dataset.bound === "1") return;
    input.dataset.bound = "1";
    input.addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      input.value = "";
      if (!file || !state.active) return;
      var reader = new FileReader();
      reader.onload = function (ev) {
        var url = ev.target && ev.target.result;
        if (!url) return;
        if (typeof window.cacheProfileImage === "function") {
          window.cacheProfileImage(url);
        } else {
          try {
            localStorage.setItem("profileImage", url);
          } catch (_) {}
        }
        if (deps) {
          deps.dodajWiadomosc("Zdjęcie zapisane.", "user");
        }
        finishKreator(true);
      };
      reader.readAsDataURL(file);
    });
  }

  window.AssistantKreator = {
    init: function (d) {
      deps = d;
      BOT_REPLY_DELAY = d.botDelay || 1000;
      initPhotoInput();
    },
    isActive: function () {
      return state.active;
    },
    start: start,
    handleUserMessage: handleUserMessage,
  };
})();
