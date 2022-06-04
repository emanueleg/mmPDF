# mmPDF
* [:it: Info su mmPDF](#informazioni-su-mmpdf)
* [:uk: More about mmPDF](#some-info-on-mmpdf)

![](mmPDF_screenshot01.png)

---

# Informazioni su mmPDF
Semplice applicazione web a singola pagine funzionante off-line per convertire come immagini PNG o JPEG le pagine di un PDF.

Open source, senza banner, rispetta la privacy, non richiede connessione a Internet, funziona direttamente nel browser senza installazione.

## Istruzioni

1. Scaricare il file [build/mmPDF.html](build/mmPDF.html)
2. Fare doppio clic sul file scaricato (dovrebbe aprirsi nel browser)
3. Selezionare il file PDF, andare alla pagina desiderata ed esportarla in PNG o JPG

## Info tecniche e Licenze

mmPDF utilizza PDF.js (Mozilla License) e jQuery (MIT License). L'icona Sponge proviene da flaticon.com (Flaticon License).

Il Web Worker PDF è incluso nella pagina tramite un tag ``script`` con ``type='javascript/worker'``, affinché non venga parsato dal browser. Il codice è quindi estratto come stringa utilizzando l'attributo ``textContent`` dell'oggetto, passato a ``Blob()`` per creare il file e infine caricato e parsato con ``window.URL.createObjectURL()`` (l'idea viene da [HTML5 Rocks](https://www.html5rocks.com/en/tutorials/workers/basics/#toc-inlineworkers)). L'immagine Favicon è inclusa nella pagina utilizzando la codifica base64. I file CSS e JavaScript esterni sono inclusi nella app come stili e script interni. 

Vengono forniti i codici sorgente di tutti i componenti, le patch e lo script per assemblare la pagina - sentitivi liberi di migliorare il codice e inviare PR.
Il file ``make.sh`` può essere usato per verificare la riproducibilità del file finale pubblicato in ``/build``.

---

# Some info on mmPDF

Simple offline one-page-app for saving PDF pages as PNG or JPEG images.

Open source, no banners, respects your privacy, does not require Internet connection, works directly in the browser without installation.

## Instructions

1. Download [build/mmPDF.html](build/mmPDF.html)
2. Double click the downloaded file (it should open inside a browser tab)
3. Select a PDF, go to the desired pag and export it as PNG or JPG

## Technical details and Licenses

mmPDF is based on PDF.js (Mozilla License) and jQuery (MIT License). The Sponge icon comes from flaticon.com (Flaticon License).

The PDF Web Worker is embedded into the page using a ``script`` tag with ``type='javascript/worker'``, so the browser doesn't parse the JS. That code is then extracted as a string using ``textContent`` on the object and passed to ``Blob()`` to create the file, which is parsed by ``window.URL.createObjectURL()`` (this idea comes from [HTML5 Rocks](https://www.html5rocks.com/en/tutorials/workers/basics/#toc-inlineworkers)). The Favicon image is embedded into the page in base64-encoded form. The external CSS and JavaScript files are embedded as internal stylesheets and script tag. 

Source modules, patches and the build script are provided - feel free to improve and submit a PR.
The ``make.sh`` file can be used to verify the reproducibility of the assembled output file published inside ``/build``.
