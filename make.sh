#!/bin/sh
BUILDDIR=build
OUTFILE=$BUILDDIR/mmPDF.html

mkdir -p $BUILDDIR
patch pdf.2.13.216.js -o pdf.js pdf.patch
patch pdf.worker.2.13.216.js -o pdf.worker.js pdf.worker.patch

head -n 4 index.html > $OUTFILE
B64ICO=`base64 favicon.ico`
echo "<link href=\"data:image/x-icon;base64," >> $OUTFILE
echo "${B64ICO}\" rel=\"icon\" type=\"image/x-icon\" />" >> $OUTFILE
head -6 index.html | tail -n 1 >> $OUTFILE
echo "<style type=\"text/css\">" >> $OUTFILE
cat style.css >> $OUTFILE
echo "</style>" >> $OUTFILE
head -36 index.html | tail -n 29  >> $OUTFILE
echo "<script>" >> $OUTFILE
cat jquery-3.6.0.slim.min.js >> $OUTFILE
echo "</script>" >> $OUTFILE
echo "<script>" >> $OUTFILE
cat pdf.js >> $OUTFILE
echo "</script>" >> $OUTFILE
echo "<script type=\"text/js-worker\" id=\"pdfjs-worker\">" >> $OUTFILE
cat pdf.worker.js >> $OUTFILE
echo "</script>" >> $OUTFILE
echo "<script>" >> $OUTFILE
cat script.js >> $OUTFILE
echo "</script>" >> $OUTFILE
tail -n 2 index.html >> $OUTFILE

rm pdf.js pdf.worker.js
