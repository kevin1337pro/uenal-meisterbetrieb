# Ünal Meisterbetrieb – Heizung & Sanitär

Responsive, statische Firmenwebsite mit lokal eingebundenen Fotos und Manrope-Schrift.

- [Live-Website](https://uenal-meisterbetrieb.kevin1337pro.chatgpt.site)
- [Öffentliches GitHub-Repository](https://github.com/kevin1337pro/uenal-meisterbetrieb)

## Lokal ansehen

Im Projektordner ausführen:

```sh
node serve.mjs
```

Anschließend `http://localhost:4173` öffnen.

## Unternehmensangaben

Alle noch offenen Firmenangaben werden zentral in `dist/config.js` ergänzt: Inhaber, E-Mail, Telefon, Anschrift, Einsatzgebiet und gegebenenfalls Register-, Kammer- und Berufsangaben. Leere Felder werden nicht als erfundene Kontaktdaten angezeigt.

## Anfragefunktion

Das Formular validiert Pflichtfelder, zeigt eine prüfbare Zusammenfassung und ermöglicht einen Textdownload. Sobald `email` konfiguriert ist, kann die Anfrage an das E-Mail-Programm übergeben werden. Der Nutzer muss die E-Mail selbst versenden. Es gibt keinen serverseitigen E-Mail-Versand, keine Anfrage-Datenbank und keine vorgetäuschte Versandbestätigung. Formulardaten werden nicht im lokalen Browserspeicher abgelegt.

## Vor öffentlicher Verwendung ergänzen

- Tatsächliche Firmen- und Kontaktdaten, bestätigtes Einsatzgebiet und Leistungsangebot.
- Vollständiges Impressum und auf den Betrieb, das Hosting und die Kontaktbearbeitung abgestimmte Datenschutzhinweise. Die vorhandenen Dialoge sind als Vorschau bzw. Entwurf gekennzeichnet.
- Optional ein echter Formularversand über einen geeigneten Server mit E-Mail-Dienst.

## Inhalte und Bilder

Keine erfundenen Referenzen, Bewertungen, Betriebsjahre oder Notdienstversprechen. Verwendete Fotos sind Symbolbilder; Quellen stehen im Bildnachweis und in `dist/assets/credits.txt`. Das Logo wurde unverändert aus der Nutzervorlage übernommen.

## Interaktionen

- Navigation mit Ankersprüngen und mobilem Menü
- Vier Leistungsdialoge mit Übergabe der Auswahl an das Anfrageformular
- Aufklappbare häufige Fragen
- Formulareingabe, Validierung, Anfragevorschau und Download
- Impressum-, Datenschutz- und Bildnachweisdialog
- Tastaturbedienung und reduzierte Animation bei entsprechender Systemeinstellung

Keine Abhängigkeiten oder Build-Schritte erforderlich. Für ein eigenes Hosting den Inhalt von `dist/` als statische Website bereitstellen.
