(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#meny");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var result = document.querySelector(".form-result");
    var text = [
      "Navn: " + data.get("navn"),
      "Telefon: " + data.get("telefon"),
      "",
      String(data.get("melding") || "")
    ].join("\n");

    var mailto = "mailto:post@smerteklinikkenoslo.no?subject=" +
      encodeURIComponent("Henvendelse fra nettsiden") +
      "&body=" + encodeURIComponent(text);

    result.hidden = false;
    result.innerHTML = "";

    var p = document.createElement("p");
    p.textContent = "I dette utkastet lagres ikke skjemaet. På den ferdige siden kan meldingen åpne en e-post til klinikken, eller dere kan la telefonen være eneste vei inn. Ring 23 20 28 00 om saken haster.";
    result.appendChild(p);

    var a = document.createElement("a");
    a.href = mailto;
    a.textContent = "Åpne e-post til post@smerteklinikkenoslo.no";
    result.appendChild(a);
  });
})();
