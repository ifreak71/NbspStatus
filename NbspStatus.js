// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
// Widget für Scriptable, um den Status von https://status.nobreakspace.org/spaceapi.json anzuzeigen

const DARK_BG = new Color('#FF8C00'); // Dunkelorange #FF8C00
const DARK_TEXT = new Color('#E3E3E3'); // Grey #E3E3E3 Schwarz 89% heller

const LIGHT_BG = new Color('#FFA500'); // Orange #FFA500
const LIGHT_TEXT = new Color('#000000'); // Black #000000


// JSON-Daten abrufen
const apiUrl = "https://status.nobreakspace.org/spaceapi.json";
const response = await new Request(apiUrl).loadJSON();

// Status überprüfen
const isOpen = response.state.open;

// Widget erstellen
let widget = new ListWidget();
widget.url = "https://chaotikum.org";
widget.backgroundColor = Color.dynamic(LIGHT_BG, DARK_BG);
widget.setPadding(0, 0, 0, 0)


// Fügt ein Bild zum Widget hinzu
let image = widget.addImage(await loadImageFromICloud("/NbspStatus/logo.png"));
image.imageSize = new Size(100, 40); // Größe des Bildes anpassen
image.centerAlignImage (); // Positioniert das Bild im Widget
image.applyFillingContentMode()
widget.addSpacer(10)

// Widget-Design anpassen
let statusText = widget.addText("Nobreakspace");
statusText.font = Font.boldSystemFont(18);
statusText.textColor = Color.dynamic(LIGHT_TEXT, DARK_TEXT);
statusText.centerAlignText();
widget.addSpacer(10);

let stack = widget.addStack();
stack.setPadding(5, 18, 5, 10);

// Entsprechend dem Status die Anzeige anpassen
if (isOpen) {
  let image = stack.addImage(await loadImageFromICloud("/NbspStatus/open.png"))
  image.imageSize = new Size(23, 23); // Größe des Bildes anpassen
  let openText = stack.addText("Geöffnet");
  openText.font = Font.boldSystemFont(18);
  openText.textColor = Color.green();
} else {
  let image = stack.addImage(await loadImageFromICloud("/NbspStatus/closed.png"))
  image.imageSize = new Size(23, 23) // Größe des Bildes anpassen
  let closedText = stack.addText("Geschlossen");
  closedText.font = Font.boldSystemFont(18);
  closedText.textColor = Color.red();
}
widget.addSpacer(8)


  // last updated stack
  const updatedStack = widget.addStack();
  updatedStack.layoutHorizontally();
  const updatedImg = SFSymbol.named('arrow.clockwise').image;
  updatedStack.addSpacer();
  const updatedIcon = updatedStack.addImage(updatedImg);
  updatedIcon.tintColor = Color.dynamic(LIGHT_TEXT, DARK_TEXT);
  updatedIcon.imageSize = new Size(9, 9);
  updatedStack.addSpacer(5);
  var currentDate = new Date();
  const dateString = updatedStack.addText(`${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`);
  dateString.font = Font.systemFont(8);
  updatedStack.addSpacer()

  
// Widget anzeigen
if (config.runsInWidget) {
  // Im Widget anzeigen
  Script.setWidget(widget);
} else {
  // Als Test in der App anzeigen
  widget.presentSmall();
}

Script.complete();

// Funktion, um ein Image aus der iCloud zu laden

async function loadImageFromICloud(filename) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, filename)

  return fm.readImage(path)
}
