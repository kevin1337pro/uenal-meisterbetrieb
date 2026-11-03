'use strict';

const config = window.UNAL_CONFIG || {};
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '');

const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Menü öffnen');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
  $$('main, footer').forEach(element => { element.inert = false; });
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  if (!open) return closeMenu();
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Menü schließen');
  mobileNav.style.top = `${$('.header').getBoundingClientRect().bottom}px`;
  mobileNav.hidden = false;
  document.body.classList.add('menu-open');
  $$('main, footer').forEach(element => { element.inert = true; });
});
$$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
$$('.header-inner a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
  else if (!mobileNav.hidden) mobileNav.style.top = `${$('.header').getBoundingClientRect().bottom}px`;
});
function updateHeader() { $('.header').classList.toggle('scrolled', window.scrollY > 35); }
window.addEventListener('scroll', updateHeader, {passive:true});
updateHeader();
$('#year').textContent = new Date().getFullYear();

$$('dialog').forEach(dialog => {
  $('.modal-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});

const services = {
  heizung: {
    eyebrow: '01 / BEHAGLICHKEIT BEGINNT MIT GUTER TECHNIK',
    title: 'Heizung & Wärme',
    description: 'Eine gute Heizung passt zu Ihrem Haus und zu Ihrem Alltag. Wir betrachten die vorhandene Technik, besprechen Ihre Wünsche und planen eine passende Lösung – im Neubau ebenso wie bei einer Modernisierung.',
    items: ['Beratung zur Erneuerung und Optimierung Ihrer Heizungsanlage', 'Planung und Installation passender Heiztechnik', 'Fußbodenheizung und Heizflächen', 'Abstimmung, Inbetriebnahme und verständliche Einweisung'],
    interest: 'Heizung & Wärme'
  },
  sanitaer: {
    eyebrow: '02 / PLATZ FÜR IHREN LIEBLINGSORT',
    title: 'Bad & Sanitär',
    description: 'Vom ersten Gedanken bis zur letzten Armatur: Wir unterstützen Sie dabei, Ihr Bad funktional und schön zu gestalten. Dabei stimmen wir die Sanitärtechnik auf Ihre Räume, Ihre Wünsche und Ihr Budget ab.',
    items: ['Beratung und Planung Ihrer Sanitärinstallation', 'Modernisierung und Sanierung bestehender Bäder', 'Installation von Dusche, Wanne, Waschtisch und WC', 'Wasserleitungen, Anschlüsse und Armaturen'],
    interest: 'Bad & Sanitär'
  },
  waermepumpe: {
    eyebrow: '03 / IHR ZUHAUSE WEITERDENKEN',
    title: 'Wärmepumpen',
    description: 'Ob eine Wärmepumpe für Ihr Gebäude passt, entscheidet das Zusammenspiel vieler Details. Wir betrachten den Wärmebedarf, die vorhandenen Heizflächen und die Gegebenheiten vor Ort. So entsteht eine fundierte Grundlage für Ihr Vorhaben.',
    items: ['Prüfung der technischen Voraussetzungen vor Ort', 'Beratung zur passenden Systemlösung', 'Planung und Einbindung in Ihr Heizsystem', 'Installation, Inbetriebnahme und Service nach Absprache'],
    interest: 'Wärmepumpe'
  },
  wartung: {
    eyebrow: '04 / DAMIT SIE SICH AUF IHRE TECHNIK VERLASSEN KÖNNEN',
    title: 'Wartung & Service',
    description: 'Regelmäßige Pflege trägt zum zuverlässigen Betrieb Ihrer Haustechnik bei. Wir besprechen den Wartungsbedarf Ihrer Anlage, prüfen ihre Komponenten und kümmern uns um notwendige Arbeiten im vereinbarten Umfang.',
    items: ['Wartung nach Anlagen- und Herstellervorgaben', 'Überprüfung der Heizungs- und Sanitärtechnik', 'Fehlersuche und Reparaturen nach Absprache', 'Beratung zur Pflege und zum Betrieb Ihrer Anlage'],
    interest: 'Wartung & Service'
  }
};

function chooseInterest(interest) {
  $('#interest').value = interest;
  closeMenu();
  document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
  $('#interest').focus({preventScroll:true});
  $('#kontakt').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
$$('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = services[button.dataset.service];
  if (!service) return;
  $('#service-dialog-content').innerHTML = `<p class="eyebrow">${service.eyebrow}</p><h2 id="service-dialog-title">${service.title}</h2><p>${service.description}</p><ul>${service.items.map(item => `<li>${item}</li>`).join('')}</ul><button type="button" class="button button-orange service-inquiry">Dieses Projekt anfragen${icon('arrow-up')}</button>`;
  $('.service-inquiry').addEventListener('click', () => chooseInterest(service.interest));
  $('#service-dialog').showModal();
}));
$$('[data-interest]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  chooseInterest(link.dataset.interest);
}));

if (hasEmail || config.phone || config.street || config.city || config.serviceArea) {
  const rows = [];
  const row = (symbol, primary, secondary) => `<div class="contact-person"><span class="contact-icon">${icon(symbol)}</span><div>${primary}${secondary ? `<span>${secondary}</span>` : ''}</div></div>`;
  if (config.phone) rows.push(row('phone', `<a href="tel:${escapeHtml(config.phone.replace(/[^+\d]/g, ''))}"><strong>${escapeHtml(config.phone)}</strong></a>`, 'Wir freuen uns auf das Gespräch.'));
  if (hasEmail) rows.push(row('mail', `<a href="mailto:${escapeHtml(config.email)}"><strong>${escapeHtml(config.email)}</strong></a>`, 'Schreiben Sie uns von Ihrem Vorhaben.'));
  if (config.street || config.city) rows.push(row('chat', `<strong>${escapeHtml(config.street)}</strong>`, escapeHtml([config.postalCode, config.city].filter(Boolean).join(' '))));
  if (config.serviceArea) rows.push(`<p style="font-size:11px;color:#a3af9c">Für Sie unterwegs: ${escapeHtml(config.serviceArea)}</p>`);
  $('#contact-details').innerHTML = rows.join('');
}
if (hasEmail) {
  $('#form-notice').textContent = 'Nach der Prüfung öffnet sich Ihr E-Mail-Programm. Ihre Anfrage wird erst versendet, wenn Sie die E-Mail dort absenden.';
}

const legalContent = {
  impressum: () => {
    const complete = config.owner && config.street && config.city && hasEmail;
    return `<p class="eyebrow">UNTERNEHMENSANGABEN</p><h2 id="legal-dialog-title">Impressum${complete ? '' : ' – Entwurf'}</h2>${!complete ? '<p class="legal-notice">Diese Website befindet sich im Aufbau. Die vollständigen Angaben zum Betrieb werden ergänzt.</p>' : ''}<h3>${escapeHtml(config.company)}</h3><p>${config.owner ? `Inhaber: ${escapeHtml(config.owner)}<br>` : ''}${config.street ? `${escapeHtml(config.street)}<br>` : ''}${escapeHtml([config.postalCode, config.city].filter(Boolean).join(' '))}</p>${config.phone || hasEmail ? `<h3>Kontakt</h3><p>${config.phone ? `Telefon: ${escapeHtml(config.phone)}<br>` : ''}${hasEmail ? `E-Mail: <a href="mailto:${escapeHtml(config.email)}">${escapeHtml(config.email)}</a>` : ''}</p>` : ''}${config.register ? `<h3>Registerangaben</h3><p>${escapeHtml(config.register)}</p>` : ''}${config.vatId ? `<h3>Umsatzsteuer-ID</h3><p>${escapeHtml(config.vatId)}</p>` : ''}${config.chamber || config.professionalTitle ? `<h3>Berufsangaben</h3><p>${config.chamber ? `${escapeHtml(config.chamber)}<br>` : ''}${escapeHtml(config.professionalTitle)}</p>` : ''}${!complete ? '<p>Inhaber, ladungsfähige Anschrift, Kontaktdaten und gegebenenfalls notwendige Register- und Berufsangaben sind noch offen.</p>' : ''}`;
  },
  datenschutz: () => `<p class="eyebrow">HINWEISE ZUR VORSCHAU</p><h2 id="legal-dialog-title">Datenschutz</h2><p class="legal-notice">Dies sind technische Hinweise zur Website. Verantwortlicher und vollständige Datenschutzhinweise werden ergänzt.</p><h3>Formular und Ihre Angaben</h3><p>Ihre Eingaben werden in dieser Website nur im Arbeitsspeicher Ihres Browsers verarbeitet. Das Formular sendet keine Daten an einen Formularserver. Die Vorschau und der Download Ihrer Anfrage erfolgen auf Ihrem Gerät. Die Website legt Ihre Formulareingaben nicht in Cookies oder im lokalen Browserspeicher ab.</p><h3>E-Mail-Anfrage</h3><p>${hasEmail ? 'Wenn Sie „E-Mail öffnen“ wählen, übergibt die Website die von Ihnen eingetragenen Angaben an Ihr E-Mail-Programm. Erst wenn Sie dort auf Senden klicken, wird die Nachricht über Ihren E-Mail-Anbieter an den Betrieb übermittelt.' : 'In dieser Vorschau ist noch keine Firmen-E-Mail hinterlegt. Sie können eine Anfrage vorbereiten und als Textdatei herunterladen. Es findet kein Versand statt.'}</p><h3>Schriften, Bilder und Analyse</h3><p>Schriften und Bilder werden direkt mit der Website ausgeliefert. Diese Website setzt keine eigenen Analyse- oder Werbe-Cookies ein und bindet keine Karten, Videos oder externen Schriftendienste ein.</p><h3>Bereitstellung der Website</h3><p>Diese Website wird über ChatGPT Sites bereitgestellt. Beim Aufruf entstehen technisch erforderliche Verbindungsdaten. Für die Bereitstellung durch OpenAI gelten die <a href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noopener noreferrer">Datenschutzhinweise von OpenAI</a>.</p><h3>Verantwortlicher und Kontakt</h3><p>${config.owner ? escapeHtml(config.owner) + '<br>' : ''}${escapeHtml(config.company)}${hasEmail ? `<br><a href="mailto:${escapeHtml(config.email)}">${escapeHtml(config.email)}</a>` : '<br>Vollständige Anschrift und Kontakt werden ergänzt.'}</p>`,
  bilder: () => `<p class="eyebrow">FOTOGRAFIE & GESTALTUNG</p><h2 id="legal-dialog-title">Bildnachweise</h2><p>Die Fotos veranschaulichen unsere Themen. Sie sind keine Referenzen von Ünal und zeigen keine vom Betrieb ausgeführten Projekte.</p><ul><li>Badezimmer im Einstieg: <a href="https://unsplash.com/photos/JGfXR2a8RNg" target="_blank" rel="noopener noreferrer">Unsplash</a></li><li>Heizungsinstallation: <a href="https://www.pexels.com/photo/34938450/" target="_blank" rel="noopener noreferrer">Pexels</a></li><li>Bad & Sanitär: <a href="https://www.pexels.com/photo/33652399/" target="_blank" rel="noopener noreferrer">Pexels</a></li><li>Wärmepumpe: <a href="https://unsplash.com/photos/TDtycnfiDa8" target="_blank" rel="noopener noreferrer">Unsplash</a></li></ul><p>Logo: vom Auftraggeber bereitgestellt.<br>Schrift: Manrope, SIL Open Font License.</p>`
};
$$('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const content = legalContent[button.dataset.legal];
  if (!content) return;
  $('#legal-dialog-content').innerHTML = content();
  $('#legal-dialog').showModal();
}));

let currentRequest = null;
let requestText = '';
const form = $('#project-form');
$('#message').addEventListener('input', () => $('#message').setCustomValidity(''));
const labels = {interest:'Ihr Projekt',name:'Name',email:'E-Mail',phone:'Telefon',place:'PLZ / Ort',message:'Vorhaben'};
form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = ['interest', 'name', 'email', 'phone', 'place', 'message'];
  fields.forEach(field => { form.elements[field].value = form.elements[field].value.trim(); });
  $('#message').setCustomValidity($('#message').value.length < 10 ? 'Bitte beschreiben Sie Ihr Vorhaben mit mindestens 10 Zeichen.' : '');
  if (!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  if (values.message.length < 10 || !values.name) return;
  currentRequest = values;
  $('#request-summary').replaceChildren();
  for (const field of fields) {
    if (!values[field]) continue;
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = labels[field];
    description.textContent = values[field];
    $('#request-summary').append(term, description);
  }
  requestText = `PROJEKTANFRAGE AN ÜNAL MEISTERBETRIEB\n\n${fields.filter(field => values[field]).map(field => `${labels[field]}: ${values[field]}`).join('\n\n')}\n\nDie Datenschutzhinweise wurden gelesen.\n\nDiese Anfrage wurde auf dem Gerät vorbereitet. Der Download übermittelt keine Anfrage an den Betrieb.\n`;
  $('#send-request').hidden = !hasEmail;
  $('#request-status').textContent = hasEmail ? 'Alles richtig? Öffnen Sie die vorbereitete E-Mail und senden Sie sie in Ihrem E-Mail-Programm ab. Bisher wurde keine Anfrage versendet.' : 'Ihre Anfrage ist vorbereitet. In dieser Vorschau ist noch kein E-Mail-Empfänger hinterlegt. Laden Sie die Anfrage herunter, um sie zu sichern. Sie wurde nicht versendet.';
  $('#request-dialog').showModal();
});
$('#send-request').addEventListener('click', () => {
  if (!hasEmail || !currentRequest) return;
  const subject = `Projektanfrage: ${currentRequest.interest} – ${currentRequest.name}`;
  window.location.href = `mailto:${encodeURIComponent(config.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText)}`;
  $('#request-status').textContent = 'Bitte senden Sie die E-Mail in Ihrem E-Mail-Programm selbst ab. Falls sich kein E-Mail-Programm öffnet, laden Sie die Anfrage herunter und senden Sie sie an ' + config.email + '.';
});
$('#download-request').addEventListener('click', () => {
  if (!currentRequest) return;
  const blob = new Blob(['\uFEFF' + requestText], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Uenal-Projektanfrage.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
