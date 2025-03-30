// Ĉi tio kodo helpas konstrui la unu-lingva EPUB-dosiero. (Mi uzis https://calibre-ebook.com por tio.)

const fs = require('fs');
const cheerio = require('cheerio');

fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const $ = cheerio.load(data);
    let extractedHTML = '';

    $('.traduko-paro').each((_, tradukoParo) => {
        const eo123Div = $(tradukoParo).find('.eo-123');

        if (eo123Div.length > 0) {
            eo123Div.children().each((_, element) => {
                extractedHTML += $.html(element) + '\n';
            });
        }
    });

    fs.writeFile('la-bona-lingvo-extracted-eo123.html', extractedHTML, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log('Extraction complete.');
        }
    });
});
