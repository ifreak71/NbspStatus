// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
// Quadratisches Widget mit 150x150 Größe
let widget = new ListWidget()
widget.url = "https://chaotikum.org/"
widget.backgroundColor = new Color("#f1f1f1") // Hintergrundfarbe ändern
widget.size = new Size(150, 150) // Widget-Größe ändern

// Logo hinzufügen, Größe ändern und zentrieren
let logo = await loadImage("/NbspStatus/logo.png") // Stellen Sie sicher, dass die Datei "chaot.png" in iCloud Drive liegt
let logoImage = widget.addImage(logo)
logoImage.imageSize = new Size(100, 50) // Ändern Sie die Größe nach Ihren Wünschen
logoImage.leftAlignImage()

// Texte auf der Website überprüfen
let websiteText = await fetchWebsiteText("https://chaotikum.org/")
if (websiteText.includes("Der Nbsp ist offen!")) {
    addStyledText("Der Nbsp ist offen!", "black", true)
    addStyledText1("OFFEN!", "green", true)
} else if (websiteText.includes("Der Nbsp ist geschlossen!")) {
    addStyledText("Der Nbsp ist geschlossen!", "black", true)
    addStyledText1("GESCHLOSSEN!", "red", true)
} else {
    addStyledText("Text nicht gefunden", "gray")
}

if (config.runsInWidget) {
    // Widget im Vorschaumodus anzeigen
    Script.setWidget(widget)
} else {
    // Skript außerhalb des Widgets ausführen
    widget.presentSmall()
}

Script.complete()

// Funktion zum Laden des Bildes
async function loadImage(imagePath) {
    let fm = FileManager.iCloud()
    let imgPath = fm.joinPath(fm.documentsDirectory(), imagePath)
    return Image.fromFile(imgPath)
}

// Funktion zum Abrufen des Texts von einer Website
async function fetchWebsiteText(url) {
    let req = new Request(url)
    let html = await req.loadString()
    return html
}

// Funktion zum Hinzufügen von farbigem Text
function addStyledText(text, color, isBold) {
    let textItem = widget.addText(text)
    textItem.textColor = Color[color]()
    if (isBold) {
    textItem.font = Font.boldSystemFont(14) 
    }
    textItem.leftAlignText()
}

    function addStyledText1(text, color, isBold) {
    let textItem = widget.addText(text)
    textItem.textColor = Color[color]()
    if (isBold) {
    textItem.font = Font.boldSystemFont(18) 
    }
    textItem.centerAlignText()
}