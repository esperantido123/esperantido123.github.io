// Ĉi tio kodo helpas konstrui la unu-lingva EPUB-dosiero. (Mi uzis https://convertio.co/nl/html-epub/ por tio.)

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

    const finalHTML = `<!DOCTYPE html>
<html lang="eo-123">
<head>
<meta charset="UTF-8" />
<meta name="description" content="La libro 'La bona lingvo' de Claude Piron en tradukita al en Esperantido.">
<title>La bona lingvo - tradukita al en Esperantido 123</title>
<style type="text/css">
h1 { text-align: center; }
.tit { text-align: center; }
h3 { font-style: italic; font-weight: normal; }
h3 em { font-style: normal; font-weight: bold; }
table { margin-top: 1ex; margin-bottom: 1ex; margin-left: auto; margin-right: auto; }
.tab1 { border-spacing: 1em 0; text-align: center; }
.tab2 { text-align: center; }
.tab2 td { padding: 1em; }
.d { border-right: solid thin; }
.s td { border-bottom: solid thin; }
.tab3 { border-spacing: 2em 0; width: 100% }
p.daŭrigo { text-indent: 0; }
.citaĵoj p { text-indent: 0; margin-top: 2ex; margin-bottom: 2ex; }
blockquote { margin-left: 4em; }
blockquote p { text-indent: 0; margin-top: 2ex; margin-bottom: 2ex; } 
li p { text-indent: 0; margin-top: 2ex; margin-bottom: 2ex; }

body {     
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.lingvo {
    text-align: center;
    font-weight: 600;
    color: white;
    background-color: #37A93A;
    margin-top: 20px;
}

</style>
</head>

<body>

<h1>La bona lingvo</h1>



` + extractedHTML + `
</body></html>`;

    fs.writeFile('La_bona_lingvo_eo123.html', finalHTML, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log('Extraction complete.');
        }
    });
});
