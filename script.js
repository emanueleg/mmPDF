var __PDF_DOC,
	__CURRENT_PAGE,
	__TOTAL_PAGES,
	__PAGE_RENDERING_IN_PROGRESS = 0,
	__CANVAS = $('#pdf-canvas').get(0),
	__CANVAS_CTX = __CANVAS.getContext('2d'),
    __CANVAS_BIG = $('#pdf-canvas-big').get(0),
	__CANVAS_CTX_BIG = __CANVAS_BIG.getContext('2d'),
    __SCALE_BIG = 3,
    __PDF_NAME;

var pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';
pdfjsLib.GlobalWorkerOptions.workerElementCode = 'pdfjs-worker';

function showPDF(pdf_url) {
	$("#pdf-loader").show();

	pdfjsLib.getDocument({ url: pdf_url }).promise.then(function(pdf_doc) {
		__PDF_DOC = pdf_doc;
		__TOTAL_PAGES = __PDF_DOC.numPages;
		
		// Hide the pdf loader and show pdf container in HTML
		$("#pdf-loader").hide();
		$("#pdf-contents").show();
		$("#pdf-total-pages").text(__TOTAL_PAGES);

		// Show the first page
		showPage(1);
	}).catch(function(error) {
		// If error re-show the upload button
		$("#pdf-loader").hide();
        $("#title").show();
		$("#upload-button").show();
		
		alert(error.message);
	});;
}

function showPage(page_no) {
	__PAGE_RENDERING_IN_PROGRESS = 1;
	__CURRENT_PAGE = page_no;

	// Disable Prev & Next buttons while page is being loaded
	$("#pdf-next, #pdf-prev").attr('disabled', 'disabled');

	// While page is being rendered hide the canvas and show a loading message
	$("#pdf-canvas").hide();
	$("#page-loader").show();
	$("#download-image").hide();

	// Update current page in HTML
	$("#pdf-current-page").text(page_no);
	
	// Fetch the page
	__PDF_DOC.getPage(page_no).then(function(page) {
		// As the canvas is of a fixed width we need to set the scale of the viewport accordingly
		var scale_required = __CANVAS.width / page.getViewport({scale: 1}).width;

		// Get viewport of the page at required scale
		var viewport = page.getViewport({scale: scale_required});

		// Set canvas height
		__CANVAS.height = viewport.height;
		var renderContext = {
			canvasContext: __CANVAS_CTX,
			viewport: viewport
		};


        __CANVAS_BIG.width = __CANVAS.width * __SCALE_BIG;
        __CANVAS_BIG.height = __CANVAS.height * __SCALE_BIG;
		var renderContextBig = {
			canvasContext: __CANVAS_CTX_BIG,
			viewport: page.getViewport({scale: scale_required*__SCALE_BIG})
		};

		// Render the page contents in the canvas
		page.render(renderContextBig).promise.then(function() {
            __PAGE_RENDERING_IN_PROGRESS = 0;
            //console.log("rendering small");

            // Render the page contents in the big canvas
            page.render(renderContext).promise.then(function() {
                __PAGE_RENDERING_IN_PROGRESS = 0;
                //console.log("rendering big");

    			// Re-enable Prev & Next buttons
    			$("#pdf-next, #pdf-prev").removeAttr('disabled');

                // Show the canvas and hide the page loader
                $("#pdf-canvas").show();
                $("#page-loader").hide();
                $("#download-image").show();
            });

            
		});



    });
}

// Upon click this should should trigger click on the #file-to-upload file input element
// This is better than showing the not-good-looking file input element
$("#upload-button").on('click', function() {
	$("#file-to-upload").trigger('click');
});

// When user chooses a PDF file
$("#file-to-upload").on('change', function() {
	// Validate whether PDF
    if(['application/pdf'].indexOf($("#file-to-upload").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

    $("#title").hide();
	$("#upload-button").hide();

	// Send the object url of the pdf
	showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]));
    let inFname = $("#file-to-upload").get(0).files[0].name
    __PDF_NAME = inFname.substring(0, inFname.indexOf('.pdf'))
});

// Previous page of the PDF
$("#pdf-prev").on('click', function() {
	if(__CURRENT_PAGE != 1)
		showPage(--__CURRENT_PAGE);
});

// Next page of the PDF
$("#pdf-next").on('click', function() {
	if(__CURRENT_PAGE != __TOTAL_PAGES)
		showPage(++__CURRENT_PAGE);
});

// Download button
$("#download-image").on('click', function() {
    let padded_num = __CURRENT_PAGE.toString().padStart(__TOTAL_PAGES.toString(10).length, '0')
	$(this).attr('href', __CANVAS_BIG.toDataURL()).attr('download', __PDF_NAME + '_pag'+padded_num+'.png');
});
