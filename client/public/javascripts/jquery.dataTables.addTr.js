$.fn.dataTableExt.oApi.fnAddTr = function ( oSettings, nTr, bRedraw ) {
    if ( typeof bRedraw == 'undefined' )
    {
        bRedraw = true;
    }

    // console.log(oSettings);

    var nTds = nTr.getElementsByTagName('td');
    var visibleCols = 0;
    for(var i=0; i< oSettings.aoColumns.length; i++)
    {
        if(oSettings.aoColumns[i].bVisible)
        {
            visibleCols++;
        }
    }

    if ( nTds.length != oSettings.aoColumns.length)
    {
        //console.log(new Error().stack());
        console.debug(nTds.length, oSettings.aoColumns.length);
        //console.log('alert');
        //alert( 'Warning: not adding new TR - columns and TD elements must match' );
        return;
    }

    var aData = [];
    var aInvisible = [];
    for ( var i=0 ; i<nTds.length ; i++ )
    {
        aData.push( nTds[i].innerHTML );
        if (!oSettings.aoColumns[i].bVisible)
        {
            aInvisible.push( i );
        }
    }

    /* Add the data and then replace DataTable's generated TR with ours */
    var iIndex = this.oApi._fnAddData( oSettings, aData );
    nTr._DT_RowIndex = iIndex;
    oSettings.aoData[ iIndex ].nTr = nTr;

    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

    // Hidding invisible columns
    for ( var i = (aInvisible.length - 1) ; i >= 0 ; i-- )
    {
        oSettings.aoData[iIndex]._anHidden[ i ] = nTds[aInvisible[i]];
        nTr.removeChild( nTds[aInvisible[i]] );
    }

    // Redraw
    if ( bRedraw )
    {
        this.oApi._fnReDraw( oSettings );
    }
};